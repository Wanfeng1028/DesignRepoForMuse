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
# iphone-03: avatar cols, pill col, user bubble
col('iphone-03-build-with-your-team.jpg', 230, 1450, 1620, 20)
col('iphone-03-build-with-your-team.jpg', 1100, 1600, 1850, 20)
col('iphone-03-build-with-your-team.jpg', 230, 1900, 2300, 20)
col('iphone-03-build-with-your-team.jpg', 660, 950, 1080, 10)
row('iphone-03-build-with-your-team.jpg', 2820, 600, 1100, 25)
# iphone-06: pills dots fine, sales bars, send btn, ato tile
row('iphone-06-daily-briefing.jpg', 820, 255, 325, 5)
col('iphone-06-daily-briefing.jpg', 1050, 1550, 1750, 10)
row('iphone-06-daily-briefing.jpg', 1950, 1000, 1180, 10)
col('iphone-06-daily-briefing.jpg', 660, 0, 220, 10)
# iphone-05: title row, check, status dot, testflight glyph
row('iphone-05-submit-for-review.jpg', 975, 550, 1150, 25)
col('iphone-05-submit-for-review.jpg', 860, 1320, 1420, 10)
row('iphone-05-submit-for-review.jpg', 1120, 250, 450, 10)
# ipad: colo avatar + pluso dot + camo cup
col('ipad-01.jpg', 785, 2400, 2720, 20)
row('ipad-01.jpg', 1670, 360, 430, 10)
row('ipad-01.jpg', 1795, 360, 430, 10)
# iphone-04 draft: cover water, traffic lights row, url pill
row('iphone-04-website-draft.jpg', 2000, 400, 1000, 25)
col('iphone-04-website-draft.jpg', 700, 1750, 1950, 20)
