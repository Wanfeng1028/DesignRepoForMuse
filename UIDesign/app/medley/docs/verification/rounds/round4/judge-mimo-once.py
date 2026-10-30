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
b64 = base64.b64encode(open("side-pricing.jpg", "rb").read()).decode()
prompt = open("judge-prompt-round4.txt", encoding="utf-8").read()
body = json.dumps({"model": "mimo-v2.6-flash", "messages": [{"role": "user", "content": [{"type": "text", "text": prompt}, {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64," + b64}}]}], "max_tokens": 500, "temperature": 0})
open(".body-pricing-mimo.json", "w", encoding="utf-8").write(body)
safe = token.replace("\\", "\\\\").replace('"', '\\"')
cfg = ('url = "https://api.botsarena.tech/v1/chat/completions"\n'
       'header = "Authorization: Bearer ' + safe + '"\n'
       'header = "Content-Type: application/json"\n'
       'data-binary = "@' + os.path.abspath(".body-pricing-mimo.json") + '"\n'
       'output = "' + os.path.abspath(".resp-pricing-mimo.json") + '"\n'
       'silent = true\nshow-error = true\nmax-time = 300\n'
       'write-out = "%{http_code}"\n')
p = subprocess.run(["curl", "-K", "-"], input=cfg, capture_output=True, text=True, timeout=330)
print("HTTP=" + p.stdout.strip(), file=sys.stderr)
try:
    data = json.load(open(".resp-pricing-mimo.json", encoding="utf-8"))
    msg = data.get("choices", [{}])[0].get("message", {}) if data.get("choices") else {}
    content = (msg.get("content") or "").strip()
    print("USAGE=" + json.dumps(data.get("usage", {})), file=sys.stderr)
    print(content)
    open("verdict-pricing-mimo.txt", "w", encoding="utf-8").write(content + "\n")
except Exception as e:
    print("PARSE_FAIL " + str(e)[:200], file=sys.stderr)
    sys.exit(3)
finally:
    for f in (".body-pricing-mimo.json", ".resp-pricing-mimo.json"):
        try:
            os.remove(f)
        except OSError:
            pass
