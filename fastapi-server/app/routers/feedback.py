from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ..schemas import FeedbackResponse as Feedback, FeedbackCreate

router = APIRouter(
    prefix="/feedbacks",
    tags=["feedbacks"],
)

# In-memory database for feedbacks
# (Will be replaced with DB soon if needed, but keeping this for now just to fix the error)
feedbacks: List[Feedback] = [
    # Commented out to avoid id type mismatch with datetime
]

@router.get("/", response_model=List[Feedback])
async def get_feedbacks():
    return feedbacks

@router.post("/", response_model=Feedback)
async def create_feedback(feedback: FeedbackCreate):
    from datetime import datetime
    new_id = len(feedbacks) + 1
    new_feedback = Feedback(id=new_id, user_id=1, created_at=datetime.utcnow(), **feedback.dict())
    feedbacks.append(new_feedback)
    return new_feedback

@router.post("/{feedback_id}/upvote", response_model=Feedback)
async def upvote_feedback(feedback_id: int):
    for f in feedbacks:
        if f.id == feedback_id:
            f.upvotes += 1
            return f
    raise HTTPException(status_code=404, detail="Feedback not found")
