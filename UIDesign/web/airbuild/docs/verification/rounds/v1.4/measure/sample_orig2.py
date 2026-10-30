from PIL import Image
from collections import Counter
import os
base = os.path.expanduser('~/workspace/airbuild-rea/evidence/images')
files = ['01-pluso.C-78Jypo_ZNJ87f.webp', '02-ampo.Ruiv91rb_2mdwQX.webp', '03-colo.CVojA2Js_Z1zrN2F.webp', '04-leto.sbO-XCkw_Z1cMRa1.webp', '05-camo._F0Ha38L_Z19y5GS.webp']
for f in files:
    im = Image.open(os.path.join(base, f)).convert('RGBA')
    px = [c for c in im.getdata() if c[3] > 200]
    q = Counter()
    for r, g, b, a in px:
        if r > 240 and g > 240 and b > 240:
            continue
        q[(r // 16 * 16, g // 16 * 16, b // 16 * 16)] += 1
    print(f, im.size, 'top:', q.most_common(3))
# ipad-01 sidebar avatars (grounding points, 0-1000 normalized)
ip = Image.open(os.path.expanduser('~/workspace/airbuild-refs/appstore/ipad-01.jpg')).convert('RGB')
W, H = ip.size
print('ipad size', W, H)
names = ['Pluso', 'Camo', 'Qesto', 'Ato', 'Ampo', 'Leto']
for name, y in zip(names, [633, 684, 735, 787, 839, 891]):
    cx, cy = int(190 / 1000 * W), int(y / 1000 * H)
    box = [ip.getpixel((cx + dx, cy + dy)) for dx in range(-22, 23, 2) for dy in range(-22, 23, 2)]
    q = Counter()
    for r, g, b in box:
        if r > 240 and g > 240 and b > 240:
            continue
        q[(r // 16 * 16, g // 16 * 16, b // 16 * 16)] += 1
    print('ipad sidebar', name, 'centre:', ip.getpixel((cx, cy)), 'box-top:', q.most_common(3))
# user blue bubble: sample region right column (approx bubble area)
crop = ip.crop((int(0.52 * W), int(0.44 * H), int(0.80 * W), int(0.50 * H)))
q = Counter()
for r, g, b in crop.getdata():
    if b > 120 and b > r + 40:
        q[(r // 16 * 16, g // 16 * 16, b // 16 * 16)] += 1
print('ipad user bubble blue top:', q.most_common(3))
