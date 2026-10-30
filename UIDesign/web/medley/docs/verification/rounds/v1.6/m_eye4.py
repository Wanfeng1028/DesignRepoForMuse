from PIL import Image
import os
ORIG = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
cr = Image.open(os.path.join(ORIG, "hd5-credits.jpg")).convert("RGB")
def isbar(px):
    r,g,b = px; return (max(r,g,b)-min(r,g,b)) > 25 and sum((r,g,b)) < 750
print("30 bars: center, top, bottom, height CSS (baseline ~715):")
for i in range(30):
    cx = round(72 + i*15.6)
    top = None; bot = None
    for y in range(500, 730):
        if isbar(cr.getpixel((cx,y))):
            if top is None: top = y
            bot = y
    print(f"  bar{i} cx={cx} top={top} bot={bot} h={(bot-top+1)/1.446:.1f}" if top else f"  bar{i} cx={cx} none")
print("card top edge: rows y420..520, white extent (sum>750):")
for y in range(420, 521, 4):
    xs = [x for x in range(0, 600) if sum(cr.getpixel((x,y))) > 750]
    if xs: print("  y", y, "extent", (min(xs), max(xs)), "count", len(xs))
print("card bottom edge: rows y760..800:")
for y in range(760, 801, 4):
    xs = [x for x in range(0, 600) if sum(cr.getpixel((x,y))) > 750]
    if xs: print("  y", y, "extent", (min(xs), max(xs)), "count", len(xs))
dr = Image.open(os.path.join(ORIG, "ov-drawer.jpg")).convert("RGB")
print("avatar row y1405 x0..120:")
print("  ", [(x, dr.getpixel((x,1405))) for x in range(0, 121, 4)])
print("avatar col x40 y1360..1450 (changes):")
prev = None
for y in range(1360, 1451):
    v = dr.getpixel((40,y))
    if v != prev: print("  y", y, v); prev = v
print("drawer bg grid (medians per cell 20x20 around point):")
import statistics
for (x,y) in [(60,250),(120,350),(200,450),(60,550),(120,650),(200,750),(60,850),(120,950),(200,1050),(60,1150)]:
    vals = [dr.getpixel((xx,yy)) for xx in range(x-10,x+10,3) for yy in range(y-10,y+10,3)]
    med = tuple(sorted([v[i] for v in vals])[len(vals)//2] for i in range(3))
    print("  ", (x,y), med)
