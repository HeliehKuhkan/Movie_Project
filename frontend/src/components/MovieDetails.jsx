import { Fragment, useState, useEffect } from "react";
import "./MovieDetails.css";
import MovieCard from "../components/MovieCard";

import { useParams } from "react-router-dom";
import movies from "../data/movies";
import { getMovie,getMovies} from "../api/movies";

function MovieDetails(){
    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [movies, setMovies] = useState([]);

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

    if (!movie) {
        return <div>Loading...</div>;
    }

    const similarMovies = movies.filter((m) =>

        m.id !== movie.id && m.genre.some((genre) =>movie.genre.includes(genre)) ).slice(0,5);

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
                            <button><i className="bi bi-heart-fill"></i>Favourite</button>
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