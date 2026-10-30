from PIL import Image
import os
REF = os.path.expanduser('~/workspace/airbuild-refs/appstore')
def lum(px):
    return 0.299*px[0]+0.587*px[1]+0.114*px[2]
P03 = os.path.join(REF, 'iphone-03-build-with-your-team.jpg')
im = Image.open(P03).convert('RGB')
# Bubble left/right edges on a body line row y=1420 (between text lines? use y=1365 mid-line: text ink present; use y=1345 gap row between L1/L2)
for y in [1345, 1390, 1440]:
    # find long near-white runs (bubble white 255 vs canvas 244: use >250)
    runs = []
    s = None
    for x in range(150, 1173):
        w = lum(im.getpixel((x, y))) > 250
        if w and s is None: s = x
        if not w and s is not None:
            if x - s > 40: runs.append((s, x-1))
            s = None
    print('iphone-03 row', y, 'white runs >40:', runs)
# Bubble top edge: column x=700 (inside bubble, between author and L1): lum by y 1250..1320
print('iphone-03 col x=700 lum y1250..1320 step5:', [(y, round(lum(im.getpixel((700, y))))) for y in range(1250, 1321, 5)])
# Task card: title row y? task card below Ampo bubble, approx y 2400..2700; find white runs row y=2500
for y in [2450, 2550]:
    runs = []
    s = None
    for x in range(100, 1173):
        w = lum(im.getpixel((x, y))) > 250
        if w and s is None: s = x
        if not w and s is not None:
            if x - s > 40: runs.append((s, x-1))
            s = None
    print('iphone-03 task row', y, 'white runs:', runs)
# File card row y=1780 (file card band): white runs
for y in [1740, 1800]:
    runs = []
    s = None
    for x in range(100, 1173):
        w = lum(im.getpixel((x, y))) > 250
        if w and s is None: s = x
        if not w and s is not None:
            if x - s > 40: runs.append((s, x-1))
            s = None
    print('iphone-03 file row', y, 'white runs:', runs)
