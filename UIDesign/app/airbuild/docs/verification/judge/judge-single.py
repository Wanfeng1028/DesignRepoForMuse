"""Visual judge client: qiniu/conatus-free via BotsRouter, single JPEG composite.
Token only from env BR_TOKEN (fetched live, never written to any file).
Usage: BR_TOKEN=... python3 judge-single.py --image IMG.jpg --prompt P.txt --max-tokens 6000
Exits non-zero on 429 / rate-limit so the caller stops the iteration.
"""
import argparse, base64, json, os, sys, urllib.request
ap = argparse.ArgumentParser()
ap.add_argument("--image", required=True)
ap.add_argument("--prompt", required=True)
ap.add_argument("--max-tokens", type=int, default=6000)
args = ap.parse_args()
token = os.environ.get("BR_TOKEN", "").strip()
if not token:
    print("no BR_TOKEN", file=sys.stderr); sys.exit(2)
if not token.startswith("sk-"):
    token = "sk-" + token
with open(args.image, "rb") as f:
    b64 = base64.b64encode(f.read()).decode()
with open(args.prompt, encoding="utf-8") as f:
    prompt = f.read()
content = [{"type": "text", "text": prompt},
           {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64," + b64}}]
body = json.dumps({"model": "qiniu/conatus-free",
                   "messages": [{"role": "user", "content": content}],
                   "max_tokens": args.max_tokens, "temperature": 0}).encode()
req = urllib.request.Request("https://api.botsarena.tech/v1/chat/completions",
    data=body, headers={"Authorization": "Bearer " + token, "Content-Type": "application/json"}, method="POST")
try:
    with urllib.request.urlopen(req, timeout=300) as resp:
        data = json.load(resp)
except urllib.error.HTTPError as e:
    detail = e.read().decode(errors="replace")[:500]
    print(f"HTTP {e.code}: {detail}", file=sys.stderr)
    if e.code == 429:
        print("RATE_LIMIT_STOP", file=sys.stderr)
    sys.exit(3)
msg = data["choices"][0]["message"]
print(msg.get("content") or msg.get("reasoning_content") or "")
usage = data.get("usage")
if usage:
    print(f"\n[usage prompt={usage.get('prompt_tokens')} completion={usage.get('completion_tokens')} finish={data['choices'][0].get('finish_reason')}]", file=sys.stderr)
