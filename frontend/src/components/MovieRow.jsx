import { Fragment } from "react";
import "./MovieRow.css";
import MovieCard from "./MovieCard";
import { useRef } from "react";

function MovieRow({title,movies}){
    const rowRef = useRef(null);

    const scrollLeft = () => {
    rowRef.current.scrollBy({
        left: -500,
        behavior: "smooth",
    });
};

const scrollRight = () => {
    rowRef.current.scrollBy({
        left: 500,
        behavior: "smooth",
    });
};

    return(
        <Fragment>
            <section className="home-row">

                <h2>{title}</h2>

                <button className="left-btn" onClick={scrollLeft}><i className="bi bi-caret-left-fill"></i></button>

                <div ref={rowRef} className="home-row-movies">
                    
                    {movies.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            variant="similar-card"
                        />
                    ))}
                    
                </div>

                <button className="right-btn" onClick={scrollRight}><i className="bi bi-caret-right-fill"></i></button>

            </section>
        </Fragment>
    )
}

export default MovieRow;