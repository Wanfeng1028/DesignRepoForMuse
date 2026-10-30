from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
S = 1.446
def css(px): return round(px/S,1)
pr = Image.open(B+"hd5-pricing.jpg").convert("RGB")
for y in [480, 870]:
    vals=[pr.getpixel((x,y)) for x in range(60,541,20)]
    print(f"row y={y} step20:", vals)
print("radio bbox x95..130 y550..600 (R 90..200):")
pts=[(x,y) for y in range(550,601) for x in range(95,131) if 90<=max(pr.getpixel((x,y)))<=200]
xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
print(f"  x{min(xs)}..{max(xs)} ({max(xs)-min(xs)+1}px={css(max(xs)-min(xs)+1)}css) y{min(ys)}..{max(ys)} ({max(ys)-min(ys)+1}px={css(max(ys)-min(ys)+1)}css)")
print("radio inner dot: bright px (max>200) bbox x100..130 y555..595:")
pts=[(x,y) for y in range(555,596) for x in range(100,131) if max(pr.getpixel((x,y)))>200]
if pts:
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    print(f"  x{min(xs)}..{max(xs)} y{min(ys)}..{max(ys)} n={len(pts)}")
print("plan radio y-centers: scan col x=110 for ring rows (R 90..200) y400..1100:")
prev=None
for y in range(400,1101):
    r=max(pr.getpixel((110,y)))
    hit = 90<=r<=200
    if hit!=prev: print(f"  y={y} {'HIT' if hit else '---'} {pr.getpixel((110,y))}"); prev=hit
# Credits
cr = Image.open(B+"hd5-credits.jpg").convert("RGB")
print("== credits size", cr.size)
print("credits buttons col x=300 y360..450:")
prev=None
for y in range(360,451):
    px=cr.getpixel((300,y))
    k='DARK' if max(px)<60 else ('W' if max(px)>240 else 'BG')
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
print("credits huge number: dark text rows x60..400 y150..280 (count>30):")
for y in range(150,281):
    c=sum(1 for x in range(60,401) if max(cr.getpixel((x,y)))<80)
    if c>30: print(f"  y={y} n={c}")
