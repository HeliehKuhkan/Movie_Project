from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.movie import Movie
from app.schemas.movie import MovieResponse,MovieCreate,MovieUpdate


router = APIRouter(
    prefix="/movies",
    tags=["Movies"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_movies(db: Session = Depends(get_db)):
    movies = db.query(Movie).all()
    return movies

@router.get("/{movie_id}",response_model=MovieResponse)
def get_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()

    if movie is None:
        raise HTTPException(status_code=404,detail="Movie not found")

    return movie


@router.post("/", response_model=MovieResponse)
def create_movie(movie: MovieCreate, db: Session = Depends(get_db)):
    new_movie = Movie(**movie.model_dump())

    db.add(new_movie)
    db.commit()
    db.refresh(new_movie)

    return new_movie

@router.put("/{movie_id}", response_model=MovieResponse)
def update_movie(
    movie_id: int,
    movie: MovieUpdate,
    db: Session = Depends(get_db)
):
    existing_movie = db.query(Movie).filter(Movie.id == movie_id).first()

    if existing_movie is None:
        raise HTTPException(
            status_code=404,
            detail="Movie not found"
        )

    for key, value in movie.model_dump(exclude_unset=True).items():
        setattr(existing_movie, key, value)

    db.commit()
    db.refresh(existing_movie)

    return existing_movie

@router.delete("/{movie_id}")
def delete_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()

    if movie is None:
        raise HTTPException(
            status_code=404,
            detail="Movie not found"
        )

    db.delete(movie)
    db.commit()

    return {"message": "Movie deleted successfully"}