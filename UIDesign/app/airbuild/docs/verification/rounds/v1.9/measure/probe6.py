from PIL import Image
import os, math
REF='/home/hatch/workspace/airbuild-refs/appstore/'
def hx(c): return f'#{c[0]:02x}{c[1]:02x}{c[2]:02x}'
def spanrow(im,y,pred,x0,x1):
    xs=[x for x in range(x0,x1+1) if pred(im.getpixel((x,y)))]
    if not xs: return []
    g=[[xs[0]]]
    for x in xs[1:]:
        if x-g[-1][-1]<=3: g[-1].append(x)
        else: g.append([x])
    return [(a[0],a[-1]) for a in g if len(a)>=3]
im=Image.open(REF+'iphone-03-build-with-your-team.jpg').convert('RGB')
print('== 03 avatar centre row/col (cyan tol30 around #50e2f1)')
for y in [1500,1520,1526,1540,1560]:
    s=spanrow(im,y,lambda p: abs(p[0]-80)<=30 and abs(p[1]-226)<=30 and abs(p[2]-241)<=30,150,400)
    print(f'  row y={y} cyan {s}')
for x in [220,230,240]:
    ys=[y for y in range(1400,1650) if abs(im.getpixel((x,y))[0]-80)<=30 and abs(im.getpixel((x,y))[1]-226)<=30 and abs(im.getpixel((x,y))[2]-241)<=30]
    print(f'  col x={x} cyan y {min(ys) if ys else None}..{max(ys) if ys else None}')
print('== 03 agent bubble col x=600 y1300..1700 step10 (W=white>248, C=canvas 240-247, D=dark<100, .=other)')
for y in range(1300,1701,10):
    p=im.getpixel((600,y))
    k='W' if p[0]>248 and p[1]>248 and p[2]>248 else ('C' if 238<=p[0]<=247 and 238<=p[1]<=247 and 238<=p[2]<=247 else ('D' if sum(p)<300 else '.'))
    print(f'  y={y} {k} {hx(p)}', end='; ')
    if (y-1300)%100==90: print()
print()
print('== 03 agent bubble rows: white spans + dark glyph spans, y1440..1580 step20, x250..1000')
for y in range(1440,1581,20):
    w=spanrow(im,y,lambda p: p[0]>248 and p[1]>248 and p[2]>248,250,1000)
    d=spanrow(im,y,lambda p: sum(p)<350,250,1000)
    print(f'  y={y} white {w} dark {d}')
im6=Image.open(REF+'iphone-06-daily-briefing.jpg').convert('RGB')
print('== 06 send disc interior blue grid (centre 1066,1958 r44, points inside r<35, avoid arrow centre cross)')
for (x,y) in [(1040,1935),(1092,1935),(1040,1981),(1092,1981),(1035,1958),(1097,1958),(1066,1928),(1066,1988)]:
    p=im6.getpixel((x,y)); print(f'  ({x},{y}) {hx(p)}')
print('== 06 send arrow white within disc r<40 from centre:')
xs=[];ys=[]
for yy in range(1918,1999):
    for xx in range(1026,1107):
        if math.hypot(xx-1066,yy-1958)<40:
            p=im6.getpixel((xx,yy))
            if p[0]>240 and p[1]>240 and p[2]>240: xs.append(xx);ys.append(yy)
print(f'  arrow white x {min(xs)}..{max(xs)} w{max(xs)-min(xs)+1} ({(max(xs)-min(xs)+1)*390/1030:.1f}pt) y {min(ys)}..{max(ys)} h{max(ys)-min(ys)+1} ({(max(ys)-min(ys)+1)*390/1030:.1f}pt)')
print('== 06 pill zone col x=660 y120..300 step10')
print('  '+' '.join(f'{y}:{hx(im6.getpixel((660,y)))}' for y in range(120,301,10)))
print('== 06 composer card white spans rows y1900..2080 step20 x150..1180')
for y in range(1900,2081,20):
    w=spanrow(im6,y,lambda p: p[0]>248 and p[1]>248 and p[2]>248,150,1180)
    print(f'  y={y} white {w}')
print('== 06 composer tile bg spans rows y1820..1960 step20 x150..1180 (tile #f4f4f2 tol6)')
for y in range(1820,1961,20):
    s=spanrow(im6,y,lambda p: abs(p[0]-244)<=6 and abs(p[1]-244)<=6 and abs(p[2]-242)<=6,150,1180)
    print(f'  y={y} tile {s}')
