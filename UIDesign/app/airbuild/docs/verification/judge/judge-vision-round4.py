"""Round 4 visual judge client.
Model passed via --model (default nemotron main judge).
Token only from env BR_TOKEN, never written to any file.
Token reaches curl only via stdin config (curl -K -), never argv.
Body JSON (image + prompt, no token) goes via a workspace file that is
deleted after the call, because curl -K - already occupies stdin.
Exits: 3 on 429/401/403 (stop codes), 4 on empty content (failed call,
switch model), 5 on other HTTP, 2 on no token.
"""
import argparse
import base64
import json
import os
import subprocess
import sys
import uuid

ap = argparse.ArgumentParser()
ap.add_argument("--image", required=True)
ap.add_argument("--prompt", required=True)
ap.add_argument("--model", default="nvidia/nemotron-3.5-super-vl:free")
ap.add_argument("--max-tokens", type=int, default=6000)
ap.add_argument("--workdir", required=True)
args = ap.parse_args()

token = os.environ.get("BR_TOKEN", "").strip()
if not token:
    print("no BR_TOKEN", file=sys.stderr)
    sys.exit(2)
if "sk-" in token or token.startswith("sk-"):
    print("token has sk- prefix, refusing", file=sys.stderr)
    sys.exit(2)

with open(args.image, "rb") as f:
    b64 = base64.b64encode(f.read()).decode()
with open(args.prompt, encoding="utf-8") as f:
    prompt = f.read()

body = json.dumps({
    "model": args.model,
    "messages": [{"role": "user", "content": [
        {"type": "text", "text": prompt},
        {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64," + b64}},
    ]}],
    "max_tokens": args.max_tokens,
    "temperature": 0,
})

os.makedirs(args.workdir, exist_ok=True)
body_path = os.path.join(args.workdir, "body-" + uuid.uuid4().hex + ".json")
try:
    with open(body_path, "w", encoding="utf-8") as f:
        f.write(body)
    config = (
        'url = "https://api.botsarena.tech/v1/chat/completions"\n'
        'header = "Authorization: Bearer ' + token + '"\n'
        'header = "Content-Type: application/json"\n'
        'data-binary = "@' + body_path + '"\n'
        'silent = true\n'
        'show-error = true\n'
        'max-time = 300\n'
        'write-out = "\\nHTTP_CODE:%{http_code}"\n'
    )
    proc = subprocess.run(["curl", "-K", "-"], input=config.encode(),
                          capture_output=True)
    out = proc.stdout.decode(errors="replace")
    if "\nHTTP_CODE:" in out:
        payload, code = out.rsplit("\nHTTP_CODE:", 1)
        code = code.strip()
    else:
        payload, code = out, "000"
finally:
    try:
        os.remove(body_path)
    except OSError:
        pass

if code in ("429", "401", "403"):
    print("HTTP " + code + ": " + payload[:500], file=sys.stderr)
    print("JUDGE_STOP", file=sys.stderr)
    sys.exit(3)
if code != "200":
    print("HTTP " + code + ": " + payload[:500], file=sys.stderr)
    print("curl stderr: " + proc.stderr.decode(errors="replace")[:300], file=sys.stderr)
    sys.exit(5)

data = json.loads(payload)
msg = data["choices"][0]["message"]
content = (msg.get("content") or "").strip()
if not content:
    print("empty content (reasoning-only or blank), failed call", file=sys.stderr)
    print("finish=" + str(data["choices"][0].get("finish_reason")), file=sys.stderr)
    print("msg_keys=" + ",".join(sorted(msg.keys())), file=sys.stderr)
    print("msg_types=" + ",".join(k + ":" + type(v).__name__ for k, v in msg.items()), file=sys.stderr)
    print("usage=" + json.dumps(data.get("usage") or {}), file=sys.stderr)
    print("raw_len=" + str(len(payload)), file=sys.stderr)
    sys.exit(4)
print(content)
usage = data.get("usage")
if usage:
    print("[usage model=" + args.model + " prompt=" + str(usage.get("prompt_tokens"))
          + " completion=" + str(usage.get("completion_tokens"))
          + " finish=" + str(data["choices"][0].get("finish_reason")) + "]", file=sys.stderr)
