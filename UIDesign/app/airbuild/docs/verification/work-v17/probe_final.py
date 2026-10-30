from PIL import Image
import os
REF = os.path.expanduser('~/workspace/airbuild-refs/appstore')
OUT = os.path.expanduser('~/workspace/DesignRepoForMuse/UIDesign/app/airbuild/docs/verification/work-v17/crops')
def lum(px):
    return 0.299*px[0]+0.587*px[1]+0.114*px[2]
# --- iphone-04: lights diameters row y=1750, window edges, headline/subline/caption bands, draft author check
im4 = Image.open(os.path.join(REF, 'iphone-04-website-draft.jpg')).convert('RGB')
for y in [1740, 1750, 1760]:
    cols = {'R': [], 'Y': [], 'G': []}
    for x in range(80, 320):
        r, g, b = im4.getpixel((x, y))
        if r > 180 and g < 130 and b < 130: cols['R'].append(x)
        elif r > 200 and 150 < g < 220 and b < 110: cols['Y'].append(x)
        elif r < 130 and g > 150 and b < 130: cols['G'].append(x)
    print('d04 lights row', y, {k: (min(v), max(v), len(v)) if v else None for k, v in cols.items()})
# window edges at chrome row y=1700: white runs
for y in [1700, 1750]:
    runs = []
    s = None
    for x in range(0, 1320):
        w = lum(im4.getpixel((x, y))) > 245
        if w and s is None: s = x
        if not w and s is not None:
            if x - s > 60: runs.append((s, x-1))
            s = None
    print('d04 white runs row', y, runs)
def bands04(x0, x1, y0, y1, thr, label):
    prev = False; bs = None; out = []
    for y in range(y0, y1):
        cnt = sum(1 for x in range(x0, x1) if lum(im4.getpixel((x, y))) < thr)
        if cnt >= 5 and not prev: bs = y; prev = True
        if cnt < 5 and prev: out.append((bs, y-1, y-bs)); prev = False
    print(label, out)
bands04(80, 700, 1950, 2300, 140, 'd04 headline/subline bands')
bands04(80, 700, 1350, 1500, 140, 'd04 colo author? bands')
# --- iphone-06: send button blue runs y 1900..2120; screen/card widths row y=1500
im6 = Image.open(os.path.join(REF, 'iphone-06-daily-briefing.jpg')).convert('RGB')
for y in range(1900, 2121, 10):
    blues = [x for x in range(850, 1250) if im6.getpixel((x, y))[2] > 150 and im6.getpixel((x, y))[0] < 90 and im6.getpixel((x, y))[1] > 90]
    if blues: print('b06 blue row', y, min(blues), '..', max(blues), 'w', max(blues)-min(blues)+1)
for y in [1500]:
    runs = []
    s = None
    for x in range(0, 1320):
        w = lum(im6.getpixel((x, y))) > 250
        if w and s is None: s = x
        if not w and s is not None:
            if x - s > 40: runs.append((s, x-1))
            s = None
    print('b06 white runs row', y, runs)
# --- ipad-01 member bands: Pluso row approx? scan full left col x 350..800 y 1600..2100
imi = Image.open(os.path.join(REF, 'ipad-01.jpg')).convert('RGB')
prev = False; bs = None
print('ipad01 left-col bands y1600..2100:')
for y in range(1600, 2100):
    cnt = sum(1 for x in range(350, 800) if lum(imi.getpixel((x, y))) < 140)
    if cnt >= 5 and not prev: bs = y; prev = True
    if cnt < 5 and prev: print(' band', bs, '-', y-1, 'h', y-bs); prev = False
# --- iphone-05 screen width: row y=2000 neutrality (B-R)
im5 = Image.open(os.path.join(REF, 'iphone-05-submit-for-review.jpg')).convert('RGB')
trans = []
prev_neutral = None
for x in range(0, 1320):
    r, g, b = im5.getpixel((x, 2000))
    neutral = abs(int(r)-int(b)) < 8 and lum((r, g, b)) > 220
    if neutral != prev_neutral:
        trans.append((x, neutral)); prev_neutral = neutral
print('b05 neutrality transitions row2000:', trans[:20])
# task title crop
im3 = Image.open(os.path.join(REF, 'iphone-03-build-with-your-team.jpg')).convert('RGB').crop((100, 2260, 900, 2460))
im3 = im3.resize((im3.width*2, im3.height*2), Image.LANCZOS)
im3.save(os.path.join(OUT, 'c03-tasktitle.png'))
print('saved c03-tasktitle')
