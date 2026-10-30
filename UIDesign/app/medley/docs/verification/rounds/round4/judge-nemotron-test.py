import base64, json, os, subprocess, sys
ssh = ["ssh", "-i", "/home/hatch/.ssh/id_ed25519",
       "-o", "ProxyCommand=python3 /home/hatch/workspace/relay-station/ssh_via_proxy.py %h %p",
       "-o", "UserKnownHostsFile=/home/hatch/.ssh/known_hosts",
       "-o", "BatchMode=yes",
       "azureuser@20.222.15.177", "sudo cat /etc/botsrouter/muse_judge_token.txt"]
r = subprocess.run(ssh, capture_output=True, text=True, timeout=120)
token = r.stdout.strip()
if r.returncode != 0 or not token or len(token) < 20 or token.startswith("sk-"):
    print("TOKEN_FETCH_FAILED", file=sys.stderr); sys.exit(2)
b64 = base64.b64encode(open("side-welcome.jpg", "rb").read()).decode()
prompt = open("judge-prompt-round4.txt", encoding="utf-8").read()
body = json.dumps({"model": "nvidia/nemotron-3.5-super-vl:free", "messages": [{"role": "user", "content": [{"type": "text", "text": prompt}, {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64," + b64}}]}], "max_tokens": 4000, "temperature": 0})
open(".body-nemo-test.json", "w", encoding="utf-8").write(body)
safe = token.replace("\\", "\\\\").replace('"', '\\"')
cfg = ('url = "https://api.botsarena.tech/v1/chat/completions"\n'
       'header = "Authorization: Bearer ' + safe + '"\n'
       'header = "Content-Type: application/json"\n'
       'data-binary = "@' + os.path.abspath(".body-nemo-test.json") + '"\n'
       'output = "' + os.path.abspath(".resp-nemo-test.json") + '"\n'
       'silent = true\nshow-error = true\nmax-time = 300\n'
       'write-out = "%{http_code}"\n')
p = subprocess.run(["curl", "-K", "-"], input=cfg, capture_output=True, text=True, timeout=330)
print("HTTP=" + p.stdout.strip(), file=sys.stderr)
try:
    data = json.load(open(".resp-nemo-test.json", encoding="utf-8"))
    msg = data.get("choices", [{}])[0].get("message", {}) if data.get("choices") else {}
    print("USAGE=" + json.dumps(data.get("usage", {})), file=sys.stderr)
    print("CONTENT_LEN=" + str(len(msg.get("content") or "")), file=sys.stderr)
    print("REASONING_LEN=" + str(len(msg.get("reasoning_content") or "")), file=sys.stderr)
    print("CONTENT=" + (msg.get("content") or ""))
finally:
    for f in (".body-nemo-test.json", ".resp-nemo-test.json"):
        try:
            os.remove(f)
        except OSError:
            pass
