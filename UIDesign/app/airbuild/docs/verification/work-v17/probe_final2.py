from PIL import Image
import os
REF = os.path.expanduser('~/workspace/airbuild-refs/appstore')
def lum(px):
    return 0.299*px[0]+0.587*px[1]+0.114*px[2]
im4 = Image.open(os.path.join(REF, 'iphone-04-website-draft.jpg')).convert('RGB')
print('d04 dark-row bands x60..700 y1600..2750:')
prev = False; bs = None
for y in range(1600, 2750):
    cnt = sum(1 for x in range(60, 700) if lum(im4.getpixel((x, y))) < 140)
    if cnt >= 8 and not prev: bs = y; prev = True
    if cnt < 8 and prev: print(' band', bs, '-', y-1, 'h', y-bs); prev = False
print('d04 dark-row bands x100..1100 y1200..1700 (colo area):')
prev = False; bs = None
for y in range(1200, 1700):
    cnt = sum(1 for x in range(100, 1100) if lum(im4.getpixel((x, y))) < 140)
    if cnt >= 8 and not prev: bs = y; prev = True
    if cnt < 8 and prev: print(' band', bs, '-', y-1, 'h', y-bs); prev = False
im6 = Image.open(os.path.join(REF, 'iphone-06-daily-briefing.jpg')).convert('RGB')
print('b06 composer row y=1960 white runs:')
runs = []
s = None
for x in range(0, 1320):
    w = lum(im6.getpixel((x, 1960))) > 250
    if w and s is None: s = x
    if not w and s is not None:
        if x - s > 30: runs.append((s, x-1))
        s = None
print(runs)
print('b06 composer text-start: dark runs row y=1960 x100..1000:')
runs = []
s = None
for x in range(100, 1000):
    d = lum(im6.getpixel((x, 1960))) < 140
    if d and s is None: s = x
    if not d and s is not None:
        if x - s >= 2: runs.append((s, x-1))
        s = None
print(runs[:12])
print('b06 composer card top/bottom: col x=600 white runs y1800..2350:')
prev = False; bs = None
for y in range(1800, 2350):
    w = lum(im6.getpixel((x, y))) > 250 if (x := 600) else False
    if w and not prev: bs = y; prev = True
    if not w and prev: print(' white', bs, '-', y-1); prev = False
