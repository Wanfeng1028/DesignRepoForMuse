from PIL import Image
from collections import Counter
import os, statistics
BASE = os.path.expanduser('~/workspace/DesignRepoForMuse/UIDesign/app/medley/docs/verification/rounds/v1.8/pre')
def hx(c):
    return '#%02x%02x%02x' % c[:3]
def mode_of(im, box):
    crop = im.crop(box)
    c = Counter(crop.getdata())
    return c.most_common(1)[0]
def band_rows(im, y0, y1, x0=0, x1=390):
    # rows with any non-background ink: return list of (y, count) for rows in range
    px = im.load()
    out = []
    for y in range(y0, y1):
        n = 0
        for x in range(x0, x1):
            out.append((y, None))
            break
    return out
def ink_bbox(im, box, bg):
    x0, y0, x1, y1 = box
    px = im.load()
    minx, miny, maxx, maxy = 9999, 9999, -1, -1
    n = 0
    for y in range(y0, y1):
        for x in range(x0, x1):
            p = px[x, y]
            if max(abs(p[0]-bg[0]), abs(p[1]-bg[1]), abs(p[2]-bg[2])) > 40:
                n += 1
                if x < minx: minx = x
                if x > maxx: maxx = x
                if y < miny: miny = y
                if y > maxy: maxy = y
    return (minx, miny, maxx, maxy, n)
for f in sorted(os.listdir(BASE)):
    im = Image.open(os.path.join(BASE, f)).convert('RGB')
    w, h = im.size
    print('==', f, w, h)
    # 3x3 zone modes (full image, diagnostic only: UI dominates, so also report share)
    for r in range(3):
        row = []
        for c in range(3):
            box = (c*130, r*281, (c+1)*130, (r+1)*281 if r < 2 else 844)
            col, cnt = mode_of(im, box)
            row.append('%s %.0f%%' % (hx(col), 100*cnt/((box[2]-box[0])*(box[3]-box[1]))))
        print('  zone row%d:' % r, ' | '.join(row))
    # home indicator: bottom strip y 824-843, bg = page bg (11,11,14) in bare shots
    px = im.load()
    ind = []
    for y in range(820, 844):
        xs = [x for x in range(390) if max(abs(px[x,y][0]-11), abs(px[x,y][1]-11), abs(px[x,y][2]-14)) > 30]
        if xs:
            ind.append((y, min(xs), max(xs), len(xs)))
    if ind:
        ys = [t[0] for t in ind]
        print('  indicator rows %d-%d width %d-%d' % (min(ys), max(ys), min(t[1] for t in ind), max(t[2] for t in ind)))
        # indicator color: mode of the widest row
        best = max(ind, key=lambda t: t[3])
        rowpx = [px[x, best[0]] for x in range(best[1], best[2]+1)]
        print('  indicator row y=%d mode %s' % (best[0], hx(Counter(rowpx).most_common(1)[0][0])))
    else:
        print('  indicator: NONE FOUND in 820-843 (bare crop may cut it)')
    # status bar ink: y 0-31, bg = corner mode
    bg = mode_of(im, (0, 0, 390, 32))[0]
    print('  status bg mode %s' % hx(bg))
    bb = ink_bbox(im, (0, 0, 390, 32), bg)
    print('  status ink bbox x%d-%d y%d-%d n=%d' % bb)
    # left time cluster vs right icon cluster
    left = ink_bbox(im, (0, 0, 120, 32), bg)
    right = ink_bbox(im, (270, 0, 390, 32), bg)
    print('  status left bbox x%d-%d y%d-%d n=%d ; right bbox x%d-%d y%d-%d n=%d' % (left + right))
