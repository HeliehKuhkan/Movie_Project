from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.database import engine, Base
from app.models.movie import Movie
from app.routers.movies import router as movies_router
from app.routers.auth import router as auth_router
from app.routers.favorites import router as favorites_router
from fastapi.staticfiles import StaticFiles
from app.models.user import User
from app.routers.admin import router as admin_router

""" Base.metadata.create_all(bind=engine) """
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
app.include_router(auth_router)
app.include_router(favorites_router)
app.include_router(admin_router)