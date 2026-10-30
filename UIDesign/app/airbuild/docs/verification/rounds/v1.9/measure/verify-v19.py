from PIL import Image
import os
B='/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/docs/verification/rounds/v1.9/bare/'
def spans(img,y,pred,x0=0,x1=370):
    xs=[x for x in range(x0,x1) if pred(img.getpixel((x,y)))]
    if not xs: return []
    g=[[xs[0]]]
    for x in xs[1:]:
        if x-g[-1][-1]<=2: g[-1].append(x)
        else: g.append([x])
    return [(a[0],a[-1]) for a in g if len(a)>=2]
def hx(p): return f'#{p[0]:02x}{p[1]:02x}{p[2]:02x}'
ch=Image.open(B+'chat-390.png').convert('RGB')
print('== chat user bubble blue rows (bare coords): leftmost blue per row near bubble top')
for y in range(600,700,4):
    s=spans(ch,y,lambda p: p[2]>200 and 100<p[1]<190,0,370)
    if s: print(f'  y={y} blue {s}')
print('== chat agent bubble: first bubble left edge + first dark glyph (rows y~150-170 in bare? use DOM y150-10=140 framed->bare 140)')
for y in range(130,180,4):
    w=spans(ch,y,lambda p: p[0]>248 and p[1]>248 and p[2]>248,40,300)
    d=spans(ch,y,lambda p: sum(p)<350,40,300)
    if w or d: print(f'  y={y} white {w} dark {d}')
print('== chat home indicator row y811-816, x110..260 dark spans')
for y in range(809,819):
    s=spans(ch,y,lambda p: sum(p)<150,0,370)
    print(f'  y={y} dark {s}')
br=Image.open(B+'briefing-390.png').convert('RGB')
print('== briefing send disc blue bbox rows y750..800 step5')
for y in range(740,810,5):
    s=spans(br,y,lambda p: p[2]>200 and 100<p[1]<190,250,370)
    if s: print(f'  y={y} blue {s}')
print('== briefing send arrow white bbox (inside disc): rows y760..790')
for y in range(760,791,5):
    s=spans(br,y,lambda p: p[0]>240 and p[1]>240 and p[2]>240,300,360)
    if s: print(f'  y={y} white {s}')
print('== briefing second message: col x=60 y560..760 step8 (W=white bubble, C=canvas, B=blue/composer)')
for y in range(560,761,8):
    p=br.getpixel((60,y)); k='W' if p[0]>248 and p[1]>248 and p[2]>248 else ('C' if 240<=p[0]<=247 else 'X')
    print(f'{y}:{k}',end=' ')
print()
print('== briefing glass pill (chat top pill) sample: row y~82 (DOM pill y92 framed -> bare 82), x165..230 step10')
for x in range(160,235,10):
    print(f'{x}:{hx(br.getpixel((x,82)))}',end=' ')
print()
co=Image.open(B+'components-390.png').convert('RGB')
print('== components typing dots rows y55..75: dark spans x60..115')
for y in range(55,76,4):
    s=spans(co,y,lambda p: sum(p)<400,60,115)
    if s: print(f'  y={y} dark {s}')
print('== components send disc rows y555..590 step5')
for y in range(555,591,5):
    s=spans(co,y,lambda p: p[2]>200 and 100<p[1]<190,250,370)
    if s: print(f'  y={y} blue {s}')
