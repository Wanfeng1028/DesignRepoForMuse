# Round 4 verdict-only judge (adapted from judge-v2.py).
# Changes vs v2: verdict-only prompt (one VERDICT: PASS/FAIL line + one
# sentence reason, no thinking); judge model chain:
#   1. nvidia/nemotron-3.5-super-vl:free (openrouter ch12, free)
#   2. claude-sonnet-4-6 (vyceai ch17, fallback on 429/402/404/empty content)
#   3. mimo-v2.6-flash (vectide ch18, last resort, flaky return path)
# Disabled this round: deepseek-v4-flash-vision, qiniu/conatus-free,
# moonshotai/kimi-k3, all Oxion models.
# Token: fetched per call from the server persistent file via the relay
# SSH script + sudo cat, held in memory only, never printed or written.
# Transport: curl -K - (config on stdin, never argv, never a file).
# content empty (or thinking-only) counts as a failed call -> next model.
# Three consecutive 429/401/403 across the chain -> stop, exit 3.
import base64, io, json, subprocess, sys, os
from PIL import Image
WS = os.path.expanduser("~/workspace")
MODELS = ["nvidia/nemotron-3.5-super-vl:free", "claude-sonnet-4-6", "mimo-v2.6-flash"]
def fetch_token():
    cmd = ["ssh", "-i", "/home/hatch/.ssh/id_ed25519",
           "-o", "ProxyCommand=python3 ~/workspace/relay-station/ssh_via_proxy.py %h %p",
           "-o", "UserKnownHostsFile=/home/hatch/.ssh/known_hosts",
           "-o", "BatchMode=yes",
           "azureuser@20.222.15.177",
           "sudo cat /etc/botsrouter/muse_judge_token.txt"]
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    if r.returncode != 0:
        print("TOKEN-FETCH-FAIL rc=%s stderr-tail=%s" % (r.returncode, r.stderr[-300:]))
        sys.exit(2)
    tok = r.stdout.strip()
    if not tok:
        print("TOKEN-FETCH-FAIL empty")
        sys.exit(2)
    return tok
