from PIL import Image
import numpy as np, os, json
BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = '/home/hatch/workspace/DesignRepoForMuse'
HD = os.path.join(ROOT, 'UIDesign', 'docs', 'references', 'medley', 'medley-4-screens-chinese-hd.jpg')
OLD = os.path.join(ROOT, 'UIDesign', 'app', 'medley', 'docs', 'verification', 'rounds', 'v1.3', 'judge', 'orig-welcome.jpg')
OUT = os.path.join(BASE, '..')
strip = Image.open(HD).convert('RGB')
crop = strip.crop((20, 15, 580, 1260))
crop.save(os.path.join(OUT, 'refs', 'welcome-panel-fresh.png'))
old = Image.open(OLD).convert('RGB')
print('fresh crop size', crop.size, 'old crop size', old.size)
a = np.array(crop).astype(int)
b = np.array(old).astype(int)
print('fresh vs old max abs diff', int(np.abs(a - b).max()), 'mean abs diff', float(np.abs(a - b).mean()))
def patch_med(arr, xf, yf, r=5):
    h, w = arr.shape[0], arr.shape[1]
    x, y = int(xf * w), int(yf * h)
    p = arr[max(0, y - r):y + r + 1, max(0, x - r):x + r + 1]
    med = tuple(int(v) for v in np.median(p.reshape(-1, 3), axis=0))
    mean = tuple(int(v) for v in p.reshape(-1, 3).mean(axis=0))
    return med, mean
print('--- grid reproduce: rows y frac, cols x 0.1/0.5/0.9, patch 11x11 median (mean) ---')
for yf in [0.05, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95]:
    row = []
    for xf in [0.1, 0.5, 0.9]:
        med, mean = patch_med(a, xf, yf)
        row.append(f'x{xf}: med{med} mean{mean}')
    print(f'y={yf}: ' + ' | '.join(row))
print('--- single-pixel values at same points (for comparison) ---')
for yf in [0.05, 0.45, 0.95]:
    for xf in [0.1, 0.5, 0.9]:
        h, w = a.shape[0], a.shape[1]
        print(f'x{xf} y{yf} px={tuple(a[int(yf*h), int(xf*w)])}')
print('--- full-panel background scan: rows median every 5 pct, cols median ---')
for yf in [i / 20 for i in range(1, 20)]:
    h, w = a.shape[0], a.shape[1]
    y = int(yf * h)
    band = a[max(0, y - 3):y + 4, :, :]
    print(f'rowband y={yf}: median {tuple(int(v) for v in np.median(band.reshape(-1, 3), axis=0))}')
for xf in [0.1, 0.3, 0.5, 0.7, 0.9]:
    w = a.shape[1]
    x = int(xf * w)
    band = a[:, max(0, x - 3):x + 4, :]
    print(f'colband x={xf}: median {tuple(int(v) for v in np.median(band.reshape(-1, 3), axis=0))}')
