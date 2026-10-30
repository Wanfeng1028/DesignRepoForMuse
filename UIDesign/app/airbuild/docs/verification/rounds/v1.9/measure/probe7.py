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
im=Image.open(REF+'iphone-03-build-with-your-team.jpg').convert('RGB')
print('== 03 ampo avatar: blue #1fb0df tol30, region x100..340 y1950..2160')
for y in [2000,2030,2050,2080]:
    s=spanrow(im,y,lambda p: abs(p[0]-31)<=30 and abs(p[1]-176)<=30 and abs(p[2]-223)<=30,100,340)
    print(f'  row y={y} blue {s}')
for x in [200,230]:
    ys=[y for y in range(1950,2161) if abs(im.getpixel((x,y))[0]-31)<=30 and abs(im.getpixel((x,y))[1]-176)<=30 and abs(im.getpixel((x,y))[2]-223)<=30]
    print(f'  col x={x} blue y {min(ys) if ys else None}..{max(ys) if ys else None}')
print('== 03 agent bubble vertical padding: col x=900 y1180..1480 step5 (W/C/D/.)')
for y in range(1180,1481,5):
    p=im.getpixel((900,y))
    k='W' if p[0]>248 and p[1]>248 and p[2]>248 else ('C' if 238<=p[0]<=247 and 238<=p[1]<=247 and 238<=p[2]<=247 else ('D' if sum(p)<350 else '.'))
    print(f'{y}:{k}',end=' ')
print()
print('== 03 agent bubble vertical padding: col x=500 y1180..1480 step5')
for y in range(1180,1481,5):
    p=im.getpixel((500,y))
    k='W' if p[0]>248 and p[1]>248 and p[2]>248 else ('C' if 238<=p[0]<=247 and 238<=p[1]<=247 and 238<=p[2]<=247 else ('D' if sum(p)<350 else '.'))
    print(f'{y}:{k}',end=' ')
print()
im6=Image.open(REF+'iphone-06-daily-briefing.jpg').convert('RGB')
print('== 06 composer hand glyph: dark spans x190..700 y1750..1960 step20')
for y in range(1750,1961,20):
    d=spanrow(im6,y,lambda p: sum(p)<250,190,700)
    print(f'  y={y} dark {d}')
print('== 06 composer rows: tile-bg + white + dark summary y1780..1920 step20 x190..700')
for y in range(1780,1921,20):
    t=spanrow(im6,y,lambda p: abs(p[0]-244)<=6 and abs(p[1]-244)<=6 and abs(p[2]-242)<=6,190,700)
    print(f'  y={y} tile {t}')
