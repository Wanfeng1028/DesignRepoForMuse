from PIL import Image
import os
REF='/home/hatch/workspace/airbuild-refs/appstore/'
def show_row(im,y,x0,x1,step=10):
    out=[]
    for x in range(x0,x1+1,step):
        p=im.getpixel((x,y)); out.append(f"{x}:#{p[0]:02x}{p[1]:02x}{p[2]:02x}")
    print(' row y=',y,' '.join(out))
def show_col(im,x,y0,y1,step=20):
    out=[]
    for y in range(y0,y1+1,step):
        p=im.getpixel((x,y)); out.append(f"{y}:#{p[0]:02x}{p[1]:02x}{p[2]:02x}")
    print(' col x=',x,' '.join(out))
im=Image.open(REF+'iphone-03-build-with-your-team.jpg').convert('RGB')
print('== iphone-03')
show_row(im,1050,90,300,10); show_row(im,1050,1000,1240,10); show_col(im,660,200,600,20)
im6=Image.open(REF+'iphone-06-daily-briefing.jpg').convert('RGB')
print('== iphone-06')
show_row(im6,500,90,300,10); show_row(im6,500,1000,1240,10); show_col(im6,660,0,400,20)
im5=Image.open(REF+'iphone-05-submit-for-review.jpg').convert('RGB')
print('== iphone-05')
show_row(im5,950,140,400,10); show_row(im5,950,950,1180,10); show_col(im5,660,230,500,20); show_col(im5,660,2600,2868,20)
