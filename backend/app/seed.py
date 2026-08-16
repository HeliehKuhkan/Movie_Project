from app.database import SessionLocal
from app.models.movie import Movie


db = SessionLocal()

#db.query(Movie).delete()

movies = [
    Movie(
        type="movie",
        title="Interstellar",
        year=2014,
        rating=8.7,
        genre=["Sci-Fi", "Drama"],
        duration="2h 49m",
        country="USA",
        language="English",
        poster="/posters/Interstellar-poster.jpg",
        backdrop="",
        overview="When Earth becomes uninhabitable, a team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
        cast=[
            "Matthew McConaughey",
            "Anne Hathaway",
            "Jessica Chastain"
        ]
    ),

    Movie(
        type="movie",
        title="Inception",
        year=2010,
        rating=8.8,
        genre=["Sci-Fi", "Thriller"],
        duration="2h 28m",
        country="USA",
        language="English",
        poster="/posters/Inception-poster.jpg",
        backdrop="",
        overview="A skilled thief who steals secrets through dream-sharing technology is given a chance to erase his past by planting an idea in someone's mind.",
        cast=[
            "Leonardo DiCaprio",
            "Joseph Gordon-Levitt",
            "Elliot Page"
        ]
    ),

    Movie(
        type="movie",
        title="The Dark Knight",
        year=2008,
        rating=9.0,
        genre=["Action", "Crime", "Drama"],
        duration="2h 32m",
        country="USA",
        language="English",
        poster="/posters/The-Dark-Knight-poster.jpg",
        backdrop="",
        overview="Batman faces a criminal mastermind who plunges Gotham City into chaos.",
        cast=[
            "Christian Bale",
            "Heath Ledger",
            "Aaron Eckhart"
        ]
    ),

    Movie(
        type="movie",
        title="The Matrix",
        year=1999,
        rating=8.7,
        genre=["Sci-Fi", "Action"],
        duration="2h 16m",
        country="USA",
        language="English",
        poster="/posters/The-Matrix-poster.jpg",
        backdrop="",
        overview="A computer hacker discovers that reality is not what it seems and joins a rebellion against the machines.",
        cast=[
            "Keanu Reeves",
            "Laurence Fishburne",
            "Carrie-Anne Moss"
        ]
    ),

    Movie(
        type="movie",
        title="Fight Club",
        year=1999,
        rating=8.8,
        genre=["Drama", "Thriller"],
        duration="2h 19m",
        country="USA",
        language="English",
        poster="/posters/Fight-Club-poster.jpg",
        backdrop="",
        overview="An unhappy office worker forms an underground fight club with a mysterious new friend.",
        cast=[
            "Brad Pitt",
            "Edward Norton",
            "Helena Bonham Carter"
        ]
    ),

    Movie(
        type="movie",
        title="Parasite",
        year=2019,
        rating=8.5,
        genre=["Drama", "Thriller"],
        duration="2h 12m",
        country="South Korea",
        language="Korean",
        poster="/posters/Parasite-poster.jpg",
        backdrop="",
        overview="A struggling family gradually becomes involved with a wealthy household, leading to unexpected consequences.",
        cast=[
            "Song Kang-ho",
            "Lee Sun-kyun",
            "Choi Woo-shik"
        ]
    ),

    Movie(
        type="series",
        title="Stranger Things",
        year=2016,
        rating=8.6,
        genre=["Sci-Fi", "Drama", "Mystery"],
        duration="4 Seasons",
        country="USA",
        language="English",
        poster="/posters/Stranger-Things-poster.jpg",
        backdrop="",
        overview="A group of friends uncover mysterious supernatural events in their small town.",
        cast=[
            "Millie Bobby Brown",
            "Finn Wolfhard",
            "Winona Ryder"
        ]
    ),

    Movie(
        type="series",
        title="Breaking Bad",
        year=2008,
        rating=9.5,
        genre=["Crime", "Drama", "Thriller"],
        duration="5 Seasons",
        country="USA",
        language="English",
        poster="/posters/Breaking-Bad-poster.jpg",
        backdrop="",
        overview="A chemistry teacher turns to manufacturing drugs after receiving a devastating diagnosis.",
        cast=[
            "Bryan Cranston",
            "Aaron Paul",
            "Anna Gunn"
        ]
    ),

    Movie(
        type="series",
        title="Dark",
        year=2017,
        rating=8.7,
        genre=["Sci-Fi", "Mystery", "Drama"],
        duration="3 Seasons",
        country="Germany",
        language="German",
        poster="/posters/Dark-poster.jpg",
        backdrop="",
        overview="A child's disappearance reveals a mystery that spans generations and connects four families.",
        cast=[
            "Louis Hofmann",
            "Lisa Vicari",
            "Oliver Masucci"
        ]
    ),

    Movie(
        type="series",
        title="The Last of Us",
        year=2023,
        rating=8.7,
        genre=["Drama", "Sci-Fi"],
        duration="2 Seasons",
        country="USA",
        language="English",
        poster="/posters/The-Last-of-Us-poster.jpg",
        backdrop="",
        overview="A hardened survivor escorts a young girl across a post-apocalyptic America.",
        cast=[
            "Pedro Pascal",
            "Bella Ramsey",
            "Anna Torv"
        ]
    ),
]


for movie in movies:
    db.add(movie)

db.commit()
db.close()