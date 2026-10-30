from PIL import Image
import numpy as np, os
ROOT = '/home/hatch/workspace/DesignRepoForMuse'
strip = Image.open(os.path.join(ROOT, 'UIDesign/docs/references/medley/medley-4-screens-chinese-hd.jpg')).convert('RGB')
orig = np.array(strip.crop((20, 15, 580, 1260)).convert('RGB')).astype(int)
rend = np.array(Image.open(os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.6/pre/welcome-dark.png')).convert('RGB')).astype(int)
S = 390 / 560
def diffmask(a, bg):
    return (np.abs(a - np.array(bg)).max(axis=2) > 40)
def rowgroups(mask, y0, y1, mincount=5):
    cnt = mask[y0:y1, :].sum(axis=1)
    groups = []; ing = False
    for i, c in enumerate(cnt):
        if c >= mincount and not ing:
            s = y0 + i; ing = True
        if c < mincount and ing:
            groups.append((s, y0 + i - 1)); ing = False
    if ing:
        groups.append((s, y1 - 1))
    return groups, cnt
def linebox(mask, y0, y1):
    ys, xs = np.where(mask[y0:y1, :])
    if len(xs) == 0:
        return None
    return (int(xs.min()), y0 + int(ys.min()), int(xs.max()), y0 + int(ys.max()))
for name, a, bg in [('ORIG', orig, (17, 21, 24)), ('RENDER', rend, (18, 19, 22))]:
    H, W = a.shape[0], a.shape[1]
    dm = diffmask(a, bg)
    print(f'===== {name} diffmask bands =====')
    print('title zone 30-50%:', rowgroups(dm, int(H * 0.30), int(H * 0.50))[0])
    print('subtitle zone 40-55%:', rowgroups(dm, int(H * 0.40), int(H * 0.55))[0])
    print('subtitle line boxes:', linebox(dm, int(H * 0.40), int(H * 0.48)), linebox(dm, int(H * 0.46), int(H * 0.55)))
    print('button zone 70-100%:', rowgroups(dm, int(H * 0.70), H)[0])
    # Try button borders: rows with long horizontal run of border-ish color
    # orig border color approx (42,44,49); render dark-divider (42,44,49) same
    bcol = (np.abs(a[:, :, 0] - 42) <= 4) & (np.abs(a[:, :, 1] - 44) <= 4) & (np.abs(a[:, :, 2] - 49) <= 4)
    bcnt = bcol.sum(axis=1)
    print('border-color rows (count>150):', [(y, int(bcnt[y])) for y in range(int(H * 0.75), H) if bcnt[y] > 150])
    # Google button: light band
    light = (a[:, :, 0] > 200) & (a[:, :, 1] > 200) & (a[:, :, 2] > 210)
    print('google light rows:', rowgroups(light, int(H * 0.70), H, mincount=100)[0])
    print('google light box:', linebox(light, int(H * 0.70), int(H * 0.90)))
    # footnote lines: gray/diff rows below Try button
    print('footnote diff rows 85-100%:', rowgroups(dm, int(H * 0.85), H)[0])
    # home indicator: search exact-ish bar color per image
    for col, lab in [((58, 59, 64), 'render-3a3b40'), ((42, 44, 49), 'dark-divider')]:
        m = (np.abs(a[:, :, 0] - col[0]) <= 3) & (np.abs(a[:, :, 1] - col[1]) <= 3) & (np.abs(a[:, :, 2] - col[2]) <= 3)
        cnt = m[int(H * 0.93):, :].sum(axis=1)
        rows = [(int(H * 0.93) + i, int(c)) for i, c in enumerate(cnt) if c > 30]
        print(f'home-indicator candidate {lab} rows 93-100%:', rows)
        if rows:
            y = rows[len(rows) // 2][0]
            xs = np.where(m[y, :])[0]
            print(f'  at y={y}: x {int(xs.min())}-{int(xs.max())} n={len(xs)}')
    # title dot: orange mask clusters in title band
    orange = (a[:, :, 0] > 200) & (a[:, :, 1] > 80) & (a[:, :, 1] < 150) & (a[:, :, 2] < 80)
    y0, y1 = int(H * 0.30), int(H * 0.50)
    ys, xs = np.where(orange[y0:y1, :])
    print('orange pixels title band count:', len(xs))
    if len(xs):
        # cluster by x gaps > 30
        order = np.argsort(xs)
        xs_s, ys_s = xs[order], ys[order]
        clusters = []; cur = [(int(xs_s[0]), y0 + int(ys_s[0]))]
        for x, y in zip(xs_s[1:], ys_s[1:]):
            if x - cur[-1][0] > 30:
                clusters.append(cur); cur = []
            cur.append((int(x), y0 + int(y)))
        clusters.append(cur)
        for c in clusters:
            cx = [p[0] for p in c]; cy = [p[1] for p in c]
            print(f'  orange cluster n={len(c)} x {min(cx)}-{max(cx)} y {min(cy)}-{max(cy)}')
    # status bar: time glyph band + icons
    print('status diff rows top10%:', rowgroups(dm, 0, int(H * 0.10))[0])
    print('status box top10%:', linebox(dm, 0, int(H * 0.10)))
    # logo row box
    print('logo box 5-15%:', linebox(dm, int(H * 0.05), int(H * 0.15)))
    print('logo diff rows 5-15%:', rowgroups(dm, int(H * 0.05), int(H * 0.15))[0])
print('scale S =', S)
