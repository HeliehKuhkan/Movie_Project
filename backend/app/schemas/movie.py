from pydantic import BaseModel


class MovieBase(BaseModel):
    type: str
    title: str
    year: int
    rating: float
    genre: list[str]
    duration: str
    country: str
    language: str
    poster: str
    backdrop: str
    overview: str
    cast: list[str]

class MovieCreate(MovieBase):
    pass

class MovieUpdate(BaseModel):
    type: str | None = None
    title: str | None = None
    year: int | None = None
    rating: float | None = None
    genre: list[str] | None = None
    duration: str | None = None
    country: str | None = None
    language: str | None = None
    poster: str | None = None
    backdrop: str | None = None
    overview: str | None = None
    cast: list[str] | None = None

class MovieResponse(MovieBase):
    id: int

    class Config:
        from_attributes = True