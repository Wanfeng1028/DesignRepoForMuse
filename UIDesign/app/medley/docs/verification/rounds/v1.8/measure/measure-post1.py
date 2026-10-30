from PIL import Image
from collections import Counter
import os
BASE = os.path.expanduser('~/workspace/DesignRepoForMuse/UIDesign/app/medley/docs/verification/rounds/v1.8')
def hx(c):
    return '#%02x%02x%02x' % c[:3]
def bands(im, y0, y1, x0, x1, thr, minn):
    px = im.load()
    out = []
    for y in range(y0, y1):
        n = sum(1 for x in range(x0, x1) if sum(px[x, y]) > thr)
        if n >= minn:
            out.append(y)
    groups = []
    for y in out:
        if groups and y - groups[-1][-1] <= 3:
            groups[-1].append(y)
        else:
            groups.append([y])
    return [(g[0], g[-1]) for g in groups]
def darkbands(im, y0, y1, x0, x1, thr, minn):
    # dark text on light bg OR light text cores: use sum<thr for dark ink
    px = im.load()
    out = []
    for y in range(y0, y1):
        n = sum(1 for x in range(x0, x1) if sum(px[x, y]) < thr)
        if n >= minn:
            out.append(y)
    groups = []
    for y in out:
        if groups and y - groups[-1][-1] <= 3:
            groups[-1].append(y)
        else:
            groups.append([y])
    return [(g[0], g[-1]) for g in groups]
w = Image.open(os.path.join(BASE, 'post1/welcome-dark.png')).convert('RGB')
print('WELCOME post1 bright-text bands (x20-370, sum>550, n>=15):', bands(w, 0, 844, 20, 370, 550, 15))
# subtitle bands: gray text sum ~ 450-550? use dark-on-dark: pixels near (176,180,182) etc - instead print row ink counts for subtitle zone
px = w.load()
for label, y0, y1 in [('title zone', 280, 340), ('sub zone', 340, 420), ('footnote zone', 750, 830)]:
    print(label)
    for y in range(y0, y1):
        n = sum(1 for x in range(20, 370) if sum(px[x, y]) > 300)
        if n >= 10:
            print('  y=%d n=%d' % (y, n))
# footnote: find rows with gray text (sum 300-450) counts
print('footnote gray rows (sum 300-450, n>=10):')
for y in range(750, 844):
    n = sum(1 for x in range(20, 370) if 300 <= sum(px[x, y]) <= 450)
    if n >= 10:
        print('  y=%d n=%d' % (y, n))
# google btn rows
for y in range(600, 800):
    n = sum(1 for x in range(20, 370) if px[x, y][:3] == (237, 238, 242))
    if n > 200:
        pass
print('welcome google rows done (see pre: 644-695)')
p = Image.open(os.path.join(BASE, 'post1/model-picker-a.png')).convert('RGB')
print('PICKER post1 bright bands (x40-350, sum>550, n>=15):', bands(p, 0, 844, 40, 350, 550, 15))
print('PICKER post1 bg modes per 20px (x50-350):')
for y in range(0, 844, 20):
    crop = p.crop((50, y, 350, y+20))
    print('  y%d %s' % (y, Counter(crop.getdata()).most_common(1)[0][0]))
# handle exact color
pp = p.load()
for col in [(58, 59, 64)]:
    xs = []; ys = []
    for y in range(90, 140):
        for x in range(150, 240):
            if pp[x, y][:3] == col:
                xs.append(x); ys.append(y)
    print('picker handle bbox x%d-%d y%d-%d n=%d' % (min(xs), max(xs), min(ys), max(ys), len(xs)))
