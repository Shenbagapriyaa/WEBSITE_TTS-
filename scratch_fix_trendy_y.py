import os
from PIL import Image

brain_dir = r"C:\Users\madhu\.gemini\antigravity-ide\brain\829c389f-eb5b-4fdc-9b70-490c729cdbc8"
uploaded_dir = os.path.join(brain_dir, ".user_uploaded")
trendy_src = os.path.join(uploaded_dir, "media_1792579903284.png")
out_dir = r"c:\Users\madhu\Downloads\track-tech-solution-project\project\assets\img\clients"

im = Image.open(trendy_src).convert("RGB")
w, h = im.size

# Clone image
im_clean = im.copy()

# 1. Erase "CLOTHING &" (left of the 'y' swoosh)
# In y: 304 to 330, x: 0 to 222
for y in range(304, 335):
    for x in range(0, 222):
        im_clean.putpixel((x, y), (255, 255, 255))

# 2. Erase "JEWELLERY" (right of the 'y' swoosh)
# In y: 304 to 335, x: 247 to w
for y in range(304, 335):
    for x in range(247, w):
        im_clean.putpixel((x, y), (255, 255, 255))

# Also erase anything below y=330 just in case
for y in range(330, h):
    for x in range(w):
        im_clean.putpixel((x, y), (255, 255, 255))

# Now find the true tight bounding box of the entire logo (including dress, jewelry, Trendy Fits with full 'y')
min_x, max_x = w, 0
min_y, max_y = h, 0
for y in range(h):
    for x in range(w):
        r, g, b = im_clean.getpixel((x, y))
        if r < 240 or g < 240 or b < 240:
            if x < min_x: min_x = x
            if x > max_x: max_x = x
            if y < min_y: min_y = y
            if y > max_y: max_y = y

pad_x, pad_y = 16, 12
cw = (max_x - min_x + 1) + pad_x * 2
ch = (max_y - min_y + 1) + pad_y * 2
final_trendy = Image.new("RGB", (cw, ch), (255, 255, 255))

for sy in range(min_y, max_y + 1):
    dy = sy - min_y + pad_y
    for sx in range(min_x, max_x + 1):
        dx = sx - min_x + pad_x
        r, g, b = im_clean.getpixel((sx, sy))
        if r > 240 and g > 240 and b > 240:
            final_trendy.putpixel((dx, dy), (255, 255, 255))
        else:
            final_trendy.putpixel((dx, dy), (r, g, b))

final_trendy.save(os.path.join(out_dir, "trendyfits.png"), quality=95)
print("Saved final_trendy.png", final_trendy.size)
