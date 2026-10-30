from PIL import Image
import os
REF = os.path.expanduser('~/workspace/airbuild-refs/appstore')
def lum(px):
    return 0.299*px[0]+0.587*px[1]+0.114*px[2]
P03 = os.path.join(REF, 'iphone-03-build-with-your-team.jpg')
im = Image.open(P03).convert('RGB')
print('--- iphone-03 file card: white runs per row y 1650..1950 step 25 ---')
for y in range(1650, 1951, 25):
    runs = []
    s = None
    for x in range(100, 1200):
        w = lum(im.getpixel((x, y))) > 250
        if w and s is None: s = x
        if not w and s is not None:
            if x - s > 40: runs.append((s, x-1))
            s = None
    print(y, runs)
print('--- iphone-03 file filename ink band (x 330..1000) ---')
prev = False; bs = None
for y in range(1650, 1950):
    cnt = sum(1 for x in range(330, 1000) if lum(im.getpixel((x, y))) < 120)
    if cnt >= 5 and not prev: bs = y; prev = True
    if cnt < 5 and prev: print('band', bs, '-', y-1, 'h', y-bs); prev = False
P06 = os.path.join(REF, 'iphone-06-daily-briefing.jpg')
im6 = Image.open(P06).convert('RGB')
print('--- iphone-06 dark runs row y=2100 (bezel) ---')
runs = []
s = None
for x in range(0, 1320):
    d = lum(im6.getpixel((x, 2100))) < 60
    if d and s is None: s = x
    if not d and s is not None:
        if x - s > 10: runs.append((s, x-1))
        s = None
print('dark runs:', runs)
print('--- iphone-06 send button: blue runs ---')
# send button is blue circle bottom-right of composer; composer approx y 2050..2350, x 900..1150
for y in range(2080, 2320, 20):
    blues = [x for x in range(850, 1200) if im6.getpixel((x, y))[2] > 150 and im6.getpixel((x, y))[0] < 80 and im6.getpixel((x, y))[1] > 100]
    if blues: print('row', y, 'blue x', min(blues), '..', max(blues), 'w', max(blues)-min(blues)+1)
