import sys
from PIL import Image

R4 = 'rounds/round4/'
REF = '../../../../docs/references/medley/'

def load(p):
    im = Image.open(p).convert('RGB')
    print(f'== {p} size={im.size}')
    return im

def px(im, x, y):
    return im.getpixel((x, y))

def patch(im, x, y, r=2):
    vals = []
    for dy in range(-r, r+1):
        for dx in range(-r, r+1):
            vals.append(im.getpixel((x+dx, y+dy)))
    n = len(vals)
    return tuple(sum(v[i] for v in vals)//n for i in range(3))

def clusters(im, box, pred, minsize=3):
    # simple flood fill on predicate, returns bboxes
    x0, y0, x1, y1 = box
    seen = set()
    out = []
    W = im.size[0]
    pix = im.load()
    for y in range(y0, y1):
        for x in range(x0, x1):
            if (x, y) in seen or not pred(pix[x, y]):
                continue
            stack = [(x, y)]
            seen.add((x, y))
            xs, ys = [], []
            while stack:
                cx, cy = stack.pop()
                xs.append(cx); ys.append(cy)
                for nx, ny in ((cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)):
                    if x0 <= nx < x1 and y0 <= ny < y1 and (nx, ny) not in seen and pred(pix[nx, ny]):
                        seen.add((nx, ny)); stack.append((nx, ny))
            if len(xs) >= minsize:
                out.append((min(xs), min(ys), max(xs), max(ys), len(xs)))
    return sorted(out, key=lambda b: (b[1], b[0]))

def dark(p, t=100):
    return p[0] < t and p[1] < t and p[2] < t

def orange(p):
    return p[0] > 200 and 60 < p[1] < 160 and p[2] < 90

def sat_hi(p, t=40):
    mx, mn = max(p), min(p)
    return (mx - mn) > t

which = sys.argv[1] if len(sys.argv) > 1 else 'all'
import os
_RUN = sys.argv[1:]

if which in ('all', 't1'):
    im = load(R4 + 'orig-welcome.jpg')
    # Google button band y946-1019; G badge left inside button
    cl = clusters(im, (30, 940, 140, 1025), lambda p: dark(p, 110), 2)
    print('T1 dark clusters (G letter?) in button-left zone:', cl[:10])
    # badge ring: greyish pixels 200-230 all channels, in same zone
    cl2 = clusters(im, (30, 940, 140, 1025), lambda p: 190 < p[0] < 235 and 190 < p[1] < 235 and 190 < p[2] < 235, 3)
    print('T1 grey-ring clusters:', cl2[:10])

if which in ('all', 't2'):
    im = load(R4 + 'orig-welcome.jpg')
    # Try button below Google button: scan column x60 and x45 for non-bg rows
    for col in (45, 60, 200):
        rows = []
        prev = None
        for y in range(1010, 1245):
            p = im.getpixel((col, y))
            bright = p[0] > 180
            if bright != prev:
                rows.append((y, p, 'bright' if bright else 'dark'))
                prev = bright
        print(f'T2 col x={col} bright/dark transitions:', rows[:20])

if which in ('all', 't3'):
    im = load(R4 + 'orig-lisbon-en.jpg')
    cl = clusters(im, (0, 250, 420, 560), lambda p: 35 < p[0] < 70 and 35 < p[1] < 70 and 35 < p[2] < 70, 4)
    print('T3 dark-row clusters (cite badges?) bullets zone:', cl)

if which in ('all', 't4'):
    im = load(R4 + 'orig-lisbon-en.jpg')
    cl = clusters(im, (0, 550, 420, 890), orange, 3)
    print('T4 orange clusters lower half (end dot?):', cl)
    for b in cl:
        cx, cy = (b[0]+b[2])//2, (b[1]+b[3])//2
        print('  T4 patch at center', (cx, cy), patch(im, cx, cy))

if which in ('all', 't5'):
    im = load(R4 + 'orig-lisbon-cn.jpg')
    cl = clusters(im, (0, 900, 585, 1245), orange, 3)
    print('T5 orange clusters lower half (end dot?):', cl)
    for b in cl:
        cx, cy = (b[0]+b[2])//2, (b[1]+b[3])//2
        print('  T5 patch at center', (cx, cy), patch(im, cx, cy))

if which in ('all', 't6'):
    im = load(R4 + 'orig-home-cn.jpg')
    # top bar rows: print mean brightness per row y50-160 to find control band
    for y in range(50, 170, 5):
        row = [im.getpixel((x, y)) for x in range(20, 560, 8)]
        br = sum(sum(p)//3 for p in row)//len(row)
        print(f'T6 row y={y} meanbright={br}')
    # bright control track: pixels >240 in top zone
    cl = clusters(im, (100, 50, 480, 170), lambda p: p[0] > 240 and p[1] > 240 and p[2] > 240, 20)
    print('T6 bright clusters top zone (tabs track?):', cl[:8])

if which in ('all', 't7'):
    im = load(REF + 'medley-5-screens-hd.jpg')
    # home-en panel x560-940, top pill row y~90-190
    cl = clusters(im, (560, 80, 940, 200), lambda p: sat_hi(p, 45), 2)
    print('T7 saturated clusters home-en top (Auto pill dots?):', cl[:20])
    for b in cl[:12]:
        cx, cy = (b[0]+b[2])//2, (b[1]+b[3])//2
        print('  T7 patch', (cx, cy), patch(im, cx, cy))

if which in ('all', 't8'):
    im = load(REF + 'medley-5-screens-hd.jpg')
    # credits panel x2065-2445; legend row: scan middle band y450-650 for saturated clusters
    cl = clusters(im, (2065, 400, 2445, 700), lambda p: sat_hi(p, 45), 2)
    print('T8 saturated clusters credits mid (legend dots?):', cl[:30])
    for b in cl[:20]:
        cx, cy = (b[0]+b[2])//2, (b[1]+b[3])//2
        print('  T8 patch', (cx, cy), patch(im, cx, cy))

if which in ('all', 't13'):
    im = load(REF + 'medley-5-screens-hd.jpg')
    # pricing panel x1595-1975; CTA bright pill near bottom y800-900
    cl = clusters(im, (1595, 780, 1975, 920), lambda p: p[0] > 225 and p[1] > 225 and p[2] > 230, 30)
    print('T13 bright clusters pricing bottom (CTA?):', cl[:8])
    # panel edges: dark bg columns
    for y in (100, 500, 850):
        xs = [x for x in range(1500, 2100) if sum(im.getpixel((x, y)))//3 < 60]
        print(f'T13 row y={y} dark run:', (min(xs), max(xs)) if xs else None)

if which in ('all', 't16'):
    im = load(R4 + 'orig-picker.jpg')
    # dark-pixel row bands across full width: rows with >8 dark px
    bands = []
    inband = False
    for y in range(0, 890):
        cnt = sum(1 for x in range(20, 410, 2) if dark(im.getpixel((x, y)), 110))
        if cnt >= 6 and not inband:
            start = y; inband = True
        elif cnt < 6 and inband:
            bands.append((start, y-1)); inband = False
    print('T16 dark row bands (text rows):', bands)
