from PIL import Image
import numpy as np
im = Image.open('/home/hatch/workspace/user/media_library/image/photo-9.jpg').convert('RGB')
a = np.array(im).astype(int); g = a.mean(axis=2)
def band(mask, label):
    ys, xs = np.where(mask)
    if len(xs)==0: print(label, 'none'); return
    print(f'{label}: x {xs.min()}-{xs.max()} (w {xs.max()-xs.min()+1}) y {ys.min()}-{ys.max()} (h {ys.max()-ys.min()+1}) n={len(xs)}')
# Google pill: very bright, y 1000-1300
band((g[1000:1300, 90:680] > 200), 'pill>200 (offset x+90 y+1000)')
m = g[1000:1300, 90:680] > 200
ys, xs = np.where(m)
print(' pill rows: min/max row', ys.min()+1000, ys.max()+1000)
for y in range(1000, 1300, 20):
    c = int((g[y:y+20, 90:680] > 200).sum())
    if c: print('  pill band', y, c)
# title bright text y 600-850
band((g[600:850, 90:680] > 170), 'title>170 (offset x+90 y+600)')
# per-row title band
for y in range(600, 850):
    c = int((g[y, 90:680] > 170).sum())
    if c > 5: print('  title row', y, c)
