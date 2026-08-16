from fastapi import FastAPI
from app.database import engine, Base
from app.models.movie import Movie
from app.routers.movies import router as movies_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(movies_router)