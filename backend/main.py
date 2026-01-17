# Main application file
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import uuid
import os

# App initialization
app = FastAPI(
    title="MedVision AI Backend",
    description="AI-assisted X-ray analysis system (Not for diagnosis)",
    version="1.0.0"
)

# CORS (Frontend will be on Vercel)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten later if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Health Check
# -------------------------
@app.get("/")
def health_check():
    return {
        "status": "ok",
        "message": "MedVision AI backend is running",
        "disclaimer": "AI-assisted analysis only. Not a medical diagnosis."
    }

# -------------------------
# Analyze Endpoint (CORE)
# -------------------------
@app.post("/analyze")
async def analyze_xray(
    name: str = Form(...),
    age: int = Form(...),
    symptoms: str = Form(...),
    body_part: str = Form(...),  # chest | limb | spine
    xray_image: UploadFile = File(...)
):
    """
    Main AI Orchestrator endpoint.
    - Receives patient metadata
    - Receives X-ray image
    - Routes to correct AI pipeline
    """

    # Basic validation
    if body_part.lower() not in ["chest", "limb", "spine"]:
        raise HTTPException(status_code=400, detail="Invalid body_part selection")

    if xray_image.content_type not in ["image/png", "image/jpeg"]:
        raise HTTPException(status_code=400, detail="Only PNG or JPEG images are supported")

    # Generate request ID (used across services)
    request_id = str(uuid.uuid4())

    try:
        # NOTE: Actual AI logic will be plugged in later
        # For now this is a controlled placeholder

        response = {
            "request_id": request_id,
            "patient": {
                "name": name,
                "age": age,
                "symptoms": symptoms,
                "body_part": body_part
            },
            "analysis": {
                "prediction": "pending",
                "confidence": None,
                "gradcam_url": None,
                "clinical_explanation": None
            },
            "disclaimer": "This result is AI-assisted and not a medical diagnosis."
        }

        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
