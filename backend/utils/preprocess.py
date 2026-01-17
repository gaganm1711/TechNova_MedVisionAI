# Image preprocessing utilities
import torch
import torchvision.transforms as transforms
from PIL import Image
import io

# ImageNet normalization (used by DenseNet, ResNet, EfficientNet)
IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD = [0.229, 0.224, 0.225]

# Shared preprocessing pipeline
preprocess_transform = transforms.Compose([
    transforms.Resize((224, 224)),       # CNN expected input
    transforms.Grayscale(num_output_channels=3),  # X-ray → 3 channels
    transforms.ToTensor(),
    transforms.Normalize(mean=IMAGENET_MEAN, std=IMAGENET_STD),
])


def preprocess_xray(image_bytes: bytes) -> torch.Tensor:
    """
    Converts raw uploaded image bytes into a normalized tensor
    ready for CNN inference.

    Returns:
        torch.Tensor of shape (1, 3, 224, 224)
    """
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    tensor = preprocess_transform(image)
    tensor = tensor.unsqueeze(0)  # Add batch dimension
    return tensor
