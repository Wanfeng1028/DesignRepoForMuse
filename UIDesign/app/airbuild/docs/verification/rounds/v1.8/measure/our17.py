from PIL import Image
B = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/docs/verification/rounds/v1.7/bare/'
im = Image.open(B + 'chat-390.png').convert('RGB')
print('chat bare', im.size)
def spans(img, y, pred, x0=0, x1=370):
    xs = [x for x in range(x0, x1) if pred(img.getpixel((x, y)))]
    if not xs: return None
    groups = [[xs[0]]]
    for x in xs[1:]:
        if x - groups[-1][-1] <= 2: groups[-1].append(x)
        else: groups.append([x])
    return [(g[0], g[-1]) for g in groups if len(g) >= 2]
print('--- pill rows (dark text) y 90..115')
for y in range(90, 116):
    s = spans(im, y, lambda p: sum(p) < 350, 120, 260)
    if s: print(' y=', y, s)
print('--- mark rows (non-canvas) y 40..80')
for y in range(40, 81, 4):
    s = spans(im, y, lambda p: abs(p[0]-244) > 12 or abs(p[1]-244) > 12, 120, 260)
    if s: print(' y=', y, s)
print('--- pluso avatar rows y 200..240 (dark head / cyan blob)')
for y in range(200, 241, 4):
    s = spans(im, y, lambda p: (p[1] > 150 and p[2] > 180 and p[0] < 120) or sum(p) < 200, 0, 80)
    if s: print(' y=', y, s)
print('--- user bubble rows (blue) y 700..780')
for y in range(700, 781, 8):
    s = spans(im, y, lambda p: p[2] > 200 and 100 < p[1] < 190, 0, 370)
    if s: print(' y=', y, s)
print('--- file card rows (white card vs canvas) y 250..330')
for y in range(250, 331, 8):
    s = spans(im, y, lambda p: p[0] > 250 and p[1] > 250 and p[2] > 250, 0, 370)
    if s: print(' y=', y, s)
im2 = Image.open(B + 'briefing-390.png').convert('RGB')
print('briefing bare', im2.size)
print('--- briefing first-card rows y 200..280 (white card)')
for y in range(200, 281, 8):
    s = spans(im2, y, lambda p: p[0] > 250 and p[1] > 250 and p[2] > 250, 0, 370)
    if s: print(' y=', y, s)