def img_b64(path, max_w):
    im = Image.open(path).convert("RGB")
    if im.width > max_w:
        im = im.resize((max_w, int(im.height * max_w / im.width)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=86)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()
def call_model(token, model, payload_path, out_path):
    safe_tok = token.replace("\\", "\\\\").replace('"', '\\"')
    config = (
        'url = "https://api.botsarena.tech/v1/chat/completions"\n'
        'header = "Content-Type: application/json"\n'
        'header = "Authorization: Bearer ' + safe_tok + '"\n'
        'data-binary = "@' + payload_path + '"\n'
    )
    r = subprocess.run(
        ["curl", "-sS", "-K", "-", "-w", "\nHTTP-STATUS %{http_code}\n", "--max-time", "600"],
        input=config, capture_output=True, text=True, timeout=660)
    out = r.stdout
    status = None
    body = out
    if "\nHTTP-STATUS " in out:
        body, tail = out.rsplit("\nHTTP-STATUS ", 1)
        try:
            status = int(tail.strip().split()[0])
        except Exception:
            status = None
    return r.returncode, status, body, r.stderr
def main():
    out_path = sys.argv[1]
    render = sys.argv[2]
    variant = sys.argv[3] if len(sys.argv) > 3 else "main"
    ref2 = os.path.join(WS, "airbuild-refs/user-photo-chatroom-crop.jpg")
    ref3 = os.path.join(WS, "airbuild-refs/appstore/ipad-01.jpg")
    token = fetch_token()
    print("token fetched: yes")
    variant_note = ""
    if variant == "sidebar-collapsed":
        variant_note = "Image 1 is the SIDEBAR-COLLAPSED variant of the same window: the left sidebar column is intentionally hidden (traffic lights + control capsule float as a transparent overlay) and the message stream is unshifted. Do NOT flag the hidden sidebar as a diff; judge only the visible elements."
    elif variant == "preview-collapsed":
        variant_note = "Image 1 is the PREVIEW-COLLAPSED variant of the same window: the right preview column is intentionally hidden and only a 48px titlebar strip with the toggle remains. Do NOT flag the hidden preview column as a diff; judge only the visible elements."
    else:
        variant_note = "Image 1 is the full three-column window."
    prompt = (
        "You are a strict visual UI judge doing a 1:1 comparison. "
        "Output ONLY the verdict, no thinking, no reasoning, no preamble, no extra text. "
        "Image 1 is OUR RENDER (a desktop app window recreation). " + variant_note + " "
        "Image 2 is the REAL ORIGINAL desktop photo crop (three-column desktop layout: left members column, middle chat, right service modules column). "
        "Image 3 is the REAL ORIGINAL iPad App Store screenshot (tablet chat room: left project/member columns, right chat thread with task card, file card, blue user bubbles). "
        "Compare Image 1 against Images 2 and 3 for layout, sizes, colors, typography, spacing, corner radii, icon shapes, and alignment. "
        "Desktop chat body text in Image 2 is blurry/unreadable, so do NOT judge desktop chat body wording. "
        "The bottom module bar in our render is a known adaptation (original has a right-side column instead) and avatar blob redraws are approximations: do NOT list those two as diffs. "
        "Line 1 of your answer MUST be exactly one of: 'VERDICT: PASS' or 'VERDICT: FAIL'. "
        "Line 2 MUST be exactly one sentence giving the reason. "
        "PASS only if there are no substantive differences besides the two known adaptations above. "
        "Do not output anything else."
    )
    payload_path = out_path + ".payload.json"
    fail_streak = 0
    for model in MODELS:
        payload = {
            "model": model,
            "max_tokens": 2000 if model.startswith("nvidia/") else 500,
            "temperature": 0,
            "messages": [{"role": "user", "content": [
                {"type": "text", "text": prompt},
                {"type": "image_url", "image_url": {"url": img_b64(render, 1200)}},
                {"type": "image_url", "image_url": {"url": img_b64(ref2, 1024)}},
                {"type": "image_url", "image_url": {"url": img_b64(ref3, 800)}},
            ]}],
        }
        with open(payload_path, "w") as f:
            json.dump(payload, f)
        try:
            rc, status, body, stderr = call_model(token, model, payload_path, out_path)
        finally:
            try:
                os.remove(payload_path)
            except OSError:
                pass
        print("MODEL %s rc=%s status=%s body-chars=%d" % (model, rc, status, len(body)))
        if rc != 0 or status is None:
            print("CURL-FAIL stderr-tail=%s" % stderr[-500:])
            fail_streak += 1
            if fail_streak >= 3:
                print("STOP: 3 consecutive failures")
                sys.exit(3)
            continue
        if status in (429, 401, 403):
            print("BODY-TAIL " + body[-500:])
            fail_streak += 1
            if fail_streak >= 3:
                print("STOP: 3 consecutive 429/401/403")
                with open(out_path, "w") as f:
                    f.write(body)
                sys.exit(3)
            print("FALLBACK to next model")
            continue
        if status in (402, 404):
            print("BODY-TAIL " + body[-500:])
            print("FALLBACK to next model")
            continue
        if status != 200:
            print("BODY-TAIL " + body[-500:])
            sys.exit(4)
        fail_streak = 0
        with open(out_path, "w") as f:
            f.write(body)
        try:
            data = json.loads(body)
            msg = data["choices"][0]["message"]
            txt = (msg.get("content") or "").strip()
            usage = data.get("usage", {})
            print("MODEL-USED %s" % model)
            print("USAGE %s" % json.dumps(usage))
            print("VERDICT-EXTRACT:")
            print(txt[:2000])
        except Exception as e:
            print("PARSE-FAIL %s" % e)
            sys.exit(4)
        if not txt:
            print("EMPTY-CONTENT: failed call, fallback to next model")
            continue
        first = txt.splitlines()[0].strip() if txt.splitlines() else ""
        if first not in ("VERDICT: PASS", "VERDICT: FAIL"):
            print("NO-VERDICT-LINE: first line was: %r" % first)
            print("FALLBACK to next model")
            continue
        print("VERDICT-OK %s" % first)
        return
    print("ALL-MODELS-EXHAUSTED without a verdict")
    sys.exit(5)
if __name__ == "__main__":
    main()
