"""Stem-width / glyph-height measurer (NOT ink coverage).
Dark pixel = luminance < 180. Groups = runs of columns with any dark pixel.
Stem width = consecutive columns from the stem edge with dark-core coverage
>= 0.6 over the glyph band. Prints ASCII art for visual verification."""
from PIL import Image

def load(path):
    im = Image.open(path).convert('RGB')
    return im, im.load()

def dark(px, x, y):
    r, g, b = px[x, y]
    return (r + g + b) / 3 < 180

def groups_in(px, x0, x1, y0, y1):
    cols = []
    for x in range(x0, x1):
        c = sum(1 for y in range(y0, y1) if dark(px, x, y))
        cols.append(c)
    groups = []
    x = x0
    while x < x1:
        if cols[x - x0] > 0:
            s = x
            while x < x1 and cols[x - x0] > 0:
                x += 1
            groups.append((s, x - 1))
        else:
            x += 1
    return groups, cols

def measure(px, x0, x1, y0, y1, glyph_idx, stem_side, label):
    groups, cols = groups_in(px, x0, x1, y0, y1)
    if glyph_idx >= len(groups):
        print(f"{label}: only {len(groups)} groups, want idx {glyph_idx}")
        return None
    gs, ge = groups[glyph_idx]
    # glyph vertical extent within band
    rows = [y for y in range(y0, y1) if any(dark(px, x, y) for x in range(gs, ge + 1))]
    top, bot = min(rows), max(rows)
    band_h = bot - top + 1
    # stem columns
    def cov(x):
        return sum(1 for y in range(top, bot + 1) if dark(px, x, y)) / band_h
    if stem_side == 'left':
        w = 0
        x = gs
        while x <= ge and cov(x) >= 0.6:
            w += 1; x += 1
    elif stem_side == 'center':
        # widest run of columns with cov>=0.6 in the middle 60%
        mid0 = gs + (ge - gs) // 4
        mid1 = ge - (ge - gs) // 4
        best = cur = 0
        for x in range(mid0, mid1 + 1):
            cur = cur + 1 if cov(x) >= 0.6 else 0
            best = max(best, cur)
        w = best
    else:
        raise ValueError(stem_side)
    print(f"{label}: glyph x{gs}-{ge} top{top} bot{bot} height{band_h} stem{w} ratio={w/band_h:.3f}")
    # ascii art
    for y in range(top, bot + 1):
        row = ''.join('#' if dark(px, x, y) else ' ' for x in range(gs, ge + 1))
        print(f"   |{row}|")
    return (w, band_h, w / band_h)
