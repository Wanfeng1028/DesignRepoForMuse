from PIL import Image
import os
base = os.path.expanduser('~/workspace/airbuild-refs/appstore')
def is_blue(px):
    r, g, b = px[:3]
    return b > 150 and b - r > 60 and g > 90
def scan_blue(path, name):
    im = Image.open(path).convert('RGB')
    w, h = im.size
    pts = []
    for y in range(h):
        for x in range(w):
            if is_blue(im.getpixel((x, y))):
                pts.append((x, y))
    if not pts:
        print(name, 'no blue'); return
    xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
    print(name, 'blue bbox x', min(xs), max(xs), 'y', min(ys), max(ys), 'count', len(pts))
scan_blue(os.path.join(base, 'iphone-05-submit-for-review.jpg'), 'T09-detail-blue')
im = Image.open(os.path.join(base, 'iphone-06-daily-briefing.jpg')).convert('RGB')
print('T11 size', im.size)
# around known teal core 236-752,1000-1156: scan rows/cols for non-near-white photo bounds
def nonwhite(px):
    return not (px[0] > 240 and px[1] > 240 and px[2] > 240)
for y in [950, 980, 1000, 1156, 1180, 1220]:
    xs = [x for x in range(150, 850) if nonwhite(im.getpixel((x, y)))]
    print('T11 row y', y, 'nonwhite x', (min(xs), max(xs)) if xs else None)
for x in [236, 300, 500, 752]:
    ys = [y for y in range(450, 1300) if nonwhite(im.getpixel((x, y)))]
    print('T11 col x', x, 'nonwhite y range', (min(ys), max(ys)) if ys else None)
