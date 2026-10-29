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
           "sudo cat /etc/botsrouter/muse_pipeline_token.txt"]
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    if r.returncode != 0:
        print("TOKEN-FETCH-FAIL rc=%s stderr-tail=%s" % (r.returncode, r.stderr[-300:]))
        sys.exit(2)
    tok = r.stdout.strip()
    if not tok.startswith("sk-"):
        tok = "sk-" + tok
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
    render = sys.argv[2] if len(sys.argv) > 2 else os.path.join(BASE, "docs/verification/rounds/v1.1/window-main.png")
    token = fetch_token()
    print("token fetched: yes")
    import urllib.request
    prompt = (
        "You are a strict visual UI judge doing a 1:1 pixel-level comparison. "
        "Image 1 is OUR RENDER (a desktop app window recreation). "
        "Image 2 is the REAL ORIGINAL desktop photo crop (user photo, three-column desktop layout: left members column, middle chat, right service modules column). "
        "Image 3 is the REAL ORIGINAL iPad App Store screenshot (tablet chat room: left project/member columns, right chat thread with task card, file card, blue user bubbles). "
        "Compare Image 1 against Images 2 and 3 for layout, sizes, colors, typography, spacing, corner radii, icon shapes, and alignment. "
        "Desktop chat body text in Image 2 is blurry/unreadable, so do NOT judge desktop chat body wording; judge everything else. "
        "The bottom module bar in our render is a known adaptation (original has a right-side column instead) and avatar blob redraws are approximations: do NOT list those two as diffs. "
        "FIRST LINE of your answer MUST be exactly one of: 'VERDICT: CLEAN' or 'VERDICT: DIFFS: <numbered list of diff ids>'. "
        "After that first line, list every substantive difference, one per numbered item, each quantified: where it is, size in px, color hex, font size and weight, spacing, corner radius, icon shape, and alignment, plus what the original shows vs what the render shows. "
        "Do not write any reasoning, preamble, or thinking process before the VERDICT line. "
        "If there are no substantive differences besides the two known adaptations above, answer VERDICT: CLEAN and stop."
    )
    payload = {
        "model": "qiniu/conatus-free",
        "max_tokens": 6000,
        "temperature": 0,
        "messages": [{"role": "user", "content": [
            {"type": "text", "text": prompt},
            {"type": "image_url", "image_url": {"url": img_b64(render, 1200)}},
            {"type": "image_url", "image_url": {"url": img_b64(os.path.join(WS, "airbuild-refs/user-photo-chatroom-crop.jpg"), 1024)}},
            {"type": "image_url", "image_url": {"url": img_b64(os.path.join(WS, "airbuild-refs/appstore/ipad-01.jpg"), 800)}},
        ]}],
    }
    req = urllib.request.Request(
        "https://api.botsarena.tech/v1/chat/completions",
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json", "Authorization": "Bearer " + token},
        method="POST")
    try:
        with urllib.request.urlopen(req, timeout=600) as resp:
            body = resp.read().decode()
            status = resp.status
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        status = e.code
        print("HTTP-STATUS %s" % status)
        print("BODY-TAIL " + body[-500:])
        with open(out_path, "w") as f:
            f.write("HTTP-STATUS %s\n%s\n" % (status, body))
        sys.exit(3 if status == 429 else 4)
    print("HTTP-STATUS %s body-chars=%d" % (status, len(body)))
    with open(out_path, "w") as f:
        f.write(body)
    try:
        data = json.loads(body)
        txt = data["choices"][0]["message"].get("content") or data["choices"][0]["message"].get("reasoning_content") or ""
        print("VERDICT-EXTRACT:")
        print(txt[:4000])
    except Exception as e:
        print("PARSE-FAIL %s" % e)
if __name__ == "__main__":
    main()
