import "./MovieViewModal.css";
import { useNavigate } from "react-router-dom";

function MovieViewModal({ movie, onClose }) {
    const navigate = useNavigate();

    return (
        <div className="movie-modal-overlay">

            <div className="movie-modal">

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ×
                </button>

                <h2 className="modal-title">{movie.title}</h2>

                <div className="movie-details">

                    <div className="movie-poster">
                        <img src={movie.poster} alt={movie.title} />
                    </div>

                    <div className="movie-info">

                        <p>
                            <strong>Type:</strong> {movie.type === "movie" ? "Movie" : "Series"}
                        </p>

                        <p>
                            <strong>Year:</strong> {movie.year}
                        </p>

                        <p>
                            <strong>Rating:</strong> <i className="bi bi-star-fill"></i> {movie.rating}
                        </p>

                        <p>
                            <strong>Duration:</strong> {movie.duration}
                        </p>

                        <p>
                            <strong>Country:</strong> {movie.country}
                        </p>

                        <p>
                            <strong>Language:</strong> {movie.language}
                        </p>

                        <p>
                            <strong>Genre:</strong> {movie.genre?.join(", ")}
                        </p>

                    </div>

                </div>

                <div className="movie-overview">

                    <h3>Overview</h3>
                    <p>{movie.overview}</p>

                </div>

                <div className="movie-cast">

                    <h3>Cast</h3>
                    <p>{movie.cast?.join(", ")}</p>

                </div>

                <div className="modal-actions">

                    <button className="edit-btn-modal" onClick={() => navigate(`/admin/movies/edit/${movie.id}`)}><i className="bi bi-pencil"></i> Edit</button>
                    <button className="close-btn-modal" onClick={onClose}>Close</button>

                </div>

            </div>

        </div>
    );
}

export default MovieViewModal;