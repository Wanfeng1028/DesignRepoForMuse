from PIL import Image
import numpy as np, os
ROOT = '/home/hatch/workspace/DesignRepoForMuse'
strip = Image.open(os.path.join(ROOT, 'UIDesign/docs/references/medley/medley-4-screens-chinese-hd.jpg')).convert('RGB')
orig = np.array(strip.crop((20, 15, 580, 1260)).convert('RGB')).astype(int)
# home-cn panel: use v1.3 crop
J = os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.3/judge')
hc = np.array(Image.open(os.path.join(J, 'orig-home-cn.jpg')).convert('RGB')).astype(int)
rend = np.array(Image.open(os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.6/post2/home-light-cn.png')).convert('RGB')).astype(int)
# home-cn crop geom: indicator centre 287 -> xoff 7; top 18; scale 0.6964
def phone_y(crop_y):
    return (crop_y - 18) * 0.6964
def border_rows(a, col, tol, y0, y1, x0, x1, mincount):
    m = (np.abs(a[:, :, 0] - col[0]) <= tol) & (np.abs(a[:, :, 1] - col[1]) <= tol) & (np.abs(a[:, :, 2] - col[2]) <= tol)
    cnt = m[:, x0:x1].sum(axis=1)
    return [(y, int(cnt[y])) for y in range(y0, y1) if cnt[y] >= mincount]
print('ORIG home-cn light-divider-ish rows (230,231,234)+-8, x100-500 crop, y650-800 crop:')
print(border_rows(hc, (230, 231, 234), 8, 650, 820, 100, 500, 250))
print('as phone coords:', [(round(phone_y(y), 1), c) for y, c in border_rows(hc, (230, 231, 234), 8, 650, 820, 100, 500, 250)])
print('RENDER home-cn divider rows (230,231,234)+-8, x60-360, y450-800:')
print(border_rows(rend, (230, 231, 234), 8, 450, 800, 60, 360, 200))
print('ORIG home-cn: suggestion row glyph bands detail (diff vs white, interior x):')
dm = (np.abs(hc - np.array((255, 255, 255))).max(axis=2) > 40)
for y0 in range(700, 820, 10):
    pass
# input bar top: light theme bar has border + shadow; find first row below suggestions with long light-divider run near bottom
print('ORIG input bar zone divider rows y1050-1245 crop:')
print(border_rows(hc, (230, 231, 234), 8, 1050, 1245, 100, 500, 200))
print('RENDER input bar zone divider rows y700-844:')
print(border_rows(rend, (230, 231, 234), 8, 700, 844, 60, 360, 150))
# orig greeting/mark/input tops in phone coords for reference
print('ORIG mark band phone:', round(phone_y(413 / 0.6964 + 18) if False else 0, 1))
# simpler: print orig crop row-group bands for home-cn interior (already have phone bands); print input placeholder text band
print('ORIG crop rows 1080-1245 diff counts (interior x 60-520):')
cnt = dm[:, 60:521].sum(axis=1)
for y in range(1080, 1245):
    if cnt[y] >= 8:
        print(f'  crop y={y} phone={phone_y(y):.1f} cnt={int(cnt[y])}')
