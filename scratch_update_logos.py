import os
import sys
from PIL import Image

brain_dir = r"C:\Users\madhu\.gemini\antigravity-ide\brain\829c389f-eb5b-4fdc-9b70-490c729cdbc8"
uploaded_dir = os.path.join(brain_dir, ".user_uploaded")
out_dir = r"c:\Users\madhu\Downloads\track-tech-solution-project\project\assets\img\clients"

# 1. TRENDY FITS: Remove "CLOTHING & JEWELLERY" below "Trendy Fits"
trendy_src = os.path.join(uploaded_dir, "media_1792579903284.png")
im = Image.open(trendy_src).convert("RGB")
w, h = im.size

# Find the vertical darkness profile
row_darkness = [0] * h
for y in range(h):
    for x in range(w):
        r, g, b = im.getpixel((x, y))
        if r < 240 or g < 240 or b < 240:
            row_darkness[y] += 1

# Trendy Fits text is above the bottom subtitle "CLOTHING & JEWELLERY"
# Let's find the gap between "Trendy Fits" and "CLOTHING & JEWELLERY"
# Scan from 70% of height upwards to 50%
has_dark = [row_darkness[y] > 5 for y in range(h)]
last_y = len(has_dark) - 1 - next(i for i, v in enumerate(reversed(has_dark)) if v)

# Find gap before "CLOTHING & JEWELLERY"
# "CLOTHING & JEWELLERY" is at the bottom ~15-20% of content
gap_y = last_y
for y in range(int(h * 0.70), int(h * 0.90)):
    if row_darkness[y] < 3: # nearly empty row
        gap_y = y
        break

im_trendy = im.crop((0, 0, w, gap_y))
# Crop tight bbox
diff = Image.new("L", im_trendy.size, 0)
for y in range(im_trendy.height):
    for x in range(im_trendy.width):
        r, g, b = im_trendy.getpixel((x, y))
        if r < 245 or g < 245 or b < 245:
            diff.putpixel((x, y), 255)
bbox = diff.getbbox()
if bbox:
    pad_x, pad_y = 16, 12
    bbox = (max(0, bbox[0] - pad_x), max(0, bbox[1] - pad_y), min(im_trendy.width, bbox[2] + pad_x), min(im_trendy.height, bbox[3] + pad_y))
    im_trendy = im_trendy.crop(bbox)

final_trendy = Image.new("RGB", im_trendy.size, (255, 255, 255))
final_trendy.paste(im_trendy, (0, 0))
final_trendy.save(os.path.join(out_dir, "trendyfits.png"), quality=95)
print("Saved trendyfits.png", final_trendy.size)
sys.stdout.flush()

# 2. TEXPORT: Remove ANY black border completely, keep texport. name alone on pure white
texport_src = os.path.join(uploaded_dir, "media_1792579643628.png")
im = Image.open(texport_src).convert("RGB")
w, h = im.size

# Find only the colored letters: blue (r in [20..40], g in [60..80], b in [130..160]) and green dot
diff = Image.new("L", (w, h), 0)
for y in range(h):
    for x in range(w):
        r, g, b = im.getpixel((x, y))
        # Exclude black (r<30, g<30, b<30) and exclude white (r>230, g>230, b>230)
        # The blue text has b > 100 and b > r + 30
        # The green dot has g > 150 and g > b + 50
        is_blue = (b > 80 and b > r + 40)
        is_green = (g > 120 and g > b + 30)
        if is_blue or is_green:
            diff.putpixel((x, y), 255)

