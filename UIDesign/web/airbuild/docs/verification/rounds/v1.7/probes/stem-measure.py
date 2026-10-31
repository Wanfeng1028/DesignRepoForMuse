import json, statistics
from PIL import Image
DSF = 3
meta = json.load(open('stem-shots/stem-meta.json'))
def measure(png, gx, gw, side, band_lo, band_hi, cap_gx=None, cap_gw=None):
    im = Image.open(png).convert('L')
    W, H = im.size
    px = im.load()
    x0, x1 = int(round(gx * DSF)), int(round((gx + gw) * DSF))
    dark = [[1 if px[x, y] < 128 else 0 for x in range(x0, min(x1, W))] for y in range(H)]
    rows = [y for y in range(H) if any(dark[y])]
    if not rows: return None
    top, bot = rows[0], rows[-1]
    capH = (bot - top + 1) / DSF
    if cap_gx is not None:
        cx0, cx1 = int(round(cap_gx * DSF)), int(round((cap_gx + cap_gw) * DSF))
        crows = [y for y in range(H) if any(1 if px[x, y] < 128 else 0 for x in range(cx0, min(cx1, W)))]
        capH = (crows[-1] - crows[0] + 1) / DSF
    lo = top + int((bot - top) * band_lo); hi = top + int((bot - top) * band_hi)
    stems = []
    for y in range(lo, hi + 1):
        row = dark[y]
        if side == 'left':
            i = 0
            while i < len(row) and row[i] == 0: i += 1
            j = i
            while j < len(row) and row[j] == 1: j += 1
            if j > i: stems.append((j - i) / DSF)
        else:
            i = len(row) - 1
            while i >= 0 and row[i] == 0: i -= 1
            j = i
            while j >= 0 and row[j] == 1: j -= 1
            if i > j: stems.append((i - j) / DSF)
    stem = statistics.median(stems) if stems else None
    return {'stem_px': stem, 'capH_px': round(capH, 2), 'ratio': round(stem / capH, 4) if stem else None, 'rows': len(stems)}
out = {}
for k in ['h1-600', 'h1-700', 'h1-800']:
    g = meta[k]['glyph']; out[k] = measure('stem-shots/%s.png' % k, g['x'], g['w'], 'left', 0.30, 0.70)
for k in ['h2-600', 'h2-700', 'h2-800']:
    g = meta[k]['glyph']; c = meta[k]['cap']; out[k] = measure('stem-shots/%s.png' % k, g['x'], g['w'], 'right', 0.55, 0.90, c['x'], c['w'])
for k in ['H-600', 'H-700', 'H-800']:
    g = meta[k]['glyph']; out[k] = measure('stem-shots/%s.png' % k, g['x'], g['w'], 'left', 0.30, 0.70)
g = meta['liveH1']['glyph']; out['liveH1'] = measure('stem-shots/live-h1.png', g['x'], g['w'], 'left', 0.30, 0.70)
g = meta['liveH2']['glyph']; c = meta['liveH2']['cap']; out['liveH2'] = measure('stem-shots/live-h2.png', g['x'], g['w'], 'right', 0.55, 0.90, c['x'], c['w'])
print(json.dumps(out, indent=1, ensure_ascii=False))
json.dump(out, open('stem-results.json', 'w'), indent=1, ensure_ascii=False)
