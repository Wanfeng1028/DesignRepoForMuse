import argparse, base64, json, os, subprocess, sys
ap = argparse.ArgumentParser()
ap.add_argument("--image", required=True)
ap.add_argument("--prompt", required=True)
ap.add_argument("--out", required=True)
ap.add_argument("--body", required=True)
ap.add_argument("--resp", required=True)
a = ap.parse_args()
MODELS = ["nvidia/nemotron-3.5-super-vl:free", "claude-sonnet-4-6", "mimo-v2.6-flash"]
ssh = ["ssh", "-i", "/home/hatch/.ssh/id_ed25519",
       "-o", "ProxyCommand=python3 /home/hatch/workspace/relay-station/ssh_via_proxy.py %h %p",
       "-o", "UserKnownHostsFile=/home/hatch/.ssh/known_hosts",
       "-o", "BatchMode=yes",
       "azureuser@20.222.15.177", "sudo cat /etc/botsrouter/muse_judge_token.txt"]
r = subprocess.run(ssh, capture_output=True, text=True, timeout=120)
token = r.stdout.strip()
if r.returncode != 0 or not token or len(token) < 20:
    print("TOKEN_FETCH_FAILED rc=%d" % r.returncode, file=sys.stderr)
    sys.exit(2)
if token.startswith("sk-"):
    print("TOKEN_FORMAT_UNEXPECTED", file=sys.stderr)
    sys.exit(2)
with open(a.image, "rb") as f:
    b64 = base64.b64encode(f.read()).decode()
with open(a.prompt, encoding="utf-8") as f:
    prompt = f.read()
safe = token.replace("\\", "\\\\").replace('"', '\\"')
attempts = []
for model in MODELS:
    body = json.dumps({"model": model, "messages": [{"role": "user", "content": [{"type": "text", "text": prompt}, {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64," + b64}}]}], "max_tokens": 4000, "temperature": 0})
    with open(a.body, "w", encoding="utf-8") as f:
        f.write(body)
    cfg = ('url = "https://api.botsarena.tech/v1/chat/completions"\n'
           'header = "Authorization: Bearer ' + safe + '"\n'
           'header = "Content-Type: application/json"\n'
           'data-binary = "@' + os.path.abspath(a.body) + '"\n'
           'output = "' + os.path.abspath(a.resp) + '"\n'
           'silent = true\nshow-error = true\nmax-time = 300\n'
           'write-out = "%{http_code}"\n')
    p = subprocess.run(["curl", "-K", "-"], input=cfg, capture_output=True, text=True, timeout=330)
    code = p.stdout.strip()
    detail = ""
    content = ""
    usage = {}
    if os.path.exists(a.resp):
        try:
            data = json.load(open(a.resp, encoding="utf-8"))
            msg = data.get("choices", [{}])[0].get("message", {}) if data.get("choices") else {}
            content = (msg.get("content") or "").strip()
            usage = data.get("usage", {}) or {}
            if not content:
                detail = "empty-content"
            elif not data.get("choices"):
                detail = "no-choices"
        except Exception as e:
            detail = "bad-json:" + str(e)[:120]
    else:
        detail = "no-resp curl_rc=%d err=%s" % (p.returncode, p.stderr.strip()[:200])
    attempts.append((model, code, detail, usage))
    verdict_line = None
    reason_line = ""
    if code == "200" and content:
        lines = [l.strip() for l in content.splitlines() if l.strip()]
        for i, l in enumerate(lines):
            if l.startswith("VERDICT: PASS") or l.startswith("VERDICT: FAIL"):
                verdict_line = l.split()[0] + " " + l.split()[1]
                reason_line = lines[i + 1] if i + 1 < len(lines) else ""
                break
        if verdict_line is None:
            detail = "no-verdict-line"
    if code == "200" and verdict_line:
        with open(a.out, "w", encoding="utf-8") as f:
            f.write(verdict_line + "\n" + reason_line + "\n")
        print("MODEL=" + model, file=sys.stderr)
        print("USAGE prompt=%s completion=%s" % (usage.get("prompt_tokens"), usage.get("completion_tokens")), file=sys.stderr)
        print(verdict_line + "\n" + reason_line)
        try:
            os.remove(a.body)
            os.remove(a.resp)
        except OSError:
            pass
        sys.exit(0)
    print("ATTEMPT model=%s http=%s detail=%s" % (model, code, detail), file=sys.stderr)
    try:
        os.remove(a.resp)
    except OSError:
        pass
try:
    os.remove(a.body)
except OSError:
    pass
print("ALL_MODELS_FAILED attempts=" + json.dumps([(m, c, d) for m, c, d, u in attempts]), file=sys.stderr)
sys.exit(3)
