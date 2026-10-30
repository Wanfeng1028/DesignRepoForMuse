from PIL import Image
import numpy as np, os
ROOT = '/home/hatch/workspace/DesignRepoForMuse'
strip = Image.open(os.path.join(ROOT, 'UIDesign/docs/references/medley/medley-4-screens-chinese-hd.jpg')).convert('RGB')
orig = np.array(strip.crop((20, 15, 580, 1260)).convert('RGB')).astype(int)
rend = np.array(Image.open(os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.6/pre/welcome-dark.png')).convert('RGB')).astype(int)
def band_stats(a, y0, y1, bg, label):
    m = (np.abs(a[y0:y1, :, :] - np.array(bg)).max(axis=2) > 40)
    px = a[y0:y1, :, :][m]
    g = px[:, 0].astype(float)
    print(f'{label}: n={len(px)} p50={np.percentile(g,50):.0f} p75={np.percentile(g,75):.0f} p90={np.percentile(g,90):.0f} p95={np.percentile(g,95):.0f} max={g.max():.0f}')
    # thick-stroke estimate: pixels whose 3x3 neighbourhood is all diff (interior of strokes)
    full = (np.abs(a - np.array(bg)).max(axis=2) > 40)
    core = np.zeros_like(full)
    core[1:-1, 1:-1] = full[1:-1, 1:-1] & full[:-2, 1:-1] & full[2:, 1:-1] & full[1:-1, :-2] & full[1:-1, 2:]
    cp = a[y0:y1, :, :][core[y0:y1, :]]
    if len(cp):
        cg = cp[:, 0].astype(float)
        print(f'   thick-core n={len(cp)} median={np.median(cp, axis=0)} p90={np.percentile(cg,90):.0f}')
band_stats(orig, 537, 558, (17, 21, 24), 'ORIG sub1')
band_stats(orig, 575, 592, (17, 21, 24), 'ORIG sub2')
band_stats(rend, 376, 389, (18, 19, 22), 'REND sub1')
band_stats(rend, 403, 416, (18, 19, 22), 'REND sub2')
band_stats(orig, 1132, 1147, (17, 21, 24), 'ORIG foot1')
band_stats(rend, 776, 788, (18, 19, 22), 'REND foot1')
# G badge orig: white cluster near button centre-left
band = orig[946:1020, :, :]
white = (band[:, :, 0] > 250) & (band[:, :, 1] > 250) & (band[:, :, 2] > 250)
sub = white[:, 130:221]
ys, xs = np.where(sub)
print('ORIG badge white in x130-220, y946-1019: bbox x', 130 + int(xs.min()), 130 + int(xs.max()), 'y', 946 + int(ys.min()), 946 + int(ys.max()), 'n', len(xs))
for y in range(946, 1020, 6):
    xs2 = np.where(white[y - 946, 130:221])[0]
    if len(xs2):
        print(f'  y={y} white x {130 + int(xs2.min())}-{130 + int(xs2.max())} n={len(xs2)}')
# badge border: pixels near (216,216,220) in badge zone
zone = orig[955:1010, 130:221, :]
bd = (np.abs(zone[:, :, 0] - 216) <= 6) & (np.abs(zone[:, :, 1] - 216) <= 6) & (np.abs(zone[:, :, 2] - 220) <= 6)
ys, xs = np.where(bd)
print('ORIG badge-border-ish bbox x', 130 + int(xs.min()), 130 + int(xs.max()), 'y', 955 + int(ys.min()), 955 + int(ys.max()), 'n', len(xs))
# cross-screen: v1.3 orig crops status tops + home indicators
J = os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.3/judge')
for f, bg in [('orig-home-cn.jpg', (255, 255, 255)), ('orig-lisbon-cn.jpg', (17, 21, 24)), ('orig-language.jpg', (255, 255, 255))]:
    a = np.array(Image.open(os.path.join(J, f)).convert('RGB')).astype(int)
    H, W = a.shape[0], a.shape[1]
    dm = (np.abs(a - np.array(bg)).max(axis=2) > 40)
    cnt = dm[:int(H * 0.10), :].sum(axis=1)
    rows = [(y, int(cnt[y])) for y in range(int(H * 0.10)) if cnt[y] >= 3]
    print(f'{f} {W}x{H} status diff rows top10%: first {rows[0] if rows else None} last {rows[-1] if rows else None}')
    # home indicator: bottom 8%: rows with diff count 50-300 (bar) - find bar rows
    cnt2 = dm[int(H * 0.93):, :].sum(axis=1)
    bar = [(int(H * 0.93) + i, int(c)) for i, c in enumerate(cnt2) if 50 <= c <= 400]
    print(f'   home-indicator candidate rows: {bar}')
    if bar:
        y = bar[len(bar) // 2][0]
        xs = np.where(dm[y, :])[0]
        # indicator is centred cluster: take cluster near centre
        print(f'   at y={y}: diff x range {int(xs.min())}-{int(xs.max())} n={len(xs)}')
print('RENDER home-cn/lisbon-cn/language status + indicator:')
R = os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.6/pre')
for f, bg in [('home-light-cn.png', (255, 255, 255)), ('chat-dark-lisbon-cn.png', (18, 19, 22)), ('language-light.png', (253, 253, 253))]:
    a = np.array(Image.open(os.path.join(R, f)).convert('RGB')).astype(int)
    H, W = a.shape[0], a.shape[1]
    dm = (np.abs(a - np.array(bg)).max(axis=2) > 40)
    cnt = dm[:84, :].sum(axis=1)
    rows = [(y, int(cnt[y])) for y in range(84) if cnt[y] >= 3]
    print(f'{f} status diff rows: first {rows[0] if rows else None} last {rows[-1] if rows else None}')
    cnt2 = dm[int(H * 0.93):, :].sum(axis=1)
    bar = [(int(H * 0.93) + i, int(c)) for i, c in enumerate(cnt2) if 50 <= c <= 400]
    print(f'   home-indicator rows: {bar}')
