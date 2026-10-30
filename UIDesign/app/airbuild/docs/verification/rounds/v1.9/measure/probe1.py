from PIL import Image
import os, collections
REF='/home/hatch/workspace/airbuild-refs/appstore'
def px(im,x,y):
    return im.getpixel((x,y))
def near(c,t,tol=18):
    return all(abs(c[i]-t[i])<=tol for i in range(3))
for name in ['iphone-03-build-with-your-team.jpg','iphone-06-daily-briefing.jpg','iphone-04-website-draft.jpg','iphone-05-submit-for-review.jpg','iphone-01-your-idea.jpg']:
    im=Image.open(os.path.join(REF,name)).convert('RGB')
    W,H=im.size
    print('==',name,W,H)
    # grid samples
    for fy in [0.02,0.05,0.10,0.20,0.35,0.50,0.65,0.80,0.95,0.99]:
        row=[]
        for fx in [0.08,0.25,0.5,0.75,0.92]:
            row.append(px(im,int(W*fx),int(H*fy)))
        print(f' y={fy:.2f} ypx={int(H*fy)}',row)
    # blue bbox scan (user blue family) on downsampled grid step 4
    for target,label in [((0,136,254),'userblue'),((38,142,255),'sendblue')]:
        xs=[];ys=[]
        small=im.resize((330,717))
        for yy in range(717):
            for xx in range(330):
                if near(small.getpixel((xx,yy)),target,22):
                    xs.append(xx);ys.append(yy)
        if xs:
            print(f'  {label}: count={len(xs)} x {min(xs)*4}-{max(xs)*4} y {min(ys)*4}-{max(ys)*4} (orig px, step4 approx)')
        else:
            print(f'  {label}: none at tol22')
