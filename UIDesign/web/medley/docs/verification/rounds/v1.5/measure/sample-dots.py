from PIL import Image
im = Image.open('/home/hatch/workspace/user/media_library/image/photo-9.jpg').convert('RGB')
px = im.load()
def hx(c): return '#%02X%02X%02X' % tuple(c)
print('== cursor dot area x560..600 y600..635: brightest blue pixels ==')
pts=[]
for y in range(595,640):
    for x in range(555,610):
        c=px[x,y]
        pts.append((c[2]-c[0], c[2], x, y, c))
pts.sort(reverse=True)
for k in pts[:25]: print(f'  {k[2]},{k[3]} {k[4]} {hx(k[4])} B-R={k[0]}')
print('== cursor dot centre scan: row y=617 x555..605 ==')
print(' '.join(f'{x}:{hx(px[x,617])}' for x in range(555,606,2)))
print('== cursor dot col x=578 y595..640 ==')
print(' '.join(f'{y}:{hx(px[578,y])}' for y in range(595,641,2)))
print('== mark TL: pixels brighter than bg in x115..180 y180..225 ==')
for y in range(180,226):
    row=[]
    for x in range(115,181):
        c=px[x,y]
        if sum(c)>110: row.append(f'{x},{y}={hx(c)}')
    if row: print('  '+' '.join(row))
