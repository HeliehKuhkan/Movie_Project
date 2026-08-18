import { Fragment,useState,useEffect } from "react";
import "./MainPage.css";
import "../variables.css";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import MovieRow from "../components/MovieRow";

/*import movies from "../data/movies";*/
import { getMovies } from "../api/movies";

function MainPage(){

    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
    getMovies()
        .then((data) => {
            console.log("MOVIES:", data);
            setMovies(data);
        })
        .catch((error) => {
            console.error("API ERROR:", error);
        });
    }, []);

    useEffect(() => {
                    if (movies.length === 0) return;
                    const interval = setInterval(() => {
                        setCurrentIndex((prevIndex) =>
                        (prevIndex + 1) % movies.length
                        );}, 8000);
                    return () => clearInterval(interval);},[movies.length]);
    
    if (movies.length === 0) {
    return <div>Loading...</div>;
    }
                                
    const trendingMovies = movies.slice(0, 6);
    const topRatedMovies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 6);


    const selectedMovie = movies[(currentIndex+1)% movies.length];
    const visibleMovies = [
    movies[currentIndex],
    movies[(currentIndex + 1) % movies.length],
    movies[(currentIndex + 2) % movies.length], ];         

    return(
        <Fragment>
        <div className="hero">
            <div className="main-page">
                <div className="movie-list">
                    {visibleMovies.map((movie,index) => (

                    <div className={`movie-card ${selectedMovie.id === movie.id ? "active" : ""}`} 
                        key={movie.id} onClick={() => setCurrentIndex((movies.findIndex(m => m.id === movie.id )-1+ movies.length)% movies.length)}>
                        <h3>{movie.title}</h3>
                        <img src={movie.poster} alt={movie.title} className="main-movie-image" />
                    </div>

                    ))}
                </div>

                <div className="movie-info">

                    <h1>{selectedMovie.title}</h1>

                    <div className="movie-meta">

                        <span className="rating">⭐ {selectedMovie.rating}</span>

                        <div className="genres">
                        {selectedMovie.genre.map((genre) => (
                            <span className="genre-tag" key={genre}>
                            {genre}
                            </span>
                        ))}
                        </div>

                    </div>

                    <button onClick={() => navigate(`/movie/${selectedMovie.id}`)}>Play Now</button>

                    <p>
                        {selectedMovie.overview}
                    </p>

                    <div className="movie-details">

                        <span>-</span>

                        <span>{selectedMovie.duration}</span>

                        <span>{selectedMovie.year}</span>

                    </div>

                </div>
            </div>

            <div className="home-sections">

                <MovieRow title="Trending🔥" movies={trendingMovies} />
                <MovieRow title="Top Rated⭐" movies={topRatedMovies} />

            </div>

            

        </div>
        </Fragment>
    )
}

export default MainPage;