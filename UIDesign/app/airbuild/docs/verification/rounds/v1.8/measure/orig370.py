from PIL import Image
REF = '/home/hatch/workspace/airbuild-refs/appstore/'
def crop370(fname, box):
    im = Image.open(REF + fname).convert('RGB')
    c = im.crop(box)
    w, h = c.size
    return c.resize((370, round(h * 370 / w)), Image.LANCZOS)
def spans(img, y, pred, x0=0, x1=370):
    xs = [x for x in range(x0, x1) if pred(img.getpixel((x, y)))]
    if not xs: return None
    # group contiguous (gap<=2)
    groups = [[xs[0]]]
    for x in xs[1:]:
        if x - groups[-1][-1] <= 2: groups[-1].append(x)
        else: groups.append([x])
    return [(g[0], g[-1], g[-1]-g[0]+1) for g in groups if len(g) >= 3]
# iphone-03 screen box (150,960)-(1180,2868); scale 370/1030
im3 = crop370('iphone-03-build-with-your-team.jpg', (150, 960, 1180, 2868))
print('iphone-03 resized', im3.size)
# pill row: orig pill y image ~1115 -> (1115-960)*370/1030 = 55.7
for y in [54, 56, 58]:
    print(' chat pill row y=', y, 'dark-text spans:', spans(im3, y, lambda p: sum(p) < 300))
    print(' chat pill row y=', y, 'pill-grey spans (220..245 all ch):', spans(im3, y, lambda p: 215 < p[0] < 248 and abs(p[0]-p[1]) < 12))
# town mark row: mark y image ~1030 -> 25.1
for y in [24, 26, 28]:
    print(' mark row y=', y, 'non-canvas spans (diff from f4>10):', spans(im3, y, lambda p: abs(p[0]-244) > 10 or abs(p[1]-244) > 10))
# pluso avatar row: avatar centre image (245,1520) -> x=34, y=201
for y in [198, 201, 204]:
    print(' pluso avatar row y=', y, 'cyan spans (G>180,B>200,R<120):', spans(im3, y, lambda p: p[1] > 180 and p[2] > 200 and p[0] < 120))
# file card row: card y image ~1720 -> 273
for y in [270, 273, 276]:
    print(' file card row y=', y, 'white spans (>250):', spans(im3, y, lambda p: p[0] > 250 and p[1] > 250 and p[2] > 250))
# task card row: task card y image ~2450 -> 535
for y in [530, 535, 540]:
    print(' task card row y=', y, 'white spans:', spans(im3, y, lambda p: p[0] > 250 and p[1] > 250 and p[2] > 250))
# user bubble row: bubble y image ~2750 -> 643
for y in [640, 645]:
    print(' user bubble row y=', y, 'blue spans (B>220,G 100..180):', spans(im3, y, lambda p: p[2] > 220 and 100 < p[1] < 190))
# iphone-06 screen box: phone x 110..1210 (1100 wide), y 0..2100; scale 370/1100
im6 = crop370('iphone-06-daily-briefing.jpg', (110, 0, 1210, 2100))
print('iphone-06 resized', im6.size)
# first card: card x image 180..770 -> resized x 24..222; row y image 1000 -> 336? no: y scale same 370/1100=0.336; card row y image 750 -> 252
for y in [250, 252, 255]:
    print(' briefing card row y=', y, 'white spans:', spans(im6, y, lambda p: p[0] > 250 and p[1] > 250 and p[2] > 250))
# cover: cover y image 900..1160 -> 303..390; row y=340
for y in [336, 340, 350]:
    print(' cover row y=', y, 'teal spans (G 90..130,B 110..140):', spans(im6, y, lambda p: 60 < p[0] < 80 and 90 < p[1] < 130 and 110 < p[2] < 145))
# pills dots row y image 820 -> 276
for y in [274, 276, 278]:
    print(' pills row y=', y, 'blue spans:', spans(im6, y, lambda p: p[2] > 200 and p[0] < 140 and p[1] > 120))
    print(' pills row y=', y, 'red spans:', spans(im6, y, lambda p: p[0] > 180 and p[1] < 100 and p[2] < 80))
# iphone-05 screen box x 150..1170 (1020), y 850..2700; scale 370/1020=0.363
im5 = crop370('iphone-05-submit-for-review.jpg', (150, 850, 1170, 2700))
print('iphone-05 resized', im5.size)
# store glyph: glyph image x ~270..350? col x=300 centre, y 1310..1390 -> resized x=54, y=167..196
for y in [180, 185]:
    print(' store glyph row y=', y, 'blue spans (B>180):', spans(im5, y, lambda p: p[2] > 180 and p[0] < 160))
# title row y image 920 -> 25
for y in [24, 25, 26]:
    print(' detail title row y=', y, 'dark spans:', spans(im5, y, lambda p: sum(p) < 300))
