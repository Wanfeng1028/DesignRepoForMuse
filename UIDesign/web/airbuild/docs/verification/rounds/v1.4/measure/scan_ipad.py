from PIL import Image
ip = Image.open('/home/hatch/workspace/airbuild-refs/appstore/ipad-01.jpg').convert('RGB')
W, H = ip.size
# left column strip: x 280..520 (device left area), scan y bands for saturated pixels
def sat(px):
    r, g, b = px
    return max(r, g, b) - min(r, g, b) > 60 and max(r, g, b) > 120
bands = []
inband = False
start = 0
for y in range(1400, 2650):
    n = 0
    for x in range(280, 520, 4):
        if sat(ip.getpixel((x, y))):
            n += 1
    if n >= 8 and not inband:
        inband, start = True, y
    elif n < 8 and inband:
        bands.append((start, y - 1))
        inband = False
print('saturated bands in strip:', bands)
from collections import Counter
for (a, b) in bands:
    cy = (a + b) // 2
    # disc centre x: find saturated run centre at cy
    xs = [x for x in range(200, 600) if sat(ip.getpixel((x, cy)))]
    if not xs:
        print('band', a, b, 'no centre row'); continue
    cx = (xs[0] + xs[-1]) // 2
    box = [ip.getpixel((cx + dx, cy + dy)) for dx in range(-18, 19, 2) for dy in range(-18, 19, 2)]
    q = Counter()
    for r, g, b in box:
        if r > 240 and g > 240 and b > 240: continue
        if max(r, g, b) - min(r, g, b) < 40: continue
        q[(r // 16 * 16, g // 16 * 16, b // 16 * 16)] += 1
    print('disc cy=%d cx=%d span=%d..%d top=%s' % (cy, cx, xs[0], xs[-1], q.most_common(2)))
