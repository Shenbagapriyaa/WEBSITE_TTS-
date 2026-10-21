import os
from PIL import Image

brain_dir = r"C:\Users\madhu\.gemini\antigravity-ide\brain\829c389f-eb5b-4fdc-9b70-490c729cdbc8"
uploaded_dir = os.path.join(brain_dir, ".user_uploaded")
out_dir = r"c:\Users\madhu\Downloads\track-tech-solution-project\project\assets\img\clients"

# 1. TEXPORT: Zero black pixels, pure white background
tex_src = os.path.join(uploaded_dir, "media_1792579643628.png")
im = Image.open(tex_src).convert("RGB")
w, h = im.size

# Find bbox of only the blue letters and green dot
# Blue: b > 80 and b > r + 30
# Green: g > 100 and g > b + 20
min_x, max_x = w, 0
min_y, max_y = h, 0

for y in range(h):
    for x in range(w):
        r, g, b = im.getpixel((x, y))
        is_blue = (b > 75 and b > r + 25)
        is_green = (g > 95 and g > b + 15)
        if is_blue or is_green:
            if x < min_x: min_x = x
            if x > max_x: max_x = x
            if y < min_y: min_y = y
            if y > max_y: max_y = y

# Create clean white canvas
pad_x, pad_y = 20, 16
cw = (max_x - min_x + 1) + pad_x * 2
ch = (max_y - min_y + 1) + pad_y * 2
final_tex = Image.new("RGB", (cw, ch), (255, 255, 255))

for sy in range(min_y, max_y + 1):
    dy = sy - min_y + pad_y
    for sx in range(min_x, max_x + 1):
        dx = sx - min_x + pad_x
        r, g, b = im.getpixel((sx, sy))
        # If it's the text color, copy it
        # If it's near-black or grey, ignore (keep white canvas)
        is_blue = (b > 60 and b > r + 15)
        is_green = (g > 80 and g > b + 10)
        if is_blue or is_green:
            final_tex.putpixel((dx, dy), (r, g, b))
        else:
            final_tex.putpixel((dx, dy), (255, 255, 255))

final_tex.save(os.path.join(out_dir, "texport.png"), quality=95)
print("Saved clean texport.png", final_tex.size)

# 2. TRENDY FITS: Erase "CLOTHING & JEWELLERY"
trendy_src = os.path.join(uploaded_dir, "media_1792579903284.png")
im = Image.open(trendy_src).convert("RGB")
w, h = im.size

# Let's inspect where "CLOTHING & JEWELLERY" is
# Look at the bottom of the image. "CLOTHING & JEWELLERY" is small capital letters at the bottom.
# Let's find rows from bottom up.
# First find the lowest dark pixel:
lowest_y = 0
for y in range(h - 1, -1, -1):
    for x in range(w):
        r, g, b = im.getpixel((x, y))
        if r < 200 or g < 200 or b < 200:
            lowest_y = y
            break
    if lowest_y > 0:
        break

# "CLOTHING & JEWELLERY" text height is roughly 15-25 pixels.
# Scan upwards from lowest_y to find the gap between "CLOTHING & JEWELLERY" and the 'y' of "Trendy" / baseline of "Fits"
# Count dark pixels per row in range [lowest_y - 45, lowest_y]:
row_counts = []
for y in range(lowest_y - 60, lowest_y + 1):
    cnt = sum(1 for x in range(w) if im.getpixel((x, y))[0] < 220)
    row_counts.append((y, cnt))

print("Row counts near bottom:")
for y, cnt in row_counts:
    if cnt < 20: # candidates for gap
        print(f"y={y}, cnt={cnt}")

# The bottom text "CLOTHING & JEWELLERY" starts around lowest_y - 25.
# Let's erase everything from lowest_y - 30 downwards, or let's find the minimum count between y - 35 and y - 15:
min_cnt = 999999
cutoff_y = lowest_y - 25
for y in range(lowest_y - 40, lowest_y - 12):
    cnt = sum(1 for x in range(w) if im.getpixel((x, y))[0] < 220)
    if cnt < min_cnt:
        min_cnt = cnt
        cutoff_y = y

print(f"Chosen cutoff_y={cutoff_y} with min_cnt={min_cnt}")

# Crop to cutoff_y
im_cropped = im.crop((0, 0, w, cutoff_y))

# Now get tight bbox of non-white
min_x, max_x = w, 0
min_y, max_y = cutoff_y, 0
for y in range(cutoff_y):
    for x in range(w):
        r, g, b = im_cropped.getpixel((x, y))
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
        r, g, b = im_cropped.getpixel((sx, sy))
        if r > 240 and g > 240 and b > 240:
            final_trendy.putpixel((dx, dy), (255, 255, 255))
        else:
            final_trendy.putpixel((dx, dy), (r, g, b))

final_trendy.save(os.path.join(out_dir, "trendyfits.png"), quality=95)
print("Saved clean trendyfits.png", final_trendy.size)
