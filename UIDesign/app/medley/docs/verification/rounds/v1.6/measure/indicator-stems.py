from PIL import Image
import numpy as np, os
ROOT = '/home/hatch/workspace/DesignRepoForMuse'
J = os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.3/judge')
R = os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.6/pre')
strip = Image.open(os.path.join(ROOT, 'UIDesign/docs/references/medley/medley-4-screens-chinese-hd.jpg')).convert('RGB')
welcome = np.array(strip.crop((20, 15, 580, 1260)).convert('RGB')).astype(int)
def clusters_1d(mask_row):
    xs = np.where(mask_row)[0]
    if len(xs) == 0:
        return []
    out = []; s = xs[0]; p = xs[0]
    for x in xs[1:]:
        if x - p > 5:
            out.append((int(s), int(p))); s = x
        p = x
    out.append((int(s), int(p)))
    return out
def indicator(a, bg, y, label):
    for thr in [40, 10]:
        m = (np.abs(a[y, :, :] - np.array(bg)).max(axis=1) > thr)
        cls = clusters_1d(m)
        # centred cluster: contains centre
        cx = a.shape[1] // 2
        cen = [c for c in cls if c[0] <= cx <= c[1]]
        print(f'{label} y={y} thr={thr} clusters={cls} centred={cen}')
print('--- welcome dark indicator ---')
for y in [1214, 1216, 1218]:
    indicator(welcome, (17, 21, 24), y, 'welcome')
print('--- orig crops indicators (centre row of bar) ---')
for f, bg, y in [('orig-lisbon-cn.jpg', (17, 21, 24), 1216), ('orig-home-cn.jpg', (255, 255, 255), 1216), ('orig-language.jpg', (255, 255, 255), 1216)]:
    a = np.array(Image.open(os.path.join(J, f)).convert('RGB')).astype(int)
    indicator(a, bg, y, f)
print('--- render indicators ---')
for f, bg, y in [('welcome-dark.png', (18, 19, 22), 834), ('chat-dark-lisbon-cn.png', (18, 19, 22), 834), ('home-light-cn.png', (255, 255, 255), 834), ('language-light.png', (253, 253, 253), 834)]:
    a = np.array(Image.open(os.path.join(R, f)).convert('RGB')).astype(int)
    indicator(a, bg, y, f)
print('--- stem-centre text colors: vertical runs ---')
def stem(a, y0, y1, x0, x1, bg, label):
    m = (np.abs(a[y0:y1, x0:x1, :] - np.array(bg)).max(axis=2) > 40)
    # column sums: find columns with run >= 8
    colsum = m.sum(axis=0)
    cols = [i for i, c in enumerate(colsum) if c >= 8]
    print(f'{label}: tall cols {cols[:20]}')
    if cols:
        c = cols[len(cols) // 2] + x0
        px = a[y0:y1, c, :]
        mm = (np.abs(px - np.array(bg)).max(axis=1) > 40)
        vals = px[mm]
        print(f'   centre col x={c} stem px median {tuple(int(v) for v in np.median(vals, axis=0))} n={len(vals)}')
# sub1 'E' stem: sub1 starts x40; E stem near x42-45, rows 537-557
stem(welcome, 537, 558, 40, 70, (17, 21, 24), 'ORIG sub1 E-stem')
stem(welcome, 575, 592, 39, 70, (17, 21, 24), 'ORIG sub2 C-stem')
stem(welcome, 1132, 1147, 40, 70, (17, 21, 24), 'ORIG foot1 B-stem')
rend = np.array(Image.open(os.path.join(R, 'welcome-dark.png')).convert('RGB')).astype(int)
stem(rend, 376, 389, 20, 50, (18, 19, 22), 'REND sub1 E-stem')
stem(rend, 403, 416, 20, 50, (18, 19, 22), 'REND sub2 C-stem')
stem(rend, 776, 788, 20, 50, (18, 19, 22), 'REND foot1 B-stem')
print('--- G glyph bbox in orig badge zone ---')
zone = welcome[960:1005, 145:185, :]
# black G: pixels much darker than button bg (237,238,242)
m = (np.abs(zone - np.array((237, 238, 242))).max(axis=2) > 60)
ys, xs = np.where(m)
print('black px bbox x', 145 + int(xs.min()), 145 + int(xs.max()), 'y', 960 + int(ys.min()), 960 + int(ys.max()), 'n', len(xs))
for y in range(960, 1005, 5):
    xs2 = np.where(m[y - 960, :])[0]
    if len(xs2):
        print(f'  y={y} black x {145 + int(xs2.min())}-{145 + int(xs2.max())} n={len(xs2)}')
print('--- G glyph bbox in render badge zone ---')
zone = rend[655:685, 95:125, :]
m = (np.abs(zone - np.array((237, 238, 242))).max(axis=2) > 60)
ys, xs = np.where(m)
print('black px bbox x', 95 + int(xs.min()), 95 + int(xs.max()), 'y', 655 + int(ys.min()), 655 + int(ys.max()), 'n', len(xs))
