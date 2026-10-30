from PIL import Image
from collections import Counter
import os
BASE = os.path.expanduser('~/workspace/DesignRepoForMuse/UIDesign/app/medley/docs/verification/rounds/v1.8/pre')
def hx(c):
    return '#%02x%02x%02x' % c[:3]
def exact_bbox(im, color, box):
    x0, y0, x1, y1 = box
    px = im.load()
    xs, ys, n = [], [], 0
    for y in range(y0, y1):
        for x in range(x0, x1):
            if px[x, y][:3] == color:
                xs.append(x); ys.append(y); n += 1
    if n == 0:
        return None
    return (min(xs), min(ys), max(xs), max(ys), n)
def near_bbox(im, color, box, tol=30):
    x0, y0, x1, y1 = box
    px = im.load()
    xs, ys, n = [], [], 0
    for y in range(y0, y1):
        for x in range(x0, x1):
            p = px[x, y]
            if max(abs(p[0]-color[0]), abs(p[1]-color[1]), abs(p[2]-color[2])) <= tol:
                xs.append(x); ys.append(y); n += 1
    if n == 0:
        return None
    return (min(xs), min(ys), max(xs), max(ys), n)
# 1. light home indicator: exact #bababa in bottom 20 rows
for f in ['home-light-en.png', 'home-light-cn.png', 'language-light.png', 'credits-light.png', 'suspended-light.png', 'chat-light-train-en.png', 'chat-light-router-en.png', 'chat-light-savings-en.png', 'chat-info-sheet.png']:
    im = Image.open(os.path.join(BASE, f)).convert('RGB')
    b = exact_bbox(im, (186, 186, 186), (0, 820, 390, 844))
    print(f, 'light-indicator exact #bababa bbox', b, 'width', (b[2]-b[0]+1 if b else None), 'rows', (b[3]-b[1]+1 if b else None))
# 2. language hairlines: rows where #e6e7ea count > 200 in x20-370
im = Image.open(os.path.join(BASE, 'language-light.png')).convert('RGB')
px = im.load()
print('language hairline rows (count of #e6e7ea in x20-370 >200):')
for y in range(80, 760):
    n = sum(1 for x in range(20, 370) if px[x, y][:3] == (230, 231, 234))
    if n > 200:
        print('  y=%d n=%d' % (y, n))
# 3. welcome probes
im = Image.open(os.path.join(BASE, 'welcome-dark.png')).convert('RGB')
print('welcome cursor #6ea9dd bbox', exact_bbox(im, (110, 169, 221), (0, 0, 390, 844)))
for name, col in [('brand-green', (94, 200, 167)), ('brand-blue', (143, 176, 216)), ('brand-pink', (217, 140, 180))]:
    print('welcome', name, exact_bbox(im, col, (0, 0, 390, 844)))
# welcome buttons: #edeef2 rows
px = im.load()
rows = []
for y in range(600, 800):
    n = sum(1 for x in range(20, 370) if px[x, y][:3] == (237, 238, 242))
    if n > 200:
        rows.append(y)
print('welcome google-btn #edeef2 rows', (min(rows), max(rows), len(rows)) if rows else None)
# welcome base partition: 11x11 patch medians at 9 points
for (x, y) in [(195, 100), (60, 100), (330, 100), (195, 250), (60, 450), (330, 450), (60, 650), (330, 650), (195, 830)]:
    patch = [im.getpixel((xx, yy)) for yy in range(y-5, y+6) for xx in range(x-5, x+6)]
    med = tuple(sorted([p[i] for p in patch])[60] for i in range(3))
    print('welcome patch (%d,%d) median %s' % (x, y, hx(med)))
# 4. input pill heights: dark input #1f2024 row spans near bottom for lisbon-en, light white pill for home-en
for f, col, yrange in [('chat-dark-lisbon-en.png', (31, 32, 36), (700, 844)), ('home-light-en.png', (255, 255, 255), (700, 844)), ('chat-dark-lisbon-cn.png', (31, 32, 36), (700, 844))]:
    im = Image.open(os.path.join(BASE, f)).convert('RGB')
    px = im.load()
    rows = []
    for y in range(*yrange):
        n = sum(1 for x in range(16, 374) if px[x, y][:3] == col)
        if n > 200:
            rows.append(y)
    print(f, 'pill color rows', (min(rows), max(rows), len(rows)) if rows else None)
# 5. lisbon-en trailing dot + stop button
im = Image.open(os.path.join(BASE, 'chat-dark-lisbon-en.png')).convert('RGB')
print('lisbon-en trailing #fd6718 bbox', exact_bbox(im, (253, 103, 24), (0, 0, 390, 844)))
print('lisbon-en stop-accent #e2a181 bbox (bottom area)', exact_bbox(im, (226, 161, 129), (0, 700, 390, 844)))
im = Image.open(os.path.join(BASE, 'chat-dark-lisbon-cn.png')).convert('RGB')
print('lisbon-cn trailing #fd6718 bbox', exact_bbox(im, (253, 103, 24), (0, 0, 390, 844)))
# 6. pricing arc dots: 6 pastel colors in top area
im = Image.open(os.path.join(BASE, 'pricing-dark.png')).convert('RGB')
for name, col in [('arc1', (220, 177, 194)), ('arc2', (171, 206, 238)), ('arc3', (223, 221, 167)), ('arc4', (175, 221, 201)), ('arc5', (205, 185, 232)), ('arc6', (234, 182, 163))]:
    print('pricing', name, exact_bbox(im, col, (0, 0, 390, 200)))
# 7. picker handle + drawer handle
im = Image.open(os.path.join(BASE, 'model-picker-a.png')).convert('RGB')
print('picker-a handle #3a3b40 bbox', exact_bbox(im, (58, 59, 64), (0, 0, 390, 120)))
im = Image.open(os.path.join(BASE, 'chat-info-sheet.png')).convert('RGB')
print('info-sheet handle #d8d9dd bbox', exact_bbox(im, (216, 217, 221), (0, 100, 390, 300)))
