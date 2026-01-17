# ResNet model implementation
import torch
import torch.nn as nn
from torchvision import models


class ResNet50Model:
    """
    Wrapper around torchvision ResNet50 for limb X-ray inference.
    """

    def __init__(self, num_classes: int = 2):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        # Load pretrained ResNet50
        self.model = models.resnet50(weights=models.ResNet50_Weights.IMAGENET1K_V2)

        # Replace final fully connected layer
        in_features = self.model.fc.in_features
        self.model.fc = nn.Linear(in_features, num_classes)

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
