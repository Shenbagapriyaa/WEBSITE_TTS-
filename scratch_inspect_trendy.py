import os
# pyrefly: ignore[missing-import]
from PIL import Image

brain_dir = r"C:\Users\madhu\.gemini\antigravity-ide\brain\829c389f-eb5b-4fdc-9b70-490c729cdbc8"
uploaded_dir = os.path.join(brain_dir, ".user_uploaded")
trendy_src = os.path.join(uploaded_dir, "media_1792579903284.png")
im = Image.open(trendy_src).convert("RGB")
w, h = im.size
print(f"Total size: {w}x{h}")

# Save an uncropped test crop of the bottom area with row markers so we can see it clearly
debug_img = im.crop((0, int(h * 0.6), w, h))
debug_img.save(r"c:\Users\madhu\Downloads\track-tech-solution-project\project\assets\img\clients\debug_trendy.png")
print("Saved debug_trendy.png")
