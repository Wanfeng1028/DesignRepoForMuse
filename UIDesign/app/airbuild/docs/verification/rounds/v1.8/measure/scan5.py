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
col('iphone-03-build-with-your-team.jpg', 660, 1080, 1160, 5)
row('iphone-03-build-with-your-team.jpg', 1115, 600, 720, 10)
row('iphone-05-submit-for-review.jpg', 920, 550, 770, 10)
col('iphone-05-submit-for-review.jpg', 600, 940, 1020, 5)
row('iphone-05-submit-for-review.jpg', 975, 700, 790, 10)
col('iphone-05-submit-for-review.jpg', 780, 1310, 1400, 10)
row('iphone-05-submit-for-review.jpg', 1115, 380, 430, 5)
col('iphone-05-submit-for-review.jpg', 410, 1090, 1130, 5)
row('iphone-06-daily-briefing.jpg', 1600, 850, 1200, 25)
row('iphone-06-daily-briefing.jpg', 1630, 850, 1200, 25)
row('iphone-06-daily-briefing.jpg', 1660, 850, 1200, 25)
col('iphone-04-website-draft.jpg', 150, 1650, 1850, 10)
row('iphone-04-website-draft.jpg', 1780, 80, 1250, 25)
row('ipad-01.jpg', 1695, 390, 430, 10)
row('ipad-01.jpg', 1795, 390, 430, 10)
row('ipad-01.jpg', 1150, 300, 550, 25)
row('ipad-01.jpg', 1400, 300, 550, 25)
row('ipad-01.jpg', 1400, 550, 750, 25)
col('ipad-01.jpg', 650, 1350, 1500, 25)
