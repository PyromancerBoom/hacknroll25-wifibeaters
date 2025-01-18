from fastapi import FastAPI
from app.routes.routes import router as router
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# --------- Add the router to the app ---------
app.include_router(router)

@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI project!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("HOST_PORT", 8000)))