import os
from dotenv import load_dotenv
from google import genai
from google.genai.types import GenerateContentConfig

load_dotenv()


class GeminiService:
    """
    Gemini 2.0 Flash explanation service
    Uses API-key-based Gemini (NO billing / NO Vertex AI)
    """

    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise RuntimeError("GEMINI_API_KEY not set in .env")

        # Initialize Gemini client
        self.client = genai.Client(api_key=self.api_key)

        # ✅ Correct & available free-tier model
        self.model_name = "models/gemini-2.0-flash"

    def generate_explanation(
        self,
        predicted_class: int,
        confidence: float,
        symptoms: str,
        body_part: str
    ) -> str:

        condition = (
            "possible abnormal lung patterns"
            if predicted_class == 1
            else "no strong abnormal lung patterns"
        )

        prompt = f"""
You are a medical AI assistant helping explain chest X-ray analysis.

Patient symptoms:
{symptoms}

Body part examined:
{body_part}

AI model findings:
- Observation: {condition}
- Confidence score: {confidence:.2f}

TASK:
Explain the findings in clear, simple clinical language.
Do NOT give a diagnosis.
Mention that this is AI-assisted and must be reviewed by a doctor.
Keep it professional and concise (4–6 sentences).
"""

        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=GenerateContentConfig(
                    temperature=0.4,
                    max_output_tokens=300
                )
            )

            return response.text.strip()

        except Exception as e:
            # ✅ Safe fallback so API never crashes
            return (
                "The AI system analyzed the chest X-ray and identified visual patterns "
                "that may require clinical attention when considered alongside reported symptoms. "
                "Due to temporary AI service limitations, a detailed explanation could not be generated. "
                "This output is AI-assisted and must be reviewed by a qualified medical professional. "
                "This is not a medical diagnosis."
            )
