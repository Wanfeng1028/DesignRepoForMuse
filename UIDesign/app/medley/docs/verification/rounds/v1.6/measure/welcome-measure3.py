from PIL import Image
import numpy as np, os
ROOT = '/home/hatch/workspace/DesignRepoForMuse'
strip = Image.open(os.path.join(ROOT, 'UIDesign/docs/references/medley/medley-4-screens-chinese-hd.jpg')).convert('RGB')
orig = np.array(strip.crop((20, 15, 580, 1260)).convert('RGB')).astype(int)
rend = np.array(Image.open(os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.6/pre/welcome-dark.png')).convert('RGB')).astype(int)
def rowbox(a, mask, y0, y1):
    ys, xs = np.where(mask[y0:y1, :])
    if len(xs) == 0:
        return None
    return (int(xs.min()), y0 + int(ys.min()), int(xs.max()), y0 + int(ys.max()))
def diffmask(a, bg):
    return (np.abs(a - np.array(bg)).max(axis=2) > 40)
for name, a, bg in [('ORIG', orig, (17, 21, 24)), ('RENDER', rend, (18, 19, 22))]:
    H = a.shape[0]
    dm = diffmask(a, bg)
    print(f'===== {name} row-restricted boxes =====')
    if name == 'ORIG':
        print('status time rows 31-48:', rowbox(a, dm, 31, 49))
        print('logo rows 92-128:', rowbox(a, dm, 92, 129))
        print('title rows 454-497:', rowbox(a, dm, 454, 498))
        print('sub1 rows 537-557:', rowbox(a, dm, 537, 558))
        print('sub2 rows 575-591:', rowbox(a, dm, 575, 592))
        print('try label rows 1063-1078:', rowbox(a, dm, 1063, 1079))
        print('foot1 rows 1132-1146:', rowbox(a, dm, 1132, 1147))
        print('foot2 rows 1155-1165:', rowbox(a, dm, 1155, 1166))
    else:
        print('status time rows 15-27:', rowbox(a, dm, 15, 28))
        print('logo rows 56-81:', rowbox(a, dm, 56, 82))
        print('title rows 312-342:', rowbox(a, dm, 312, 343))
        print('sub1 rows 376-388:', rowbox(a, dm, 376, 389))
        print('sub2 rows 403-415:', rowbox(a, dm, 403, 416))
        print('try label rows 727-737:', rowbox(a, dm, 727, 738))
        print('foot1 rows 776-787:', rowbox(a, dm, 776, 788))
        print('foot2 rows 794-802:', rowbox(a, dm, 794, 803))
    # Try borders: horizontal runs of near-border color
    for col in [(45, 49, 52), (42, 44, 49)]:
        m = (np.abs(a[:, :, 0] - col[0]) <= 5) & (np.abs(a[:, :, 1] - col[1]) <= 5) & (np.abs(a[:, :, 2] - col[2]) <= 5)
        cnt = m.sum(axis=1)
        ylo, yhi = (int(H * 0.78), int(H * 0.92)) if name == 'ORIG' else (int(H * 0.80), int(H * 0.92))
        print(f'  border-ish {col} rows count>200 in {ylo}-{yhi}:', [(y, int(cnt[y])) for y in range(ylo, yhi) if cnt[y] > 200])
    # home indicator orig/render: rows near bottom, median color of bar pixels
    if name == 'ORIG':
        for y in range(1210, 1222):
            xs = np.where(dm[y, :])[0]
            print(f'  orig y={y} diff n={len(xs)} x {int(xs.min()) if len(xs) else -1}-{int(xs.max()) if len(xs) else -1} median color of diff px:', tuple(int(v) for v in np.median(a[y, xs], axis=0)) if len(xs) else None)
        print('  orig bottom centre col x280 y1200-1244:', [tuple(a[y, 280]) for y in range(1200, 1245, 2)])
    else:
        for y in range(828, 840):
            xs = np.where(dm[y, :])[0]
            print(f'  rend y={y} diff n={len(xs)} x {int(xs.min()) if len(xs) else -1}-{int(xs.max()) if len(xs) else -1}')
    # subtitle/footnote core colors: median of diff pixels in line bands (excluding dot/button)
    def core(y0, y1, x0=0, x1=9999):
        m = dm[y0:y1, x0:x1]
        px = a[y0:y1, x0:x1, :][m]
        return tuple(int(v) for v in np.median(px, axis=0)) if len(px) else None, len(px)
    if name == 'ORIG':
        print('  sub1 core:', core(537, 558))
        print('  sub2 core:', core(575, 592))
        print('  foot1 core:', core(1132, 1147))
        print('  title core:', core(454, 498))
    else:
        print('  sub1 core:', core(376, 389))
        print('  sub2 core:', core(403, 416))
        print('  foot1 core:', core(776, 788))
        print('  title core:', core(312, 343))
print('--- cross-screen insets: orig vs render first-content left ---')
# home-cn, lisbon-cn, language from chinese strip panels: need panel x offsets. Use v1.3 orig crops for left-inset only (left edge of crop ~ phone left + few px; compare RELATIVE left of text vs button/card within same crop, and render same)
import glob
for f in ['orig-home-cn.jpg', 'orig-lisbon-cn.jpg', 'orig-language.jpg']:
    p = os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.3/judge', f)
    a = np.array(Image.open(p).convert('RGB')).astype(int)
    print(f, 'size', a.shape[1], a.shape[0])
