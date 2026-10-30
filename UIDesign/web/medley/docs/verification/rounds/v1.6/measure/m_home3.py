from PIL import Image
import statistics
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
im = Image.open(B+"hd5-home-en.jpg").convert("RGB")
print("greeting+rows dark counts y774..1180 (x130..570, <100), banded:")
bands=[]; inb=False; s=0
for y in range(774,1181):
    c=sum(1 for x in range(130,571) if max(im.getpixel((x,y)))<100)
    if c>20 and not inb: inb=True; s=y
    if c<=20 and inb: bands.append((s,y-1)); inb=False
print(" text bands:", bands)
print("col x=100 (gap col) y880..1180, R values where local max >= neighbors+2:")
vals={y: im.getpixel((100,y))[0] for y in range(880,1181)}
for y in range(881,1180):
    if vals[y]>=vals[y-1]+2 and vals[y]>=vals[y+1]+2: print(f"  y={y} R={vals[y]} nbr {vals[y-1]},{vals[y+1]} full={im.getpixel((100,y))}")
print("composer: col x=300 y1150..1295:")
prev=None
for y in range(1150,1295):
    px=im.getpixel((300,y))
    if px!=prev: print(f"  y={y} {px}"); prev=px
print("composer row y=1220 samples x60..540 step 40:")
print(" ", [im.getpixel((x,1220)) for x in range(60,541,40)])
print("composer top edge: rows y1180..1210 col x=300 R:")
print(" ", [(y, im.getpixel((300,y))) for y in range(1180,1211)])
# photo-9 TR auto pill check
p9 = Image.open("/home/hatch/workspace/user/media_library/image/photo-9.jpg").convert("RGB")
print("photo9 size", p9.size)
# TR screen approx x772..1170, y95..1325; auto row near top: scan rows y200..400 col x=950
prev=None
for y in range(200,420):
    px=p9.getpixel((950,y))
    if px!=prev: print(f"  p9 x950 y={y} {px}"); prev=px
