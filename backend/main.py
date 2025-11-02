from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allows frontend to talk to backend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

feedbacks = []

class Feedback(BaseModel):
    text: str

@app.post("/feedback")
def add_feedback(item: Feedback):
    feedbacks.append(item)
    return {"message": "Feedback added"}

@app.get("/feedback")
def get_feedback():
    return feedbacks
