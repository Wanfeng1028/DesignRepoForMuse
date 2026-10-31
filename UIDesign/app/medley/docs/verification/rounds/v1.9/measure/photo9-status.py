from PIL import Image
import numpy as np
im = Image.open('/home/hatch/workspace/user/media_library/image/photo-9.jpg').convert('RGB')
a = np.array(im).astype(int)
g = a.mean(axis=2)
H, W = g.shape
def bbox(mask):
    ys, xs = np.where(mask)
    if len(xs) == 0: return None
    return (int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max()), len(xs))
# time text: bright on dark, top-left phone region
print('time bright>180 x[90,400] y[80,320]:', bbox((g[80:320, 90:400] > 180)))
# refine: use sub-array coords offset
m = (g[80:320, 90:400] > 180)
ys, xs = np.where(m)
print(' time rows range', ys.min()+80, ys.max()+80, 'cols', xs.min()+90, xs.max()+90)
# per-row bright counts in that box to find text band
for y in range(80, 320, 10):
    print('  rowband', y, 'bright', int((g[y:y+10, 90:400] > 180).sum()))
# icons: bright pixels right side top
print('icons bright>180 x[400,660] y[80,320]:', bbox((g[80:320, 400:660] > 180)))
m2 = (g[80:320, 400:660] > 180)
ys, xs = np.where(m2)
if len(xs): print(' icons rows', ys.min()+80, ys.max()+80, 'cols', xs.min()+400, xs.max()+400)
# home indicator top-left phone: gray bar, search y 1500..2000, x 90..660, brightness 90..210, and R~G~B
gray = (np.abs(a[:,:,0]-a[:,:,1]) < 12) & (g > 90) & (g < 215)
for y in range(1500, 2050, 50):
    cnt = int(gray[y:y+50, 90:660].sum())
    print('  homeband', y, 'graypx', cnt)
m3 = gray[1500:2050, 90:660]
ys, xs = np.where(m3)
# cluster rows with most gray
import collections
rows = collections.Counter((ys+1500).tolist())
print(' home top rows by count:', rows.most_common(8))
