import { Fragment, useState, useEffect } from "react";
import "./MovieDetails.css";
import MovieCard from "../components/MovieCard";

import { useParams } from "react-router-dom";
import { getMovie,getMovies} from "../api/movies";
import { getFavorites, addFavorite, deleteFavorite } from "../api/favorites";

function MovieDetails(){
    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [movies, setMovies] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        getMovie(id)
            .then((data) => {
                console.log("MOVIE:", data);
                setMovie(data);
            })
            .catch((error) => {
                console.error("API ERROR:", error);
            });
    }, [id]);

    useEffect(() => {
    getMovies()
        .then((data) => {
            setMovies(data);
        })
        .catch((error) => {
            console.error("API ERROR:", error);
        });
    }, []);

    useEffect(() => {

    getFavorites()
        .then(data => {

            const favoriteMovie = data.some(
                favorite => favorite.id === Number(id)
            );

            setIsFavorite(favoriteMovie);

        })
        .catch(error => {
            console.error("Favorites error:", error);
        });

    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    const similarMovies = movies.filter((m) =>

        m.id !== movie.id && m.genre.some((genre) =>movie.genre.includes(genre)) ).slice(0,5);

    const handleFavorite = async () => {

    try {

        if (isFavorite) {

            await deleteFavorite(movie.id);
            setIsFavorite(false);

        } else {

            await addFavorite(movie.id);
            setIsFavorite(true);

        }

    } catch (error) {

        console.error("Favorite error:", error);
        alert(error.message);

    }
    };

    return(
        <Fragment>
            <div className="movie-details-page">
                <div className="movie-content">
                    <div className="movie-poster">
                        <img src={movie.poster} alt="" />
                    </div>

                    <div className="movie-details">
                        <h1>{movie.title}</h1>
                        <div className="movie-meta">
                            <span>⭐ {movie.rating}</span>
                            <span>{movie.genre.join(" • ")}</span>
                            <span>{movie.duration}</span>
                            <span>{movie.year}</span>
                        </div>

                        <p>{movie.overview}</p>
                        <div className="cast-section">
                           <h3>Cast:</h3>

                            <div className="cast-list">
                                {movie.cast.map((actor) => (
                                <div className="actor-card" key={actor}>
                                    {actor}
                                </div>))}
                            </div>

                        </div>

                        <div className="movie-buttons">
                            <button><i className="bi bi-play-btn"></i>Play</button>
                            <button onClick={handleFavorite}>
                                <i className={isFavorite ? "bi bi-heart-fill" : "bi bi-heart"}></i>
                                {isFavorite ? "Remove" : "Add"}
                            </button>
                        </div>

                    </div>
                </div>

                <div className="similar-section">

                    <h2>Similar Movies</h2>

                    <div className="similar-list">

                        {similarMovies.map((movie)=>(
                                <MovieCard key={movie.id} movie={movie} variant="similar-card" />
                        ))}

                    </div>

                </div>
            
            </div>


        </Fragment>
    )
}

export default MovieDetails;