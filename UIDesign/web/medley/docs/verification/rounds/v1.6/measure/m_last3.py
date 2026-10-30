from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
S = 1.446
def css(px): return round(px/S,1)
ch = Image.open(B+"cn4-home-cn.jpg").convert("RGB")
print("CN mic disc ASCII x505..575 y1240..1345 (char by max: .=<60, :=60-150, o=150-220, O>220):")
for y in range(1240,1346,2):
    line=""
    for x in range(505,576):
        r=max(ch.getpixel((x,y)))
        line += '.' if r<60 else (':' if r<150 else ('o' if r<220 else 'O'))
    print(f"  y={y} {line}")
print("CN plus bbox x55..100 y1230..1340 (dark<120):")
pts=[(x,y) for y in range(1230,1341) for x in range(55,101) if max(ch.getpixel((x,y)))<120]
if pts:
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    print(f"  x{min(xs)}..{max(xs)} y{min(ys)}..{max(ys)}")
print("CN auto pill: grey pill bbox? row y=1266 x130..260 (pill fill ~237 vs card 255):")
prev=None
for x in range(130,261):
    r=ch.getpixel((x,1266))[0]
    k='PILL' if 225<=r<=245 else ('CARD' if r>245 else 'TXT')
    if k!=prev: print(f"  x={x} {k} {ch.getpixel((x,1266))}"); prev=k
print("CN card top edge: row y=1180 x60..540 step 20 (find card left/right edges):")
print(" ", [(x, ch.getpixel((x,1180))) for x in range(60,541,20)])
print("CN card bottom edge: col x=100 y1300..1355:")
prev=None
for y in range(1300,1355):
    px=ch.getpixel((100,y))
    k='CARD' if max(px)>250 else ('BG' if max(px)<40 else 'MID')
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
