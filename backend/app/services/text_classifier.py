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
    Classifies the emotion of a given text chunk using the Gemini API.
    """
    response = call_gemini_api(API_KEY, text_chunk)
    # Assuming the response contains an 'emotion' field
    emotion = response.get('emotion', 'unknown')
    return emotion

def classify_text(text: str) -> List[Dict[str, str]]:
    """
    Classifies the emotions of chunks of the input text.
    
    :param text: The input text to classify.
    :return: A list of dictionaries with text chunks and their classified emotions.
    """
    chunks = chunk_text(text)
    classified_chunks = []
    
    for chunk in chunks:
        emotion = classify_emotion(chunk)
        classified_chunks.append({"text": chunk, "emotion": emotion})
    
    return classified_chunks