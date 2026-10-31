from PIL import Image
import statistics as st, os
V17 = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/v1.7"
V16 = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/v1.6"
def med(im, box):
    c = im.crop(box).convert("RGB")
    px = list(c.getdata())
    return tuple(round(st.median([p[i] for p in px])) for i in range(3))
def stdv(im, box):
    c = im.crop(box).convert("RGB").convert("L")
    px = list(c.getdata())
    return round(st.pstdev(px), 1)
print("== panel sizes v1.7 vs v1.6 ==")
for f in ["panel-welcome.png","panel-home-en.png","panel-home-cn.png","panel-chat-lisbon.png","panel-pricing.png","panel-credits.png","panel-picker-a.png","panel-chat-info.png","panel-drawer.png","panel-suspended.png","panel-language.png","panel-agent-team.png"]:
    a = Image.open(os.path.join(V17,f)); b = Image.open(os.path.join(V16,f))
    print(f, "v1.7", a.size, "v1.6", b.size, "SAME" if a.size==b.size else "DIFF")
print("== welcome zones (v1.7 vs v1.6 medians) ==")
for name, box in [("base-top", (250,20,350,60)), ("blue-halo", (420,120,520,200)), ("warm-glow", (40,300,140,380)), ("green-glow", (420,400,540,470))]:
    a = med(Image.open(V17+"/panel-welcome.png"), box)
    b = med(Image.open(V16+"/panel-welcome.png"), box)
    print(name, "v1.7", a, "v1.6", b)
print("== glass surfaces ==")
ci = Image.open(V17+"/panel-chat-info.png")
print("chatinfo sheet interior sample:", med(ci, (100,120,200,160)))
he = Image.open(V17+"/panel-home-en.png"); he16 = Image.open(V16+"/panel-home-en.png")
print("home-en size", he.size)
# composer bar is at bottom of home-en panel: sample interior strip away from text/icons
print("home-en composer interior v1.7:", med(he, (200, he.size[1]-40, 300, he.size[1]-20)), "v1.6:", med(he16, (200, he16.size[1]-40, 300, he16.size[1]-20)))
w = Image.open(V17+"/panel-welcome.png"); w16 = Image.open(V16+"/panel-welcome.png")
print("welcome try-button interior std v1.7:", stdv(w, (120, w.size[1]-110, 440, w.size[1]-70)), "v1.6:", stdv(w16, (120, w16.size[1]-110, 440, w16.size[1]-70)))
print("== font cap bands (post-fix SF renders) ==")
def band(im, x0, x1, y0, y1, t, dark_bg=True):
    px = im.convert("RGB").load()
    rows = []
    for y in range(y0, y1):
        n = 0
        for x in range(x0, x1):
            r,g,b = px[x,y]
            v = (r+g+b)/3
            if (v > t) if dark_bg else (v < t): n += 1
        if n > 3: rows.append(y)
    if not rows: return None
    return (rows[0], rows[-1], rows[-1]-rows[0]+1)
wt = Image.open(V17+"/panel-welcome.png")
print("welcome title band (bright on dark):", band(wt, 20, 400, 150, 260, 150, True))
hg = Image.open(V17+"/panel-home-en.png")
print("home greeting band (dark on light):", band(hg, 20, 400, 150, 300, 120, False))
print("home suggestion text band:", band(hg, 60, 400, 300, 450, 120, False))
