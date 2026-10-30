from PIL import Image
import numpy as np, os
ROOT = '/home/hatch/workspace/DesignRepoForMuse'
strip = Image.open(os.path.join(ROOT, 'UIDesign/docs/references/medley/medley-4-screens-chinese-hd.jpg')).convert('RGB')
crop = strip.crop((20, 15, 580, 1260))
a = np.array(crop).astype(int)
# A. empty band y700-950: per-column median, find transition x
band = a[700:951, :, :]
print('A. empty band per-column median (step 5):')
for x in range(0, 560, 5):
    col = band[:, x, :].reshape(-1, 3)
    med = tuple(int(v) for v in np.median(col, axis=0))
    print(f'x={x} med={med}')
print('B. empty band: (23,27,30) count in interior x20-500:', end=' ')
m = (band[:, 20:501, 0] == 23) & (band[:, 20:501, 1] == 27) & (band[:, 20:501, 2] == 30)
print(int(m.sum()), 'of', int(m.size))
print('C. empty band interior x20-500: top colors:')
flat = band[:, 20:501, :].reshape(-1, 3)
vals, cnts = np.unique(flat, axis=0, return_counts=True)
order = np.argsort(-cnts)
for i in order[:8]:
    print('  ', tuple(vals[i]), int(cnts[i]), f'{100 * cnts[i] / len(flat):.2f}%')
print('D. subtitle glyph band: rows 520-640, gray-text pixel bbox')
gray = (np.abs(a[:, :, 0] - a[:, :, 1]) < 8) & (a[:, :, 0] > 60) & (a[:, :, 0] < 200)
sub = gray[520:641, :]
ys, xs = np.where(sub)
print('  gray bbox x', int(xs.min()), int(xs.max()), 'y', 520 + int(ys.min()), 520 + int(ys.max()))
for y0 in range(520, 641, 10):
    print(f'  y {y0}-{y0+9}: gray px {int(sub[y0-520:y0-520+10, :].sum())}')
print('E. point (280,560) context: 11x11 patch values, median/mean:')
p = a[555:566, 275:286]
print('  median', tuple(int(v) for v in np.median(p.reshape(-1, 3), axis=0)), 'mean', tuple(int(v) for v in p.reshape(-1, 3).mean(axis=0)))
print('  patch rows:')
for r in p:
    print('   ', [tuple(v) for v in r])
print('F. top strip: centre column x280 values y0-40:')
print('  ', [tuple(a[y, 280]) for y in range(0, 41, 2)])
print('G. bottom strip: centre column x280 values y1180-1244:')
print('  ', [tuple(a[y, 280]) for y in range(1180, 1245, 4)])
print('H. (23,27,30) in empty band full width x0-559:', end=' ')
m2 = (band[:, :, 0] == 23) & (band[:, :, 1] == 27) & (band[:, :, 2] == 30)
print(int(m2.sum()))
print('I. row medians interior x20-500, empty band every 25 rows:')
for y in range(700, 951, 25):
    row = a[y, 20:501, :].reshape(-1, 3)
    print(f'  y={y} med {tuple(int(v) for v in np.median(row, axis=0))}')
