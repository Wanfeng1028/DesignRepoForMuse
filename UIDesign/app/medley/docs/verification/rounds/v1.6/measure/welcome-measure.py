from PIL import Image
import numpy as np, os
ROOT = '/home/hatch/workspace/DesignRepoForMuse'
strip = Image.open(os.path.join(ROOT, 'UIDesign/docs/references/medley/medley-4-screens-chinese-hd.jpg')).convert('RGB')
orig = np.array(strip.crop((20, 15, 580, 1260)).convert('RGB')).astype(int)
rend = np.array(Image.open(os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.6/pre/welcome-dark.png')).convert('RGB')).astype(int)
S = 390 / 560  # width scale orig -> render
def bands(a, mask, y0, y1, label, mincount=3):
    cnt = mask[y0:y1, :].sum(axis=1)
    groups = []
    ing = False
    for i, c in enumerate(cnt):
        if c >= mincount and not ing:
            s = y0 + i; ing = True
        if c < mincount and ing:
            e = y0 + i - 1; ing = False; groups.append((s, e))
    if ing:
        groups.append((s, y1 - 1))
    print(f'{label}: {groups}')
    return groups
def bbox(a, mask, y0, y1):
    ys, xs = np.where(mask[y0:y1, :])
    if len(xs) == 0:
        return None
    return (int(xs.min()), y0 + int(ys.min()), int(xs.max()), y0 + int(ys.max()))
def report(name, a, H, W, is_orig):
    print(f'===== {name} size {W}x{H} {"orig" if is_orig else "render"} =====')
    bright = (a[:, :, 0] > 200) & (a[:, :, 1] > 200) & (a[:, :, 2] > 200)
    # status bar: top 8% rows
    print('status bright bbox top8%:', bbox(a, bright, 0, int(H * 0.08)))
    bands(a, bright, 0, int(H * 0.08), 'status bright row groups')
    # logo row: rows 5-15%
    print('logo bright bbox 5-15%:', bbox(a, bright, int(H * 0.05), int(H * 0.15)))
    # title: white glyph core: rows 30-50%
    print('title bright bbox 30-50%:', bbox(a, bright, int(H * 0.30), int(H * 0.50)))
    bands(a, bright, int(H * 0.30), int(H * 0.50), 'title bright row groups')
    # orange dot
    orange = (a[:, :, 0] > 200) & (a[:, :, 1] > 80) & (a[:, :, 1] < 150) & (a[:, :, 2] < 80)
    ys, xs = np.where(orange[int(H * 0.30):int(H * 0.50), :])
    # restrict dot to title row band: use title bbox rows if found
    print('orange bbox 30-50% (incl logo wedge):', bbox(a, orange, int(H * 0.30), int(H * 0.50)) if len(xs) else None)
    # subtitle gray: pixels 60-200, near-gray
    gray = (np.abs(a[:, :, 0] - a[:, :, 1]) < 10) & (a[:, :, 0] > 60) & (a[:, :, 0] < 200)
    print('subtitle gray bbox 40-55%:', bbox(a, gray, int(H * 0.40), int(H * 0.55)))
    bands(a, gray, int(H * 0.40), int(H * 0.55), 'subtitle gray row groups')
    # buttons: light pixels >200,>200,>220 in bottom 30%
    light = (a[:, :, 0] > 200) & (a[:, :, 1] > 200) & (a[:, :, 2] > 210)
    print('light bbox bottom30%:', bbox(a, light, int(H * 0.70), H))
    bands(a, light, int(H * 0.70), H, 'light row groups')
    # footnote gray below buttons
    print('footnote gray bbox 85-100%:', bbox(a, gray, int(H * 0.85), H))
    bands(a, gray, int(H * 0.85), H, 'footnote gray row groups')
    # home indicator: gray bar near bottom: rows 95-100%, count per row
    cnt = gray[int(H * 0.95):, :].sum(axis=1)
    print('home-indicator rows 95-100% counts:', [(int(H * 0.95) + i, int(c)) for i, c in enumerate(cnt) if c > 20])
    # bg samples
    print('bg centre patch:', tuple(a[int(H * 0.65), int(W * 0.5)]), 'left patch:', tuple(a[int(H * 0.65), int(W * 0.1)]))
report('ORIG', orig, 1245, 560, True)
report('RENDER-pre', rend, 844, 390, False)
print(f'width scale S={S:.4f}; orig px * S = render-equiv px')
print('orig title bright height equiv: see bands above; orig button light height equiv likewise')
