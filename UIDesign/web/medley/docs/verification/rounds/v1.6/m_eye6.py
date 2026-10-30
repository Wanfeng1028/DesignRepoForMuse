from PIL import Image
import os
ORIG = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
pr = Image.open(os.path.join(ORIG, "hd5-pricing.jpg")).convert("RGB")
def lightbands(x, y0, y1, th=360, minlen=2):
    bands = []; cur = None
    for y in range(y0, y1):
        light = sum(pr.getpixel((x,y))) > th
        if light and cur is None: cur = y
        if not light and cur is not None:
            if y-cur >= minlen: bands.append((cur, y-1))
            cur = None
    return bands
print("Lite col x200 (Lite text) y470..540:", lightbands(200, 470, 540))
print("Lite col x520 (price right) y470..540:", lightbands(520, 470, 540))
print("Lite col x300 y470..540:", lightbands(300, 470, 540))
print("Pro card col x200 y555..820:", lightbands(200, 555, 820))
print("Pro card col x480 y555..820:", lightbands(480, 555, 820))
print("Pro+ col x200 y860..940:", lightbands(200, 860, 940))
print("Pro+ col x520 y860..940:", lightbands(520, 860, 940))
print("CTA top: col x300 y930..960 light bands:", lightbands(300, 930, 960))
print("Seg bottom / Lite top: col x300 y430..480 light bands:", lightbands(300, 430, 480))
lg = Image.open(os.path.join(ORIG, "cn4-language.jpg")).convert("RGB")
print("language rows: per-row dark counts x60..400:")
rows = []
for y in range(100, 1150):
    c = sum(1 for x in range(60, 400) if sum(lg.getpixel((x,y))) < 300)
    rows.append(c)
# group rows with count>15 into lines
lines = []; cur = None
for i, c in enumerate(rows):
    y = 100+i
    if c > 15 and cur is None: cur = y
    if c <= 15 and cur is not None:
        if y-cur >= 4: lines.append((cur, y-1))
        cur = None
print("  text lines:", lines)
