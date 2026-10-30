from PIL import Image
import os
D = os.path.expanduser('~/workspace/DesignRepoForMuse/UIDesign/app/airbuild/docs/verification/rounds/v1.6')
def load(n):
    return Image.open(os.path.join(D, n)).convert('RGB')
# S1: draft cover gradient pixels (dark green-grey, r 25-70 g 40-80 b 35-75) in card area
im = load('draft-390.png')
pts = []
for y in range(300, 700):
    for x in range(15, 376):
        r, g, b = im.getpixel((x, y))
        if 25 <= r <= 75 and 40 <= g <= 85 and 35 <= b <= 80 and g >= r:
            pts.append((x, y))
xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
print('S1 cover gradient bbox x', min(xs), max(xs), 'w', max(xs)-min(xs)+1, 'y', min(ys), max(ys), 'h', max(ys)-min(ys)+1, 'ratio h/w', round((max(ys)-min(ys)+1)/(max(xs)-min(xs)+1), 3))
# per-row widths at several y inside cover
for y in [400, 430, 460, 490]:
    xs2 = [x for x in range(15, 376) if 25 <= im.getpixel((x, y))[0] <= 75 and 40 <= im.getpixel((x, y))[1] <= 85]
    print('S1 row', y, 'grad x', (min(xs2), max(xs2)) if xs2 else None)
# S3 briefing first card: white top arc, y 260-360
im = load('briefing-390.png')
def is_white(px):
    return px[0] > 240 and px[1] > 240 and px[2] > 240
for x in [27, 30, 35, 40, 45, 55, 70, 100]:
    ys2 = [y for y in range(260, 380) if is_white(im.getpixel((x, y)))]
    print('S3 col x', x, 'first white y', min(ys2) if ys2 else None)
# left edge x per row near top
for y in [285, 290, 295, 300, 310]:
    xs3 = [x for x in range(15, 250) if is_white(im.getpixel((x, y)))]
    print('S3 row y', y, 'first white x', min(xs3) if xs3 else None)
# F caps chat: column scans
im = load('chat-390.png')
def dark(px):
    return px[0] < 150 and px[1] < 150 and px[2] < 150
print('F author col scan y120-145:')
for x in range(65, 95):
    ys3 = [y for y in range(120, 148) if dark(im.getpixel((x, y)))]
    if ys3: print('  x', x, 'dark y', min(ys3), max(ys3), 'h', max(ys3)-min(ys3)+1)
print('F body col scan y155-180:')
for x in range(80, 110):
    ys3 = [y for y in range(155, 180) if dark(im.getpixel((x, y)))]
    if ys3: print('  x', x, 'dark y', min(ys3), max(ys3), 'h', max(ys3)-min(ys3)+1)
