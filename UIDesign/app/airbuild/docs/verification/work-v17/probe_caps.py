from PIL import Image
import os
REF = os.path.expanduser('~/workspace/airbuild-refs/appstore')
SCALE03 = 390 / 1024.0
def lum(px):
    return 0.299*px[0]+0.587*px[1]+0.114*px[2]
def bbox(path, x0, x1, y0, y1, thr=140, label=''):
    im = Image.open(path).convert('RGB')
    xs, ys = [], []
    for y in range(y0, y1):
        for x in range(x0, x1):
            if lum(im.getpixel((x, y))) < thr:
                xs.append(x); ys.append(y)
    if not xs:
        print(label, 'NO INK'); return
    print(f"{label}: x {min(xs)}..{max(xs)} y {min(ys)}..{max(ys)} w {max(xs)-min(xs)+1} h {max(ys)-min(ys)+1}  (@390: h={(max(ys)-min(ys)+1)*SCALE03:.1f}px, cap->em={(max(ys)-min(ys)+1)*SCALE03/0.703:.1f}px)")
P03 = os.path.join(REF, 'iphone-03-build-with-your-team.jpg')
# Author line: scan full author row to find ink columns first
bbox(P03, 210, 560, 1205, 1265, label='iphone-03 author row all')
bbox(P03, 210, 260, 1205, 1265, label='iphone-03 author P?')
bbox(P03, 210, 420, 1205, 1265, label='iphone-03 author Pluso?')
# Body line1: "I've put together a direction for the"
bbox(P03, 225, 900, 1300, 1350, label='iphone-03 body L1 all')
bbox(P03, 225, 260, 1300, 1350, label='iphone-03 body L1 I?')
# Body line2: "first-session experience. The town"
bbox(P03, 225, 900, 1345, 1395, label='iphone-03 body L2 all')
# Ampo bubble: find bands y 1900..2350 x 225..900
im = Image.open(P03).convert('RGB')
prev = False; bs = None
print('--- ampo bubble bands y1900..2400 ---')
for y in range(1900, 2400):
    cnt = sum(1 for x in range(225, 900) if lum(im.getpixel((x, y))) < 120)
    if cnt >= 5 and not prev: bs = y; prev = True
    if cnt < 5 and prev: print('band', bs, '-', y-1, 'h', y-bs); prev = False
