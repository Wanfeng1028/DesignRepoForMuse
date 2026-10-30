from PIL import Image
import numpy as np, os
ROOT = '/home/hatch/workspace/DesignRepoForMuse'
OUT = os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.6/refs')
strip = Image.open(os.path.join(ROOT, 'UIDesign/docs/references/medley/medley-4-screens-chinese-hd.jpg')).convert('RGB')
crop = strip.crop((20, 15, 580, 1260))
a = np.array(crop).astype(int)
h, w = a.shape[0], a.shape[1]
print('panel', w, h)
# 1. where do (23,27,30)-ish pixels live? exact and near (+-2)
for name, tgt in [('exact 23,27,30', (23, 27, 30)), ('exact 15,18,23', (15, 18, 23)), ('exact 17,21,24', (17, 21, 24))]:
    m = (a[:, :, 0] == tgt[0]) & (a[:, :, 1] == tgt[1]) & (a[:, :, 2] == tgt[2])
    ys, xs = np.where(m)
    print(name, 'count', int(m.sum()), f'({100 * m.mean():.2f}%)')
    if len(xs) and name != 'exact 17,21,24':
        print('  x range', int(xs.min()), int(xs.max()), 'y range', int(ys.min()), int(ys.max()))
        # histogram by region
        for ylo, yhi, lab in [(0, 120, 'top 0-120'), (120, 400, '120-400'), (400, 700, '400-700'), (700, 1000, '700-1000'), (1000, 1245, '1000+')]:
            sel = (ys >= ylo) & (ys < yhi)
            print(f'   {lab}: {int(sel.sum())}  x {int(xs[sel].min()) if sel.any() else -1}-{int(xs[sel].max()) if sel.any() else -1}')
# 2. top-right corner zoom: print pixel grid coarse: sample every 4 px in x 480-560, y 0-140, median per 4x4 block as hex-ish
print('--- top-right corner block medians (8x8 blocks, x 480..560, y 0..160) ---')
for y0 in range(0, 161, 16):
    row = []
    for x0 in range(480, 545, 16):
        blk = a[y0:y0 + 16, x0:x0 + 16].reshape(-1, 3)
        med = tuple(int(v) for v in np.median(blk, axis=0))
        row.append(f'({x0},{y0}){med}')
    print(' | '.join(row))
print('--- top edge row y=2,10,30: x every 20 ---')
for y in [2, 5, 10, 20, 30, 50]:
    print(f'y={y}:', [tuple(a[y, x]) for x in range(0, 560, 40)])
print('--- right edge col x=555,550,540: y every 60 ---')
for x in [559, 555, 550, 540, 520]:
    print(f'x={x}:', [tuple(a[y, x]) for y in range(0, 1245, 120)])
print('--- 0.45 centre neighbourhood: pixels around (280,560), 21x21, values != (17,21,24) ---')
cx, cy = 280, int(0.45 * h)
sub = a[cy - 15:cy + 16, cx - 15:cx + 16]
for dy in range(sub.shape[0]):
    line = []
    for dx in range(sub.shape[1]):
        v = tuple(sub[dy, dx])
        line.append('.' if v == (17, 21, 24) else f'{v}')
    print(f'y={cy - 15 + dy}:', ' '.join(line))
# extent of the dark dip: connected-ish bounding box of pixels <= (16,20,23) in box x 200-360, y 500-620
box = a[500:621, 200:361]
dark = (box[:, :, 0] <= 16) & (box[:, :, 1] <= 20) & (box[:, :, 2] <= 23)
ys, xs = np.where(dark)
print('dark-dip box count', int(dark.sum()), 'x', 200 + int(xs.min()), '-', 200 + int(xs.max()), 'y', 500 + int(ys.min()), '-', 500 + int(ys.max()))
# 3. gradient test on bg-only empty band: y 700-950 (between subtitle and buttons), all x; and left strip
for lab, reg in [('empty band y700-950 all x', a[700:951, :, :]), ('left strip x10-50 all y', a[:, 10:51, :]), ('right strip x510-550 y100-700', a[100:701, 510:551, :])]:
    flat = reg.reshape(-1, 3)
    med = tuple(int(v) for v in np.median(flat, axis=0))
    frac_exact = float(((flat[:, 0] == 17) & (flat[:, 1] == 21) & (flat[:, 2] == 24)).mean())
    print(f'{lab}: median {med} exact(17,21,24) frac {frac_exact:.3f} unique {len(np.unique(flat, axis=0))}')
    # per-row median slope check: first vs last quarter medians
    n = reg.shape[0]
    for q, part in [('q1', reg[:n // 4]), ('q4', reg[3 * n // 4:])]:
        f2 = part.reshape(-1, 3)
        print(f'   {q} median {tuple(int(v) for v in np.median(f2, axis=0))}')
# 4. enlarged zone images for visual check
crop.crop((480, 0, 560, 200)).resize((320, 800), Image.NEAREST).save(os.path.join(OUT, 'bg-zoom-topright.png'))
crop.crop((200, 480, 360, 640)).resize((640, 640), Image.NEAREST).save(os.path.join(OUT, 'bg-zoom-centre045.png'))
crop.crop((0, 650, 560, 1000)).resize((560, 350), Image.NEAREST).save(os.path.join(OUT, 'bg-zoom-emptyband.png'))
crop.resize((280, 623), Image.NEAREST).save(os.path.join(OUT, 'bg-panel-half.png'))
print('zooms saved')
