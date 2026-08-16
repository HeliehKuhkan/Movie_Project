from fastapi import FastAPI
from app.database import engine, Base
from app.models.movie import Movie

Base.metadata.create_all(bind=engine)

app = FastAPI()