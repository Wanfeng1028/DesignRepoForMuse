from PIL import Image
import os
ORIG = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
def px(p, x, y):
    im = Image.open(p).convert("RGB")
    return im.getpixel((x, y))
def show(p, box, name):
    im = Image.open(p).convert("RGB").crop(box)
    im = im.resize((im.size[0]*4, im.size[1]*4), Image.NEAREST)
    im.save(os.path.join("crops", name))
    print("crop", name, im.size)
# 1. pricing badge fill/text: Pro row y~565-590, x190-290
pr = os.path.join(ORIG, "hd5-pricing.jpg")
print("badge samples:")
for (x, y) in [(200,575),(230,578),(260,578),(200,585),(250,585),(215,570),(275,570)]:
    print(" ", (x,y), px(pr,x,y))
# badge text dark or light? scan row y=578 for dark pixels
im = Image.open(pr).convert("RGB")
dark = [x for x in range(180,300) if sum(im.getpixel((x,578))) < 200]
print("badge row y578 dark xs:", dark[:40])
# 2. credits chart card: col x=300 y540..820
cr = os.path.join(ORIG, "hd5-credits.jpg")
print("credits col x300:")
prev = None
for y in range(530, 830, 5):
    v = px(cr, 300, y)
    if v != prev: print("  y", y, v); prev = v
# bars: baseline? find bar tops: chart bars x centers ~? scan row y=700 for bar colors
print("credits row y700 xs with saturation (r-b>20 or g-b>20):")
row = []
for x in range(40, 560):
    r,g,b = px(cr, x, 700)
    if r-b > 15 or g-b > 15 or b-r > 15: row.append(x)
print("  ", row[:80])
