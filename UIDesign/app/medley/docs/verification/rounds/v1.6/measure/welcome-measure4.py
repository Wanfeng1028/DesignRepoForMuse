from PIL import Image
import numpy as np, os
from collections import Counter
ROOT = '/home/hatch/workspace/DesignRepoForMuse'
strip = Image.open(os.path.join(ROOT, 'UIDesign/docs/references/medley/medley-4-screens-chinese-hd.jpg')).convert('RGB')
orig = np.array(strip.crop((20, 15, 580, 1260)).convert('RGB')).astype(int)
rend = np.array(Image.open(os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.6/pre/welcome-dark.png')).convert('RGB')).astype(int)
def mode_in(a, y0, y1, x0, x1, bg):
    m = (np.abs(a[y0:y1, x0:x1, :] - np.array(bg)).max(axis=2) > 40)
    px = a[y0:y1, x0:x1, :][m]
    c = Counter(map(tuple, px.tolist()))
    return c.most_common(3), len(px)
print('ORIG text pixel modes (bg 17,21,24):')
for lab, box in [('title', (454, 498, 0, 560)), ('sub1', (537, 558, 0, 560)), ('sub2', (575, 592, 0, 560)), ('foot1', (1132, 1147, 0, 560))]:
    print(' ', lab, mode_in(orig, *box, (17, 21, 24)))
print('RENDER text pixel modes (bg 18,19,22):')
for lab, box in [('title', (312, 343, 0, 390)), ('sub1', (376, 389, 0, 390)), ('sub2', (403, 416, 0, 390)), ('foot1', (776, 788, 0, 390))]:
    print(' ', lab, mode_in(rend, *box, (18, 19, 22)))
print('ORIG Try border row y=1034 pixel mode in x100-460:')
row = orig[1034, 100:461, :]
print(' ', Counter(map(tuple, row.tolist())).most_common(5))
print('ORIG Try border row y=1105 pixel mode in x100-460:')
row = orig[1105, 100:461, :]
print(' ', Counter(map(tuple, row.tolist())).most_common(5))
print('RENDER Try border row y=707 pixel mode in x50-340:')
row = rend[707, 50:341, :]
print(' ', Counter(map(tuple, row.tolist())).most_common(5))
print('ORIG Google button: white badge search in button band y946-1019, x34-528:')
band = orig[946:1020, 34:529, :]
white = (band[:, :, 0] > 250) & (band[:, :, 1] > 250) & (band[:, :, 2] > 250)
ys, xs = np.where(white)
print('  white px bbox x', 34 + int(xs.min()), 34 + int(xs.max()), 'y', 946 + int(ys.min()), 946 + int(ys.max()), 'count', len(xs))
# badge is white circle on light bg: restrict to left-of-centre white cluster: columns histogram
for x0 in range(34, 529, 20):
    print(f'  col {x0}-{x0+19}: white {int(white[:, x0-34:x0-34+20].sum())}')
print('RENDER Google button badge: white px in band y643-694:')
band = rend[643:695, :, :]
white = (band[:, :, 0] > 250) & (band[:, :, 1] > 250) & (band[:, :, 2] > 250)
ys, xs = np.where(white)
print('  white bbox x', int(xs.min()), int(xs.max()), 'y', 643 + int(ys.min()), 643 + int(ys.max()))
for x0 in range(0, 390, 20):
    print(f'  col {x0}-{x0+19}: white {int(white[:, x0:x0+20].sum())}')
print('ORIG Google button bg mode in band (excluding badge/label): rows 960-1000, x100-200:')
print(' ', Counter(map(tuple, orig[960:1001, 100:201, :].reshape(-1, 3).tolist())).most_common(3))
print('RENDER Google button bg mode rows 655-680, x250-340:')
print(' ', Counter(map(tuple, rend[655:681, 250:341, :].reshape(-1, 3).tolist())).most_common(3))
