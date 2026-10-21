import cv2
import os

video_path = r"c:\Users\madhu\Downloads\track-tech-solution-project\project\assets\video\factory-loop.mp4"
cap = cv2.VideoCapture(video_path)
ret, frame = cap.read()
if ret:
    h, w, _ = frame.shape
    print(f"Video resolution: {w}x{h}")
    # Save first frame
    cv2.imwrite(r"c:\Users\madhu\Downloads\track-tech-solution-project\project\assets\img\video_frame_1.jpg", frame)
    # Save bottom-right crop
    br_crop = frame[int(h*0.8):, int(w*0.8):]
    cv2.imwrite(r"c:\Users\madhu\Downloads\track-tech-solution-project\project\assets\img\video_bottom_right.jpg", br_crop)
    print("Saved frames successfully")
cap.release()
