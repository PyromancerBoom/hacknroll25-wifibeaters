import os
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
    response = call_llm(prompt=prompt)

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