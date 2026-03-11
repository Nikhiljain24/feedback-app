from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import feedback, auth, categories
from .database import engine
from . import models

# Create all tables in the database
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Feedback Social Media API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(feedback.router)
app.include_router(auth.router)
app.include_router(categories.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Modular Feedback API. Visit /docs for API documentation."}
