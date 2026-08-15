import { Fragment } from "react";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";

import movies from "../data/movies";

function MovieCard({movie,variant}){
    const navigate = useNavigate();
    console.log("variant:", variant);
    return(
        <Fragment>
        <div className={`movie-card- ${variant}`}>
            
            <div className="poster-container">
                <img className="poster" src={movie.poster} alt={movie.title} />
                
                <p className="rate">
                    {movie.rating*10}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-percent" viewBox="0 0 16 16">
                    <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0M4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                    </svg>
                </p>
            </div>
            <button className="btn-show-detail" onClick={() => navigate(`/movie/${movie.id}`)}>Watch Now</button>

            <div className="movie-info-container">
                <h4 className="name">{movie.title}</h4>

                <p className="year">{movie.year}</p>    
            </div>

        </div>
        </Fragment>
    )
}

export default MovieCard;