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
chat = Image.open(B + 'chat-390.png').convert('RGB')
print('== chat pill text rows y85..105 (dark spans, centre x120..260)')
for y in range(85, 106):
    s = spans(chat, y, lambda p: sum(p) < 350, 120, 260)
    if s: print(' y=', y, s)
print('== chat user bubble blue rows y680..780')
for y in range(680, 781, 6):
    s = spans(chat, y, lambda p: p[2] > 200 and 100 < p[1] < 190, 0, 370)
    if s: print(' y=', y, s)
br = Image.open(B + 'briefing-390.png').convert('RGB')
print('== briefing pills dots: blue #64a2f7 / red #cb2c19 spans, rows y300..340')
for y in range(300, 341):
    b = spans(br, y, lambda p: abs(p[0]-100) < 25 and abs(p[1]-162) < 25 and abs(p[2]-247) < 25, 0, 370)
    r = spans(br, y, lambda p: abs(p[0]-203) < 25 and abs(p[1]-44) < 25 and abs(p[2]-25) < 25, 0, 370)
    if b or r: print(' y=', y, 'blue', b, 'red', r)
print('== briefing cover sample points (expect teal #3f707e-ish + yellow flower)')
for (x, y) in [(60, 400), (120, 400), (200, 390), (180, 370)]:
    p = br.getpixel((x, y)); print(f'  ({x},{y}) #{p[0]:02x}{p[1]:02x}{p[2]:02x}')
print('== briefing second message bottom: last white-bubble row before composer (scan col x=100 y560..700 for white bubble vs canvas)')
for y in range(560, 701, 4):
    p = br.getpixel((100, y)); print(f'  y={y} #{p[0]:02x}{p[1]:02x}{p[2]:02x}')
dr = Image.open(B + 'draft-390.png').convert('RGB')
print('== draft cover sample points (expect neutral dark, R~G~B)')
for (x, y) in [(230, 330), (280, 330), (230, 420), (320, 330)]:
    p = dr.getpixel((x, y)); print(f'  ({x},{y}) #{p[0]:02x}{p[1]:02x}{p[2]:02x}')
print('== draft user bubble rows (expect 2 lines first bubble): blue spans y90..150')
for y in range(90, 151, 6):
    s = spans(dr, y, lambda p: p[2] > 200 and 100 < p[1] < 190, 0, 370)
    if s: print(' y=', y, s)
ho = Image.open(B + 'home-390.png').convert('RGB')
print('== home Hands badge: black spans x60..120 y150..200')
for y in range(150, 201, 4):
    s = spans(ho, y, lambda p: sum(p) < 150, 60, 120)
    if s: print(' y=', y, s)
print('== home Pluso dot / Camo cup: orange spans near Pluso avatar, white badge near Camo')
for (x, y) in [(48, 300), (52, 296), (48, 360)]:
    p = ho.getpixel((x, y)); print(f'  ({x},{y}) #{p[0]:02x}{p[1]:02x}{p[2]:02x}')
de = Image.open(B + 'detail-390.png').convert('RGB')
print('== detail store glyph sample (expect gradient light top -> deep bottom)')
for (x, y) in [(45, 300), (45, 315), (45, 325), (215, 300), (215, 325)]:
    p = de.getpixel((x, y)); print(f'  ({x},{y}) #{p[0]:02x}{p[1]:02x}{p[2]:02x}')
