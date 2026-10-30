from PIL import Image
import os
ORIG = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
im = Image.open(os.path.join(ORIG, "hd5-lisbon.jpg")).convert("RGB")
def isfill(px):
    r,g,b = px
    return 25 <= r <= 45 and 30 <= g <= 50 and 40 <= b <= 60
# user bubble: find rows y80..260, rightmost fill x (bubble right edge), leftmost fill x
print("row: leftmost fill, rightmost fill (y80..260 step 4):")
for y in range(80, 261, 4):
    xs = [x for x in range(80, 580) if isfill(im.getpixel((x,y)))]
    if xs: print(" y", y, min(xs), max(xs))
