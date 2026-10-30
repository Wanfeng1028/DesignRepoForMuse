from PIL import Image
im = Image.open('/home/hatch/workspace/user/media_library/image/photo-9.jpg').convert('RGB')
base = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/v1.5/crops/'
crops = {
 'mark-tl': (90,170,280,245),
 'auto-tr': (920,170,1170,245),
 'cursor-title': (100,560,680,660),
 'kimi-header': (70,1520,690,1660),
 'gpt-header': (775,1520,1170,1660),
 'weather': (70,1880,690,2100),
 'home-upper': (775,300,1170,1000),
 'welcome-full-tl': (70,90,695,1330),
 'welcome-bottom': (70,1000,695,1330),
}
for name, box in crops.items():
    c = im.crop(box)
    c = c.resize((c.width*3, c.height*3), Image.NEAREST)
    c.save(base+name+'.png')
    print(name, box, c.size)
