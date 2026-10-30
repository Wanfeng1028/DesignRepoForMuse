from PIL import Image
ip = Image.open('/home/hatch/workspace/airbuild-refs/appstore/ipad-01.jpg').convert('RGB')
def mean_disc(cx, cy, r=26):
    rs = gs = bs = n = 0
    for dx in range(-r, r + 1, 1):
        for dy in range(-r, r + 1, 1):
            if dx * dx + dy * dy > r * r: continue
            R, G, B = ip.getpixel((cx + dx, cy + dy))
            if R > 240 and G > 240 and B > 240: continue
            if max(R, G, B) - min(R, G, B) < 50: continue
            rs += R; gs += G; bs += B; n += 1
    return (round(rs / n), round(gs / n), round(bs / n), n)
for name, cy in [('Pluso', 1717), ('Camo', 1845), ('Qesto', 1978), ('Ato', 2110), ('Ampo', 2237), ('Leto', 2366)]:
    print('ipad', name, mean_disc(389, cy))
# REA colo portrait mean of dominant purple (exclude white/black)
im = Image.open('/home/hatch/workspace/airbuild-rea/evidence/images/03-colo.CVojA2Js_Z1zrN2F.webp').convert('RGBA')
rs = gs = bs = n = 0
for R, G, B, A in im.getdata():
    if A < 200: continue
    if R > 240 and G > 240 and B > 240: continue
    if B > 150 and B > R + 60:  # purple family
        rs += R; gs += G; bs += B; n += 1
print('REA colo purple mean', (round(rs / n), round(gs / n), round(bs / n), n))
im = Image.open('/home/hatch/workspace/airbuild-rea/evidence/images/04-leto.sbO-XCkw_Z1cMRa1.webp').convert('RGBA')
rs = gs = bs = n = 0
for R, G, B, A in im.getdata():
    if A < 200: continue
    if R > 200 and 80 < G < 180 and 40 < B < 130:
        rs += R; gs += G; bs += B; n += 1
print('REA leto coral mean', (round(rs / n), round(gs / n), round(bs / n), n))
