from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Feedback as FeedbackModel, Category as CategoryModel
from ..schemas import FeedbackResponse, FeedbackCreate

router = APIRouter(
    prefix="/feedbacks",
    tags=["feedbacks"],
)

@router.get("/", response_model=List[FeedbackResponse])
async def get_feedbacks(db: Session = Depends(get_db)):
    return db.query(FeedbackModel).all()

@router.post("/", response_model=FeedbackResponse)
async def create_feedback(feedback: FeedbackCreate, db: Session = Depends(get_db)):
    # Map category name to category_id if name is provided
    category_id = feedback.category_id
    if not category_id and feedback.category:
        # Check if category exists
        db_category = db.query(CategoryModel).filter(CategoryModel.name.ilike(feedback.category)).first()
        if not db_category:
            # Create category if it doesn't exist
            db_category = CategoryModel(name=feedback.category)
            db.add(db_category)
            db.commit()
            db.refresh(db_category)
        category_id = db_category.id

    new_feedback = FeedbackModel(
        title=feedback.title,
        content=feedback.content,
        category_id=category_id,
        status_id=feedback.status_id,
        user_id=1 
    )
    db.add(new_feedback)
    db.commit()
    db.refresh(new_feedback)
    return new_feedback

@router.post("/{feedback_id}/upvote", response_model=FeedbackResponse)
async def upvote_feedback(feedback_id: int, db: Session = Depends(get_db)):
    feedback = db.query(FeedbackModel).filter(FeedbackModel.id == feedback_id).first()
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")
    
    # Note: Upvotes logic depends on the Vote model implementation
    # For now, if we don't have an upvotes count column in Feedback model, 
    # we might need to handle it via the Vote table or add a column.
    # Looking at models.py, Feedback doesn't have an 'upvotes' column.
    # It has a relationship 'votes'.
    
    # Simple implementation: add a record to Vote table
    from ..models import Vote
    new_vote = Vote(user_id=1, feedback_id=feedback_id, vote_type="upvote")
    db.add(new_vote)
    db.commit()
    db.refresh(feedback)
    return feedback
