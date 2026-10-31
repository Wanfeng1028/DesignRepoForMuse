"""Orig status-bar scan (numbers only, no crops written): for each App Store
iPhone shot, scan the top strip for dark content (time digits left, island
centre, icons right). Marketing shots may crop/hide the status bar; report
what is actually there, do not invent."""
from PIL import Image
import os
REF='/home/hatch/workspace/airbuild-refs/appstore'
for name in ['iphone-03-build-with-your-team.jpg','iphone-06-daily-briefing.jpg','iphone-01-your-idea.jpg','iphone-05-submit-for-review.jpg','iphone-04-website-draft.jpg']:
    im=Image.open(os.path.join(REF,name)).convert('RGB')
    W,H=im.size
    print('==',name,W,H)
    for y0 in range(0,600,50):
        row=im.crop((0,y0,W,y0+50))
        px=list(row.getdata())
        dark=sum(1 for p in px if sum(p)<250)
        print(f'  y{y0}-{y0+50} dark={dark} ({dark/len(px)*100:.2f}%)')
    # left third / centre third / right third dark counts in y0-300 band
    band=im.crop((0,0,W,300))
    for label,x0,x1 in [('left',0,W//3),('centre',W//3,2*W//3),('right',2*W//3,W)]:
        sub=band.crop((x0,0,x1,300)); px=list(sub.getdata())
        dark=sum(1 for p in px if sum(p)<250)
        print(f'  band0-300 {label} dark={dark} ({dark/len(px)*100:.2f}%)')
