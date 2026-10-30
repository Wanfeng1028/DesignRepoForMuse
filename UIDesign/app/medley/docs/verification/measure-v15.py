from PIL import Image
import sys
D = 'rounds/v1.5/'
def load(n):
    im = Image.open(D + n + '.png').convert('RGB')
    print(f'== {n} {im.size}')
    return im
def patch(im, x, y, r=2):
    vs = [im.getpixel((x+dx, y+dy)) for dx in range(-r, r+1) for dy in range(-r, r+1)]
    return tuple(sum(v[i] for v in vs)//len(vs) for i in range(3))
def near(p, t, tol):
    return all(abs(p[i]-t[i]) <= tol for i in range(3))
def clusters(im, box, pred, minsize=3):
    x0, y0, x1, y1 = box
    seen = set(); pix = im.load(); out = []
    for y in range(y0, y1):
        for x in range(x0, x1):
            if (x, y) in seen or not pred(pix[x, y]): continue
            st = [(x, y)]; seen.add((x, y)); xs = []; ys = []
            while st:
                cx, cy = st.pop(); xs.append(cx); ys.append(cy)
                for nx, ny in ((cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)):
                    if x0 <= nx < x1 and y0 <= ny < y1 and (nx, ny) not in seen and pred(pix[nx, ny]):
                        seen.add((nx, ny)); st.append((nx, ny))
            if len(xs) >= minsize: out.append((min(xs), min(ys), max(xs), max(ys), len(xs)))
    return sorted(out, key=lambda b: (b[1], b[0]))
def brightrowbands(im, x0, x1, y0, y1, thr=150, mincnt=6):
    bands = []; inb = False
    for y in range(y0, y1):
        cnt = sum(1 for x in range(x0, x1, 2) if sum(im.getpixel((x, y)))//3 > thr)
        if cnt >= mincnt and not inb: s = y; inb = True
        elif cnt < mincnt and inb: bands.append((s, y-1)); inb = False
    return bands
def darkrowbands(im, x0, x1, y0, y1, thr=110, mincnt=6):
    bands = []; inb = False
    for y in range(y0, y1):
        cnt = sum(1 for x in range(x0, x1, 2) if sum(im.getpixel((x, y)))//3 < thr)
        if cnt >= mincnt and not inb: s = y; inb = True
        elif cnt < mincnt and inb: bands.append((s, y-1)); inb = False
    return bands
w = sys.argv[1] if len(sys.argv) > 1 else 'all'
if w in ('all', 'welcome'):
    im = load('welcome-dark')
    # title L: bright text cluster region x20-200, y300-360
    cl = clusters(im, (20, 290, 220, 370), lambda p: sum(p)//3 > 200, 4)
    print('welcome bright clusters title zone (first = L?):', cl[:6])
    print('welcome Google btn bg patch (60,668):', patch(im, 60, 668))
    # button rows: bright rows x60 col
    for col in (60, 200):
        runs = []
        prev = None
        for y in range(600, 760):
            b = sum(im.getpixel((col, y)))//3 > 180
            if b != prev: runs.append((y, 'bright' if b else 'dark')); prev = b
        print(f'welcome col x={col} transitions:', runs)
    # footnote first dark? footnote is dim text on dark bg: find dim rows near bottom
    print('welcome footnote/text bands y740-830 (bright>90):', brightrowbands(im, 20, 370, 740, 830, 90, 4))
if w in ('all', 'pricing'):
    im = load('pricing-dark')
    # arc dots: pastel saturated-ish clusters in top zone y40-130
    cl = clusters(im, (0, 30, 390, 140), lambda p: max(p)-min(p) > 25, 4)
    print('pricing arc clusters:', cl)
    print('pricing CTA bg patch:', patch(im, 60, 700))
    # feature row: bright text bands in Pro card region y~430-560
    print('pricing bright bands y400-600:', brightrowbands(im, 30, 360, 400, 600, 150, 6))
    # footer row: search for Restore text band y700-844
    print('pricing bright bands y680-844:', brightrowbands(im, 30, 360, 680, 844, 120, 4))
if w in ('all', 'homecn'):
    im = load('home-light-cn')
    print('home-cn bg patch (195,740):', patch(im, 195, 740), 'status patch (195,20):', patch(im, 195, 20))
    # input bar: find bar top/bottom: light bar has border+shadow; scan col x60 rows y700-844 for non-white
    for col in (60, 200):
        runs = []
        prev = None
        for y in range(690, 844):
            p = im.getpixel((col, y)); nonwhite = sum(p)//3 < 245
            if nonwhite != prev: runs.append((y, 'nonwhite' if nonwhite else 'white')); prev = nonwhite
        print(f'home-cn col x={col} transitions:', runs)
    print('home-cn dark bands bottom y690-844:', darkrowbands(im, 20, 370, 690, 844, 110, 4))
if w in ('all', 'homeen'):
    im = load('home-light-en')
    print('home-en bg patch (195,400):', patch(im, 195, 400))
    print('home-en greeting dark bands y450-540:', darkrowbands(im, 20, 370, 450, 540, 110, 6))
if w in ('all', 'lisbonen'):
    im = load('chat-dark-lisbon-en')
    # chevron grey cluster near topbar model name
    cl = clusters(im, (240, 55, 300, 95), lambda p: 140 < sum(p)//3 < 190, 2)
    print('lisbon-en chevron-ish clusters:', cl)
    # peach stop circle bottom: accent-near clusters y740-844
    cl = clusters(im, (300, 740, 390, 844), lambda p: near(p, (226, 161, 129), 40), 10)
    print('lisbon-en peach circle:', cl)
    # black square inside: dark cluster within circle zone
    cl = clusters(im, (320, 750, 370, 830), lambda p: sum(p)//3 < 60, 4)
    print('lisbon-en black-square-ish:', cl)
    # AiMeta dots: pastel patches: GLM row ~y200-230, Claude row ~y590-620: sample dot centers by saturation clusters
    cl = clusters(im, (15, 190, 60, 240), lambda p: max(p)-min(p) > 20, 3)
    print('lisbon-en GLM dot zone clusters:', cl)
    for b in cl:
        cx, cy = (b[0]+b[2])//2, (b[1]+b[3])//2
        print('   patch', (cx, cy), patch(im, cx, cy))
    cl = clusters(im, (15, 580, 60, 630), lambda p: max(p)-min(p) > 20, 3)
    print('lisbon-en Claude dot zone clusters:', cl)
    for b in cl:
        cx, cy = (b[0]+b[2])//2, (b[1]+b[3])//2
        print('   patch', (cx, cy), patch(im, cx, cy))
    # end dot: brand orange clusters near end of last answer y650-760
    cl = clusters(im, (20, 640, 370, 780), lambda p: near(p, (253, 103, 24), 45), 3)
    print('lisbon-en end-dot orange clusters:', cl)
    # input pill band: dark-input rows bottom
    print('lisbon-en input bar rows: bright/dark col x60 y740-844:')
    for col in (60,):
        runs = []; prev = None
        for y in range(740, 844):
            b = sum(im.getpixel((col, y)))//3 > 60
            if b != prev: runs.append((y, 'lit' if b else 'dark')); prev = b
        print('  ', runs)
if w in ('all', 'lisboncn'):
    im = load('chat-dark-lisbon-cn')
    # left button: dark-input circle: pixels near (31,32,36) in top-left zone
    cl = clusters(im, (10, 45, 80, 110), lambda p: near(p, (31, 32, 36), 12), 20)
    print('lisbon-cn left btn circle-ish:', cl)
    # center pill bg (28,32,38) / right pill (26,32,42)
    cl = clusters(im, (80, 45, 320, 110), lambda p: near(p, (28, 32, 38), 10), 20)
    print('lisbon-cn center pill:', cl)
    cl = clusters(im, (280, 45, 390, 110), lambda p: near(p, (26, 32, 42), 10), 20)
    print('lisbon-cn right pill:', cl)
    # AiMeta rows saturation: GLM row y~150-200, Claude row y~560-620: any saturated dot?
    for (y0, y1, tag) in ((140, 200, 'GLM'), (540, 620, 'Claude')):
        cl = clusters(im, (15, y0, 60, y1), lambda p: max(p)-min(p) > 25, 3)
        print(f'lisbon-cn AiMeta {tag} saturated clusters (want none):', cl)
    # sources chip: dark-row small squares y~? search whole content for 16px squares bg dark-row
    cl = clusters(im, (15, 300, 200, 500), lambda p: near(p, (47, 48, 52), 10), 8)
    print('lisbon-cn dark-row clusters (chip squares?):', cl[:10])
    # third bullet single line: dark? cn text bright on dark: bright bands in bullets zone
    print('lisbon-cn bullet bright bands y250-450:', brightrowbands(im, 20, 370, 250, 450, 150, 6))
    # white stop circle + square in double bar bottom
    cl = clusters(im, (300, 700, 390, 844), lambda p: sum(p)//3 > 235, 10)
    print('lisbon-cn white circle:', cl)
    cl = clusters(im, (320, 720, 370, 830), lambda p: sum(p)//3 < 60, 4)
    print('lisbon-cn black-square-ish:', cl)
    # end dot
    cl = clusters(im, (20, 600, 370, 720), lambda p: near(p, (253, 103, 24), 45), 3)
    print('lisbon-cn end-dot orange clusters:', cl)
    # double bar: find bar top: dark-input rows bottom
    for col in (60,):
        runs = []; prev = None
        for y in range(690, 844):
            b = sum(im.getpixel((col, y)))//3 > 45
            if b != prev: runs.append((y, 'lit' if b else 'dark')); prev = b
        print('lisbon-cn col x=60 transitions y690-844:', runs)
if w in ('all', 'pickera'):
    im = load('model-picker-a')
    # handle bar: grey bar top center y~10-30
    cl = clusters(im, (150, 0, 240, 40), lambda p: near(p, (58, 59, 64), 12), 5)
    print('picker-a handle:', cl)
    # section title bands
    print('picker-a bright bands y0-200:', brightrowbands(im, 20, 370, 0, 200, 150, 6))
    # Fable row: badge + cost same band? search bright bands y680-844
    print('picker-a bright bands y650-844:', brightrowbands(im, 20, 370, 650, 844, 150, 4))
    # dots: sample first row dot colors: dots at x~27? rows: find small pastel clusters
    cl = clusters(im, (15, 200, 40, 800), lambda p: max(p)-min(p) > 20, 3)
    print('picker-a left-col pastel clusters (dots):', cl[:20])
    for b in cl[:12]:
        cx, cy = (b[0]+b[2])//2, (b[1]+b[3])//2
        print('   dot patch', (cx, cy), patch(im, cx, cy))
if w in ('all', 'credits'):
    im = load('credits-light')
    print('credits huge digit dark col bands x20-120 y90-170:', darkrowbands(im, 20, 120, 90, 170, 130, 4))
    print('credits bg patch (195,400):', patch(im, 195, 400))
if w in ('all', 'language'):
    im = load('language-light')
    print('language bg patch (195,400):', patch(im, 195, 400), 'flat patch (300,700):', patch(im, 300, 700))
    print('language title dark bands y90-150:', darkrowbands(im, 20, 370, 90, 150, 110, 6))
