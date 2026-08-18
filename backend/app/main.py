from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.database import engine, Base
from app.models.movie import Movie
from app.routers.movies import router as movies_router
from fastapi.staticfiles import StaticFiles

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(movies_router)