import { Fragment, useEffect,useState } from "react";
import MovieCard from '../components/MovieCard';
import "./MyList.css";

/*import movies from "../data/movies";*/
import { getFavorites } from "../api/favorites";

function MyList(){
    const [myMovies, setMyMovies] = useState([]);

    useEffect(() => {
        getFavorites()
            .then(data => {
                console.log("MY FAVORITES:", data);
                setMyMovies(data);
            })
            .catch(error => {
                console.error("Favorites error:", error);
            });
    }, []);
    return(
        <Fragment>

            <div className="mylist-page">
                <h1 className="page-title"><i className="bi bi-person-lines-fill"></i> My List</h1>

                <div className="mylist-stats">
                    {/* بعداً کارت‌های آماری */}
                </div>

                {/* <section className="movie-section">
                    <h2>Continue Watching <i class="bi bi-hourglass-split"></i></h2>

                    <div className="movies-grid">
                       { myMovies.map(movie => (
                        <MovieCard movie={movie} key={movie.id} variant="my-list-card" />))}
                    </div>
                </section> */}

                <section className="movie-section">
                    <h2>Favorites <i className="bi bi-hand-thumbs-up-fill"></i></h2>

                    <div className="movies-grid">
                        {myMovies.length > 0 ? (
                            myMovies.map(movie => (
                                <MovieCard movie={movie} key={movie.id} variant="my-list-card" />
                            ))
                        ) : (
                            <p className="empty-message">You haven't added any favorites yet.</p>
                        )}
                    </div>
                </section>

                {/* <section className="movie-section">
                    <h2>Watched <i class="bi bi-eye"></i></h2>

                    <div className="movies-grid">
                        { myMovies.map(movie => (
                        <MovieCard movie={movie} key={movie.id} variant="my-list-card" />))}
                    </div>
                </section> */}

            </div>

        </Fragment>
    )
}

export default MyList;