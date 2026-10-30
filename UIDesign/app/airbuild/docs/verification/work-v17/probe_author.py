from PIL import Image
import os
REF = os.path.expanduser('~/workspace/airbuild-refs/appstore')
def lum(px):
    return 0.299*px[0]+0.587*px[1]+0.114*px[2]
def colwhite(im, x, y0, y1, label):
    prev = False; bs = None; out = []
    for y in range(y0, y1):
        w = lum(im.getpixel((x, y))) > 250
        if w and not prev: bs = y; prev = True
        if not w and prev: out.append((bs, y-1)); prev = False
    print(label, out)
def rowbands(im, x0, x1, y0, y1, thr, label):
    prev = False; bs = None; out = []
    for y in range(y0, y1):
        cnt = sum(1 for x in range(x0, x1) if lum(im.getpixel((x, y))) < thr)
        if cnt >= 8 and not prev: bs = y; prev = True
        if cnt < 8 and prev: out.append((bs, y-1, y-bs)); prev = False
    print(label, out)
im6 = Image.open(os.path.join(REF, 'iphone-06-daily-briefing.jpg')).convert('RGB')
colwhite(im6, 600, 100, 800, 'b06 col x=600 white y100..800')
rowbands(im6, 200, 900, 1900, 2060, 140, 'b06 composer text bands')
rowbands(im6, 200, 900, 250, 650, 140, 'b06 msg1 area bands')
im4 = Image.open(os.path.join(REF, 'iphone-04-website-draft.jpg')).convert('RGB')
colwhite(im4, 600, 1300, 1750, 'd04 col x=600 white y1300..1750')
rowbands(im4, 200, 900, 1400, 1650, 140, 'd04 colo area bands')
