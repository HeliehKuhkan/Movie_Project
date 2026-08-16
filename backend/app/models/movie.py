from sqlalchemy import Column, Integer, String
from app.database import Base


class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    year = Column(Integer)
    genre = Column(String)
    poster = Column(String)