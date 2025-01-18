from fastapi import FastAPI, HTTPException
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Fetch the API key from environment variables
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("API key not found in .env file under 'GEMINI_API_KEY'")

# Define the Gemini API URL
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

def call_gemini_api(api_key, prompt):
    """
    Make a call to the Gemini API with the specified prompt.
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

@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI server"}

@app.get("/pingllm")
async def generate_content():
    prompt = "Tell me 2-3 line dark joke"
    try:
        response = call_gemini_api(API_KEY, prompt)
        return response
    except HTTPException as e:
        return {"error": str(e.detail)}
