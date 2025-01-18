from fastapi import APIRouter
from app.services.llm import call_llm
from app.services.text_classifier import classify_sample_text
from app.utils.prompts import joke_prompt
router = APIRouter()

@router.get("/ping")
async def ping():
    return {"ping": "pong"}

@router.get("/pingllm")
async def pingllm():
    response = call_llm(joke_prompt)
    return response

@router.get("/classifysample")
async def classify_sample():
    response = classify_sample_text()
    return response

# @router.get("/pingllm")
# @router.post("/classify-emotion")
# async def classify_emotion(text: str):
#     response = call_llm(API_KEY, text)
#     return response