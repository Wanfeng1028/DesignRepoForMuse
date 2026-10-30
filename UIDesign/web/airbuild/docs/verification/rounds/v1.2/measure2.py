from PIL import Image

R = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/docs/verification/rounds/v1.2/'
P = R + 'probes/'
im = Image.open(R + 'window-main.png').convert('RGB')
imT = Image.open(P + 'window-main-twotabs.png').convert('RGB')
imSt = Image.open(P + 'window-main-stripes.png').convert('RGB')

def patch(im, x, y, n=3):
    s = [0, 0, 0]; c = 0
    for dy in range(n):
        for dx in range(n):
            r, g, b = im.getpixel((x + dx, y + dy))[:3]
            s[0] += r; s[1] += g; s[2] += b; c += 1
    return tuple(round(v / c) for v in s)

print('B02 capsule clean rows (capsule DOM 91,6,64x32; icons y14-30):')
print('  top row y9 x95-150 step5:', [(x, im.getpixel((x, 9))[:3]) for x in range(95, 151, 5)])
print('  bottom row y31 x95-150 step5:', [(x, im.getpixel((x, 31))[:3]) for x in range(95, 151, 5)])
print('B09 footer btn1 DOM (67,622,36x36): top y623, mid-left x69 y639, bottom y656:')
print('  top row:', [(x, im.getpixel((x, 623))[:3]) for x in (69, 75, 85, 95, 101)])
print('  mid-left col x69:', [(y, im.getpixel((69, y))[:3]) for y in (630, 639, 648)])
print('  bottom row y656:', [(x, im.getpixel((x, 656))[:3]) for x in (69, 75, 85, 95, 101)])
print('B04 attach btn DOM (216,630,24x24) corner patches (icon spans ~221-235):')
print('  corner (217,631):', patch(im, 217, 631), ' corner (237,631):', patch(im, 237, 631), ' corner (217,651):', patch(im, 217, 651))
print('C09 online dot DOM (175,215,5x8) exact pixels:')
for y in range(214, 224):
    print('  y', y, [im.getpixel((x, y))[:3] for x in range(174, 181)])
print('A03 feed avatar PIL: Ato disc centre (845,286) patch:', patch(im, 843, 284, 5), ' Pluso centre (845,335):', patch(im, 843, 333, 5))
print('A03 disc left edge scan y286 x828-850 non-white:', [(x, im.getpixel((x, 286))[:3]) for x in range(828, 851, 2)])
print('F04 twotabs tab1 label rows x706-798 y4-40 per-row dark counts:')
for y in range(4, 41):
    c = 0
    for x in range(706, 799):
        r, g, b = imT.getpixel((x, y))[:3]
        if r < 140 and g < 140 and b < 140:
            c += 1
    if c:
        print('  y', y, 'count', c)
print('F04 phone 9:41 narrow x836-872 per-row dark counts y92-112:')
for y in range(92, 113):
    c = 0
    for x in range(836, 873):
        r, g, b = im.getpixel((x, y))[:3]
        if r < 140 and g < 140 and b < 140:
            c += 1
    if c:
        print('  y', y, 'count', c)
print('B08 stripes sidebar empty row y600 x20-180 R samples step4:')
print(' ', [imSt.getpixel((x, 600))[0] for x in range(20, 181, 4)])
print('B08 stripes sidebar empty row y560 x20-180 R samples step4:')
print(' ', [imSt.getpixel((x, 560))[0] for x in range(20, 181, 4)])
# crops for visual check
im.crop((820, 85, 1085, 130)).resize((1060, 180), Image.NEAREST).save(P + 'crop-phone-statusbar-4x.png')
im.crop((820, 260, 1085, 360)).resize((1060, 400), Image.NEAREST).save(P + 'crop-phone-feed-4x.png')
im.crop((0, 0, 200, 180)).resize((800, 720), Image.NEAREST).save(P + 'crop-sidebar-avatars-4x.png')
print('crops saved')
# iphone-06 send button hunt
ip = Image.open('/home/hatch/workspace/airbuild-refs/appstore/iphone-06-daily-briefing.jpg').convert('RGB')
print('iphone06 size', ip.size)
def blueish(px):
    r, g, b = px[:3]
    return b > 150 and b - r > 60 and g > 90
for (y0, y1, tag) in [(2400, 2868, 'bottom-half'), (2600, 2868, 'bottom-268'), (2700, 2868, 'bottom-168')]:
    hits = []
    for y in range(y0, y1):
        for x in range(0, 1320):
            if blueish(ip.getpixel((x, y))):
                hits.append((x, y))
    if hits:
        xs = [h[0] for h in hits]; ys = [h[1] for h in hits]
        print('B07', tag, 'blue hits n=', len(hits), 'bbox x', min(xs), max(xs), 'y', min(ys), max(ys))
    else:
        print('B07', tag, 'no blue hits')
