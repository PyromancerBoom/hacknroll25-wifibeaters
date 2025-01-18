import requests
from typing import List, Dict
from app.services.llm import call_llm

def chunk_text(text: str, chunk_size: int = 500) -> List[str]:
    """
    Breaks down the input text into chunks of specified size
    """
    return [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]

def classify_emotion(text_chunk: str) -> str:
    """
    Classifies the emotion of a given text chunk using LLM
    """
    response = call_llm(text_chunk)
    emotion = response.get('emotion', 'unknown')
    return emotion

def classify_text(text: str, api_key: str) -> List[Dict[str, str]]:
    """
    Classifies the emotions of chunks of the input text
    """
    chunks = chunk_text(text)
    classified_chunks = []
    
    for chunk in chunks:
        emotion = classify_emotion(chunk, api_key)
        classified_chunks.append({"text": chunk, "emotion": emotion})
    
    return classified_chunks