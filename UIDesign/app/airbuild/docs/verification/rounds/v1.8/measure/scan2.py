from PIL import Image
REF = '/home/hatch/workspace/airbuild-refs/appstore/'
def row(fname, y, x0, x1, step=20):
    im = Image.open(REF + fname).convert('RGB')
    print(f'-- {fname} row y={y} x {x0}..{x1}')
    for xx in range(x0, x1+1, step):
        p = im.getpixel((xx, y))
        print(f'   x={xx} #{p[0]:02x}{p[1]:02x}{p[2]:02x}')
def col(fname, x, y0, y1, step=20):
    im = Image.open(REF + fname).convert('RGB')
    print(f'-- {fname} col x={x} y {y0}..{y1}')
    for yy in range(y0, y1+1, step):
        p = im.getpixel((x, yy))
        print(f'   y={yy} #{p[0]:02x}{p[1]:02x}{p[2]:02x}')
# iphone-03 avatar rows
row('iphone-03-build-with-your-team.jpg', 1550, 100, 300, 20)
row('iphone-03-build-with-your-team.jpg', 1720, 950, 1180, 20)
row('iphone-03-build-with-your-team.jpg', 2080, 100, 300, 20)
row('iphone-03-build-with-your-team.jpg', 1000, 550, 770, 20)
# iphone-06 cover row + card col
row('iphone-06-daily-briefing.jpg', 1000, 150, 800, 25)
col('iphone-06-daily-briefing.jpg', 400, 600, 1250, 25)
row('iphone-06-daily-briefing.jpg', 820, 150, 800, 25)
# iphone-05 store col + title row + progress col
col('iphone-05-submit-for-review.jpg', 300, 1000, 1650, 25)
row('iphone-05-submit-for-review.jpg', 1010, 500, 1150, 25)
col('iphone-05-submit-for-review.jpg', 300, 2050, 2650, 25)
# ipad members col
col('ipad-01.jpg', 360, 1550, 2600, 25)
