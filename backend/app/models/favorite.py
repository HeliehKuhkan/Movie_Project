from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from app.database import Base


class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    movie_id = Column(Integer, ForeignKey("movies.id"), nullable=False)

    __table_args__ = (
        UniqueConstraint("user_id", "movie_id"),
    )