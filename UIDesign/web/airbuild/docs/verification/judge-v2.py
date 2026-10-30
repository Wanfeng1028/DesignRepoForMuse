import base64, io, json, subprocess, sys, os
from PIL import Image
BASE = os.path.expanduser("~/workspace/DesignRepoForMuse/UIDesign/web/airbuild")
WS = os.path.expanduser("~/workspace")
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
def main():
    out_path = sys.argv[1]
    render = sys.argv[2]
    ref2 = sys.argv[3] if len(sys.argv) > 3 else os.path.join(WS, "airbuild-refs/user-photo-chatroom-crop.jpg")
    ref3 = sys.argv[4] if len(sys.argv) > 4 else os.path.join(WS, "airbuild-refs/appstore/ipad-01.jpg")
    ref2_w = int(sys.argv[5]) if len(sys.argv) > 5 else 1024
    ref3_w = int(sys.argv[6]) if len(sys.argv) > 6 else 800
    token = fetch_token()
    print("token fetched: yes")
    prompt = (
        "You are a strict visual UI judge doing a 1:1 pixel-level comparison. "
        "Output the verdict FIRST, before any other text. Do not output thinking, reasoning, or preamble. "
        "Image 1 is OUR RENDER (a desktop app window recreation). "
        "Image 2 is the REAL ORIGINAL desktop photo crop (user photo, three-column desktop layout: left members column, middle chat, right service modules column). "
        "Image 3 is the REAL ORIGINAL iPad App Store screenshot (tablet chat room: left project/member columns, right chat thread with task card, file card, blue user bubbles). "
        "Compare Image 1 against Images 2 and 3 for layout, sizes, colors, typography, spacing, corner radii, icon shapes, and alignment. "
        "Desktop chat body text in Image 2 is blurry/unreadable, so do NOT judge desktop chat body wording; judge everything else. "
        "The bottom module bar in our render is a known adaptation (original has a right-side column instead) and avatar blob redraws are approximations: do NOT list those two as diffs. "
        "FIRST LINE of your answer MUST be exactly one of: 'VERDICT: CLEAN' or 'VERDICT: DIFFS'. "
        "After that first line, if DIFFS, list every substantive difference, one per numbered item, each quantified: where it is, size in px, color hex, font size and weight, spacing, corner radius, icon shape, and alignment, plus what the original shows vs what the render shows. "
        "If there are no substantive differences besides the two known adaptations above, answer VERDICT: CLEAN and stop."
    )
    payload = {
        "model": "deepseek-v4-flash-vision",
        "max_tokens": 6000,
        "temperature": 0,
        "messages": [{"role": "user", "content": [
            {"type": "text", "text": prompt},
            {"type": "image_url", "image_url": {"url": img_b64(render, 1200)}},
            {"type": "image_url", "image_url": {"url": img_b64(ref2, ref2_w)}},
            {"type": "image_url", "image_url": {"url": img_b64(ref3, ref3_w)}},
        ]}],
    }
    payload_path = out_path + ".payload.json"
    with open(payload_path, "w") as f:
        json.dump(payload, f)
    safe_tok = token.replace("\\", "\\\\").replace('"', '\\"')
    config = (
        'url = "https://api.botsarena.tech/v1/chat/completions"\n'
        'header = "Content-Type: application/json"\n'
        'header = "Authorization: Bearer ' + safe_tok + '"\n'
        'data-binary = "@' + payload_path + '"\n'
    )
    try:
        r = subprocess.run(
            ["curl", "-sS", "-K", "-", "-w", "\nHTTP-STATUS %{http_code}\n", "--max-time", "600"],
            input=config, capture_output=True, text=True, timeout=660)
    finally:
        try:
            os.remove(payload_path)
        except OSError:
            pass
    out = r.stdout
    status = None
    body = out
    if "\nHTTP-STATUS " in out:
        body, tail = out.rsplit("\nHTTP-STATUS ", 1)
        try:
            status = int(tail.strip().split()[0])
        except Exception:
            status = None
    if r.returncode != 0 or status is None:
        print("CURL-FAIL rc=%s status=%s stderr-tail=%s" % (r.returncode, status, r.stderr[-500:]))
        print("BODY-TAIL " + body[-500:])
        with open(out_path, "w") as f:
            f.write("CURL-FAIL rc=%s status=%s\n%s\n" % (r.returncode, status, body))
        sys.exit(5)
    print("HTTP-STATUS %s body-chars=%d" % (status, len(body)))
    with open(out_path, "w") as f:
        f.write(body)
    if status in (429, 401, 403):
        print("BODY-TAIL " + body[-500:])
        sys.exit(3)
    if status != 200:
        print("BODY-TAIL " + body[-500:])
        sys.exit(4)
    try:
        data = json.loads(body)
        msg = data["choices"][0]["message"]
        txt = msg.get("content") or msg.get("reasoning_content") or msg.get("reasoning") or ""
        usage = data.get("usage", {})
        print("USAGE %s" % json.dumps(usage))
        print("VERDICT-EXTRACT:")
        print(txt[:6000])
    except Exception as e:
        print("PARSE-FAIL %s" % e)
if __name__ == "__main__":
    main()
