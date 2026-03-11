from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# User Schemas
class UserBase(BaseModel):
    username: str
    email: Optional[EmailStr] = None
    role: str = "user"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True

# Category Schemas
class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: int

    class Config:
        from_attributes = True

# Status Schemas
class StatusBase(BaseModel):
    name: str
    color_code: Optional[str] = None

class StatusCreate(StatusBase):
    pass

class StatusResponse(StatusBase):
    id: int

    class Config:
        from_attributes = True

# Tag Schemas
class TagBase(BaseModel):
    name: str

class TagCreate(TagBase):
    pass

class TagResponse(TagBase):
    id: int

    class Config:
        from_attributes = True

# Feedback Schemas
class FeedbackBase(BaseModel):
    title: str
    content: str
    category_id: int
    status_id: int

class FeedbackCreate(FeedbackBase):
    pass

class FeedbackResponse(FeedbackBase):
    id: int
    user_id: int
    created_at: datetime
    # Optionally we could include nested schemas here, e.g., author: UserResponse
    
    class Config:
        from_attributes = True

# Comment Schemas
class CommentBase(BaseModel):
    content: str
    feedback_id: int

class CommentCreate(CommentBase):
    pass

class CommentResponse(CommentBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

# Vote Schemas
class VoteBase(BaseModel):
    feedback_id: int
    vote_type: str = "upvote"

class VoteCreate(VoteBase):
    pass

class VoteResponse(VoteBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
