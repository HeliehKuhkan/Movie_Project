from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin

from sqlalchemy import select
from app.utils.password import hash_password, verify_password
from app.utils.jwt import create_access_token,decode_access_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

security = HTTPBearer()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    try:
        payload = decode_access_token(token)

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )
    user_id = payload.get("sub")
    try:
        user_id = int(user_id)
    except (TypeError, ValueError):
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = db.execute(
        select(User).where(User.id == user_id)
    ).scalar_one_or_none()

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user

def get_current_admin(
    current_user: User = Depends(get_current_user)
):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return current_user

@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.execute(
        select(User).where(User.email == user.email)
    ).scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    existing_user = db.execute(
        select(User).where(User.email == user.email)
    ).scalar_one_or_none()

    if not existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email or password is incorrect"
        )

    if not verify_password(user.password, existing_user.password):
        raise HTTPException(
            status_code=400,
            detail="Email or password is incorrect"
        )

    access_token = create_access_token(
    {"sub": str(existing_user.id)}
    )

    return {
    "message": "Login successful",
    "access_token": access_token,
    "token_type": "bearer",
    "is_admin": existing_user.is_admin
    }