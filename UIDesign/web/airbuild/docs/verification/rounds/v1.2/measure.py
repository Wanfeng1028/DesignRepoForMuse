import sys
from PIL import Image

R = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/docs/verification/rounds/v1.2/'
P = R + 'probes/'

def px(im, x, y):
    return im.getpixel((x, y))

def patch(im, x, y, n=5):
    s = [0, 0, 0]; c = 0
    for dy in range(n):
        for dx in range(n):
            r, g, b = im.getpixel((x + dx, y + dy))[:3]
            s[0] += r; s[1] += g; s[2] += b; c += 1
    return tuple(round(v / c) for v in s)

def rowprofile(im, x0, x1, y0, y1, thresh=120):
    """dark-pixel row counts in region; returns list of (y, count)."""
    W, H = im.size
    x0, x1 = max(0, x0), min(W - 1, x1)
    y0, y1 = max(0, y0), min(H - 1, y1)
    out = []
    for y in range(y0, y1 + 1):
        c = 0
        for x in range(x0, x1 + 1):
            r, g, b = im.getpixel((x, y))[:3]
            if r < thresh and g < thresh and b < thresh:
                c += 1
        if c:
            out.append((y, c))
    return out

def runs(rows):
    """group consecutive y into (y0,y1,maxcount)."""
    if not rows:
        return []
    groups = []
    s = rows[0][0]; prev = rows[0][0]; mx = rows[0][1]
    for y, c in rows[1:]:
        if y == prev + 1:
            mx = max(mx, c)
        else:
            groups.append((s, prev, mx)); s = y; mx = c
        prev = y
    groups.append((s, prev, mx))
    return groups

def near(im, x0, x1, y0, y1, target, tol=30):
    W, H = im.size
    x0, x1 = max(0, x0), min(W - 1, x1)
    y0, y1 = max(0, y0), min(H - 1, y1)
    hits = []
    for y in range(y0, y1 + 1):
        for x in range(x0, x1 + 1):
            r, g, b = im.getpixel((x, y))[:3]
            if abs(r - target[0]) <= tol and abs(g - target[1]) <= tol and abs(b - target[2]) <= tol:
                hits.append((x, y))
    return hits

def bbox(hits):
    xs = [h[0] for h in hits]; ys = [h[1] for h in hits]
    return (min(xs), min(ys), max(xs), max(ys), len(hits))

