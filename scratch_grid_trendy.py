import os
from PIL import Image, ImageDraw

brain_dir = r"C:\Users\madhu\.gemini\antigravity-ide\brain\829c389f-eb5b-4fdc-9b70-490c729cdbc8"
uploaded_dir = os.path.join(brain_dir, ".user_uploaded")
trendy_src = os.path.join(uploaded_dir, "media_1792579903284.png")
im = Image.open(trendy_src).convert("RGB")
w, h = im.size

# Let's inspect the bottom 150 rows in detail
# We want to identify the coordinates of "CLOTHING &" and "JEWELLERY"
# Let's write out an image with a grid overlay and coordinates so we can see exact pixel boxes
overlay = im.copy()
draw = ImageDraw.Draw(overlay)

# Draw horizontal lines every 10 pixels from y=250 to 350
for y in range(250, 350, 10):
    draw.line([(0, y), (w, y)], fill=(255, 0, 0))
    draw.text((5, y - 8), str(y), fill=(255, 0, 0))

# Draw vertical lines every 25 pixels from x=0 to w
for x in range(0, w, 25):
    draw.line([(x, 250), (x, 350)], fill=(0, 150, 255))
    draw.text((x + 2, 252), str(x), fill=(0, 150, 255))

overlay.crop((0, 240, w, 350)).save(r"c:\Users\madhu\Downloads\track-tech-solution-project\project\assets\img\clients\grid_trendy.png")
print("Saved grid_trendy.png")
