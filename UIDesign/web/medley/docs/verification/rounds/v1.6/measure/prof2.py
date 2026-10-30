from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
def runs(vals, minrun=3):
    out=[]; prev=None; start=0; run=0
    for i,v in enumerate(vals):
        if v!=prev:
            if prev is not None and run>=minrun: out.append((start,i-1,prev,run))
            prev=v; start=i; run=1
        else: run+=1
    if run>=minrun: out.append((start,len(vals)-1,prev,run))
    return out
for name, y in [("hd5-home-en.jpg",647),("hd5-lisbon.jpg",558),("cn4-welcome-cn.jpg",652),("hd5-pricing.jpg",600),("hd5-credits.jpg",600),("hd5-pickerA.jpg",600),("cn4-home-cn.jpg",650),("cn4-language.jpg",650)]:
    im = Image.open(B+name).convert("RGB"); w,h = im.size
    row = [im.getpixel((x,y)) for x in range(w)]
    # classify: bezel dark if all channels < 40 and similar
    cls = []
    for (r,g,b) in row:
        cls.append('B' if max(r,g,b)<45 else 'S')
    print(name, "row", y, runs(cls, 5)[:12])
    col = [im.getpixel((w//2,y)) for y in range(h)]
    clsc = ['B' if max(px)<45 else 'S' for px in col]
    print("   center col:", runs(clsc, 5)[:12])
