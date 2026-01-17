# Grad-CAM implementation for model interpretability
import torch
import numpy as np
import cv2
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
from pytorch_grad_cam.utils.image import show_cam_on_image


class GradCamGenerator:
    """
    Generates Grad-CAM heatmaps for CNN predictions.
    """

    def __init__(self, model, target_layer):
        """
        Args:
            model: CNN model (DenseNet / ResNet)
            target_layer: layer to compute Grad-CAM from
        """
        self.model = model
        self.target_layer = target_layer

        self.cam = GradCAM(
            model=self.model,
            target_layers=[self.target_layer],
            use_cuda=torch.cuda.is_available()
        )

    def generate(self, input_tensor: torch.Tensor, predicted_class: int):
        """
        Generates a Grad-CAM heatmap.

        Args:
            input_tensor (torch.Tensor): shape (1, 3, 224, 224)
            predicted_class (int): class index

        Returns:
            np.ndarray: heatmap image
        """
        targets = [ClassifierOutputTarget(predicted_class)]

        grayscale_cam = self.cam(
            input_tensor=input_tensor,
            targets=targets
        )

        # Take first image in batch
        heatmap = grayscale_cam[0]

        return heatmap


def overlay_heatmap(original_image: np.ndarray, heatmap: np.ndarray):
    """
    Overlays Grad-CAM heatmap on original image.

    Args:
        original_image (np.ndarray): RGB image (0-255)
        heatmap (np.ndarray): Grad-CAM heatmap

    Returns:
        np.ndarray: overlayed image
    """
    original_image = original_image.astype(np.float32) / 255.0
    cam_image = show_cam_on_image(
        original_image,
        heatmap,
        use_rgb=True
    )

    return cam_image
