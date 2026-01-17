from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uuid
import numpy as np
import cv2

from backend.services.model_router import ModelRouter

# --------------------------------------------------
# App initialization
# --------------------------------------------------
app = FastAPI(
    title="MedVision AI Backend",
    description="AI-assisted X-ray analysis system (Not for diagnosis)",
    version="1.0.0"
)

# Lazy-loaded model router (CRITICAL FIX)
model_router = None

# --------------------------------------------------
# CORS
# --------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# Health Check
# --------------------------------------------------
@app.get("/")
def health_check():
    return {
        "status": "ok",
        "message": "MedVision AI backend is running",
        "disclaimer": "AI-assisted analysis only. Not a medical diagnosis."
    }

# --------------------------------------------------
# Analyze Endpoint (CORE)
# --------------------------------------------------
@app.post("/analyze")
async def analyze_xray(
    name: str = Form(...),
    age: int = Form(...),
    symptoms: str = Form(...),
    body_part: str = Form(...),
    xray_image: UploadFile = File(...)
):
    """
    AI Orchestrator:
    - Lazy-load models
    - Run CNN inference
    - (Grad-CAM temporarily disabled)
    """

    global model_router
    if model_router is None:
        model_router = ModelRouter()  # ✅ SAFE lazy init

    if body_part.lower() not in ["chest", "limb", "spine"]:
        raise HTTPException(status_code=400, detail="Invalid body_part")

    if xray_image.content_type not in ["image/png", "image/jpeg"]:
        raise HTTPException(status_code=400, detail="Unsupported image type")

    request_id = str(uuid.uuid4())
    image_bytes = await xray_image.read()

    # ---------------------------
    # Model Inference ONLY
    # ---------------------------
    result = model_router.run_inference(body_part, image_bytes)

    # ---------------------------
    # Response (Grad-CAM OFF for now)
    # ---------------------------
    return {
        "request_id": request_id,
        "patient": {
            "name": name,
            "age": age,
            "symptoms": symptoms,
            "body_part": body_part
        },
        "analysis": {
            "predicted_class": result["predicted_class"],
            "confidence": round(result["confidence"], 4),
            "gradcam_available": False
        },
        "disclaimer": "AI-assisted analysis only. Not a medical diagnosis."
    }
