
from fastapi import APIRouter, Depends, HTTPException,Request,Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.favorite import Favorite
from app.models.movie import Movie
from app.models.user import User
from app.routers.auth import get_current_user


router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/{movie_id}")
def add_favorite(
    movie_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    movie = db.execute(
    select(Movie).where(Movie.id == movie_id)
    ).scalar_one_or_none()

    if movie is None:
        raise HTTPException(
        status_code=404,
        detail="Movie not found"
        )

    existing_favorite = db.execute(
    select(Favorite).where(
        Favorite.user_id == current_user.id,
        Favorite.movie_id == movie_id
    )
    ).scalar_one_or_none()

    if existing_favorite:
        raise HTTPException(
        status_code=400,
        detail="Movie is already in your favorites"
        )

    new_favorite = Favorite(
    user_id=current_user.id,
    movie_id=movie_id
    )

    db.add(new_favorite)
    db.commit()
    db.refresh(new_favorite)

    return{
    "message": "Movie added to favorites"
    }

@router.get("/")
def get_favorites(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    favorites = db.execute(
        select(Movie)
        .join(Favorite, Favorite.movie_id == Movie.id)
        .where(Favorite.user_id == current_user.id)
    ).scalars().all()

    for movie in favorites:
        if movie.poster:
            movie.poster = str(request.base_url) + "static" + movie.poster
    
        if movie.backdrop:
            movie.backdrop = str(request.base_url) + "static" + movie.backdrop

    return favorites

@router.delete("/{movie_id}")
def delete_favorite(
    movie_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    favorite = db.execute(
        select(Favorite).where(
            Favorite.user_id == current_user.id,
            Favorite.movie_id == movie_id
        )
    ).scalar_one_or_none()

    if favorite is None:
        raise HTTPException(
            status_code=404,
            detail="Movie is not in your favorites"
        )

    db.delete(favorite)
    db.commit()

    return {
        "message": "Movie removed from favorites"
    }