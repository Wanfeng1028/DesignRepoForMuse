from PIL import Image
P = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/docs/references/medley/medley-4-screens-chinese-hd.jpg'
im = Image.open(P).convert('RGB')
px = im.load()
# scan y=600 row: print runs of similar color
def runs(y, step=1):
    out = []
    prev = None; start = 0
    for x in range(0, 2330, step):
        c = px[x, y]
        key = 'dark' if sum(c) < 150 else ('white' if sum(c) > 700 else 'mid')
        if key != prev:
            if prev is not None:
                out.append((start, x-1, prev))
            start = x; prev = key
    out.append((start, 2329, prev))
    return out
for y in [100, 300, 600, 900, 1200]:
    print('y', y, runs(y))
# language panel: guess x 1755-2320; find text rows: dark pixels count per row in x1800-2300
print('language dark-pixel rows (x1800-2300, count>30):')
prev = None
bands = []
for y in range(0, 1273):
    n = sum(1 for x in range(1800, 2300) if sum(px[x, y]) < 200)
    if n > 30:
        bands.append(y)
# group consecutive
groups = []
for y in bands:
    if groups and y - groups[-1][-1] <= 2:
        groups[-1].append(y)
    else:
        groups.append([y])
for g in groups:
    print('  band y%d-%d h=%d' % (g[0], g[-1], len(g)))
