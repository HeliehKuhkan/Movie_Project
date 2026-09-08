import { Fragment,useState,useEffect } from "react";
import "./BrowsePage.css";
import MovieCard from '../components/MovieCard';
import { useParams,useSearchParams,useNavigate   } from "react-router-dom";

/*import movies from "../data/movies";*/
import { getMoviesWithFilters } from "../api/movies";

function BrowsePage(){
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);

    const { type: routeType } = useParams();
    const [searchParams] = useSearchParams();
    const search = searchParams.get("q") || "";

    const clearFilters = () => {
    setType("");
    setGenre("");
    setYear("");
    setRating("");
    setSort("");

    navigate(search ? `/search?q=${encodeURIComponent(search)}` : "/browse");
    };

    const [type, setType] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
    setType(routeType || "");
    }, [routeType]);

    useEffect(() => {
    getMoviesWithFilters({
        search,
        type,
        genre,
        year,
        rating,
        sort
    })
        .then((data) => {
            setMovies(data);
        })
        .catch((error) => {
            console.error("API ERROR:", error);
        });
    }, [search,type, genre, year, rating, sort]);

    /*const filteredMovies = movies.filter((movie) =>{
        const matchType = type === "" || movie.type === type;
        const matchGenre = genre === "" || movie.genre.includes(genre);
        const matchYear = year === "" || movie.year >= Number(year);
        const matchRating = rating === "" || movie.rating >= Number(rating);

        return matchType && matchGenre && matchYear && matchRating;
    });
    const sortedMovies = [...filteredMovies];

    if (sort === "newest") {
        sortedMovies.sort((a, b) => b.year - a.year);
    }

    if (sort === "oldest") {
        sortedMovies.sort((a, b) => a.year - b.year);
    }

    if (sort === "rating") {
        sortedMovies.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "az") {
        sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
    }*/

    return(
        <Fragment>
        <div className="browse-page">

            <div className="filter-bar">

                <div className="filters">

                    <select value={type} onChange={(e) => setType(e.target.value)} name="" id="">
                        <option value="">Type</option>
                        <option value="movie">Movie</option>
                        <option value="series">Series</option>
                    </select>

                    <select value={genre} onChange={(e)=>setGenre(e.target.value)} name="" id="">
                        <option value="">Genre</option>
                        <option value="Action">Action</option>
                        <option value="Drama">Drama</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Crime">Crime</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Animation">Animation</option>
                        <option value="Horror">Horror</option>
                    </select>

                    <select value={year} onChange={(e) => setYear(e.target.value)} name="" id="">
                        <option value="">Year+</option>
                        {Array.from({ length: 36 }, (_, i) => 2025 - i).map((y) => (
                            <option key={y} value={y}>
                                    {y}
                            </option>
                        ))}
                    </select>

                    <select value={rating} onChange={(e) => setRating(e.target.value)} name="" id="">
                        <option value="">All Rating</option>
                        <option value="9">+9</option>
                        <option value="8">+8</option>
                        <option value="7">+7</option>
                        <option value="6">+6</option>
                        <option value="5">+5</option>
                    </select>

                    <select value={sort} onChange={(e) => setSort(e.target.value)} name="" id="">
                        <option value="">Sort By</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="rating">Highest Rating</option>
                        <option value="az">A - Z</option>
                    </select>

                </div>

                <button className="clear-btn" onClick={clearFilters}>Clear Filters</button>

                <div className="active-filters">
                    
                    {type && <button className="filter-tag" onClick={() => {
                        setType("");
                        navigate(search ? `/search?q=${encodeURIComponent(search)}` : "/browse");
                    }}>{type} ✕</button>}
                    {genre && <button className="filter-tag" onClick={() => setGenre("")}>{genre} ✕</button>}
                    {year && <button className="filter-tag" onClick={() => setYear("")}>{year}+ ✕</button>}
                    {rating && <button className="filter-tag" onClick={() => setRating("")}>⭐{rating}+ ✕</button>}
                    {sort && <button className="filter-tag" onClick={() => setSort("")}>{sort} ✕</button>}        

                </div>
            </div>
            {search && (
                <h2 className="search-result-title">
                    Search results for: "{search}" 
                </h2>
            )}
            <div className="movies-grid">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))
                ) : (
                    <p className="no-results">
                        No movies found.
                    </p>
                )}
            </div>

        </div>
        </Fragment>
    )
}

export default BrowsePage;