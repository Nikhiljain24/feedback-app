from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from ..schemas import User, UserCreate, Token
from ..auth import get_password_hash, verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

# In-memory database for users
users = [
    {
        "id": 1,
        "username": "admin",
        "email": "admin@example.com",
        "hashed_password": get_password_hash("admin"),
        "is_active": True
    }
]

@router.post("/signup", response_model=User)
async def signup(user: UserCreate):
    for u in users:
        if u["username"] == user.username:
            raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = {
        "id": len(users) + 1,
        "username": user.username,
        "email": user.email,
        "hashed_password": hashed_password,
        "is_active": True
    }
    users.append(new_user)
    return new_user

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = next((u for u in users if u["username"] == form_data.username), None)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
