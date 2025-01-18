import requests
from fastapi import HTTPException

GEMINI_API_URL = "https://api.gemini.com/v1/endpoint"  # Replace with actual URL

def call_llm(api_key: str, prompt: str) -> dict:
    """
    Calls the Gemini API with the given prompt and returns the response.
    
    :param api_key: The API key for authentication.
    :param prompt: The input prompt text to send to the Gemini API.
    :return: The JSON response from the Gemini API.
    """
    headers = {
        "Content-Type": "application/json"
    }
    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }]
    }
    params = {"key": api_key}

    response = requests.post(GEMINI_API_URL, headers=headers, json=payload, params=params)
    
    if response.status_code == 200:
        return response.json()
    elif response.status_code == 401:
        raise HTTPException(status_code=401, detail="Unauthorized. Please check your API key.")
    elif response.status_code == 429:
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Try again later.")
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)