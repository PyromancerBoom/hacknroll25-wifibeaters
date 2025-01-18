from fastapi import FastAPI
from app.routes.routes import router as router
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Add CORS middleware
origins = ["http://0.0.0.0:3000", "*", "http://localhost:3000/"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------- Add the router to the app ---------
app.include_router(router)

@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI project!"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)