im = Image.open(R + 'window-main.png').convert('RGB')
print('== window-main size', im.size)
print('F01 body per-row counts x250-500 y85-112:', rowprofile(im, 250, 500, 85, 112))
print('F02 author per-row counts x250-500 y55-75:', rowprofile(im, 250, 500, 55, 75))
print('F03 sidebar rows x10-190 y150-330 (name/status/title runs):', runs(rowprofile(im, 10, 190, 150, 330))[:40])
print('F03 sidebar group-title rows x10-190 y60-170:', runs(rowprofile(im, 10, 190, 60, 170))[:20])
print('F04 tab label per-row counts x900-1100 y5-35:', rowprofile(im, 900, 1100, 5, 35))
print('F04 phone status per-row counts x830-1070 y88-125:', rowprofile(im, 830, 1070, 88, 125))
print('F04 phone appbar per-row counts x830-1070 y120-175:', rowprofile(im, 830, 1070, 120, 175))
print('F04 phone feed-name per-row counts x860-1070 y300-420:', rowprofile(im, 860, 1070, 300, 420))
g = near(im, 0, 198, 150, 660, (46, 203, 112), 40)
print('C09 green-dot hits bbox (x0,y0,x1,y1,n):', bbox(g) if g else 'NONE')
if g:
    xs = sorted(set(h[0] for h in g)); ys = sorted(set(h[1] for h in g))
    print('C09 sample patch at first cluster:', patch(im, g[0][0] - 2, g[0][1] - 2))
    # cluster dots by y bands
    bands = {}
    for x, y in g:
        bands.setdefault(y // 12, []).append((x, y))
    print('C09 dot bands (y//12 -> n, x-range):', {k: (len(v), min(a for a, _ in v), max(a for a, _ in v)) for k, v in sorted(bands.items())})
a = near(im, 205, 260, 620, 665, (237, 237, 235), 12)
print('B04 attach-btn #ededeb bbox:', bbox(a) if a else 'NONE')
print('B04 attach patch:', patch(im, 216, 638) if a else 'n/a')
print('B05 footer buttons: scan sidebar bottom y580-668 for non-sidebar-bg pixels')
sb = []
for y in range(580, 668):
    for x in range(0, 198):
        r, gg, b = im.getpixel((x, y))[:3]
        if abs(r - 225) > 18 or abs(gg - 227) > 18 or abs(b - 225) > 18:
            sb.append((x, y))
print('B05 bottom-band non-bg bbox:', bbox(sb) if sb else 'NONE')
print('B02 capsule diagonal profile (x,y,rgb) from (150,12) to (95,32):')
for t in [0, 0.2, 0.4, 0.6, 0.8, 1.0]:
    x = round(150 - 55 * t); y = round(12 + 20 * t)
    print('  ', x, y, px(im, x, y))
print('B09 capsule top-edge vs centre patches:', patch(im, 110, 9, 3), patch(im, 110, 20, 3), patch(im, 110, 31, 3))
print('P04 titlebar tint row y20: Hourtown tint #d9ecdc hits x-range:')
t = near(im, 190, 1200, 8, 34, (217, 236, 220), 14)
print('  main:', bbox(t) if t else 'NONE')
imS = Image.open(R + 'window-sidebar-collapsed.png').convert('RGB')
t = near(imS, 0, 1200, 8, 34, (217, 236, 220), 14)
print('  sidebar-collapsed:', bbox(t) if t else 'NONE')
imP = Image.open(R + 'window-preview-collapsed.png').convert('RGB')
t = near(imP, 190, 1200, 8, 34, (217, 236, 220), 14)
print('  preview-collapsed:', bbox(t) if t else 'NONE')
print('S05 phone frame: grey #d8d8d6 bbox in x800-1100 y80-620:')
fr = near(im, 800, 1100, 80, 620, (216, 216, 214), 10)
print('  ', bbox(fr) if fr else 'NONE')
print('A03 feed avatar bg Ato #cdeed9 bbox in phone feed area x820-1080 y300-420:')
fa = near(im, 820, 1080, 300, 420, (205, 238, 217), 14)
print('  ', bbox(fa) if fa else 'NONE')
print('A03 feed avatar bg Pluso #cdeaff bbox same area:')
fp = near(im, 820, 1080, 300, 420, (205, 234, 255), 14)
print('  ', bbox(fp) if fp else 'NONE')
imT = Image.open(P + 'window-main-twotabs.png').convert('RGB')
print('== twotabs size', imT.size)
print('C10/S13 tab bar rows x700-1200 y0-40 dark profile:', runs(rowprofile(imT, 700, 1200, 0, 40))[:30])
tab = near(imT, 700, 1200, 0, 40, (247, 247, 245), 6)
print('C10 non-active tab #f7f7f5 bbox:', bbox(tab) if tab else 'NONE')
print('S13 active tab region: look for tab button area rows with iphone icon dark pixels')
imD = Image.open(P + 'window-main-darkbg.png').convert('RGB')
print('== darkbg size', imD.size)
print('S15 corner: first non-dark pixels per row y0-25 (window top-left corner):')
for y in range(0, 26):
    xs = [x for x in range(0, 60) if sum(imD.getpixel((x, y))[:3]) > 200]
    print('  y', y, 'first-x', min(xs) if xs else None)
imSt = Image.open(P + 'window-main-stripes.png').convert('RGB')
print('== stripes size', imSt.size)
print('B08 stripe contrast: sample row y100 inside window x250-450 vs page strip pattern (window bg area):')
row = [imSt.getpixel((x, 100))[0] for x in range(250, 450, 4)]
print('  inside-window row R samples min/max:', min(row), max(row))
imH = Image.open(P + 'window-main-hovertile.png').convert('RGB')
print('B11 hovertile: Hands Time tile area patch (tile1 x~15-70 y~85-135):', patch(imH, 30, 105))
imH2 = Image.open(P + 'window-main-hoverrow.png').convert('RGB')
print('B11 hoverrow: Colo row area patch:', patch(imH2, 60, 300))
print('B11 baseline same patches on window-main:', patch(im, 30, 105), patch(im, 60, 300))
