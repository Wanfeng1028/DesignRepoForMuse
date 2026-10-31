from PIL import Image
import numpy as np
im = Image.open('/home/hatch/workspace/user/media_library/image/photo-9.jpg').convert('L')
a = np.array(im).astype(int)
H, W = a.shape
print('size', W, H)
gx = np.abs(np.diff(a, axis=1)).sum(axis=0)
gy = np.abs(np.diff(a, axis=0)).sum(axis=1)
# top vertical edges: columns with strong gradient in top half rows 100..1900
gx_top = np.abs(np.diff(a[:1900, :], axis=1)).sum(axis=0)
idx = np.argsort(gx_top)[::-1][:25]
print('top-half vertical edge cols (sorted by col):', sorted([(int(i), int(gx_top[i])) for i in idx]))
gy_left = np.abs(np.diff(a[:, :650], axis=0)).sum(axis=1)
idy = np.argsort(gy_left)[::-1][:25]
print('left-half horizontal edge rows:', sorted([(int(i), int(gy_left[i])) for i in idy]))
# row means in bands to find gutters
for y in range(0, H, 100):
    print('rowband', y, 'mean', int(a[y:y+100, :].mean()))
