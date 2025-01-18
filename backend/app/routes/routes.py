from fastapi import APIRouter, Request
from app.services.llm import call_llm
from app.services.text_classifier import classify_sample_text, process_text
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

@router.post("/classifytext")
async def classifytext(request: Request):
    data = await request.json()
    # print("Data received:", data)
    extractedText = data.get("text")

    word_limit = 200
    classified_chunks = process_text(extractedText, word_limit)
    return {"status": "success", "classified_chunks": classified_chunks}