from sqlalchemy import Column, Integer, String, Float, JSON
from app.database import Base


class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, nullable=False)
    title = Column(String, nullable=False)
    year = Column(Integer)
    rating = Column(Float)
    genre = Column(JSON)
    duration = Column(String)
    country = Column(String)
    language = Column(String)
    poster = Column(String)
    backdrop = Column(String)
    overview = Column(String)
    cast = Column(JSON)