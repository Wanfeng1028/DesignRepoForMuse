from PIL import Image
im = Image.open('/home/hatch/workspace/user/media_library/image/photo-9.jpg').convert('RGB')
px = im.load()
def hx(c): return '#%02X%02X%02X' % tuple(c)
def hprof(y, x0=80, x1=690, step=40):
    print(f'row y={y}: ' + ' '.join(f'{x}:{hx(px[x,y])}' for x in range(x0,x1,step)))
def vprof(x, y0=120, y1=1330, step=60):
    print(f'col x={x}: ' + ' '.join(f'{y}:{hx(px[x,y])}' for y in range(y0,y1,step)))
hprof(620); hprof(700); hprof(1050); hprof(1300)
vprof(650); vprof(180); vprof(600)
print('-- home TR: col x=950 y120..1320 step 60 --')
print(' '.join(f'{y}:{hx(px[950,y])}' for y in range(120,1330,60)))
print('-- home TR: row y=700 x780..1170 step 40 --')
print(' '.join(f'{x}:{hx(px[x,700])}' for x in range(780,1171,40)))
print('-- weather sun icon window x105..175 y2010..2075 bright/saturated --')
for y in range(2010,2080,2):
    row=[]
    for x in range(105,180):
        c=px[x,y]
        if max(c)-min(c)>=20: row.append(f'{x},{y}={hx(c)}')
    if row: print('  '+' '.join(row[:30]))
print('-- home suggestion icons: sample rows y~1010..1300: check icon pixels x800..860 --')
import collections
for y0,y1,label in [(1000,1080,'news'),(1080,1160,'pdf'),(1160,1240,'image'),(1240,1320,'cards')]:
    cnt=collections.Counter()
    for y in range(y0,y1):
        for x in range(790,870):
            c=px[x,y]
            if max(c)-min(c)>=15: cnt[(c[0]//32*32,c[1]//32*32,c[2]//32*32)]+=1
    print(f'  {label}: {cnt.most_common(5)}')
