from PIL import Image
import os
D = os.path.expanduser('~/workspace/DesignRepoForMuse/UIDesign/app/airbuild/docs/verification/rounds/v1.6')
im = Image.open(os.path.join(D, 'draft-390.png')).convert('RGB')
def grad(px):
    r, g, b = px
    return 25 <= r <= 75 and 40 <= g <= 85 and 35 <= b <= 80 and g >= r
prev = None
for y in range(280, 620):
    xs = [x for x in range(150, 376) if grad(im.getpixel((x, y)))]
    w = (max(xs) - min(xs) + 1) if xs else 0
    xr = (min(xs), max(xs)) if xs else None
    if w != prev:
        print('row', y, 'grad width', w, 'x', xr)
        prev = w
