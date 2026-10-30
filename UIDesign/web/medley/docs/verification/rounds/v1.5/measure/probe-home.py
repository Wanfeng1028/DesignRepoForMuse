from PIL import Image
im = Image.open('/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/v1.5/measure/render-home-en.png').convert('RGB')
px = im.load()
def hx(c): return '#%02X%02X%02X' % tuple(c)
print('col x=300:', ' '.join(f'{y}:{hx(px[300,y])}' for y in range(50,561,25)))
print('col x=100:', ' '.join(f'{y}:{hx(px[100,y])}' for y in range(50,561,25)))
print('row y=252 x0..588 step 40:', ' '.join(f'{x}:{hx(px[x,252])}' for x in range(0,589,40)))
