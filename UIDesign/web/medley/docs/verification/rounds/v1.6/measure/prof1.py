import sys
from PIL import Image
import collections

def load(p):
    im = Image.open(p).convert("RGB")
    return im

def edge_report(im, name):
    w, h = im.size
    print(f"== {name} {w}x{h}")
    for y in [5, 50, h//2, h-10]:
        row = [im.getpixel((x, y)) for x in (0, 1, 2, w//2, w-3, w-2, w-1)]
        print("  y", y, row)

def col_profile(im, x, y0, y1, label):
    print(f"-- col x={x} y{y0}..{y1} {label}")
    prev = None; run = 0; start = y0
    for y in range(y0, y1):
        px = im.getpixel((x, y))
        if px != prev:
            if prev is not None and run >= 2:
                print(f"   y{start}..{y-1} ({run}px) {prev}")
            prev = px; start = y; run = 1
        else:
            run += 1
    if run >= 2:
        print(f"   y{start}..{y1-1} ({run}px) {prev}")

def row_profile(im, y, x0, x1, label):
    print(f"-- row y={y} x{x0}..{x1} {label}")
    prev = None; run = 0; start = x0
    for x in range(x0, x1):
        px = im.getpixel((x, y))
        if px != prev:
            if prev is not None and run >= 2:
                print(f"   x{start}..{x-1} ({run}px) {prev}")
            prev = px; start = x; run = 1
        else:
            run += 1
    if run >= 2:
        print(f"   x{start}..{x1-1} ({run}px) {prev}")

def bbox_dark(im, x0, x1, y0, y1, thresh, label):
    pts = []
    for y in range(y0, y1):
        for x in range(x0, x1):
            r, g, b = im.getpixel((x, y))
            if max(r, g, b) < thresh:
                pts.append((x, y))
    if pts:
        xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
        print(f"-- {label}: bbox x{min(xs)}..{max(xs)} y{min(ys)}..{max(ys)} n={len(pts)}")
    else:
        print(f"-- {label}: none")

B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
home = load(B + "hd5-home-en.jpg")
edge_report(home, "hd5-home-en")
lis = load(B + "hd5-lisbon.jpg")
edge_report(lis, "hd5-lisbon")
wel = load(B + "cn4-welcome-cn.jpg")
edge_report(wel, "cn4-welcome")
