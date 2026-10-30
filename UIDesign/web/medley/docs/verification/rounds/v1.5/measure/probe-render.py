from PIL import Image
im = Image.open('/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/v1.5/measure/render-welcome.png').convert('RGB')
px = im.load()
def hx(c): return '#%02X%02X%02X' % tuple(c)
print('title band y=100..170: blue-ish pixels (B-R>40, B>120):')
n=0
for y in range(100,171):
    for x in range(560):
        c=px[x,y]
        if c[2]>120 and c[2]-c[0]>40:
            print(f'  {x},{y} {c} {hx(c)}'); n+=1
            if n>40: break
    if n>40: break
print('count', n)
print('google band y=300..360: blue-ish pixels:')
n=0
for y in range(300,361):
    for x in range(560):
        c=px[x,y]
        if c[2]>120 and c[2]-c[0]>40:
            if n<20: print(f'  {x},{y} {c} {hx(c)}')
            n+=1
print('count', n)
print('row y=125 x200..290:', ' '.join(f'{x}:{hx(px[x,125])}' for x in range(200,291,5)))
print('row y=331 x180..215:', ' '.join(f'{x}:{hx(px[x,331])}' for x in range(180,216,5)))
