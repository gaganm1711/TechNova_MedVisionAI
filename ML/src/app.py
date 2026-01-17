import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image
import tkinter as tk
from tkinter import filedialog
import numpy as np
import timm   # EfficientNet lives here

# ================= DEVICE =================
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ================= LOAD EFFICIENTNET-B0 =================
# ImageNet backbone (replace weights later for medical fine-tuned)
model = timm.create_model(
    "efficientnet_b0",
    pretrained=True,
    num_classes=6
)

# OPTIONAL: load medical fine-tuned weights here later
# model.load_state_dict(torch.load("efficientnet_medical.pth", map_location=device))

model.eval()
model.to(device)

# ================= MEDICAL CLASSES =================
MEDICAL_CLASSES = [
    "Lung Opacity",
    "Pneumonia",
    "Covid",
    "Lung Cancer",
    "Pleural Effusion",
    "Normal"
]

# ================= TRANSFORMS =================
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.Grayscale(num_output_channels=3),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# ================= FILE PICKER =================
def select_image():
    root = tk.Tk()
    root.withdraw()
    return filedialog.askopenfilename(
        title="Select Chest X-ray Image",
        filetypes=[("Image Files", "*.png *.jpg *.jpeg")]
    )

# ================= SELECT IMAGE =================
image_path = select_image()

if not image_path:
    print("❌ No image selected")
    exit()

image = Image.open(image_path).convert("RGB")
image = transform(image).unsqueeze(0).to(device)

# ================= PREDICTION =================
with torch.no_grad():
    logits = model(image)
    probs = torch.softmax(logits, dim=1).cpu().numpy()[0]

pred_index = np.argmax(probs)
confidence = probs[pred_index] * 100

# ================= OUTPUT =================
print("\n🫁 Chest X-ray AI Diagnosis (EfficientNet-B0)")
print("📂 Image:", image_path)
print("🧠 Prediction:", MEDICAL_CLASSES[pred_index])
print("📊 Confidence:", round(confidence, 2), "%")
print("\n⚠️ Backbone ready for medical fine-tuned weights")
