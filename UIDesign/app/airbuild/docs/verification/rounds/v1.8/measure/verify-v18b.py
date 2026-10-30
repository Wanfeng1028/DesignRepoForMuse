from PIL import Image
B = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/docs/verification/rounds/v1.8/bare/'
def spans(img, y, pred, x0=0, x1=370):
    xs = [x for x in range(x0, x1) if pred(img.getpixel((x, y)))]
    if not xs: return []
    groups = [[xs[0]]]
    for x in xs[1:]:
        if x - groups[-1][-1] <= 2: groups[-1].append(x)
        else: groups.append([x])
    return [(g[0], g[-1]) for g in groups if len(g) >= 2]
br = Image.open(B + 'briefing-390.png').convert('RGB')
print('== briefing dots rows y350..390')
for y in range(350, 391):
    b = spans(br, y, lambda p: abs(p[0]-100) < 30 and abs(p[1]-162) < 30 and abs(p[2]-247) < 30, 0, 370)
    r = spans(br, y, lambda p: abs(p[0]-203) < 30 and abs(p[1]-44) < 30 and abs(p[2]-25) < 30, 0, 370)
    if b or r: print(' y=', y, 'blue', b, 'red', r)
print('== briefing flower samples (cover top ~385, svg x144..216 y393..465)')
for (x, y) in [(180, 425), (180, 410), (165, 405), (195, 405), (180, 440)]:
    p = br.getpixel((x, y)); print(f'  ({x},{y}) #{p[0]:02x}{p[1]:02x}{p[2]:02x}')
ho = Image.open(B + 'home-390.png').convert('RGB')
print('== home orange-dot search (#ea943f +-20) bbox')
pts = [(x, y) for y in range(0, 824) for x in range(0, 370) if abs(ho.getpixel((x, y))[0]-234) < 20 and abs(ho.getpixel((x, y))[1]-148) < 20 and abs(ho.getpixel((x, y))[2]-63) < 20]
if pts:
    xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
    print('  count', len(pts), 'x', min(xs), max(xs), 'y', min(ys), max(ys))
else:
    print('  none found')
print('== home Hands badge region x80..115 y185..215 black spans')
for y in range(185, 216, 3):
    s = spans(ho, y, lambda p: sum(p) < 150, 80, 115)
    if s: print(' y=', y, s)
print('== home pill text spans (Hands Time pill row): dark spans y230..250 x40..140')
for y in range(230, 251):
    s = spans(ho, y, lambda p: sum(p) < 350, 40, 140)
    if s: print(' y=', y, s)
