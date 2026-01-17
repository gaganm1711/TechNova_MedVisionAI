# DenseNet model implementation
import torch
import torch.nn as nn
from torchvision import models


class DenseNet121Model:
    """
    Wrapper around torchvision DenseNet121 for X-ray inference.
    """

    def __init__(self, num_classes: int = 2):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        # Load pretrained DenseNet121
        self.model = models.densenet121(weights=models.DenseNet121_Weights.IMAGENET1K_V1)

        # Replace classifier head
        in_features = self.model.classifier.in_features
        self.model.classifier = nn.Linear(in_features, num_classes)

        self.model.to(self.device)
        self.model.eval()  # inference mode

    def predict(self, x: torch.Tensor):
        """
        Runs inference on preprocessed tensor.

        Args:
            x (torch.Tensor): shape (1, 3, 224, 224)

        Returns:
            dict: prediction + confidence
        """
        x = x.to(self.device)

        with torch.no_grad():
            logits = self.model(x)
            probs = torch.softmax(logits, dim=1)

            confidence, predicted_class = torch.max(probs, dim=1)

        return {
            "predicted_class": int(predicted_class.item()),
            "confidence": float(confidence.item())
        }
