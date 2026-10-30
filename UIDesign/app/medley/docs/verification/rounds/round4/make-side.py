from PIL import Image
pairs = [
    ("welcome", "render-welcome.png", "orig-welcome.jpg"),
    ("pricing", "render-pricing.png", "orig-pricing.jpg"),
    ("home-cn", "render-home-cn.png", "orig-home-cn.jpg"),
    ("lisbon-en", "render-lisbon-en.png", "orig-lisbon-en.jpg"),
    ("lisbon-cn", "render-lisbon-cn.png", "orig-lisbon-cn.jpg"),
    ("picker-a", "render-picker-a.png", "orig-picker.jpg"),
    ("kyoto", "render-kyoto.png", "orig-kyoto.jpg"),
]
for name, render_path, orig_path in pairs:
    left = Image.open(render_path).convert("RGB")
    right = Image.open(orig_path).convert("RGB")
    h = 844
    rw = int(round(right.width * h / right.height))
    right = right.resize((rw, h), Image.LANCZOS)
    canvas = Image.new("RGB", (left.width + 4 + rw, h), (255, 255, 255))
    canvas.paste(left, (0, 0))
    canvas.paste(right, (left.width + 4, 0))
    out = "side-" + name + ".jpg"
    canvas.save(out, quality=90)
    print(out, canvas.size, "orig_resized_to", (rw, h))
