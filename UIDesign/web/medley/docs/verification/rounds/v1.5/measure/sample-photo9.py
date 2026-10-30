from PIL import Image
from collections import Counter
import json, math
im = Image.open('/home/hatch/workspace/user/media_library/image/photo-9.jpg').convert('RGB')
W,H = im.size
px = im.load()
def rgb(x,y): return px[x,y]
def hx(c): return '#%02X%02X%02X' % c
# 1. edge scan: row y=300 across x, print transitions of brightness
for y in [200, 300, 600, 1200, 1700, 2000]:
    vals=[]
    prev=None
    for x in range(0,W):
        c=px[x,y]; b=sum(c)//3
        if prev is not None and abs(b-prev)>40:
            vals.append((x, px[x-1,y], px[x,y]))
        prev=b
    print(f'row y={y} jumps:', vals[:12])
for x in [300, 900]:
    vals=[]; prev=None
    for y in range(0,H):
        c=px[x,y]; b=sum(c)//3
        if prev is not None and abs(b-prev)>40:
            vals.append((y, px[x,y-1], px[x,y]))
        prev=b
    print(f'col x={x} jumps:', vals[:12])
# 2. point samples on a coarse grid over TL welcome (approx x 70..680, y 100..1330)
print('\n-- TL welcome grid (every 100px) --')
for y in range(150, 1300, 100):
    row=[]
    for x in range(100, 680, 100):
        row.append(f'{x},{y}={hx(px[x,y])}')
    print(' | '.join(row))
