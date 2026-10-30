"""Round 6 (v1.7) measurements: original App Store images vs v1.6 renders.
Reads official images read-only; prints numbers only. No bitmap is copied
into the repo (zoom crops for eyeballing go to work-v17/crops/ and are
deleted before the round closes)."""
import os
from PIL import Image

REF = os.path.expanduser('~/workspace/airbuild-refs/appstore')
REN = os.path.expanduser('~/workspace/DesignRepoForMuse/UIDesign/app/airbuild/docs/verification/work-v17/before')

def lum(px):
    return 0.299 * px[0] + 0.587 * px[1] + 0.114 * px[2]

def detect_screen(path):
    """Front-facing iPhone shots: screen is the long near-white run on a mid row."""
    im = Image.open(path).convert('RGB')
    w, h = im.size
    y = int(h * 0.45)
    row = [im.getpixel((x, y)) for x in range(w)]
    bright = [all(c > 232 for c in px) for px in row]
    runs = []
    start = None
    for x, b in enumerate(bright):
        if b and start is None:
            start = x
        if not b and start is not None:
            runs.append((start, x - 1))
            start = None
    if start is not None:
        runs.append((start, w - 1))
    runs = [r for r in runs if r[1] - r[0] > 150]
    print(os.path.basename(path), 'size', (w, h), 'mid-row bright runs', runs[:4])
    return im, runs

for name in ['iphone-03-build-with-your-team.jpg', 'iphone-04-website-draft.jpg',
             'iphone-05-submit-for-review.jpg', 'iphone-06-daily-briefing.jpg']:
    detect_screen(os.path.join(REF, name))

def sample(path, xy, label):
    im = Image.open(path).convert('RGB')
    print(label, xy, '#%02x%02x%02x' % im.getpixel(xy))

# iphone-03 user bubble: bottom blue region (image coords from visual read)
sample(os.path.join(REF, 'iphone-03-build-with-your-team.jpg'), (600, 2780), 'iphone-03 user-bubble blue')
sample(os.path.join(REF, 'iphone-03-build-with-your-team.jpg'), (400, 900), 'iphone-03 canvas near top')
sample(os.path.join(REF, 'iphone-06-daily-briefing.jpg'), (300, 1500), 'iphone-06 canvas')
sample(os.path.join(REF, 'iphone-05-submit-for-review.jpg'), (600, 900), 'iphone-05 panel bg')
sample(os.path.join(REF, 'iphone-05-submit-for-review.jpg'), (600, 1700), 'iphone-05 panel bg mid')
