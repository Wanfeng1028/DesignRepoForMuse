from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
im = Image.open(B+"hd5-home-en.jpg").convert("RGB")
for x in [150, 300, 500]:
    print(f"col x={x} y1155..1250:")
    prev=None
    for y in range(1155,1251):
        px=im.getpixel((x,y))
        if px!=prev: print(f"  y={y} {px}"); prev=px
# mic glyph: right side x500..560 y1170..1250 dark px
for label,(x0,x1) in [("plus",(45,95)),("mic",(505,560))]:
    pts=[(x,y) for y in range(1170,1250) for x in range(x0,x1) if max(im.getpixel((x,y)))<120]
    if pts:
        xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
        print(f"{label}: x{min(xs)}..{max(xs)} y{min(ys)}..{max(ys)} center-y={(min(ys)+max(ys))/2}")
# placeholder text band x150..450 light-dark? placeholder is grey (~155) on white: count mid-grey px rows
print("placeholder rows (grey 100..200 count, x150..450, y1170..1250):")
for y in range(1170,1250):
    c=sum(1 for x in range(150,451) if 100<=max(im.getpixel((x,y)))<=200)
    if c>5: print(f"  y={y} n={c}")
