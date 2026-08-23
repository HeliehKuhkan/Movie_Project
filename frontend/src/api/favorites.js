export async function getFavorites() {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        "http://127.0.0.1:8000/favorites/",
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to get favorites");
    }

    return data;
}

export async function addFavorite(movieId) {

    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `http://127.0.0.1:8000/favorites/${movieId}`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to add favorite");
    }

    return data;
}


export async function deleteFavorite(movieId) {

    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `http://127.0.0.1:8000/favorites/${movieId}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to remove favorite");
    }

    return data;
}