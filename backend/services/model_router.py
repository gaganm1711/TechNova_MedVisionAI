# Model routing service
from backend.models.densenet import DenseNet121Model
from backend.models.resnet import ResNet50Model
from backend.utils.preprocess import preprocess_xray
from backend.models.efficientnet import EfficientNetModel



class ModelRouter:
    """
    Routes X-ray images to the correct CNN model
    based on the selected body part.
    """

    def __init__(self):
        # Initialize models once (important for performance)
        self.chest_model = DenseNet121Model()
        self.limb_model = ResNet50Model()
        self.spine_model = EfficientNetModel()


    def run_inference(self, body_part: str, image_bytes: bytes) -> dict:
        """
        Preprocess image and run inference on the correct model.

        Args:
            body_part (str): chest | limb | spine
            image_bytes (bytes): raw uploaded image

        Returns:
            dict: prediction + confidence
        """
        # Preprocess image (shared pipeline)
        input_tensor = preprocess_xray(image_bytes)

        body_part = body_part.lower()

        if body_part == "chest":
            return self.chest_model.predict(input_tensor)

        elif body_part == "limb":
            return self.limb_model.predict(input_tensor)

        elif body_part == "spine":
            # Placeholder: reuse chest model for now
            # (Easy to swap with EfficientNet later)
            return self.spine_model.predict(input_tensor)

        else:
            raise ValueError("Unsupported body part")
