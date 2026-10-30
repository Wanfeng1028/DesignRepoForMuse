"""Round-4 visual judge client (Nemotron primary, Claude/Mimo fallback).
Token comes only from env BR_TOKEN (fetched live from the server, never
written to any file, never printed). Images are base64-encoded in memory.
Request body (no token inside) goes to a scratch file under the round4
judge dir and is deleted after the call. The Authorization header is fed
to curl ONLY via a pipe passed as -K /dev/fd/N: never in argv, never on
disk. Transport is curl (urllib truncates chunked large responses).
Usage: BR_TOKEN=... python3 scripts/judge-round4.py --render R
  --original O1[,O2...] --prompt P --prompt-scope S --model M
  --scratch <path> [--max-tokens 400]
Exit codes: 0 verdict printed; 3 HTTP 429/401/403 (stop codes);
4 other HTTP failure / empty content / transport failure; 2 no token.
Verdict-only output: exactly one line VERDICT: PASS/FAIL + one sentence.
Content that is empty counts as a failed call (no verdict), even if a
reasoning field is present: reasoning is never treated as the verdict.
"""
import argparse
import base64
import io
import json
import os
import subprocess
import sys

ap = argparse.ArgumentParser()
ap.add_argument("--render", required=True)
ap.add_argument("--original", required=True, help="comma-separated original image paths")
ap.add_argument("--prompt", required=True)
ap.add_argument("--prompt-scope", default=None)
ap.add_argument("--model", required=True)
ap.add_argument("--scratch", required=True, help="body JSON scratch path (deleted after call)")
ap.add_argument("--max-tokens", type=int, default=400)
ap.add_argument("--timeout", type=int, default=300)
args = ap.parse_args()

token = os.environ.get("BR_TOKEN", "").strip()
if not token:
    print("no BR_TOKEN", file=sys.stderr)
    sys.exit(2)


def b64(path):
    if path.lower().endswith(".png"):
        from PIL import Image
        im = Image.open(path).convert("RGB")
        buf = io.BytesIO()
        im.save(buf, "JPEG", quality=88)
        return base64.b64encode(buf.getvalue()).decode()
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode()


with open(args.prompt, encoding="utf-8") as f:
    prompt = f.read()
if args.prompt_scope:
    with open(args.prompt_scope, encoding="utf-8") as f:
        prompt += "\n\n" + f.read()

content = [{"type": "text", "text": prompt}]
content.append({"type": "image_url", "image_url": {"url": "data:image/jpeg;base64," + b64(args.render)}})
for path in args.original.split(","):
    content.append({"type": "image_url", "image_url": {"url": "data:image/jpeg;base64," + b64(path)}})

body = json.dumps({
    "model": args.model,
    "messages": [{"role": "user", "content": content}],
    "max_tokens": args.max_tokens,
    "temperature": 0,
}).encode()

with open(args.scratch, "wb") as f:
    f.write(body)

config = (
    'url = "https://api.botsarena.tech/v1/chat/completions"\n'
    'header = "Content-Type: application/json"\n'
    'header = "Authorization: Bearer ' + token + '"\n'
    "max-time = " + str(args.timeout) + "\n"
)

exit_code = 4
try:
    r, w = os.pipe()
    proc = subprocess.Popen(
        ["curl", "-sS", "-w", "\n__HTTP_CODE__:%{http_code}",
         "-K", "/dev/fd/%d" % r, "--data-binary", "@" + args.scratch],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE, pass_fds=(r,))
    os.close(r)
    try:
        os.write(w, config.encode())
    finally:
        os.close(w)
    out, err = proc.communicate()
    out_text = out.decode(errors="replace")
    err_text = err.decode(errors="replace")
    marker = "\n__HTTP_CODE__:"
    if marker in out_text:
        resp_text, code_str = out_text.rsplit(marker, 1)
        code = code_str.strip()
    else:
        resp_text, code = out_text, "NOCODE"
    if code in ("429", "401", "403"):
        print("HTTP %s: %s" % (code, resp_text[:500]), file=sys.stderr)
        print("JUDGE_STOP_CODE", file=sys.stderr)
        sys.exit(3)
    if code != "200":
        print("HTTP %s: %s" % (code, resp_text[:500]), file=sys.stderr)
        if err_text:
            print("curl stderr: %s" % err_text[:300], file=sys.stderr)
        sys.exit(4)
    try:
        data = json.loads(resp_text)
        msg = data["choices"][0]["message"]
        verdict = (msg.get("content") or "").strip()
        usage = data.get("usage")
        if usage:
            print("[model=%s usage prompt=%s completion=%s]" % (
                args.model, usage.get("prompt_tokens"), usage.get("completion_tokens")),
                file=sys.stderr)
    except Exception as e:
        print("BAD_RESPONSE: %s" % e, file=sys.stderr)
        sys.exit(4)
    if not verdict:
        print("EMPTY_CONTENT: content empty (reasoning field ignored)", file=sys.stderr)
        sys.exit(4)
    print(verdict)
    exit_code = 0
except SystemExit:
    raise
except Exception as e:
    print("TRANSPORT_FAILED: %s" % e, file=sys.stderr)
    exit_code = 4
finally:
    try:
        os.unlink(args.scratch)
    except OSError:
        pass
sys.exit(exit_code)
