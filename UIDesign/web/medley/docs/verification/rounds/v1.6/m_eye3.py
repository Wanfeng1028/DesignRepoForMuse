from PIL import Image
import os
ORIG = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
cr = Image.open(os.path.join(ORIG, "hd5-credits.jpg")).convert("RGB")
print("credits bg grid:")
for (x,y) in [(100,200),(300,200),(100,450),(300,450),(100,600),(100,900),(100,1150),(300,900),(500,1150)]:
    print(" ", (x,y), cr.getpixel((x,y)))
# 30 bars: centers 60 + i*15.6, scan y540..800
def isbar(px):
    r,g,b = px; return (max(r,g,b)-min(r,g,b)) > 25 and sum((r,g,b)) < 700
print("bars (center x, top y, bottom y, height CSS):")
for i in range(30):
    cx = round(60 + i*15.6)
    top = None; bot = None
    for y in range(540, 800):
        if isbar(cr.getpixel((cx,y))):
            if top is None: top = y
            bot = y
    h = (bot-top+1)/1.446 if top else None
    print(f"  bar{i} cx={cx} top={top} bot={bot} h={h:.1f}" if top else f"  bar{i} cx={cx} none")
pr = Image.open(os.path.join(ORIG, "hd5-pricing.jpg")).convert("RGB")
print("badge col x250 y585..615:")
for y in range(585, 616):
    print("  y", y, pr.getpixel((250,y)))
dr = Image.open(os.path.join(ORIG, "ov-drawer.jpg")).convert("RGB")
print("drawer bg samples:")
for (x,y) in [(100,300),(200,500),(100,1000),(300,1200),(150,700)]:
    print(" ", (x,y), dr.getpixel((x,y)))
# avatar disc: region x0..150 y1250..1450, find dark-disc pixels (fill ~40-50?) vs bg ~17-30
# scan col x=60 y1250..1450 for disc band
vals = []
for y in range(1250, 1460):
    vals.append((y, dr.getpixel((60,y))))
print("drawer col x60 y1250..1460 (changes only):")
prev = None
for y,v in vals:
    if v != prev: print("  y", y, v); prev = v
