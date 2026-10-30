import argparse, base64, json, os, sys, urllib.request
ap = argparse.ArgumentParser()
ap.add_argument("--image", required=True)
ap.add_argument("--prompt", required=True)
ap.add_argument("--max-tokens", type=int, default=6000)
a = ap.parse_args()
token = os.environ.get("BR_TOKEN", "")
if not token:
    print("no BR_TOKEN", file=sys.stderr); sys.exit(2)
# NOTE: BotsRouter tokens are 48 chars with NO prefix. Do NOT add sk- (that 401s).
with open(a.image, "rb") as f:
    b64 = base64.b64encode(f.read()).decode()
with open(a.prompt, encoding="utf-8") as f:
    prompt = f.read()
body = json.dumps({"model": "deepseek-v4-flash-vision", "messages": [{"role": "user", "content": [{"type": "text", "text": prompt}, {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64," + b64}}]}], "max_tokens": a.max_tokens, "temperature": 0}).encode()
req = urllib.request.Request("https://api.botsarena.tech/v1/chat/completions", data=body, headers={"Authorization": "Bearer " + token, "Content-Type": "application/json"}, method="POST")
try:
    with urllib.request.urlopen(req, timeout=300) as resp:
        data = json.load(resp)
except urllib.error.HTTPError as e:
    detail = e.read().decode(errors="replace")[:800]
    print("HTTP " + str(e.code) + ": " + detail, file=sys.stderr)
    sys.exit(3)
msg = data["choices"][0]["message"]
print(msg.get("content") or msg.get("reasoning_content") or "")
usage = data.get("usage")
if usage:
    print("\n[usage prompt=" + str(usage.get("prompt_tokens")) + " completion=" + str(usage.get("completion_tokens")) + "]", file=sys.stderr)
