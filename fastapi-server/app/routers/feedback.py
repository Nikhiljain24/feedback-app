from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ..schemas import Feedback, FeedbackCreate

router = APIRouter(
    prefix="/feedbacks",
    tags=["feedbacks"],
)

# In-memory database for feedbacks
feedbacks: List[Feedback] = [
    Feedback(id=1, title="Dark Mode", content="Please add dark mode support.", category="Feature", upvotes=10),
    Feedback(id=2, title="Login Bug", content="Login button is unresponsive on mobile.", category="Bug", upvotes=5),
]

@router.get("/", response_model=List[Feedback])
async def get_feedbacks():
    return feedbacks

@router.post("/", response_model=Feedback)
async def create_feedback(feedback: FeedbackCreate):
    new_id = len(feedbacks) + 1
    new_feedback = Feedback(id=new_id, **feedback.dict())
    feedbacks.append(new_feedback)
    return new_feedback

@router.post("/{feedback_id}/upvote", response_model=Feedback)
async def upvote_feedback(feedback_id: int):
    for f in feedbacks:
        if f.id == feedback_id:
            f.upvotes += 1
            return f
    raise HTTPException(status_code=404, detail="Feedback not found")
