import os
import time
from typing import List, Dict
from app.services.llm import call_llm
from app.utils.sample_text import get_sample_text
from app.utils.prompts import basic_prompt

def format_emotion_prompt(paragraph: str) -> str:
    """
    Formats the prompt to classify the emotion of a given paragraph.
    """
    return f"{basic_prompt} {paragraph}"

def split_paragraphs(text: str) -> List[str]:
    """
    Splits the input text into paragraphs separated by \n or \n\n
    """
    return [paragraph.strip() for paragraph in text.split('\n\n') if paragraph.strip()]

def classify_emotion(paragraph: str) -> str:
    """
    Classifies the emotion of a given paragraph using LLM
    """
    prompt = format_emotion_prompt(paragraph)
    while True:
        response = call_llm(prompt=prompt)
        
        # Check for rate limit exceeded
        # if response.get('status_code') == 429:
        #     print("Rate limit exceeded, waiting")
        #     time.sleep(15)
        #     continue

        # Extract the emotion from the response
        if 'candidates' in response and len(response['candidates']) > 0:
            emotion_text = response['candidates'][0]['content']['parts'][0]['text'].strip()
            emotion = emotion_text.split('\n')[0]  # Get the first line as the emotion
        else:
            emotion = 'unknown'
        
        return emotion

def classify_sample_text() -> List[Dict[str, str]]:
    """
    Classifies the emotions of paragraphs in the sample text
    """
    sample_text = get_sample_text()
    paragraphs = split_paragraphs(sample_text)
    classified_paragraphs = []

    for paragraph in paragraphs:
        emotion = classify_emotion(paragraph)
        classified_paragraphs.append({"paragraph": paragraph, "emotion": emotion})

    return classified_paragraphs

# def format_text(raw_text: str, word_limit: int = 10) -> str:
#     words = raw_text.split()
#     chunks = []
#     current_chunk = []

#     for word in words:
#         current_chunk.append(word)
#         if len(current_chunk) >= word_limit:
#             chunks.append(" ".join(current_chunk))
#             current_chunk = []

#     if current_chunk:
#         chunks.append(" ".join(current_chunk))

#     chunked_arr = chunks
#     chunked_text = "\n\n".join(chunks)
#     return chunked_text, chunked_arr

def chunk_text(raw_text: str, word_limit: int = 10) -> List[str]:
    """
    Splits the raw text into chunks of a specified word limit.
    """
    words = raw_text.split()
    chunks = []
    current_chunk = []

    for word in words:
        current_chunk.append(word)
        if len(current_chunk) >= word_limit:
            chunks.append(" ".join(current_chunk))
            current_chunk = []

    if current_chunk:
        chunks.append(" ".join(current_chunk))

    return chunks

def classify_chunks(chunks: List[str]) -> List[Dict[str, str]]:
    """
    Classifies the emotions of each chunk and returns a list of dictionaries
    with chunk and emotion.
    """
    classified_chunks = []

    for chunk in chunks:
        emotion = classify_emotion(chunk)
        classified_chunks.append({"chunk": chunk, "emotion": emotion})

    return classified_chunks

def process_text(raw_text: str, word_limit: int = 10) -> List[Dict[str, str]]:
    """
    Processes the raw text by chunking it and classifying the emotions of each chunk.
    """
    chunks = chunk_text(raw_text, word_limit)
    classified_chunks = classify_chunks(chunks)
    return classified_chunks