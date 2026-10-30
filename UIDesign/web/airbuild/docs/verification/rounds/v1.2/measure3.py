from PIL import Image
from collections import deque

R = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/airbuild/docs/verification/rounds/v1.2/'
P = R + 'probes/'
im = Image.open(R + 'window-main.png').convert('RGB')
imT = Image.open(P + 'window-main-twotabs.png').convert('RGB')

def patch(im, x, y, n=3):
    s = [0, 0, 0]; c = 0
    for dy in range(n):
        for dx in range(n):
            r, g, b = im.getpixel((x + dx, y + dy))[:3]
            s[0] += r; s[1] += g; s[2] += b; c += 1
    return tuple(round(v / c) for v in s)

print('B04 attach circle interior (centre 228,642 r12): top-mid (227,632):', patch(im, 227, 632), ' left-mid (217,641):', patch(im, 217, 641), ' bottom-mid (227,651):', patch(im, 227, 651))
print('B04 attach DOM bg was rgb(237,237,235); PIL interior patches above should be ~237 if circle bg shows (icon strokes excluded by these points)')
print('F04 twotabs label area x730-790 y12-30: pixels darker than 200:')
for y in range(12, 31):
    row = []
    for x in range(730, 791):
        r, g, b = imT.getpixel((x, y))[:3]
        if r < 200 and g < 200 and b < 200:
            row.append((x, (r, g, b)))
    if row:
        print('  y', y, 'n=', len(row), row[:12])
print('F04 twotabs tab1 full button x706-798 y4-40: row dark<200 counts:')
for y in range(4, 41):
    c = 0
    for x in range(706, 799):
        r, g, b = imT.getpixel((x, y))[:3]
        if r < 200 and g < 200 and b < 200:
            c += 1
    if c:
        print('  y', y, c)

ip = Image.open('/home/hatch/workspace/airbuild-refs/appstore/iphone-06-daily-briefing.jpg').convert('RGB')
def blueish(px):
    r, g, b = px[:3]
    return b > 150 and b - r > 60 and g > 90
W, H = ip.size
seen = set()
clusters = []
for y in range(2500, H):
    for x in range(W):
        if (x, y) in seen or not blueish(ip.getpixel((x, y))):
            continue
        q = deque([(x, y)]); seen.add((x, y)); comp = []
        while q:
            cx, cy = q.popleft(); comp.append((cx, cy))
            for nx, ny in ((cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)):
                if 0 <= nx < W and 2500 <= ny < H and (nx, ny) not in seen and blueish(ip.getpixel((nx, ny))):
                    seen.add((nx, ny)); q.append((nx, ny))
        xs = [c[0] for c in comp]; ys = [c[1] for c in comp]
        clusters.append((len(comp), min(xs), max(xs), min(ys), max(ys)))
clusters.sort(reverse=True)
print('B07 iphone-06 blue clusters y>=2500 (n, x0, x1, y0, y1):')
for cl in clusters[:12]:
    print('  ', cl)
ip.crop((0, 2500, 1320, 2868)).save(P + 'crop-iphone06-bottom.png')
print('iphone bottom crop saved')
