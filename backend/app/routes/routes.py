from fastapi import APIRouter, Request
from app.services.llm import call_llm
from app.services.text_classifier import classify_sample_text, format_text
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

@router.post("/usertext")
async def usertext(request: Request):
    data = await request.json()
    extractedText = data.get("text")

    word_limit = 20
    formatted_text = format_text(extractedText, word_limit)
    return {"status": "success", "formatted_text": formatted_text}