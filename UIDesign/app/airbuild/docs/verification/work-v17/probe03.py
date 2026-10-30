from PIL import Image
import os
REF = os.path.expanduser('~/workspace/airbuild-refs/appstore')
im = Image.open(os.path.join(REF, 'iphone-03-build-with-your-team.jpg')).convert('RGB')
W, H = im.size
print('size', W, H)
def lum(px):
    return 0.299*px[0]+0.587*px[1]+0.114*px[2]
def rowscan(y, x0, x1, thresh=242):
    """print runs where lum < thresh (non-white ink/shadow)"""
    runs = []
    s = None
    for x in range(x0, x1):
        dark = lum(im.getpixel((x, y))) < thresh
        if dark and s is None: s = x
        if not dark and s is not None:
            if x - s >= 3: runs.append((s, x-1))
            s = None
    if s is not None: runs.append((s, x1-1))
    return runs
# back button: guess centre y by scanning rows 950..1150 for a circle left edge near x 180-340
for y in [980, 1010, 1040, 1070, 1100]:
    print('row', y, 'dark runs x150..450:', rowscan(y, 150, 450))
# avatar Pluso: rows around 1500..1650, x 100..300
for y in [1520, 1560, 1600]:
    print('avatar row', y, 'dark runs x100..320:', rowscan(y, 100, 320))
# Pluso bubble text: find ink rows in box x 230..900, y 1150..1700
print('--- bubble text row bands (dark px count per y, y 1150..1700, step: only rows with ink) ---')
prev = False
band_start = None
for y in range(1150, 1700):
    cnt = 0
    for x in range(230, 900):
        if lum(im.getpixel((x, y))) < 120: cnt += 1
    if cnt >= 5 and not prev:
        band_start = y; prev = True
    if cnt < 5 and prev:
        print('band', band_start, '-', y-1, 'height', y-band_start)
        prev = False
if prev: print('band', band_start, '-', 1699)
