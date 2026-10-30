from PIL import Image
import os
REF='/home/hatch/workspace/airbuild-refs/appstore'
BG=(216,224,235)
def isbg(c): return abs(c[0]-216)<=8 and abs(c[1]-224)<=8 and abs(c[2]-235)<=8
for name in ['iphone-03-build-with-your-team.jpg','iphone-06-daily-briefing.jpg','iphone-04-website-draft.jpg','iphone-05-submit-for-review.jpg']:
    im=Image.open(os.path.join(REF,name)).convert('RGB'); W,H=im.size
    print('==',name)
    for y in [200,400,800,1200,1600,2000,2400,2700,2840]:
        # find runs of non-bg
        row=[im.getpixel((x,y)) for x in range(W)]
        nb=[not isbg(c) for c in row]
        # first/last non-bg
        try:
            first=nb.index(True); last=len(nb)-1-nb[::-1].index(True)
        except ValueError:
            first=last=-1
        print(f' y={y} firstNonBg={first} lastNonBg={last} leftPx={im.getpixel((first,y)) if first>=0 else None} rightPx={im.getpixel((last,y)) if last>=0 else None}')
    for x in [660,400,900]:
        col=[im.getpixel((x,y)) for y in range(H)]
        nb=[not isbg(c) for c in col]
        try:
            first=nb.index(True); last=len(nb)-1-nb[::-1].index(True)
        except ValueError:
            first=last=-1
        print(f' x={x} firstNonBgY={first} lastNonBgY={last}')
