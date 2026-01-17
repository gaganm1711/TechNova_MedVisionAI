from dotenv import load_dotenv
import os

load_dotenv()  # loads .env file into environment

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uuid

from backend.services.model_router import ModelRouter
from backend.services.gemini_service import GeminiService

# --------------------------------------------------
# App initialization
# --------------------------------------------------
app = FastAPI(
    title="MedVision AI Backend",
    description="AI-assisted X-ray analysis system (Not for diagnosis)",
    version="1.0.0"
)

model_router = None
gemini_service = None

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
# Analyze Endpoint
# --------------------------------------------------
@app.post("/analyze")
async def analyze_xray(
    name: str = Form(...),
    age: int = Form(...),
    symptoms: str = Form(...),
    body_part: str = Form(...),
    xray_image: UploadFile = File(...)
):
    global model_router, gemini_service

    if model_router is None:
        model_router = ModelRouter()

    if gemini_service is None:
        gemini_service = GeminiService()

    if body_part.lower() not in ["chest", "limb", "spine"]:
        raise HTTPException(status_code=400, detail="Invalid body_part")

    if xray_image.content_type not in ["image/png", "image/jpeg"]:
        raise HTTPException(status_code=400, detail="Unsupported image type")

    request_id = str(uuid.uuid4())
    image_bytes = await xray_image.read()

    # ---------------------------
    # CNN inference
    # ---------------------------
    result = model_router.run_inference(body_part, image_bytes)

    # ---------------------------
    # Gemini explanation
    # ---------------------------
    explanation = gemini_service.generate_explanation(
        predicted_class=result["predicted_class"],
        confidence=result["confidence"],
        symptoms=symptoms,
        body_part=body_part
    )

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
            "explanation": explanation,
            "gradcam_available": False
        },
        "disclaimer": "AI-assisted analysis only. Not a medical diagnosis."
    }
