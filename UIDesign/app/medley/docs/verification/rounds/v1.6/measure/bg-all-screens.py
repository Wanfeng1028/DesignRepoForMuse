from PIL import Image
import numpy as np, os
ROOT = '/home/hatch/workspace/DesignRepoForMuse'
J = os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.3/judge')
R = os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.5')
def mode_color(path, inset=0.08):
    im = Image.open(path).convert('RGB')
    a = np.array(im).astype(int)
    h, w = a.shape[0], a.shape[1]
    x0, x1 = int(w * inset), int(w * (1 - inset))
    y0, y1 = int(h * inset), int(h * (1 - inset))
    flat = a[y0:y1, x0:x1, :].reshape(-1, 3)
    vals, cnts = np.unique(flat, axis=0, return_counts=True)
    i = int(np.argmax(cnts))
    return im.size, tuple(vals[i]), float(cnts[i] / len(flat))
print('--- orig crops (v1.3 judge) mode in inset 8% ---')
for f in ['orig-welcome.jpg', 'orig-home-cn.jpg', 'orig-lisbon-cn.jpg', 'orig-language.jpg', 'orig-pricing.jpg', 'orig-picker.jpg', 'orig-home-en.jpg', 'orig-lisbon-en.jpg', 'orig-credits.jpg']:
    p = os.path.join(J, f)
    if os.path.exists(p):
        print(f, mode_color(p))
print('--- v1.5 renders mode in inset 8% ---')
for f in ['welcome-dark.png', 'chat-dark-lisbon-en.png', 'chat-dark-lisbon-cn.png', 'pricing-dark.png', 'model-picker-a.png', 'model-picker-b.png', 'search-drawer-dark.png', 'agent-team-dark.png', 'chat-dark-kyoto-en.png']:
    p = os.path.join(R, f)
    if os.path.exists(p):
        print(f, mode_color(p))
print('--- welcome 0.45 block bbox: exact (15,18,23) in y545-575, x250-320 ---')
strip = Image.open(os.path.join(ROOT, 'UIDesign/docs/references/medley/medley-4-screens-chinese-hd.jpg')).convert('RGB')
crop = strip.crop((20, 15, 580, 1260))
a = np.array(crop).astype(int)
m = (a[:, :, 0] == 15) & (a[:, :, 1] == 18) & (a[:, :, 2] == 23)
sub = m[545:576, 250:321]
ys, xs = np.where(sub)
print('bbox x', 250 + int(xs.min()), 250 + int(xs.max()), 'y', 545 + int(ys.min()), 545 + int(ys.max()), 'count', int(sub.sum()))
for y in range(545, 576):
    row = np.where(m[y, 250:321])[0]
    if len(row):
        print(f'y={y} strip-y={y+15} x {250+int(row.min())}-{250+int(row.max())} n={len(row)}')
print('strip-coord block alignment: x268 strip=288 div8=', 288 / 8, 'y553 strip=568 div8=', 568 / 8)
print('--- welcome interior inset corners (patch median 11x11) ---')
for lab, xf, yf in [('TL', 0.08, 0.08), ('TR', 0.88, 0.08), ('BL', 0.08, 0.92), ('BR', 0.88, 0.92), ('midL', 0.08, 0.60), ('midR', 0.88, 0.60)]:
    h, w = a.shape[0], a.shape[1]
    x, y = int(xf * w), int(yf * h)
    p = a[y - 5:y + 6, x - 5:x + 6].reshape(-1, 3)
    print(lab, f'({x},{y})', tuple(int(v) for v in np.median(p, axis=0)))
print('--- top-right status zone (23,27,30) count x400-512, y20-60 ---')
z = m  # reuse name? no, recompute
m23 = (a[:, :, 0] == 23) & (a[:, :, 1] == 27) & (a[:, :, 2] == 30)
print('count', int(m23[20:61, 400:513].sum()), 'of', 41 * 113)
ys, xs = np.where(m23[20:61, 400:513])
if len(xs):
    print('sample locs', [(400 + int(xs[i]), 20 + int(ys[i])) for i in range(min(10, len(xs)))])
print('--- empty band restricted y700-940, x20-500: exact frac ---')
band = a[700:941, 20:501, :].reshape(-1, 3)
print('exact (17,21,24):', float(((band[:, 0] == 17) & (band[:, 1] == 21) & (band[:, 2] == 24)).mean()))
