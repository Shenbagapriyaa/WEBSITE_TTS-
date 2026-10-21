import os
import sys
# pyrefly: ignore[missing-import]
from PIL import Image, ImageDraw, ImageFont

brain_dir = r"C:\Users\madhu\.gemini\antigravity-ide\brain\829c389f-eb5b-4fdc-9b70-490c729cdbc8"
uploaded_dir = os.path.join(brain_dir, ".user_uploaded")
out_dir = r"c:\Users\madhu\Downloads\track-tech-solution-project\project\assets\img\clients"
os.makedirs(out_dir, exist_ok=True)

# 1. SHAHI: White background, no black halo
shahi_src = os.path.join(uploaded_dir, "media_1792579630197.png")
im = Image.open(shahi_src).convert("RGB")
w, h = im.size
new_shahi = Image.new("RGB", (w, h), (255, 255, 255))
for y in range(h):
    for x in range(w):
        r, g, b = im.getpixel((x, y))
        L = max(r, g, b) / 255.0
        if L < 0.08:
            new_shahi.putpixel((x, y), (255, 255, 255))
        else:
            # Un-multiply with black background to get true text color
            nr = min(255, int(r / L))
            ng = min(255, int(g / L))
            nb = min(255, int(b / L))
            alpha = min(1.0, L ** 0.65)
            # Blend over white
            fr = int(nr * alpha + 255 * (1.0 - alpha))
            fg = int(ng * alpha + 255 * (1.0 - alpha))
            fb = int(nb * alpha + 255 * (1.0 - alpha))
            new_shahi.putpixel((x, y), (fr, fg, fb))

# Find tight bounding box of non-white
diff = Image.new("L", (w, h), 0)
for y in range(h):
    for x in range(w):
        r, g, b = new_shahi.getpixel((x, y))
        if r < 245 or g < 245 or b < 245:
            diff.putpixel((x, y), 255)
bbox = diff.getbbox()
if bbox:
    pad_x, pad_y = 16, 10
    bbox = (max(0, bbox[0] - pad_x), max(0, bbox[1] - pad_y), min(w, bbox[2] + pad_x), min(h, bbox[3] + pad_y))
    new_shahi = new_shahi.crop(bbox)
new_shahi.save(os.path.join(out_dir, "shahi.png"), quality=95)
print("Saved shahi.png", new_shahi.size)
sys.stdout.flush()

# 2. PDS: Remove tagline "Global | Collaborative | Digital | Ethical"
pds_src = os.path.join(uploaded_dir, "media_1792579639754.png")
im = Image.open(pds_src).convert("RGB")
w, h = im.size
row_darkness = [0] * h
for y in range(h):
    for x in range(w):
        r, g, b = im.getpixel((x, y))
        if r < 230 or g < 230 or b < 230:
            row_darkness[y] += 1

# PDS letters/logo are in upper part, tagline in lower part.
# Scan rows:
has_dark = [row_darkness[y] > 5 for y in range(h)]
first_y = next(i for i, v in enumerate(has_dark) if v)
last_y = len(has_dark) - 1 - next(i for i, v in enumerate(reversed(has_dark)) if v)

# Cutoff in the white space between PDS text and tagline (usually between 55% and 80%)
cutoff_y = int(first_y + (last_y - first_y) * 0.75)
for y in range(first_y + int((last_y - first_y) * 0.45), last_y):
    if row_darkness[y] == 0:
        cutoff_y = y
        break

im_pds = im.crop((0, 0, w, cutoff_y))
diff = Image.new("L", im_pds.size, 0)
for y in range(im_pds.height):
    for x in range(im_pds.width):
        r, g, b = im_pds.getpixel((x, y))
        if r < 240 or g < 240 or b < 240:
            diff.putpixel((x, y), 255)
bbox = diff.getbbox()
if bbox:
    pad_x, pad_y = 16, 12
    bbox = (max(0, bbox[0] - pad_x), max(0, bbox[1] - pad_y), min(im_pds.width, bbox[2] + pad_x), min(im_pds.height, bbox[3] + pad_y))
    im_pds = im_pds.crop(bbox)
