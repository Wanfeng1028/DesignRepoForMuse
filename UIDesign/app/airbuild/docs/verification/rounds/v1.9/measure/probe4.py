from PIL import Image
import os, statistics
REF='/home/hatch/workspace/airbuild-refs/appstore/'
def med(im,x,y,r=5):
    box=[im.getpixel((xx,yy)) for xx in range(max(0,x-r),x+r+1) for yy in range(max(0,y-r),y+r+1)]
    return tuple(int(statistics.median([p[i] for p in box])) for i in range(3))
def hx(c): return f'#{c[0]:02x}{c[1]:02x}{c[2]:02x}'
def cross(im,label,x,y):
    pts={'c':(x,y),'L':(x-20,y),'R':(x+20,y),'U':(x,y-20),'D':(x,y+20)}
    print(f'  {label} ({x},{y}): '+' '.join(f'{k}={hx(med(im,px,py))}' for k,(px,py) in pts.items()))
im=Image.open(REF+'iphone-03-build-with-your-team.jpg').convert('RGB')
print('== iphone-03 screen rect: inner x150..1179 (w1030), factor390=0.3786')
print(' canvas zones (11x11 median + center):')
for (x,y) in [(300,1050),(600,1050),(900,1050),(300,1800),(900,1800),(600,600)]:
    print(f'  canvas ({x},{y}) med={hx(med(im,x,y))} center={hx(im.getpixel((x,y)))}')
print(' glass/topbar zone row scans:')
for y in [920,950,980,1000]:
    row=[]
    for x in range(150,360,20):
        row.append(f'{x}:{hx(im.getpixel((x,y)))}')
    print(f'  y={y} '+' '.join(row))
print(' user blue bbox scan y2500..2868, blue=(0,136,254) tol25:')
xs=[];ys=[]
for yy in range(2500,2868,2):
    for xx in range(150,1180,2):
        p=im.getpixel((xx,yy))
        if abs(p[0]-0)<=25 and abs(p[1]-136)<=25 and abs(p[2]-254)<=25:
            xs.append(xx);ys.append(yy)
print(f'  blue x {min(xs)}..{max(xs)} (w{max(xs)-min(xs)+1}, {(max(xs)-min(xs)+1)*390/1030:.1f}pt) y {min(ys)}..{max(ys)}')
for (x,y) in [(850,2700),(700,2750),(1000,2750),(600,2800),(1050,2800)]:
    print(f'  blue pt ({x},{y}) med={hx(med(im,x,y))}')
print(' status col x=300 y230..500 step10:')
print('  '+' '.join(f'{y}:{hx(im.getpixel((300,y)))}' for y in range(230,501,10)))
print(' status col x=660 y230..500 step10:')
print('  '+' '.join(f'{y}:{hx(im.getpixel((660,y)))}' for y in range(230,501,10)))
print(' top row y=300 x150..1180 step40:')
print('  '+' '.join(f'{x}:{hx(im.getpixel((x,300)))}' for x in range(150,1181,40)))
im6=Image.open(REF+'iphone-06-daily-briefing.jpg').convert('RGB')
print('== iphone-06 send button zone (prior 1080,2200): row/col scans')
for y in [2150,2180,2200,2230,2260]:
    print(f'  y={y} '+' '.join(f'{x}:{hx(im6.getpixel((x,y)))}' for x in range(1000,1180,20)))
print('  send blue bbox y1900..2400:')
xs=[];ys=[]
for yy in range(1900,2400,2):
    for xx in range(150,1180,2):
        p=im6.getpixel((xx,yy))
        if abs(p[0]-38)<=25 and abs(p[1]-142)<=25 and abs(p[2]-255)<=25:
            xs.append(xx);ys.append(yy)
if xs: print(f'  send x {min(xs)}..{max(xs)} (w{max(xs)-min(xs)+1}, {(max(xs)-min(xs)+1)*390/1030:.1f}pt) y {min(ys)}..{max(ys)} (h{max(ys)-min(ys)+1}, {(max(ys)-min(ys)+1)*390/1030:.1f}pt)')
else: print('  none')
im5=Image.open(REF+'iphone-05-submit-for-review.jpg').convert('RGB')
print('== iphone-05 col x=400 y500..900 step20 (find screen top):')
print('  '+' '.join(f'{y}:{hx(im5.getpixel((400,y)))}' for y in range(500,901,20)))
print('  row y=2650 x300..1100 step50 (home indicator hunt):')
print('  '+' '.join(f'{x}:{hx(im5.getpixel((x,2650)))}' for x in range(300,1101,50)))
print('  row y=2600 x300..1100 step50:')
print('  '+' '.join(f'{x}:{hx(im5.getpixel((x,2600)))}' for x in range(300,1101,50)))
