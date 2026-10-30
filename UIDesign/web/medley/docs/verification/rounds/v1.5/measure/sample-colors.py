from PIL import Image
from collections import Counter
import json
im = Image.open('/home/hatch/workspace/user/media_library/image/photo-9.jpg').convert('RGB')
px = im.load()
def hx(c): return '#%02X%02X%02X' % tuple(c)
def med(pts):
    pts=sorted(pts)
    n=len(pts)
    return pts[n//2] if n else None
def region_stats(name, x0,x1,y0,y1,step=2):
    vals=[]
    for y in range(y0,y1,step):
        for x in range(x0,x1,step):
            vals.append(px[x,y])
    # medians per channel
    rs=med([c[0] for c in vals]); gs=med([c[1] for c in vals]); bs=med([c[2] for c in vals])
    print(f'{name}: median=({rs},{gs},{bs}) {hx((rs,gs,bs))} n={len(vals)}')
    return (rs,gs,bs)
def peak(name, x0,x1,y0,y1, key, step=1):
    best=None; bestk=None
    for y in range(y0,y1,step):
        for x in range(x0,x1,step):
            c=px[x,y]; k=key(c)
            if bestk is None or k>bestk: bestk=k; best=(x,y,c)
    print(f'{name}: peak at {best[0]},{best[1]} = {best[2]} {hx(best[2])} key={bestk}')
    return best
def saturated(name, x0,x1,y0,y1, step=1, thresh=28):
    cnt=Counter()
    loc={}
    for y in range(y0,y1,step):
        for x in range(x0,x1,step):
            c=px[x,y]
            mx, mn = max(c), min(c)
            if mx-mn>=thresh and mx>60:
                q=(c[0]//16*16, c[1]//16*16, c[2]//16*16)
                cnt[q]+=1; loc.setdefault(q,(x,y,c))
    print(f'{name}: saturated clusters (bucket16):')
    for q,n in cnt.most_common(14):
        print(f'   {q} x{n} e.g. {loc[q][0]},{loc[q][1]}={loc[q][2]} {hx(loc[q][2])}')
print('== bases ==')
region_stats('TL welcome clean top-centre', 250,450,250,400)
region_stats('TL welcome clean mid-left', 100,300,350,500)
region_stats('BL chat empty upper', 100,300,1600,1750)
region_stats('BL chat empty lower-mid', 450,650,1950,2100)
region_stats('TR home clean top', 850,1050,250,400)
region_stats('TR home clean mid', 850,1100,600,800)
region_stats('BR chat clean', 850,1100,1600,1800)
print('== welcome glows ==')
peak('warm BL max R-B', 70,400,800,1120, lambda c: c[0]-c[2])
peak('warm BL max R', 70,400,800,1120, lambda c: c[0])
peak('green BR max G-R', 450,690,1150,1325, lambda c: c[1]-c[0])
peak('blue UR max B-R', 400,690,300,750, lambda c: c[2]-c[0])
peak('blue UR max B', 400,690,300,750, lambda c: c[2])
region_stats('warm BL core (around peak area)', 120,320,950,1100)
region_stats('green BR core', 520,690,1250,1325)
region_stats('blue UR core', 520,690,500,700)
print('== dots ==')
saturated('TL mark window', 95,165,180,230)
saturated('TR Auto mark window', 940,1010,180,230)
saturated('title cursor window', 555,615,585,640)
saturated('BL Kimi header dot window', 300,460,1550,1620)
saturated('BR GPT header dot window', 880,1040,1550,1620)
print('== weather / misc ==')
saturated('BL weather card', 100,480,1900,2070)
saturated('TR home suggestion icons', 790,1160,850,1250)
saturated('BL Kimi msg header', 100,300,1750,1850)
saturated('BR GPT msg header', 800,1050,2050,2150)
