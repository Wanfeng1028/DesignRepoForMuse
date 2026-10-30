from PIL import Image
import numpy as np, os
ROOT = '/home/hatch/workspace/DesignRepoForMuse'
J = os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.3/judge')
R = os.path.join(ROOT, 'UIDesign/app/medley/docs/verification/rounds/v1.5')
def patch(path, xf, yf, r=5):
    im = Image.open(path).convert('RGB')
    a = np.array(im).astype(int)
    h, w = a.shape[0], a.shape[1]
    x, y = int(xf * w), int(yf * h)
    p = a[max(0, y - r):y + r + 1, max(0, x - r):x + r + 1].reshape(-1, 3)
    return tuple(int(v) for v in np.median(p, axis=0))
print('orig crops: patch medians at (0.5,0.06)=status zone, (0.1,0.3), (0.9,0.3) etc')
for f, pts in [
    ('orig-lisbon-cn.jpg', [(0.5, 0.06), (0.1, 0.30), (0.5, 0.30)]),
    ('orig-pricing.jpg', [(0.5, 0.05), (0.1, 0.20), (0.9, 0.20)]),
    ('orig-picker.jpg', [(0.5, 0.05), (0.1, 0.15), (0.9, 0.15)]),
    ('orig-lisbon-en.jpg', [(0.5, 0.05), (0.1, 0.30), (0.5, 0.30)]),
]:
    print(f, [(pt, patch(os.path.join(J, f), pt[0], pt[1])) for pt in pts])
print('render v1.5 bare: same points (status zone = phone bg)')
for f, pts in [
    ('pricing-dark.png', [(0.5, 0.03), (0.1, 0.12)]),
    ('model-picker-a.png', [(0.5, 0.03), (0.1, 0.12)]),
    ('chat-dark-lisbon-en.png', [(0.5, 0.03)]),
    ('search-drawer-dark.png', [(0.5, 0.03)]),
    ('agent-team-dark.png', [(0.5, 0.03)]),
    ('chat-dark-kyoto-en.png', [(0.5, 0.03)]),
]:
    print(f, [(pt, patch(os.path.join(R, f), pt[0], pt[1])) for pt in pts])
print('orig pricing crop: row medians across width at y=30,60,90 (top strip)')
im = Image.open(os.path.join(J, 'orig-pricing.jpg')).convert('RGB')
a = np.array(im).astype(int)
for y in [20, 40, 60, 90, 130]:
    row = a[y, 40:430, :].reshape(-1, 3)
    print(f'pricing y={y} med {tuple(int(v) for v in np.median(row, axis=0))}')
print('orig picker crop: row medians at y=20,40,60')
im = Image.open(os.path.join(J, 'orig-picker.jpg')).convert('RGB')
a = np.array(im).astype(int)
for y in [20, 40, 60, 100]:
    row = a[y, 40:390, :].reshape(-1, 3)
    print(f'picker y={y} med {tuple(int(v) for v in np.median(row, axis=0))}')
