"""Visual judge client: qiniu/conatus-free via BotsRouter.
Token comes only from env BR_TOKEN (fetched live from the server, never
written to any file). Images are base64-encoded in memory only.
Usage: BR_TOKEN=... python3 judge.py --render R.png --original O1.jpg,O2.jpg --prompt P.txt
Exits non-zero on 429 / rate-limit so the caller stops the iteration.
"""
import argparse, base64, json, os, sys, urllib.request

ap = argparse.ArgumentParser()
ap.add_argument("--render", required=True)
ap.add_argument("--original", required=True, help="comma-separated original image paths")
ap.add_argument("--prompt", required=True)
ap.add_argument("--max-tokens", type=int, default=4000)
args = ap.parse_args()

token = os.environ.get("BR_TOKEN", "")
if not token:
    print("no BR_TOKEN", file=sys.stderr); sys.exit(2)

def b64(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode()

with open(args.prompt, encoding="utf-8") as f:
    prompt = f.read()

content = [{"type": "text", "text": prompt}]
content.append({"type": "image_url", "image_url": {"url": "data:image/png;base64," + b64(args.render)}})
for i, path in enumerate(args.original.split(",")):
    ext = "jpeg" if path.lower().endswith((".jpg", ".jpeg")) else "png"
    content.append({"type": "image_url", "image_url": {"url": f"data:image/{ext};base64," + b64(path)}})

body = json.dumps({
    "model": "qiniu/conatus-free",
    "messages": [{"role": "user", "content": content}],
    "max_tokens": args.max_tokens,
    "temperature": 0,
}).encode()

req = urllib.request.Request(
    "https://api.botsarena.tech/v1/chat/completions",
    data=body, headers={"Authorization": "Bearer " + token, "Content-Type": "application/json"},
    method="POST")
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
    print(f"\n[usage prompt={usage.get('prompt_tokens')} completion={usage.get('completion_tokens')}]", file=sys.stderr)
