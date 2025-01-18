import requests
from fastapi import HTTPException
import os
from dotenv import load_dotenv
from app.utils.config import load_config
import time

load_dotenv()

config = load_config()
GEMINI_API_URL = config.get("gemini_api_url")
API_KEY = os.getenv("GEMINI_API_KEY")

def call_llm(prompt: str, content: str = None) -> dict:
    """
    Calls the Gemini API with the given prompt and optional content.
    """
    headers = {
        "Content-Type": "application/json"
    }
    
    payload = {
        "contents": [{"parts": [{"text": f"{prompt} {content}" if content else prompt}]}]
    }
    
    params = {"key": API_KEY}

    # response = requests.post(GEMINI_API_URL, headers=headers, json=payload, params=params)
    
    while True:
        response = requests.post(GEMINI_API_URL, headers=headers, json=payload, params=params)
        
        # Handle API response
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 401:
            raise HTTPException(status_code=401, detail="Unauthorized. Please check your API key.")
        elif response.status_code == 429:
            print("Rate limit exceeded, waiting for 15 seconds")
            time.sleep(15)  # Wait for 15 seconds before retrying
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)