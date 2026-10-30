from PIL import Image
REF = '/home/hatch/workspace/airbuild-refs/appstore/'
im3 = Image.open(REF + 'iphone-03-build-with-your-team.jpg').convert('RGB')
c3 = im3.crop((150, 960, 1180, 2868)).resize((370, 685), Image.LANCZOS)
print('orig pill dark spans per row y46..80 (x150..220):')
for y in range(46, 81):
    xs = [x for x in range(150, 221) if sum(c3.getpixel((x, y))) < 350]
    if xs: print(' y=', y, 'min', min(xs), 'max', max(xs), 'n', len(xs))
print('orig pill col x=183 values y40..80:')
for y in range(40, 81, 2):
    p = c3.getpixel((183, y)); print(' y=', y, f'#{p[0]:02x}{p[1]:02x}{p[2]:02x}')
im6 = Image.open(REF + 'iphone-06-daily-briefing.jpg').convert('RGB')
print('sales bars col x=1100 y1500..1760 step5:')
for y in range(1500, 1761, 5):
    p = im6.getpixel((1100, y)); print(' y=', y, f'#{p[0]:02x}{p[1]:02x}{p[2]:02x}')
print('sales bars col x=1000 y1500..1760 step5:')
for y in range(1500, 1761, 5):
    p = im6.getpixel((1000, y)); print(' y=', y, f'#{p[0]:02x}{p[1]:02x}{p[2]:02x}')
im4 = Image.open(REF + 'iphone-04-website-draft.jpg').convert('RGB')
print('draft button black runs (region x80..480 y2000..2300, rows with >40 black px):')
for y in range(2000, 2301, 5):
    xs = [x for x in range(80, 481) if sum(im4.getpixel((x, y))) < 150]
    if len(xs) > 40: print(' y=', y, 'black min', min(xs), 'max', max(xs), 'n', len(xs))
print('draft lights saturated pixels (x60..280 y1680..1820, max-min>80):')
found = []
for y in range(1680, 1821, 4):
    for x in range(60, 281, 4):
        p = im4.getpixel((x, y))
        if max(p) - min(p) > 80: found.append((x, y, f'#{p[0]:02x}{p[1]:02x}{p[2]:02x}'))
for f in found[:60]: print('  ', f)
print('  total saturated:', len(found))
