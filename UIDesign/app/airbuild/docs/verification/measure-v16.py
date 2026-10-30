from PIL import Image
import os
D = os.path.expanduser('~/workspace/DesignRepoForMuse/UIDesign/app/airbuild/docs/verification/rounds/v1.6')
def load(n):
    return Image.open(os.path.join(D, n)).convert('RGB')
def is_blue(px):
    r, g, b = px[:3]
    return b > 180 and b - r > 80 and r < 80
def is_dark(px):
    return px[0] < 150 and px[1] < 150 and px[2] < 150
def bbox_blue(im, x0=0, x1=390, y0=0, y1=844):
    xs, ys = [], []
    for y in range(y0, y1):
        for x in range(x0, x1):
            if is_blue(im.getpixel((x, y))):
                xs.append(x); ys.append(y)
    return (min(xs), max(xs), min(ys), max(ys)) if xs else None
# S2 briefing send button: blue region in bottom area y>700
im = load('briefing-390.png')
print('S2 briefing blue bottom bbox', bbox_blue(im, y0=700))
# S3 first card radius: white region top-left arc: for x in 20..120, first y where pixel near-white
def is_white(px):
    return px[0] > 240 and px[1] > 240 and px[2] > 240
for x in [26, 30, 35, 40, 50, 60, 80]:
    ys = [y for y in range(150, 300) if is_white(im.getpixel((x, y)))]
    print('S3 card col x', x, 'first white y', min(ys) if ys else None)
# S4 second card visible: row y=260 white runs
for y in [250, 260, 270]:
    runs = []
    cur = None
    for x in range(390):
        w = is_white(im.getpixel((x, y)))
        if w and cur is None: cur = x
        if not w and cur is not None: runs.append((cur, x - 1)); cur = None
    print('S4 row', y, 'white runs', runs)
# S1 draft cover: dark gradient region
im = load('draft-390.png')
xs, ys = [], []
for y in range(300, 844):
    for x in range(390):
        px = im.getpixel((x, y))
        if px[0] < 90 and px[1] < 100 and px[2] < 95:
            xs.append(x); ys.append(y)
print('S1 draft dark bbox (all)', (min(xs), max(xs), min(ys), max(ys)) if xs else None)
for y in [430, 450, 500, 550]:
    xs2 = [x for x in range(390) if im.getpixel((x, y))[0] < 90 and im.getpixel((x, y))[1] < 100]
    print('S1 draft row', y, 'dark x', (min(xs2), max(xs2)) if xs2 else None)
for x in [280, 300]:
    ys2 = [y for y in range(300, 844) if im.getpixel((x, y))[0] < 90 and im.getpixel((x, y))[1] < 100]
    print('S1 draft col', x, 'dark y', (min(ys2), max(ys2)) if ys2 else None)
# P2 draft last bubble blue rows
print('P2 draft blue bbox', bbox_blue(im))
for y in range(780, 844, 5):
    xs3 = [x for x in range(390) if is_blue(im.getpixel((x, y)))]
    print('P2 draft row', y, 'blue x', (min(xs3), max(xs3)) if xs3 else None)
# P1 chat last bubble
im = load('chat-390.png')
print('P1 chat blue bbox', bbox_blue(im))
# F1/F2: dark text clusters in first agent message: scan x 70..370, group dark rows
rows = {}
for y in range(100, 320):
    c = sum(1 for x in range(70, 370) if is_dark(im.getpixel((x, y))))
    if c >= 3:
        rows[y] = c
groups = []
for y in sorted(rows):
    if groups and y - groups[-1][-1] <= 2:
        groups[-1].append(y)
    else:
        groups.append([y])
print('F chat dark row groups (y ranges, first 8):', [(g[0], g[-1], g[-1]-g[0]+1) for g in groups[:8]])
