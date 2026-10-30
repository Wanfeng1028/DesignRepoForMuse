from PIL import Image
import numpy as np, os, sys
from collections import Counter
ROOT = '/home/hatch/workspace/DesignRepoForMuse'
J = os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.3/judge')
R = os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.6/post6')
def clusters_1d(xs):
    if len(xs) == 0:
        return []
    out = []; s = xs[0]; p = xs[0]
    for x in xs[1:]:
        if x - p > 5:
            out.append((int(s), int(p))); s = x
        p = x
    out.append((int(s), int(p)))
    return out
def phone_geom_cn(a, bg):
    H, W = a.shape[0], a.shape[1]
    dm = (np.abs(a - np.array(bg)).max(axis=2) > 40)
    # indicator rows 1214-1218 in crop coords for chinese crops
    y = 1216
    xs = np.where(dm[y, :])[0]
    cl = clusters_1d(xs)
    cx = W // 2
    cen = [c for c in cl if c[0] <= cx <= c[1]]
    ic = (cen[0][0] + cen[0][1]) / 2 if cen else W / 2
    xoff = ic - 280
    return (18, 0.6964, xoff)
def phone_geom_detail(a, bg):
    H, W = a.shape[0], a.shape[1]
    dm = (np.abs(a - np.array(bg)).max(axis=2) > 40)
    # find indicator: bottom 40 rows, centred cluster width 95-115
    best = None
    for y in range(H - 40, H):
        xs = np.where(dm[y, :])[0]
        cl = clusters_1d(xs)
        cx = W // 2
        cen = [c for c in cl if c[0] <= cx <= c[1] and 90 <= c[1] - c[0] + 1 <= 115]
        if cen:
            best = (y, (cen[0][0] + cen[0][1]) / 2)
    if best is None:
        return (30, 1.0, 0)
    y, ic = best
    phone_bottom = y + 9
    top = phone_bottom - 844
    xoff = ic - 195
    return (top, 1.0, xoff)
def bands(a, bg, top, sc, xoff, minc=8):
    dm = (np.abs(a - np.array(bg)).max(axis=2) > 40)
    # restrict to phone INTERIOR rect (20px inset each side kills bezel columns)
    H, W = a.shape[0], a.shape[1]
    x0 = int(round(xoff)) + 20; x1 = int(round(xoff + 390 / sc)) - 20
    y0 = int(round(top)); y1 = int(round(top + 844 / sc))
    sub = np.zeros_like(dm)
    sub[max(0, y0):min(H, y1), max(0, x0):min(W, x1)] = dm[max(0, y0):min(H, y1), max(0, x0):min(W, x1)]
    dm = sub
    cnt = dm.sum(axis=1)
    out = []; ing = False
    for y, c in enumerate(cnt):
        if c >= minc and not ing:
            s = y; ing = True
        if c < minc and ing:
            e = y - 1; ing = False
            ys, xs = np.where(dm[s:e + 1, :])
            out.append(((s - top) * sc, (e - top) * sc, (int(xs.min()) - xoff) * sc, (int(xs.max()) - xoff) * sc))
    if ing:
        e = len(cnt) - 1
        ys, xs = np.where(dm[s:e + 1, :])
        out.append(((s - top) * sc, (e - top) * sc, (int(xs.min()) - xoff) * sc, (int(xs.max()) - xoff) * sc))
    return out
def top_colors(a, bg, top, sc, xoff):
    H, W = a.shape[0], a.shape[1]
    y0 = int(top); y1 = int(top + 844 / sc)
    x0 = int(round(xoff)); x1 = int(round(xoff + 390 / sc))
    sub = a[y0:min(y1, H), max(0, x0):min(W, x1), :].reshape(-1, 3)
    dm = (np.abs(sub - np.array(bg)).max(axis=1) > 40)
    px = sub[dm]
    c = Counter(map(tuple, px.tolist()))
    return [(col, round(n / max(1, len(px)), 3)) for col, n in c.most_common(6)]
CASES = [
    ('home-cn', 'orig-home-cn.jpg', (255, 255, 255), 'home-light-cn.png', (255, 255, 255), 'cn'),
    ('lisbon-cn', 'orig-lisbon-cn.jpg', (17, 21, 24), 'chat-dark-lisbon-cn.png', (17, 21, 24), 'cn'),
    ('language', 'orig-language.jpg', (255, 255, 255), 'language-light.png', (253, 253, 253), 'cn'),
    ('home-en', 'orig-home-en.jpg', (245, 246, 248), 'home-light-en.png', (245, 246, 248), 'detail'),
    ('lisbon-en', 'orig-lisbon-en.jpg', (17, 21, 24), 'chat-dark-lisbon-en.png', (17, 21, 24), 'detail'),
    ('pricing', 'orig-pricing.jpg', (17, 21, 24), 'pricing-dark.png', (17, 21, 24), 'detail'),
    ('picker-a', 'orig-picker.jpg', (17, 21, 24), 'model-picker-a.png', (17, 21, 24), 'detail'),
    ('credits', 'orig-credits.jpg', (245, 246, 248), 'credits-light.png', (245, 246, 248), 'detail'),
]
only = sys.argv[1] if len(sys.argv) > 1 else None
for name, of, obg, rf, rbg, kind in CASES:
    if only and name != only:
        continue
    oa = np.array(Image.open(os.path.join(J, of)).convert('RGB')).astype(int)
    ra = np.array(Image.open(os.path.join(R, rf)).convert('RGB')).astype(int)
    if kind == 'cn':
        top, sc, xoff = phone_geom_cn(oa, obg)
    else:
        top, sc, xoff = phone_geom_detail(oa, obg)
    ob = bands(oa, obg, top, sc, xoff)
    rb = bands(ra, rbg, 0, 1.0, 0)
    print(f'===== {name} orig geom top={top} sc={sc:.3f} xoff={xoff:.1f} bands={len(ob)} render bands={len(rb)} =====')
    print('ORIG bands (top,bottom,left,right) phone coords:')
    for b in ob:
        print('  ', tuple(round(v, 1) for v in b))
    print('RENDER bands:')
    for b in rb:
        print('  ', tuple(round(v, 1) for v in b))
    print('ORIG top colors:', top_colors(oa, obg, top, sc, xoff))
    print('RENDER top colors:', top_colors(ra, rbg, 0, 1.0, 0))
