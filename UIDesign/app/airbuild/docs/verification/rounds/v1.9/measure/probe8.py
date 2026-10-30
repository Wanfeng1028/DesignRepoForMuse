from PIL import Image
import os
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
im=Image.open(REF+'iphone-06-daily-briefing.jpg').convert('RGB')
print('== 06 teal cover bbox: pixels near #3d6e7c tol25, region x150..1180 y800..1600')
xs=[];ys=[]
for yy in range(800,1601,2):
    for xx in range(150,1181,2):
        p=im.getpixel((xx,yy))
        if abs(p[0]-61)<=25 and abs(p[1]-110)<=25 and abs(p[2]-124)<=25: xs.append(xx);ys.append(yy)
print(f'  teal x {min(xs)}..{max(xs)} w{max(xs)-min(xs)+1} ({(max(xs)-min(xs)+1)*390/1030:.1f}pt) y {min(ys)}..{max(ys)} h{max(ys)-min(ys)+1} ({(max(ys)-min(ys)+1)*390/1030:.1f}pt)')
print('  teal rows: top rows y sample')
for y in [min(ys),min(ys)+10,min(ys)+50,(min(ys)+max(ys))//2,max(ys)-10,max(ys)]:
    s=spanrow(im,y,lambda p: abs(p[0]-61)<=25 and abs(p[1]-110)<=25 and abs(p[2]-124)<=25,150,1180)
    print(f'   y={y} teal {s}')
print('== 06 pills row: scan rows y1080..1160 step10 for #f4f4f2 pill spans x180..800')
for y in range(1080,1161,10):
    s=spanrow(im,y,lambda p: abs(p[0]-244)<=6 and abs(p[1]-244)<=6 and abs(p[2]-242)<=6,180,800)
    print(f'  y={y} pill-bg {s}')
print('== 06 first card white left/right edges: rows y900,1000,1200 white spans x150..1180')
for y in [900,1000,1200,1350]:
    s=spanrow(im,y,lambda p: p[0]>248 and p[1]>248 and p[2]>248,150,1180)
    print(f'  y={y} white {s}')
