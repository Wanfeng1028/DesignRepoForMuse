import argparse, base64, json, subprocess, sys, urllib.request, urllib.error
ap = argparse.ArgumentParser()
ap.add_argument("--image", required=True)
ap.add_argument("--prompt", required=True)
ap.add_argument("--max-tokens", type=int, default=6000)
ap.add_argument("--out", required=True)
a = ap.parse_args()
ssh = ["ssh", "-i", "/home/hatch/.ssh/id_ed25519",
       "-o", "ProxyCommand=python3 /home/hatch/workspace/relay-station/ssh_via_proxy.py %h %p",
       "-o", "UserKnownHostsFile=/home/hatch/.ssh/known_hosts",
       "-o", "BatchMode=yes",
       "azureuser@20.222.15.177", "sudo cat /etc/botsrouter/muse_judge_token.txt"]
r = subprocess.run(ssh, capture_output=True, text=True, timeout=120)
token = r.stdout.strip()
if r.returncode != 0 or not token or len(token) < 20:
    print("TOKEN_FETCH_FAILED rc=%d stderr=%s" % (r.returncode, r.stderr.strip()[:300]), file=sys.stderr)
    sys.exit(2)
# Token is used only in memory for this one call. It is never printed or written.
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
text = msg.get("content") or msg.get("reasoning_content") or ""
with open(a.out, "w", encoding="utf-8") as f:
    f.write(text + "\n")
usage = data.get("usage")
if usage:
    print("[usage prompt=" + str(usage.get("prompt_tokens")) + " completion=" + str(usage.get("completion_tokens")) + "]", file=sys.stderr)
print(text)
