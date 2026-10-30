from PIL import Image
REF = '/home/hatch/workspace/airbuild-refs/appstore/'
for fname, x, y in [('iphone-03-build-with-your-team.jpg', 660, 1400), ('iphone-06-daily-briefing.jpg', 660, 1400), ('iphone-05-submit-for-review.jpg', 660, 1400)]:
    im = Image.open(REF + fname).convert('RGB')
    print('==', fname)
    print(' col x=660 every 100px:')
    for yy in range(0, 2868, 100):
        p = im.getpixel((x, yy))
        print(f'  y={yy} #{p[0]:02x}{p[1]:02x}{p[2]:02x}')
    print(' row y=1400 every 100px:')
    for xx in range(0, 1320, 100):
        p = im.getpixel((xx, y))
        print(f'  x={xx} #{p[0]:02x}{p[1]:02x}{p[2]:02x}')
