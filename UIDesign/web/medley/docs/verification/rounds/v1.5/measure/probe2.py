from PIL import Image
im = Image.open('/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/v1.5/measure/render-welcome.png').convert('RGB')
px = im.load()
def hx(c): return '#%02X%02X%02X' % tuple(c)
for y in range(0, 481, 20):
    xs = [x for x in range(560) if min(px[x,y]) > 220]
    print(f'y={y} near-white x-range: {min(xs) if xs else None}..{max(xs) if xs else None} count={len(xs)}')
print('--- blue dot hunt: pixels with B>200 and B-R>60, grouped by 20px cells ---')
from collections import Counter
cnt = Counter()
for y in range(481):
    for x in range(560):
        c = px[x,y]
        if c[2] > 200 and c[2]-c[0] > 60:
            cnt[(x//20*20, y//20*20)] += 1
for k, v in cnt.most_common(12): print(f'  cell {k}: {v}')
