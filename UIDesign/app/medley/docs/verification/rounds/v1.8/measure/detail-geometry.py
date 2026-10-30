from PIL import Image
P = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/docs/references/medley/medley-5-screens-hd.jpg'
im = Image.open(P).convert('RGB')
px = im.load()
def near(c, t, tol=25):
    return max(abs(c[0]-t[0]), abs(c[1]-t[1]), abs(c[2]-t[2])) <= tol
# Search for indicator-gray runs: target (81,85,88) dark indicator, and (186,186,186) light
for name, target in [('dark-ind', (81, 85, 88)), ('light-ind', (186, 186, 186))]:
    print('== target', name, target)
    for y in range(850, 1040):
        # longest run of near-target pixels in this row
        best = (0, 0, 0)
        cur = 0; start = 0
        for x in range(2506):
            if near(px[x, y], target):
                if cur == 0:
                    start = x
                cur += 1
                if cur > best[0]:
                    best = (cur, start, x)
            else:
                cur = 0
        if best[0] >= 60:
            print('  y=%d run len=%d x%d-%d' % (y, best[0], best[1], best[2]))
# Panel left/right edges: at y=200 (near top, inside phones), find transitions surround->screen
# surround is near-black (12,13,17)-ish; screens are lighter or dark #111518 - hard for dark panels.
# Instead print row y=140 color runs (top edge zone)
for y in [120, 130, 140, 150, 160, 180]:
    runs = []
    prev = None; start = 0
    for x in range(2506):
        c = px[x, y]
        s = sum(c)
        key = 'K' if s < 60 else ('D' if s < 250 else ('W' if s > 650 else 'M'))
        if key != prev:
            if prev is not None and x-start > 30:
                runs.append((start, x-1, prev))
            start = x; prev = key
    runs.append((start, 2505, prev))
    print('y', y, runs)
