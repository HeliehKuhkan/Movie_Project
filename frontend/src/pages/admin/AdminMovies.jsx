import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminMovies, getAdminMovie, deleteAdminMovie } from "../../api/admin";
import { getMoviesWithFilters } from "../../api/movies";
import MovieViewModal from "../../components/admin/MovieViewModal";

import "./AdminMovies.css";

function AdminMovies() {

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1); /* کاربر کدام صفحه ست*/
    const moviesPerPage = 6; /* تعداد فیلم در هر صفحه*/
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    const startIndex = (currentPage - 1) * moviesPerPage;

    const currentMovies = movies.slice(
        startIndex,
        startIndex + moviesPerPage
    );
    const navigate = useNavigate();

    useEffect(() => {

        const loadMovies = async () => {
            try {
                const data = await getAdminMovies();
                setMovies(data);
            } catch (error) {
                console.log(error.message);
            }
        };

        loadMovies();

    }, []);

    const handleView = async (movieId) => {

    try {

        const movie = await getAdminMovie(movieId);

        setSelectedMovie(movie);

    } catch (error) {

        console.log(error.message);

    }

    };

    const handleDelete = async (movieId) => {

    const confirmed = window.confirm(
        "Are you sure you want to delete this movie?"
    );

    if (!confirmed) {
        return;
    }

    try {

        await deleteAdminMovie(movieId);

        const updatedMovies = movies.filter(
            movie => movie.id !== movieId
        );

        setMovies(updatedMovies);

        const newTotalPages = Math.ceil(
            updatedMovies.length / moviesPerPage
        );

        if (currentPage > newTotalPages) {
            setCurrentPage(Math.max(1, newTotalPages));
        }

        alert("Movie deleted successfully!");

     } catch (error) {

        console.log(error.message);

        alert(error.message);

        }
    };

    const handleSearch = async (e) => {
    e.preventDefault();

    try {
        const data = await getMoviesWithFilters({
            search: search
        });

        setMovies(data);
        setCurrentPage(1);

    } catch (error) {
        console.log(error.message);
        }
    };

    return (
        <div className="admin-movies">
            <div className="movies-top">
                <h1>Movies</h1>
                <div className="menu">
                    <form onSubmit={handleSearch}>
                        <input
                            className="admin-search"
                            type="text"
                            placeholder="Search movies..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>

                    <button className="add-btn" onClick={() => navigate(`/admin/movies/add`)}><i className="bi bi-plus-lg"></i> Add Movie</button>
                </div>    
            </div>

            <div className="movies-list">

                <div className="movies-header">
                        <span>Title</span>
                        <span>Year</span>
                        <span>Type</span>
                        <span>Actions</span>
                </div>

                {currentMovies.map((movie) => (
                    <div className="movie-row" key={movie.id}>

                        <span className="title">{movie.title}</span>
                        <span>{movie.year}</span>
                        <span>{movie.type === "movie" ? "Movie" : "Series"}</span>

                        <div className="actions-div">
                            <button className="view-btn" title="View Movie" onClick={() => handleView(movie.id)}><i className="bi bi-eye"></i></button>
                            <button className="edit-btn" title="Edit Movie" onClick={() => navigate(`/admin/movies/edit/${movie.id}`)}><i className="bi bi-pencil-square"></i></button>
                            <button className="delete-btn" title="Delete Movie" onClick={() => handleDelete(movie.id)}><i className="bi bi-trash3-fill"></i></button>
                        </div>

                    </div>
                ))}

            </div>

            <div className="pagination">

                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <i className="bi bi-arrow-left-circle"></i>
                </button>

                <span>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <i className="bi bi-arrow-right-circle"></i>
                </button>

            </div>

            {selectedMovie && (
                <MovieViewModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}

        </div>
    );
}

export default AdminMovies;