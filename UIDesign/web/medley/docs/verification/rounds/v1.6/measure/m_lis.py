from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
im = Image.open(B+"hd5-lisbon.jpg").convert("RGB")
print("lisbon size", im.size)
# screen bounds: find rows/cols dominated by screen bg (13,14,16)-ish vs bezel (25,26,30)
# print column medians at y=558 across x to find left/right screen edges
import statistics
for y in [200, 558, 900]:
    vals=[]
    for x in range(0,600,10):
        vals.append((x, im.getpixel((x,y))))
    print(f"row y={y} step10:", vals)
# composer: bottom bar region: scan col x=300 y950..1117
print("lisbon col x=300 y950..1117:")
prev=None
for y in range(950,1117):
    px=im.getpixel((300,y))
    if px!=prev: print(f"  y={y} {px}"); prev=px
# mic/stop disc: bottom-right region x480..580 y1000..1100: find peach pixels (223,162,130)-ish
print("peach px bbox x400..600 y950..1117:")
pts=[(x,y) for y in range(950,1117) for x in range(400,600) if abs(im.getpixel((x,y))[0]-223)<25 and abs(im.getpixel((x,y))[1]-162)<25 and abs(im.getpixel((x,y))[2]-130)<25]
if pts:
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    print(f"  x{min(xs)}..{max(xs)} ({max(xs)-min(xs)+1}) y{min(ys)}..{max(ys)} ({max(ys)-min(ys)+1}) n={len(pts)}")
# user bubble: first user msg "Plan 3 days..." region: find bubble fill (29,36,46)-ish bbox in x300..580 y120..260
print("user bubble fill bbox:")
pts=[(x,y) for y in range(100,280) for x in range(200,600) if abs(im.getpixel((x,y))[0]-29)<12 and abs(im.getpixel((x,y))[1]-36)<12 and abs(im.getpixel((x,y))[2]-46)<12]
if pts:
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    print(f"  x{min(xs)}..{max(xs)} y{min(ys)}..{max(ys)} n={len(pts)}")
# bubble corner: top-right corner cut: rows near bubble top, rightmost fill x per row
print("bubble top rows rightmost fill x (y130..170):")
for y in range(130,175):
    xs=[x for x in range(200,600) if abs(im.getpixel((x,y))[0]-29)<12 and abs(im.getpixel((x,y))[1]-36)<12 and abs(im.getpixel((x,y))[2]-46)<12]
    if xs: print(f"  y={y} xmax={max(xs)} xmin={min(xs)}")
# AiMeta dot GLM: region around "GLM-5" line y~270-300: find pink dot pixels
print("GLM dot region scan y260..310 x60..200: pink-ish (198,93,123)")
pts=[(x,y) for y in range(260,315) for x in range(60,220) if abs(im.getpixel((x,y))[0]-198)<30 and abs(im.getpixel((x,y))[1]-93)<30 and abs(im.getpixel((x,y))[2]-123)<30]
if pts:
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    print(f"  x{min(xs)}..{max(xs)} y{min(ys)}..{max(ys)} n={len(pts)}")
# top bar: Claude dot + title: y90..150
print("topbar col x=300 y60..170:")
prev=None
for y in range(60,175):
    px=im.getpixel((300,y))
    if px!=prev: print(f"  y={y} {px}"); prev=px
