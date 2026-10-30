from PIL import Image
import os, statistics
REF='/home/hatch/workspace/airbuild-refs/appstore/'
def med(im,x,y,r=5):
    box=[im.getpixel((xx,yy)) for xx in range(max(0,x-r),x+r+1) for yy in range(max(0,y-r),y+r+1)]
    return tuple(int(statistics.median([p[i] for p in box])) for i in range(3))
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
print('== 03 user blue 3x3 interior grid (bbox x446..1110 y2706..2866, avoid text rows by sampling y2750,2800,2840)')
for y in [2750,2800,2840]:
    print(f'  y={y} '+' '.join(f'x{x}:{hx(med(im,x,y))}' for x in [520,700,850,1000]))
print('== 03 pluso avatar cyan disc bbox (search #50e2f1 tol30, x100..320 y1380..1620)')
xs=[];ys=[]
for yy in range(1380,1621,2):
    for xx in range(100,321,2):
        p=im.getpixel((xx,yy))
        if abs(p[0]-80)<=30 and abs(p[1]-226)<=30 and abs(p[2]-241)<=30: xs.append(xx);ys.append(yy)
print(f'  cyan x {min(xs)}..{max(xs)} w{max(xs)-min(xs)+1} ({(max(xs)-min(xs)+1)*390/1030:.1f}pt) y {min(ys)}..{max(ys)} h{max(ys)-min(ys)+1} ({(max(ys)-min(ys)+1)*390/1030:.1f}pt)')
print('== 03 agent bubble hunt: white spans on rows y1400..1700 step50, x150..1180')
for y in range(1400,1701,50):
    s=spanrow(im,y,lambda p: p[0]>248 and p[1]>248 and p[2]>248,150,1180)
    print(f'  y={y} white spans {s}')
print('== 03 user bubble corner fit: leftmost blue x per row y2706..2760 step4')
for y in range(2706,2761,4):
    s=spanrow(im,y,lambda p: abs(p[0])<=25 and abs(p[1]-136)<=25 and abs(p[2]-254)<=25,150,1180)
    print(f'  y={y} blue spans {s}')
print('== 03 pill vertical profile x=660 y960..1060 step10 (hourtown pill zone, prior 660,1000)')
print('  '+' '.join(f'{y}:{hx(im.getpixel((660,y)))}' for y in range(960,1061,10)))
print('== 03 pill horizontal row y=1000 x560..760 step20')
print('  '+' '.join(f'{x}:{hx(im.getpixel((x,1000)))}' for x in range(560,761,20)))
im6=Image.open(REF+'iphone-06-daily-briefing.jpg').convert('RGB')
print('== 06 send arrow white bbox inside disc x1022..1110 y1914..2002')
xs=[];ys=[]
for yy in range(1914,2003):
    for xx in range(1022,1111):
        p=im6.getpixel((xx,yy))
        if p[0]>240 and p[1]>240 and p[2]>240: xs.append(xx);ys.append(yy)
print(f'  white x {min(xs)}..{max(xs)} w{max(xs)-min(xs)+1} ({(max(xs)-min(xs)+1)*390/1030:.1f}pt) y {min(ys)}..{max(ys)} h{max(ys)-min(ys)+1} ({(max(ys)-min(ys)+1)*390/1030:.1f}pt)')
print('== 06 composer tile hunt: rows y1850..2100 step25, tile bg #f4f4f2-ish spans')
for y in range(1850,2101,25):
    s=spanrow(im6,y,lambda p: abs(p[0]-244)<=6 and abs(p[1]-244)<=6 and abs(p[2]-242)<=6,150,1180)
    print(f'  y={y} tile spans {s}')
im5=Image.open(REF+'iphone-05-submit-for-review.jpg').convert('RGB')
print('== 05 chevron badge zone around (720,980): gray disc hunt rows y940..1020 step10')
for y in range(940,1021,10):
    s=spanrow(im5,y,lambda p: 190<p[0]<220 and abs(p[0]-p[1])<8 and abs(p[1]-p[2])<8,600,850)
    print(f'  y={y} gray spans {s}')
print('== 05 check button zone around (1080,980): rows y940..1020 step10, light spans')
for y in range(940,1021,10):
    s=spanrow(im5,y,lambda p: p[0]>235 and p[1]>235 and p[2]>235,1000,1160)
    print(f'  y={y} light spans {s}')
