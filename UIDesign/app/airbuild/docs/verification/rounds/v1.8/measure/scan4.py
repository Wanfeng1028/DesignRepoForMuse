from PIL import Image
REF = '/home/hatch/workspace/airbuild-refs/appstore/'
def row(fname, y, x0, x1, step=10):
    im = Image.open(REF + fname).convert('RGB')
    print(f'-- {fname} row y={y}')
    for xx in range(x0, x1+1, step):
        p = im.getpixel((xx, y))
        print(f'   x={xx} #{p[0]:02x}{p[1]:02x}{p[2]:02x}')
def col(fname, x, y0, y1, step=10):
    im = Image.open(REF + fname).convert('RGB')
    print(f'-- {fname} col x={x}')
    for yy in range(y0, y1+1, step):
        p = im.getpixel((x, yy))
        print(f'   y={yy} #{p[0]:02x}{p[1]:02x}{p[2]:02x}')
def grid(fname, x0, x1, y0, y1, step=15):
    im = Image.open(REF + fname).convert('RGB')
    print(f'-- {fname} grid x{x0}..{x1} y{y0}..{y1}')
    for yy in range(y0, y1+1, step):
        line = ' '.join(f'{im.getpixel((xx,yy))[0]:02x}{im.getpixel((xx,yy))[1]:02x}{im.getpixel((xx,yy))[2]:02x}' for xx in range(x0, x1+1, step))
        print(f'   y={yy}: {line}')
grid('iphone-03-build-with-your-team.jpg', 200, 290, 1470, 1590, 15)
grid('iphone-03-build-with-your-team.jpg', 200, 290, 2080, 2200, 15)
col('iphone-03-build-with-your-team.jpg', 660, 1080, 1220, 10)
row('iphone-03-build-with-your-team.jpg', 1130, 550, 770, 15)
col('iphone-03-build-with-your-team.jpg', 1155, 1650, 1860, 15)
row('iphone-03-build-with-your-team.jpg', 1760, 1050, 1210, 15)
row('iphone-06-daily-briefing.jpg', 820, 180, 260, 10)
row('iphone-06-daily-briefing.jpg', 1700, 850, 1200, 25)
col('iphone-06-daily-briefing.jpg', 1090, 1900, 2060, 10)
col('iphone-05-submit-for-review.jpg', 660, 880, 1060, 10)
row('iphone-05-submit-for-review.jpg', 990, 600, 1150, 25)
row('iphone-05-submit-for-review.jpg', 1360, 750, 1150, 25)
row('iphone-05-submit-for-review.jpg', 1110, 380, 470, 10)
row('iphone-04-website-draft.jpg', 1720, 120, 750, 25)
col('iphone-04-website-draft.jpg', 660, 950, 1120, 15)
