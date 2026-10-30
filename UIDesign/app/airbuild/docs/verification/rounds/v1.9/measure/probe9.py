from PIL import Image
import os
REF='/home/hatch/workspace/airbuild-refs/appstore/'
def spanrow(im,y,pred,x0,x1):
    xs=[x for x in range(x0,x1+1) if pred(im.getpixel((x,y)))]
    if not xs: return []
    g=[[xs[0]]]
    for x in xs[1:]:
        if x-g[-1][-1]<=3: g[-1].append(x)
        else: g.append([x])
    return [(a[0],a[-1]) for a in g if len(a)>=2]
im=Image.open(REF+'iphone-06-daily-briefing.jpg').convert('RGB')
print('== 06 pills zone dark glyph rows y800..880 step5, x190..790 (dark sum<450)')
for y in range(800,881,5):
    d=spanrow(im,y,lambda p: sum(p)<450,190,790)
    print(f'  y={y} dark {d}')
