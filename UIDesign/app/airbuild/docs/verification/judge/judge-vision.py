"""Visual judge client: deepseek-v4-flash-vision via BotsRouter, single JPEG composite.
Token only from env BR_TOKEN (fetched live, never written to any file).
BotsRouter token format is 48 chars with NO prefix; do NOT add sk- (that 401s).
Transport is curl (urllib gets IncompleteRead on large chunked responses here).
Usage: BR_TOKEN=... python3 judge-vision.py --image IMG.jpg --prompt P.txt --max-tokens 6000
Exits 3 on 429/401/403 so the caller stops the iteration (control-block stop rule).
"""
import argparse, base64, json, os, subprocess, sys
ap = argparse.ArgumentParser()
ap.add_argument("--image", required=True)
ap.add_argument("--prompt", required=True)
ap.add_argument("--max-tokens", type=int, default=6000)
args = ap.parse_args()
token = os.environ.get("BR_TOKEN", "").strip()
if not token:
    print("no BR_TOKEN", file=sys.stderr); sys.exit(2)
with open(args.image, "rb") as f:
    b64 = base64.b64encode(f.read()).decode()
with open(args.prompt, encoding="utf-8") as f:
    prompt = f.read()
content = [{"type": "text", "text": prompt},
           {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64," + b64}}]
body = json.dumps({"model": "deepseek-v4-flash-vision",
                   "messages": [{"role": "user", "content": content}],
                   "max_tokens": args.max_tokens, "temperature": 0})
proc = subprocess.run(["curl", "-sS", "-m", "300", "-w", "\nHTTP_CODE:%{http_code}",
                       "-X", "POST", "https://api.botsarena.tech/v1/chat/completions",
                       "-H", "Authorization: Bearer " + token,
                       "-H", "Content-Type: application/json",
                       "-d", "@-"],
                      input=body.encode(), capture_output=True)
out = proc.stdout.decode(errors="replace")
if "\nHTTP_CODE:" in out:
    payload, code = out.rsplit("\nHTTP_CODE:", 1)
    code = code.strip()
else:
    payload, code = out, "000"
if code in ("429", "401", "403"):
    print(f"HTTP {code}: {payload[:500]}", file=sys.stderr)
    print("JUDGE_STOP", file=sys.stderr)
    sys.exit(3)
if code != "200":
    print(f"HTTP {code}: {payload[:500]}", file=sys.stderr)
    print(f"curl stderr: {proc.stderr.decode(errors='replace')[:300]}", file=sys.stderr)
    sys.exit(5)
data = json.loads(payload)
msg = data["choices"][0]["message"]
print(msg.get("content") or msg.get("reasoning_content") or "")
usage = data.get("usage")
if usage:
    print(f"\n[usage prompt={usage.get('prompt_tokens')} completion={usage.get('completion_tokens')} finish={data['choices'][0].get('finish_reason')}]", file=sys.stderr)
