const API_URL = "http://127.0.0.1:8000";

export async function getMovies() {
    const response = await fetch(`${API_URL}/movies/`);

    if (!response.ok) {
        throw new Error("Failed to fetch movies");
    }

    return await response.json();
}

export async function getMovie(id) {
    const response = await fetch(`${API_URL}/movies/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch movie");
    }

    return await response.json();
}

export async function getMoviesWithFilters(params = {}) {
    const query = new URLSearchParams();

    if (params.type) query.append("type", params.type);
    if (params.genre) query.append("genre", params.genre);
    if (params.year) query.append("year_from", params.year);
    if (params.rating) query.append("rating_from", params.rating);
    if (params.sort) query.append("sort", params.sort);

    const response = await fetch(`${API_URL}/movies/?${query.toString()}`);

    if (!response.ok) {
        throw new Error("Failed to fetch movies");
    }

    return await response.json();
}