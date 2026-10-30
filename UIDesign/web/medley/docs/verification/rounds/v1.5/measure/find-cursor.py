from PIL import Image
im = Image.open('/home/hatch/workspace/user/media_library/image/photo-9.jpg').convert('RGB')
px = im.load()
def hx(c): return '#%02X%02X%02X' % tuple(c)
print('bright blue-ish pixels in title band x100..690 y560..660 (B>140 and B-R>50):')
n=0
for y in range(560,661):
    for x in range(100,691):
        c=px[x,y]
        if c[2]>140 and c[2]-c[0]>50:
            print(f'  {x},{y} {c} {hx(c)}'); n+=1
            if n>60: break
    if n>60: break
print('count shown', n)
print('brightest B in band:')
pts=[]
for y in range(560,661):
    for x in range(100,691):
        c=px[x,y]; pts.append((c[2],x,y,c))
pts.sort(reverse=True)
for p in pts[:15]: print(f'  {p[1]},{p[2]} {p[3]} {hx(p[3])}')
print('title glyph band extents: white pixels (min>200) x-range per row y600..640 step 5:')
for y in range(590,650,5):
    xs=[x for x in range(100,691) if min(px[x,y])>200]
    print(f'  y={y} white x {min(xs) if xs else None}..{max(xs) if xs else None}')
