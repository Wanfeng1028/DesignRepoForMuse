from PIL import Image
P = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/docs/references/medley/medley-5-screens-hd.jpg'
im = Image.open(P).convert('RGB')
px = im.load()
# column x=1227 (picker center): print color every 5px from y=80 to 200, and 900-1040
for y in range(80, 210, 5):
    print('center x1227 y%d %s' % (y, px[1227, y]))
print('--- bottom center ---')
for y in range(940, 1040, 5):
    print('center x1227 y%d %s' % (y, px[1227, y]))
# picker sheet top: for x=1100..1400, per-row mode in y 150-400: find first row where mode changes from near-black to #1e1f23-ish
from collections import Counter
for y in range(140, 420, 5):
    crop = im.crop((1100, y, 1400, y+5))
    print('row y%d mode %s' % (y, Counter(crop.getdata()).most_common(1)[0][0]))
