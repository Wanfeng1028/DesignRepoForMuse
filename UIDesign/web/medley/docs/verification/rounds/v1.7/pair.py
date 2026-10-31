from PIL import Image, ImageDraw
import os
HERE = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/v1.7"
ORIG = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
PAIRS = [
    ("welcome", "cn4-welcome-cn.jpg", (0,12,600,1346), "panel-welcome.png"),
    ("home-en", "hd5-home-en.jpg", (18,29,582,1280), "panel-home-en.png"),
    ("chat-lisbon", "hd5-lisbon.jpg", (85,95,556,1105), "panel-chat-lisbon.png"),
    ("pricing", "hd5-pricing.jpg", (18,30,582,1190), "panel-pricing.png"),
    ("credits", "hd5-credits.jpg", (15,29,580,1280), "panel-credits.png"),
    ("picker-a", "hd5-pickerA.jpg", (18,30,582,1270), "panel-picker-a.png"),
    ("chat-info", "ov-chatinfo.jpg", (10,20,650,1490), "panel-chat-info.png"),
    ("drawer", "ov-drawer.jpg", (10,20,650,1490), "panel-drawer.png"),
    ("suspended", "ov-suspended.jpg", (10,20,650,1490), "panel-suspended.png"),
    ("language", "cn4-language.jpg", (0,12,600,1346), "panel-language.png"),
    ("agent-team", "ov-agent.jpg", (10,20,650,1490), "panel-agent-team.png"),
]
W = 390
for name, of, box, rf in PAIRS:
    o = Image.open(os.path.join(ORIG, of)).convert("RGB").crop(box)
    r = Image.open(os.path.join(HERE, rf)).convert("RGB")
    o = o.resize((W, round(o.size[1]*W/o.size[0])), Image.LANCZOS)
    r = r.resize((W, round(r.size[1]*W/r.size[0])), Image.LANCZOS)
    H = max(o.size[1], r.size[1]) + 28
    canvas = Image.new("RGB", (W*2+16, H), (40,40,44))
    d = ImageDraw.Draw(canvas)
    d.text((8, 8), "ORIG " + of, fill=(255,255,255))
    d.text((W+24, 8), "RENDER " + rf, fill=(255,255,255))
    canvas.paste(o, (0, 28))
    canvas.paste(r, (W+16, 28))
    canvas.save(os.path.join(HERE, "sidebyside", "pair-" + name + ".png"))
    print("pair", name, "orig", o.size, "render", r.size)
# phone-chrome pair: photo-9 TL status zone (native) vs render chrome-dark bar.
# Native scales differ (collage, see CHANGELOG); comparison is by form, so the
# photo crop is resized to the render bar width and the caption says so.
photo = Image.open("/home/hatch/workspace/user/media_library/image/photo-9.jpg").convert("RGB")
oc = photo.crop((95, 100, 700, 175))
render = Image.open(os.path.join(HERE, "panel-phone-chrome.png")).convert("RGB")
bar = render.crop((0, 0, render.size[0], 64))
oc = oc.resize((390, round(oc.size[1]*390/oc.size[0])), Image.LANCZOS)
bar = bar.resize((390, round(bar.size[1]*390/bar.size[0])), Image.LANCZOS)
H = max(oc.size[1], bar.size[1]) + 28
canvas = Image.new("RGB", (390*2+16, H), (40,40,44))
d = ImageDraw.Draw(canvas)
d.text((8, 8), "ORIG photo-9 TL status (resized to 390; scales differ)", fill=(255,255,255))
d.text((390+24, 8), "RENDER chrome-dark bar", fill=(255,255,255))
canvas.paste(oc, (0, 28))
canvas.paste(bar, (390+16, 28))
canvas.save(os.path.join(HERE, "sidebyside", "pair-phone-chrome.png"))
print("pair phone-chrome", "orig", oc.size, "render", bar.size)
