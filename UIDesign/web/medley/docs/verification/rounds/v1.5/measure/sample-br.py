from PIL import Image
im = Image.open('/home/hatch/workspace/user/media_library/image/photo-9.jpg').convert('RGB')
px = im.load()
def hx(c): return '#%02X%02X%02X' % tuple(c)
print('BR col x=950 y1600..2500 step 80:', ' '.join(f'{y}:{hx(px[950,y])}' for y in range(1600,2530,80)))
print('BR row y=1900 x800..1170 step 40:', ' '.join(f'{x}:{hx(px[x,1900])}' for x in range(800,1171,40)))
print('BR notice card area: median x830..1150 y1820..2000 step 4:')
vals=[px[x,y] for y in range(1820,2000,4) for x in range(830,1150,4)]
for i in range(3):
    s=sorted(c[i] for c in vals); print(f'  ch{i} median {s[len(s)//2]}')
