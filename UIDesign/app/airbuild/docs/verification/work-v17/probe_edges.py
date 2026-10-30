from PIL import Image
import os
REF = os.path.expanduser('~/workspace/airbuild-refs/appstore')
def lum(px):
    return 0.299*px[0]+0.587*px[1]+0.114*px[2]
# file card height: column x=800 (inside card), y 1600..1800, lum>250 = white
im = Image.open(os.path.join(REF, 'iphone-03-build-with-your-team.jpg')).convert('RGB')
prev = False; bs = None
print('iphone-03 col x=800 white runs y1600..1800:')
for y in range(1600, 1800):
    w = lum(im.getpixel((800, y))) > 250
    if w and not prev: bs = y; prev = True
    if not w and prev: print(' white', bs, '-', y-1); prev = False
# file card left edge row y=1700 (mid card, below filename? filename band 1658-1690; use y=1700 gap)
for y in [1660, 1700, 1730]:
    runs = []
    s = None
    for x in range(100, 1200):
        w = lum(im.getpixel((x, y))) > 250
        if w and s is None: s = x
        if not w and s is not None:
            if x - s > 40: runs.append((s, x-1))
            s = None
    print('iphone-03 file row', y, runs)
# iphone-05 geometry: screen run was 201..1121 (w 920, scale 0.4239)
im5 = Image.open(os.path.join(REF, 'iphone-05-submit-for-review.jpg')).convert('RGB')
print('iphone-05 size', im5.size)
# title "Hands Time" ink band: title row approx y 950..1050, x 400..900
prev = False; bs = None
for y in range(900, 1100):
    cnt = sum(1 for x in range(300, 1000) if lum(im5.getpixel((x, y))) < 120)
    if cnt >= 5 and not prev: bs = y; prev = True
    if cnt < 5 and prev: print('iphone-05 title band', bs, '-', y-1, 'h', y-bs); prev = False
# check button: glass circle top-right approx x 950..1080, y 950..1100: find circle via dark runs rows
for y in [980, 1010, 1040]:
    runs = []
    s = None
    for x in range(900, 1121):
        d = lum(im5.getpixel((x, y))) < 242
        if d and s is None: s = x
        if not d and s is not None:
            if x - s >= 3: runs.append((s, x-1))
            s = None
    print('iphone-05 check row', y, 'dark runs:', runs)
# store cards: row y=1450 (store card band): white runs
for y in [1400, 1500]:
    runs = []
    s = None
    for x in range(150, 1150):
        w = lum(im5.getpixel((x, y))) > 250
        if w and s is None: s = x
        if not w and s is not None:
            if x - s > 40: runs.append((s, x-1))
            s = None
    print('iphone-05 store row', y, 'white runs:', runs)
# iphone-04 traffic lights: row through lights y? lights approx y 1700..1800, x 100..300: find colored blobs
im4 = Image.open(os.path.join(REF, 'iphone-04-website-draft.jpg')).convert('RGB')
print('iphone-04 size', im4.size)
for y in range(1650, 1900, 25):
    cols = []
    for x in range(80, 320):
        r, g, b = im4.getpixel((x, y))
        if r > 180 and g < 120 and b < 120: cols.append(('R', x))
        if r > 200 and 150 < g < 220 and b < 100: cols.append(('Y', x))
        if r < 120 and g > 160 and b < 120: cols.append(('G', x))
    if cols:
        xs = [x for _, x in cols]
        print('iphone-04 lights row', y, 'colored x', min(xs), '..', max(xs), 'n', len(xs))
