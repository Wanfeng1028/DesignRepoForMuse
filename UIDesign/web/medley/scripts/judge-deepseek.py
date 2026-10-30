"""Visual judge client: deepseek-v4-flash-vision via BotsRouter (judge key only).
Token comes only from env BR_TOKEN (fetched live from the server, never
written to any file, never printed). Images are base64-encoded in memory.
Usage: BR_TOKEN=... python3 scripts/judge-deepseek.py --render R --original O1[,O2...] --prompt P [--prompt-scope S] [--max-tokens 6000]
Exits 3 on HTTP 429/401/403 so the caller can apply the 3-strike stop rule.
"""
import argparse, base64, json, os, sys, urllib.request
ap = argparse.ArgumentParser()
ap.add_argument("--render", required=True)
ap.add_argument("--original", required=True, help="comma-separated original image paths")
ap.add_argument("--prompt", required=True)
ap.add_argument("--prompt-scope", default=None)
ap.add_argument("--max-tokens", type=int, default=6000)
args = ap.parse_args()
token = os.environ.get("BR_TOKEN", "").strip()
if not token:
    print("no BR_TOKEN", file=sys.stderr); sys.exit(2)
def b64(path):
    if path.lower().endswith(".png"):
        from PIL import Image
        import io
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
    "model": "deepseek-v4-flash-vision",
    "messages": [{"role": "user", "content": content}],
    "max_tokens": args.max_tokens,
    "temperature": 0,
}).encode()
req = urllib.request.Request(
    "https://api.botsarena.tech/v1/chat/completions",
    data=body, headers={"Authorization": "Bearer " + token, "Content-Type": "application/json"},
    method="POST")
data = None
last_err = None
for _try in range(3):
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            data = json.load(resp)
        break
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")[:500]
        print(f"HTTP {e.code}: {detail}", file=sys.stderr)
        if e.code in (429, 401, 403):
            print("JUDGE_STOP_CODE", file=sys.stderr)
        sys.exit(3)
    except Exception as e:
        # IncompleteRead / reset mid-stream: proxy truncates long responses;
        # no verdict was obtained, so a transport-level re-request is not a
        # re-judge. Up to 3 transport attempts total per call.
        last_err = e
        continue
if data is None:
    print(f"TRANSPORT_TRUNCATED: {last_err}", file=sys.stderr)
    sys.exit(3)
msg = data["choices"][0]["message"]
print(msg.get("content") or msg.get("reasoning_content") or "")
usage = data.get("usage")
if usage:
    print(f"\n[usage prompt={usage.get('prompt_tokens')} completion={usage.get('completion_tokens')}]", file=sys.stderr)
