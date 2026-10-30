from PIL import Image
import os
REF = os.path.expanduser('~/workspace/airbuild-refs/appstore')
im = Image.open(os.path.join(REF, 'iphone-05-submit-for-review.jpg')).convert('RGB')
SC = 390 / 910.0
def lum(px):
    return 0.299*px[0]+0.587*px[1]+0.114*px[2]
def bands(x0, x1, y0, y1, thr=140, label=''):
    prev = False; bs = None; out = []
    for y in range(y0, y1):
        cnt = sum(1 for x in range(x0, x1) if lum(im.getpixel((x, y))) < thr)
        if cnt >= 5 and not prev: bs = y; prev = True
        if cnt < 5 and prev: out.append((bs, y-1, y-bs)); prev = False
    print(label, 'bands:', out, '-> @390 heights:', [f"{h*SC:.1f}" for _, _, h in out])
def whiteruns_col(x, y0, y1, label=''):
    prev = False; bs = None; out = []
    for y in range(y0, y1):
        w = lum(im.getpixel((x, y))) > 250
        if w and not prev: bs = y; prev = True
        if not w and prev: out.append((bs, y-1)); prev = False
    print(label, 'white runs:', out)
bands(400, 900, 900, 1050, label='d05 title')
bands(450, 900, 1050, 1250, label='d05 status/updated')
bands(200, 500, 1560, 1700, label='d05 Versions label')
bands(200, 1100, 1680, 2400, label='d05 versions rows')
whiteruns_col(400, 1300, 1600, 'd05 store col x=400')
whiteruns_col(400, 1050, 1300, 'd05 statuscard col x=400')
# check button: rows y 900..1050, x 950..1120, dark runs (check glyph strokes)
for y in range(920, 1020, 10):
    runs = []
    s = None
    for x in range(950, 1120):
        d = lum(im.getpixel((x, y))) < 140
        if d and s is None: s = x
        if not d and s is not None:
            if x - s >= 2: runs.append((s, x-1))
            s = None
    print('d05 check row', y, runs)
