from PIL import Image
import os
REF = os.path.expanduser('~/workspace/airbuild-refs/appstore')
def lum(px):
    return 0.299*px[0]+0.587*px[1]+0.114*px[2]
im4 = Image.open(os.path.join(REF, 'iphone-04-website-draft.jpg')).convert('RGB')
def bands(x0, x1, y0, y1, thr, mincnt, label):
    prev = False; bs = None; out = []
    for y in range(y0, y1):
        cnt = sum(1 for x in range(x0, x1) if lum(im4.getpixel((x, y))) < thr)
        if cnt >= mincnt and not prev: bs = y; prev = True
        if cnt < mincnt and prev: out.append((bs, y-1, y-bs)); prev = False
    print(label, out)
# headline column only (left part of window), strict count
bands(80, 480, 1900, 2600, 140, 20, 'd04 headline col bands')
# subline + download + footnote
bands(80, 480, 2250, 2600, 140, 20, 'd04 lower-left bands')
# cover caption: cover region x 660..1180, white text on dark photo -> bright pixels
prev = False; bs = None; out = []
for y in range(2300, 2600):
    cnt = sum(1 for x in range(700, 1150) if lum(im4.getpixel((x, y))) > 200)
    if cnt >= 8 and not prev: bs = y; prev = True
    if cnt < 8 and prev: out.append((bs, y-1, y-bs)); prev = False
print('d04 cover caption bright bands:', out)
# cover box: find dark photo region: col x=900, dark runs y1900..2600
prev = False; bs = None; out = []
for y in range(1900, 2600):
    d = lum(im4.getpixel((900, y))) < 100
    if d and not prev: bs = y; prev = True
    if not d and prev: out.append((bs, y-1)); prev = False
print('d04 cover col x=900 dark runs:', out)
# window left/right edges at headline row y=2100: white runs
for y in [2100, 2200]:
    runs = []
    s = None
    for x in range(0, 1320):
        w = lum(im4.getpixel((x, y))) > 245
        if w and s is None: s = x
        if not w and s is not None:
            if x - s > 40: runs.append((s, x-1))
            s = None
    print('d04 white runs row', y, runs)
im6 = Image.open(os.path.join(REF, 'iphone-06-daily-briefing.jpg')).convert('RGB')
# first card width: row y=800 (headline area): white runs
for y in [800, 900, 1200]:
    runs = []
    s = None
    for x in range(0, 1320):
        w = lum(im6.getpixel((x, y))) > 250
        if w and s is None: s = x
        if not w and s is not None:
            if x - s > 40: runs.append((s, x-1))
            s = None
    print('b06 white runs row', y, runs)