im_pds.save(os.path.join(out_dir, "pds.png"), quality=95)
print("Saved pds.png", im_pds.size)
sys.stdout.flush()

# 3. TEXPORT: Pure white background, cropped black letterbox
texport_src = os.path.join(uploaded_dir, "media_1792579643628.png")
im = Image.open(texport_src).convert("RGB")
w, h = im.size
diff = Image.new("L", (w, h), 0)
for y in range(h):
    for x in range(w):
        r, g, b = im.getpixel((x, y))
        # Keep non-black non-white text pixels
        # Text is blue (#1f4690) or green dot (#8bc34a)
        if (r < 230 or g < 230 or b < 230) and (r > 30 or g > 30 or b > 30):
            diff.putpixel((x, y), 255)
bbox = diff.getbbox()
if bbox:
    pad_x, pad_y = 20, 14
    bbox = (max(0, bbox[0] - pad_x), max(0, bbox[1] - pad_y), min(w, bbox[2] + pad_x), min(h, bbox[3] + pad_y))
    im_tex = im.crop(bbox)
    # Ensure background is clean pure white
    final_tex = Image.new("RGB", im_tex.size, (255, 255, 255))
    for y in range(im_tex.height):
        for x in range(im_tex.width):
            r, g, b = im_tex.getpixel((x, y))
            if r > 210 and g > 210 and b > 210:
                final_tex.putpixel((x, y), (255, 255, 255))
            else:
                final_tex.putpixel((x, y), (r, g, b))
    final_tex.save(os.path.join(out_dir, "texport.png"), quality=95)
    print("Saved texport.png", final_tex.size)
    sys.stdout.flush()

# 4. MODELAMA: media_1792579755642.png
# Add "MODELAMA" text below the logo emblem
modelama_src = os.path.join(uploaded_dir, "media_1792579755642.png")
im = Image.open(modelama_src).convert("RGBA")
# Crop out extra transparent / white margin
diff = Image.new("L", im.size, 0)
for y in range(im.height):
    for x in range(im.width):
        r, g, b, a = im.getpixel((x, y))
        if a > 30 and (r < 245 or g < 245 or b < 245):
            diff.putpixel((x, y), 255)
bbox = diff.getbbox()
if bbox:
    im = im.crop(bbox)

# Target emblem height: ~60px
target_h = 60
target_w = int(im.width * (target_h / im.height))
im_res = im.resize((target_w, target_h), Image.Resampling.LANCZOS)

# Canvas width & height: emblem + text "MODELAMA"
canvas_w = max(target_w + 30, 190)
canvas_h = target_h + 30
canvas = Image.new("RGBA", (canvas_w, canvas_h), (255, 255, 255, 255))
# Paste emblem
paste_x = (canvas_w - target_w) // 2
canvas.paste(im_res, (paste_x, 2), im_res)

# Draw "MODELAMA" text
draw = ImageDraw.Draw(canvas)
font = None
for f in ["C:/Windows/Fonts/arialbd.ttf", "C:/Windows/Fonts/calibrib.ttf", "C:/Windows/Fonts/segoeuib.ttf"]:
    if os.path.exists(f):
        font = ImageFont.truetype(f, 15)
        break
if not font:
    font = ImageFont.load_default()

