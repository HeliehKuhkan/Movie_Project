import { Fragment } from 'react';
import MovieCard from '../components/MovieCard';
import "./MyList.css";

import movies from "../data/movies";

function MyList(){
    const myMovies = [movies[1],movies[5],movies[9],movies[2],movies[7],movies[11],];/*for testing */
    return(
        <Fragment>

            <div className="mylist-page">
                <h1 className="page-title"><i class="bi bi-person-lines-fill"></i> My List</h1>

                <div className="mylist-stats">
                    {/* بعداً کارت‌های آماری */}
                </div>

                <section className="movie-section">
                    <h2>Continue Watching <i class="bi bi-hourglass-split"></i></h2>

                    <div className="movies-grid">
                       { myMovies.map(movie => (
                        <MovieCard movie={movie} key={movie.id} variant="my-list-card" />))}
                    </div>
                </section>

                <section className="movie-section">
                    <h2>Favorites <i class="bi bi-hand-thumbs-up-fill"></i></h2>

                    <div className="movies-grid">
                        { myMovies.map(movie => (
                        <MovieCard movie={movie} key={movie.id} variant="my-list-card" />))}
                    </div>
                </section>

                <section className="movie-section">
                    <h2>Watched <i class="bi bi-eye"></i></h2>

                    <div className="movies-grid">
                        { myMovies.map(movie => (
                        <MovieCard movie={movie} key={movie.id} variant="my-list-card" />))}
                    </div>
                </section>

            </div>

        </Fragment>
    )
}

export default MyList;