from PIL import Image
import os, statistics
ORIG = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
dr = Image.open(os.path.join(ORIG, "ov-drawer.jpg")).convert("RGB")
print("drawer bg grid medians:")
for (x,y) in [(60,250),(120,350),(200,450),(60,550),(120,650),(200,750),(60,850),(120,950),(200,1050),(60,1150)]:
    vals = [dr.getpixel((xx,yy)) for xx in range(x-10,x+10,3) for yy in range(y-10,y+10,3)]
    med = tuple(sorted([v[i] for v in vals])[len(vals)//2] for i in range(3))
    print("  ", (x,y), med)
pr = Image.open(os.path.join(ORIG, "hd5-pricing.jpg")).convert("RGB")
print("badge rows y596..606 x215..282 values (step 4):")
for y in [596,598,600,602,604]:
    print("  y", y, [pr.getpixel((x,y)) for x in range(215, 283, 8)])
print("badge fill median (y598-602, x215-282, excluding dark text <80):")
vals = []
for y in range(597, 604):
    for x in range(215, 283):
        s = sum(pr.getpixel((x,y)))
        if s > 240: vals.append(pr.getpixel((x,y)))
print("  n=", len(vals), "median=", tuple(sorted([v[i] for v in vals])[len(vals)//2] for i in range(3)) if vals else None)
lg = Image.open(os.path.join(ORIG, "cn4-language.jpg")).convert("RGB")
print("language col x=120 dark bands (sum<300, height>=6) y100..1150:")
bands = []; cur = None
for y in range(100, 1150):
    dark = sum(lg.getpixel((120,y))) < 300
    if dark and cur is None: cur = y
    if not dark and cur is not None:
        if y-cur >= 6: bands.append((cur, y-1))
        cur = None
print("  ", bands)
pr2 = pr
print("pricing Lite row: radio bbox + price bands:")
# Lite radio: scan region x95..160 y460..540 for ring pixels (bright >120 on dark bg)
ring = [(x,y) for y in range(460, 545) for x in range(95, 165) if sum(pr2.getpixel((x,y))) > 360]
if ring:
    xs = [p[0] for p in ring]; ys = [p[1] for p in ring]
    print("  Lite ring bbox x", min(xs), max(xs), "y", min(ys), max(ys))
# Lite price text: col x=450 dark? price text is light on dark: scan col x=480 y460..540 for light bands
bands2 = []; cur = None
for y in range(460, 545):
    light = sum(pr2.getpixel((480,y))) > 360
    if light and cur is None: cur = y
    if not light and cur is not None:
        if y-cur >= 3: bands2.append((cur, y-1))
        cur = None
print("  Lite price col x480 light bands:", bands2)
print("Pro+ row: radio ring region x95..165 y840..930:")
ring = [(x,y) for y in range(840, 935) for x in range(95, 165) if sum(pr2.getpixel((x,y))) > 360]
if ring:
    xs = [p[0] for p in ring]; ys = [p[1] for p in ring]
    print("  Pro+ ring bbox x", min(xs), max(xs), "y", min(ys), max(ys))
bands3 = []; cur = None
for y in range(840, 935):
    light = sum(pr2.getpixel((480,y))) > 360
    if light and cur is None: cur = y
    if not light and cur is not None:
        if y-cur >= 3: bands3.append((cur, y-1))
        cur = None
print("  Pro+ price col x480 light bands:", bands3)