text = "MODELAMA"
tb = draw.textbbox((0, 0), text, font=font)
tw = tb[2] - tb[0]
draw.text(((canvas_w - tw) // 2, target_h + 7), text, fill=(30, 30, 30, 255), font=font)
canvas.convert("RGB").save(os.path.join(out_dir, "modelama.png"), quality=95)
print("Saved modelama.png", canvas.size)
sys.stdout.flush()

# 5. ARMSTRONG: media_1792579784414.png
armstrong_src = os.path.join(uploaded_dir, "media_1792579784414.png")
im = Image.open(armstrong_src).convert("RGBA")
diff = Image.new("L", im.size, 0)
for y in range(im.height):
    for x in range(im.width):
        r, g, b, a = im.getpixel((x, y))
        if a > 30 and (r < 245 or g < 245 or b < 245):
            diff.putpixel((x, y), 255)
bbox = diff.getbbox()
if bbox:
    pad_x, pad_y = 16, 12
    bbox = (max(0, bbox[0] - pad_x), max(0, bbox[1] - pad_y), min(im.width, bbox[2] + pad_x), min(im.height, bbox[3] + pad_y))
    im = im.crop(bbox)
arm_bg = Image.new("RGB", im.size, (255, 255, 255))
arm_bg.paste(im, (0, 0), im)
arm_bg.save(os.path.join(out_dir, "armstrong.png"), quality=95)
print("Saved armstrong.png", arm_bg.size)
sys.stdout.flush()

# 6. SAHANA: media_1792579809644.png
sahana_src = os.path.join(uploaded_dir, "media_1792579809644.png")
im = Image.open(sahana_src).convert("RGBA")
diff = Image.new("L", im.size, 0)
for y in range(im.height):
    for x in range(im.width):
        r, g, b, a = im.getpixel((x, y))
        if a > 30 and (r < 245 or g < 245 or b < 245):
            diff.putpixel((x, y), 255)
bbox = diff.getbbox()
if bbox:
    pad_x, pad_y = 16, 12
    bbox = (max(0, bbox[0] - pad_x), max(0, bbox[1] - pad_y), min(im.width, bbox[2] + pad_x), min(im.height, bbox[3] + pad_y))
    im = im.crop(bbox)
sah_bg = Image.new("RGB", im.size, (255, 255, 255))
sah_bg.paste(im, (0, 0), im)
sah_bg.save(os.path.join(out_dir, "sahana.png"), quality=95)
print("Saved sahana.png", sah_bg.size)
sys.stdout.flush()

# 7. TRENDY FITS: media_1792579903284.png
trendy_src = os.path.join(uploaded_dir, "media_1792579903284.png")
im = Image.open(trendy_src).convert("RGBA")
diff = Image.new("L", im.size, 0)
for y in range(im.height):
    for x in range(im.width):
        r, g, b, a = im.getpixel((x, y))
        if a > 30 and (r < 245 or g < 245 or b < 245):
            diff.putpixel((x, y), 255)
bbox = diff.getbbox()
if bbox:
    pad_x, pad_y = 16, 12
    bbox = (max(0, bbox[0] - pad_x), max(0, bbox[1] - pad_y), min(im.width, bbox[2] + pad_x), min(im.height, bbox[3] + pad_y))
    im = im.crop(bbox)
tren_bg = Image.new("RGB", im.size, (255, 255, 255))
tren_bg.paste(im, (0, 0), im)
tren_bg.save(os.path.join(out_dir, "trendyfits.png"), quality=95)
print("Saved trendyfits.png", tren_bg.size)
sys.stdout.flush()

# 8. MEHALA: media_1792579938710.png
mehala_src = os.path.join(uploaded_dir, "media_1792579938710.png")
im = Image.open(mehala_src).convert("RGBA")
diff = Image.new("L", im.size, 0)
for y in range(im.height):
    for x in range(im.width):
        r, g, b, a = im.getpixel((x, y))
        if a > 30 and (r < 245 or g < 245 or b < 245):
            diff.putpixel((x, y), 255)
bbox = diff.getbbox()
if bbox:
    pad_x, pad_y = 16, 12
    bbox = (max(0, bbox[0] - pad_x), max(0, bbox[1] - pad_y), min(im.width, bbox[2] + pad_x), min(im.height, bbox[3] + pad_y))
    im = im.crop(bbox)
meh_bg = Image.new("RGB", im.size, (255, 255, 255))
meh_bg.paste(im, (0, 0), im)
meh_bg.save(os.path.join(out_dir, "mehala.png"), quality=95)
print("Saved mehala.png", meh_bg.size)
sys.stdout.flush()
print("ALL DONE SUCCESSFULLY")
