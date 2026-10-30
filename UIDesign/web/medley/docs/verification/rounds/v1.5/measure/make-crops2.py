from PIL import Image
im = Image.open('/home/hatch/workspace/user/media_library/image/photo-9.jpg').convert('RGB')
base = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/v1.5/crops/'
for name, box in {
 'bl-header': (70,1640,690,1790),
 'br-header': (775,1640,1170,1790),
 'bl-msgheader': (70,1830,690,1910),
 'br-msgheader': (775,2000,1170,2160),
 'home-suggest': (775,950,1170,1330),
}.items():
    c = im.crop(box)
    c = c.resize((c.width*3, c.height*3), Image.NEAREST)
    c.save(base+name+'.png')
    print(name, box, c.size)
