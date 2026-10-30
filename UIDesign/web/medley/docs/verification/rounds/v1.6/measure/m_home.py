from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
im = Image.open(B+"hd5-home-en.jpg").convert("RGB")
W,H = im.size
print("size", W, H, "screen x18..581 -> Wscr=564, scale=1.446")
def dark(x,y): 
    r,g,b = im.getpixel((x,y)); return max(r,g,b)<80
def bbox(x0,x1,y0,y1,cond,label):
    pts=[(x,y) for y in range(y0,y1) for x in range(x0,x1) if cond(x,y)]
    if pts:
        xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
        print(f"{label}: x{min(xs)}..{max(xs)} ({max(xs)-min(xs)+1}px) y{min(ys)}..{max(ys)} ({max(ys)-min(ys)+1}px) n={len(pts)}")
    else: print(label, "none")
# menu icon top-left: region x30..110 y100..180 (below status bar)
bbox(30,120,90,190, dark, "menu icon dark px")
# clock top-right x480..570 y90..190
bbox(470,580,90,190, dark, "clock icon dark px")
# Auto pill: bg approx (237,238,240)? pill is light grey on wash bg; find pill rows: scan row y=140 for runs of (237..242)
for y in [130,140,150,160,170]:
    row=[im.getpixel((x,y)) for x in range(150,450)]
    # print compact: positions where pixel is pill-ish (all channels 230..245, low saturation)
    pill=[150+i for i,p in enumerate(row) if 225<=p[0]<=248 and abs(p[0]-p[2])<8]
    if pill: print(f"pill-ish row y={y}: x{min(pill)}..{max(pill)}")
# greeting rows: dark text in x40..560 y770..860
bbox(40,570,750,880, dark, "greeting dark px")
# suggestion dividers: column x=300, y880..1150: find rows where pixel is divider-grey (darker than bg by >10 but not text-dark): bg ~ (230,238,240), divider ~(225,228,230)?
print("-- col x=300 y880..1180 values (only rows differing from neighbours):")
prev=None
for y in range(880,1180):
    px=im.getpixel((300,y))
    if px!=prev:
        print(f"  y={y} {px}")
        prev=px
