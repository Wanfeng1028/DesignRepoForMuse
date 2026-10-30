from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
S = 1.446
def css(px): return round(px/S,1)
# Lisbon bubble col x=400
im = Image.open(B+"hd5-lisbon.jpg").convert("RGB")
print("== lisbon bubble col x=400 y100..230:")
prev=None
for y in range(100,231):
    px=im.getpixel((400,y))
    k='BG' if sum(abs(a-b) for a,b in zip(px,(13,14,16)))<=12 else ('FILL' if sum(abs(a-b) for a,b in zip(px,(29,36,46)))<=18 else ('TXT' if max(px)>200 else 'OTH'))
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
print("== lisbon bubble top-right corner: rightmost FILL x per row y125..165:")
for y in range(125,166):
    xs=[x for x in range(200,560) if sum(abs(a-b) for a,b in zip(im.getpixel((x,y)),(29,36,46)))<=18]
    if xs: print(f"  y={y} xmax={max(xs)}")
print("== GLM dot scan y200..280 x80..200 pink-ish:")
pts=[(x,y) for y in range(200,281) for x in range(80,201) if im.getpixel((x,y))[0]>150 and im.getpixel((x,y))[1]<140 and 80<im.getpixel((x,y))[2]<170 and im.getpixel((x,y))[0]-im.getpixel((x,y))[2]>40]
print("  n=",len(pts), (f"x{min(p[0] for p in pts)}..{max(p[0] for p in pts)} y{min(p[1] for p in pts)}..{max(p[1] for p in pts)}" if pts else ""))
# Welcome CN buttons col x=120
w = Image.open(B+"cn4-welcome-cn.jpg").convert("RGB")
print("== welcome CN col x=120 y900..1305:")
prev=None
for y in range(900,1305):
    px=w.getpixel((120,y))
    k='PANEL' if sum(abs(a-b) for a,b in zip(px,(17,21,24)))<=10 else ('GOOGLE' if sum(abs(a-b) for a,b in zip(px,(237,238,242)))<=10 else 'OTH')
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
# CN home segment row scan
ch = Image.open(B+"cn4-home-cn.jpg").convert("RGB")
print("== cn home row y=150 x60..540 (runs of similar R):")
prev=None; start=60
for x in range(60,541):
    r=ch.getpixel((x,150))[0]
    k='W255' if r>250 else ('P245' if r>242 else ('C237' if r>232 else 'D'))
    if k!=prev:
        if prev is not None: print(f"  x{start}..{x-1} {prev}")
        prev=k; start=x
print(f"  x{start}..540 {prev}")
print("== cn home segment col x=300 y100..220 (segment top/bottom):")
prev=None
for y in range(100,221):
    px=ch.getpixel((300,y))
    k='W' if max(px)>250 else ('C' if 232<=max(px)<=242 else 'P')
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
