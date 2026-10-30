from PIL import Image
import json
base = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/v1.5/measure/'
def hx(c): return '#%02X%02X%02X' % tuple(c)
def medstrip(im, fx0, fx1, fy, half=3):
    W,H = im.size; px = im.load()
    y0 = max(0, int(fy*H)-half); y1 = min(H, int(fy*H)+half)
    vals = []
    for y in range(y0, y1):
        for x in range(int(fx0*W), int(fx1*W)):
            vals.append(px[x,y])
    out = []
    for i in range(3):
        s = sorted(c[i] for c in vals); out.append(s[len(s)//2])
    return tuple(out)
w = Image.open(base+'render-welcome.png').convert('RGB')
print('welcome panel size', w.size)
W,H = w.size; px = w.load()
def at(fx, fy):
    c = px[int(fx*W), int(fy*H)]; print(f'  welcome ({fx},{fy}) -> {c} {hx(c)}'); return c
print('welcome samples (photo targets in parens):')
at(0.10, 0.15)  # base, target #0D0E10
at(0.85, 0.42)  # blue halo, target #23354B
at(0.90, 0.50)
at(0.70, 0.45)
at(0.16, 0.76)  # warm, target ~(74,43,30)
at(0.12, 0.85)
at(0.85, 0.97)  # green edge, target ~(44,77,68)
at(0.73, 0.97)  # green, target ~(24,55,49)
# cursor dot: brightest blue pixels
pts = []
for y in range(H):
    for x in range(W):
        c = px[x,y]
        if c[2] > 140 and c[2]-c[0] > 40: pts.append((c[2], x, y, c))
pts.sort(reverse=True)
print('cursor brightest (top 8):')
for p in pts[:8]: print(f'  {p[1]},{p[2]} {p[3]} {hx(p[3])}')
if pts:
    xs = [p[1] for p in pts]; ys = [p[2] for p in pts]
    print(f'cursor bright bbox x {min(xs)}..{max(xs)} y {min(ys)}..{max(ys)}')
# brand dots: header band y 0..60, saturated non-grey pixels clusters
print('header band saturated pixels (x,y,color):')
seen = []
for y in range(0, 70):
    for x in range(0, 120):
        c = px[x,y]
        if max(c)-min(c) >= 25 and max(c) > 60: seen.append((x,y,c))
for s in seen[::max(1,len(seen)//30)][:30]: print(f'  {s[0]},{s[1]} {s[2]} {hx(s[2])}')
h = Image.open(base+'render-home-en.png').convert('RGB')
print('home-en size', h.size)
print('home-en vertical medians (x 0.55..0.95 strips):')
for fy, tgt in [(0.05,'#F5F6F8'),(0.40,'#EFF3F4'),(0.60,'#E1EBEC'),(0.80,'#D2E5E3'),(0.95,'#D9E7E7')]:
    m = medstrip(h, 0.55, 0.95, fy); print(f'  fy={fy} median {m} {hx(m)} target {tgt}')
