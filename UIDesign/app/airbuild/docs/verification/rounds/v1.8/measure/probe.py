from PIL import Image
import statistics
REF = '/home/hatch/workspace/airbuild-refs/appstore/'
POINTS = {
 'iphone-03-build-with-your-team.jpg': [
  ('canvas', 700, 1050), ('pill-hourtown', 660, 1000), ('back-btn', 200, 920),
  ('pluso-avatar', 165, 1480), ('file-avatar-purple', 1080, 1680), ('ampo-msg-avatar', 165, 2050),
  ('user-bubble', 850, 2700), ('task-card', 500, 2320), ('task-circle', 180, 2400),
 ],
 'iphone-06-daily-briefing.jpg': [
  ('canvas', 700, 500), ('ato-tile', 660, 80), ('ato-pill', 660, 170),
  ('msg-bubble', 600, 350), ('card-white', 400, 750),
  ('pill-hand-tile', 200, 1115), ('pill-dot1', 245, 1115), ('pill-dot2', 280, 1115),
  ('cover-topleft', 200, 1250), ('cover-flower', 580, 1260), ('cover-bottom', 400, 1400),
  ('sales-bar-search', 1050, 1630), ('composer-hand', 250, 2050), ('send-btn', 1080, 2200),
 ],
 'iphone-05-submit-for-review.jpg': [
  ('panel-bg', 700, 950), ('status-card', 700, 1150), ('hand-tile', 280, 1150),
  ('brush-badge', 340, 1200), ('green-dot', 330, 1110),
  ('appstore-glyph-top', 230, 1380), ('appstore-glyph-bot', 230, 1420),
  ('testflight-glyph-top', 800, 1380), ('testflight-glyph-bot', 800, 1420),
  ('chevron-badge', 720, 980), ('check-btn', 1080, 980), ('progress-green', 230, 2120),
 ],
 'ipad-01.jpg': [
  ('pluso-avatar', 360, 1690), ('pluso-dot', 400, 1660), ('camo-avatar', 360, 1830), ('camo-cup', 400, 1800),
  ('qesto-avatar', 360, 1980), ('ato-avatar', 360, 2130), ('ampo-avatar', 360, 2280), ('leto-avatar', 360, 2430),
  ('colo-avatar', 770, 2520), ('cloud-btn', 360, 1010), ('cloud-arc-br', 395, 1045),
  ('hands-tile', 400, 1150), ('hourtown-tile', 620, 1150), ('sleepy-tile', 400, 1380), ('casehot-tile', 620, 1380),
 ],
}
for fname, pts in POINTS.items():
    im = Image.open(REF + fname).convert('RGB')
    print('==', fname, im.size)
    for label, x, y in pts:
        box = [im.getpixel((xx, yy)) for xx in range(max(0, x-5), x+6) for yy in range(max(0, y-5), y+6)]
        med = tuple(int(statistics.median([p[i] for p in box])) for i in range(3))
        print(f'  {label} ({x},{y}) median=#{med[0]:02x}{med[1]:02x}{med[2]:02x} center=#{im.getpixel((x,y))[0]:02x}{im.getpixel((x,y))[1]:02x}{im.getpixel((x,y))[2]:02x}')
