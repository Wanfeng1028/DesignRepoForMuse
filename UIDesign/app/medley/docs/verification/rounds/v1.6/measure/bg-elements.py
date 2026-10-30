from PIL import Image
import numpy as np, os
ROOT = '/home/hatch/workspace/DesignRepoForMuse'
strip = Image.open(os.path.join(ROOT, 'UIDesign/docs/references/medley/medley-4-screens-chinese-hd.jpg')).convert('RGB')
crop = strip.crop((20, 15, 580, 1260))
a = np.array(crop).astype(int)
h, w = a.shape[0], a.shape[1]
# Row profile: count bright pixels (>200 all channels) per row, and light-button pixels, orange pixels
bright = (a[:, :, 0] > 200) & (a[:, :, 1] > 200) & (a[:, :, 2] > 200)
orange = (a[:, :, 0] > 200) & (a[:, :, 1] > 80) & (a[:, :, 1] < 140) & (a[:, :, 2] < 60)
print('--- rows with bright-pixel counts (every row where count>0, grouped) ---')
counts = bright.sum(axis=1)
in_g = False
for y in range(h):
    if counts[y] > 0 and not in_g:
        s = y; in_g = True
    if counts[y] == 0 and in_g:
        e = y - 1; in_g = False
        seg = counts[s:e + 1]
        print(f'y {s}-{e} maxcount {int(seg.max())} x-range of bright in seg: ', end='')
        ys, xs = np.where(bright[s:e + 1, :])
        print(f'{int(xs.min())}-{int(xs.max())}')
if in_g:
    print(f'y {s}-{h-1} (open)')
print('--- orange dot bbox ---')
ys, xs = np.where(orange)
print('orange count', len(xs), 'x', int(xs.min()), int(xs.max()), 'y', int(ys.min()), int(ys.max()))
print('--- light button band: rows where median is light ---')
light = (a[:, :, 0] > 200) & (a[:, :, 1] > 200) & (a[:, :, 2] > 220)
lc = light.sum(axis=1)
for y in range(h):
    if lc[y] > 300:
        pass
# print light count in blocks of 20 rows
for y0 in range(0, h, 40):
    print(f'y {y0}-{y0+39}: light px {int(lc[y0:y0+40].sum())} bright px {int(counts[y0:y0+40].sum())}')
print('--- exact (15,18,23) map: per-column median in empty band y700-950, per 10 cols ---')
band = a[700:951, :, :]
for x0 in range(0, 560, 20):
    blk = band[:, x0:x0 + 20, :].reshape(-1, 3)
    med = tuple(int(v) for v in np.median(blk, axis=0))
    frac17 = float(((blk[:, 0] == 17) & (blk[:, 1] == 21) & (blk[:, 2] == 24)).mean())
    frac15 = float(((blk[:, 0] == 15) & (blk[:, 1] == 18) & (blk[:, 2] == 23)).mean())
    print(f'x {x0}-{x0+19}: med {med} frac17 {frac17:.2f} frac15 {frac15:.2f}')
print('--- where does interior (15,18,23) solid block live? scan rows y400-650, x100-450: fraction per 20-row block ---')
for y0 in range(400, 660, 20):
    blk = a[y0:y0 + 20, 100:451, :]
    m = (blk[:, :, 0] == 15) & (blk[:, :, 1] == 18) & (blk[:, :, 2] == 23)
    print(f'y {y0}-{y0+19}: frac15 {float(m.mean()):.3f}')
print('--- title zone: bright bbox y480-620 ---')
ys, xs = np.where(bright[480:621, :])
print('x', 100 + 0, 'bright x range in 480-620:', int(xs.min()), int(xs.max()), 'y range:', 480 + int(ys.min()), 480 + int(ys.max()))
# what is at (268-283, 553-560)? print a wider ASCII map: rows 540-580, cols 240-320, classify: W bright, O orange, . =17,21,24, d=15,18,23, ?=other dark, g=gray>60
def cls(v):
    if tuple(v) == (17, 21, 24):
        return '.'
    if tuple(v) == (15, 18, 23):
        return 'd'
    if v[0] > 200 and v[1] > 200 and v[2] > 200:
        return 'W'
    if v[0] > 200 and 80 < v[1] < 140:
        return 'O'
    if max(v) > 60:
        return 'g'
    return '?'
for y in range(540, 581):
    print(f'{y:4d} ' + ''.join(cls(a[y, x]) for x in range(240, 321)))
