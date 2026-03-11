from sqlalchemy import Column, Integer, String, Text, ForeignKey, Table, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

# Many-to-Many association table for Feedbacks and Tags
feedback_tags = Table(
    "feedback_tags",
    Base.metadata,
    Column("feedback_id", Integer, ForeignKey("feedbacks.id"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id"), primary_key=True)
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="user") # "superadmin" | "user"

    feedbacks = relationship("Feedback", back_populates="author")
    comments = relationship("Comment", back_populates="author")
    votes = relationship("Vote", back_populates="user")

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    feedbacks = relationship("Feedback", back_populates="category")

class Status(Base):
    __tablename__ = "statuses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    color_code = Column(String)

    feedbacks = relationship("Feedback", back_populates="status")

class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

class Feedback(Base):
    __tablename__ = "feedbacks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user_id = Column(Integer, ForeignKey("users.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))
    status_id = Column(Integer, ForeignKey("statuses.id"))

    author = relationship("User", back_populates="feedbacks")
    category = relationship("Category", back_populates="feedbacks")
    status = relationship("Status", back_populates="feedbacks")
    comments = relationship("Comment", back_populates="feedback", cascade="all, delete-orphan")
    votes = relationship("Vote", back_populates="feedback", cascade="all, delete-orphan")
    tags = relationship("Tag", secondary=feedback_tags, backref="feedbacks")

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    
    user_id = Column(Integer, ForeignKey("users.id"))
    feedback_id = Column(Integer, ForeignKey("feedbacks.id"))

    author = relationship("User", back_populates="comments")
    feedback = relationship("Feedback", back_populates="comments")

class Vote(Base):
    __tablename__ = "votes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    feedback_id = Column(Integer, ForeignKey("feedbacks.id"))
    vote_type = Column(String) # "up" or "down" (optional, depending on requirements, often just "upvote" implicitly)

    user = relationship("User", back_populates="votes")
    feedback = relationship("Feedback", back_populates="votes")