bbox = diff.getbbox()
if bbox:
    pad_x, pad_y = 20, 16
    crop_x1 = max(0, bbox[0] - pad_x)
    crop_y1 = max(0, bbox[1] - pad_y)
    crop_x2 = min(w, bbox[2] + pad_x)
    crop_y2 = min(h, bbox[3] + pad_y)
    
    # Create pure white canvas
    cw = crop_x2 - crop_x1
    ch = crop_y2 - crop_y1
    final_tex = Image.new("RGB", (cw, ch), (255, 255, 255))
    
    for y in range(ch):
        src_y = crop_y1 + y
        for x in range(cw):
            src_x = crop_x1 + x
            r, g, b = im.getpixel((src_x, src_y))
            # If pixel is dark/black (from letterbox bar), force it to pure white!
            if r < 40 and g < 40 and b < 40:
                final_tex.putpixel((x, y), (255, 255, 255))
            elif r > 210 and g > 210 and b > 210:
                final_tex.putpixel((x, y), (255, 255, 255))
            else:
                final_tex.putpixel((x, y), (r, g, b))
                
    final_tex.save(os.path.join(out_dir, "texport.png"), quality=95)
    print("Saved texport.png", final_tex.size)
    sys.stdout.flush()

# 3. PENGUIN APPARELS: Combine penguin bird + "PENGUIN APPARELS (P) LTD"
penguin_bird_src = os.path.join(uploaded_dir, "media_1792579646918.png")
penguin_name_src = os.path.join(uploaded_dir, "media_1792581883471.png")

im_bird = Image.open(penguin_bird_src).convert("RGBA")
# Crop bird tightly
diff_bird = Image.new("L", im_bird.size, 0)
for y in range(im_bird.height):
    for x in range(im_bird.width):
        r, g, b, a = im_bird.getpixel((x, y))
        if a > 30 and (r < 240 or g < 240 or b < 240):
            diff_bird.putpixel((x, y), 255)
b_bird = diff_bird.getbbox()
if b_bird:
    im_bird = im_bird.crop(b_bird)

im_name = Image.open(penguin_name_src).convert("RGBA")
# Crop name tightly
diff_name = Image.new("L", im_name.size, 0)
for y in range(im_name.height):
    for x in range(im_name.width):
        r, g, b, a = im_name.getpixel((x, y))
        if a > 30 and (r < 240 or g < 240 or b < 240):
            diff_name.putpixel((x, y), 255)
b_name = diff_name.getbbox()
if b_name:
    im_name = im_name.crop(b_name)

# Target height for logo: bird height ~52px
target_bird_h = 52
target_bird_w = int(im_bird.width * (target_bird_h / im_bird.height))
im_bird_res = im_bird.resize((target_bird_w, target_bird_h), Image.Resampling.LANCZOS)

# Scale name proportionally to match: height ~22px
target_name_h = 22
target_name_w = int(im_name.width * (target_name_h / im_name.height))
im_name_res = im_name.resize((target_name_w, target_name_h), Image.Resampling.LANCZOS)

# Canvas width: bird_w + 10px gap + name_w + 16px margins
pad = 10
canv_w = target_bird_w + 10 + target_name_w + (pad * 2)
canv_h = max(target_bird_h, target_name_h) + (pad * 2)

pen_canvas = Image.new("RGB", (canv_w, canv_h), (255, 255, 255))
# Paste bird centered vertically
bird_y = (canv_h - target_bird_h) // 2
pen_canvas.paste(im_bird_res, (pad, bird_y), im_bird_res)

# Paste name centered vertically
name_x = pad + target_bird_w + 10
name_y = (canv_h - target_name_h) // 2
pen_canvas.paste(im_name_res, (name_x, name_y), im_name_res)

pen_canvas.save(os.path.join(out_dir, "penguin.png"), quality=95)
print("Saved penguin.png", pen_canvas.size)
sys.stdout.flush()

# Also save standalone penguin name as penguin_name_only.png just in case
im_name_standalone = Image.new("RGB", (im_name.width + 24, im_name.height + 16), (255, 255, 255))
im_name_standalone.paste(im_name, (12, 8), im_name)
im_name_standalone.save(os.path.join(out_dir, "penguin_name_only.png"), quality=95)

print("ALL UPDATES COMPLETE")
