from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.user import User
from app.routers.auth import get_current_admin
from app.schemas.user import UserResponse
from app.models.movie import Movie

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/users",response_model=list[UserResponse])
def get_users(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    users = db.query(User).all()
    return users

@router.get("/users/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user

@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.id == current_admin.id:
        raise HTTPException(
            status_code=400,
            detail="Admin cannot delete themselves"
        )

    db.delete(user)
    db.commit()

    return {
        "message": "User deleted successfully"
    }

@router.put("/users/{user_id}/make-admin")
def make_admin(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.is_admin:
        raise HTTPException(
            status_code=400,
            detail="User is already an admin"
        )

    user.is_admin = True

    db.commit()
    db.refresh(user)

    return {
        "message": "User is now an admin",
        "user_id": user.id
    }

@router.put("/users/{user_id}/remove-admin")
def remove_admin(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not user.is_admin:
        raise HTTPException(
            status_code=400,
            detail="User is not an admin"
        )

    if user.id == current_admin.id:
        raise HTTPException(
            status_code=400,
            detail="You cannot remove your own admin access"
        )

    admin_count = db.query(User).filter(User.is_admin == True).count()

    if admin_count <= 1:
        raise HTTPException(
            status_code=400,
            detail="Cannot remove the last admin"
        )

    user.is_admin = False

    db.commit()
    db.refresh(user)

    return {
        "message": "Admin access removed",
        "user_id": user.id
    }

@router.get("/dashboard")
def get_dashboard(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    total_users = db.query(User).count()
    total_admins = db.query(User).filter(User.is_admin == True).count()
    #total_movies = db.query(Movie).count()

    total_movies = db.query(Movie).filter(Movie.type == "movie").count()
    total_series = db.query(Movie).filter(Movie.type == "series").count()

    return {
        "total_users": total_users,
        "total_movies": total_movies,
        "total_series": total_series,
        "total_admins": total_admins
    }

@router.get("/recent-movies")
def get_recent_movies(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    movies = (
        db.query(Movie)
        .order_by(Movie.id.desc())
        .limit(5)
        .all()
    )

    return movies

@router.get("/test")
def admin_test(
    current_admin: User = Depends(get_current_admin)
):
    return {
        "message": "Welcome Admin!",
        "admin_name": current_admin.name
    }