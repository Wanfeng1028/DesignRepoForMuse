from PIL import Image
import os
D = os.path.expanduser('~/workspace/DesignRepoForMuse/UIDesign/app/airbuild/docs/verification/rounds/v1.6')
im = Image.open(os.path.join(D, 'briefing-390.png')).convert('RGB')
def is_card(px):
    return px[0] > 250 and px[1] > 250 and px[2] > 250
for x in [27, 30, 35, 40, 45, 50, 60, 80, 120]:
    ys = [y for y in range(200, 340) if is_card(im.getpixel((x, y)))]
    print('S3 col x', x, 'first card-white y', min(ys) if ys else None)
for y in [245, 250, 255, 260, 270, 280]:
    xs = [x for x in range(15, 250) if is_card(im.getpixel((x, y)))]
    print('S3 row y', y, 'first card-white x', min(xs) if xs else None)
# F caps: author P at x71: dark y 128-135 h8 -> cap 8 (incl antialias?) ; body: need first glyph column.
# Body first line starts "I've": scan for I bar: look at columns 84-88, y 158-172, single vertical runs
im2 = Image.open(os.path.join(D, 'chat-390.png')).convert('RGB')
def dark(px):
    return px[0] < 150 and px[1] < 150 and px[2] < 150
for x in range(82, 92):
    ys = [y for y in range(158, 172) if dark(im2.getpixel((x, y)))]
    print('F body x', x, 'dark', (min(ys), max(ys)) if ys else None)
