from fastapi import APIRouter, Request
from app.services.llm import call_llm
from app.services.text_classifier import classify_sample_text, process_text
from app.services.audio_matching import get_matching_music
from app.utils.prompts import joke_prompt
import os
import json
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
    print(" ======= Recieved Request Please Wait ======== ")
    data = await request.json()
    # print("Data received:", data)
    extractedText = data.get("text")

    # ========== Core LOGIC, NOT to be removed ==========
    word_limit = 200
    classified_chunks = process_text(extractedText, word_limit)
    classified_chunks_with_music = get_matching_music(classified_chunks)
    return {"status": "success", "classified_chunks": classified_chunks_with_music}

    # ============ Mock Data for Testing ============
    # Load sample_output_gemini.json for mock data testing
    # file_path = os.path.join(os.path.dirname(__file__), '../repository/data/sample_output_gemini.json')
    # with open(file_path, 'r', encoding='utf-8') as file:
    #     sample_output = json.load(file)

    # return {"status": "success", "classified_chunks": sample_output["classified_chunks"]}