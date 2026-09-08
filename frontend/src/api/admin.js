const API_URL = "http://127.0.0.1:8000";

export async function getDashboard() {

    const token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/admin/dashboard`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to get dashboard");
    }

    return data;
}

export async function getRecentMovies() {

    const token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/admin/recent-movies`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to get recent movies");
    }

    return data;
}

export async function getAdminMovies() {

    const response = await fetch(
        `${API_URL}/movies/`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to get movies");
    }

    return data;
}

export async function getAdminMovie(movieId) {

    const response = await fetch(
        `${API_URL}/movies/${movieId}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to get movie");
    }

    return data;
}

export async function createAdminMovie(movieData) {

    const token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/movies/`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(movieData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to create movie");
    }

    return data;
}

export async function updateAdminMovie(movieId, movieData) {

    const token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/movies/${movieId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(movieData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to update movie");
    }

    return data;
}

export async function deleteAdminMovie(movieId) {

    const token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/movies/${movieId}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to delete movie");
    }

    return data;
}

export async function getAdminUsers() {

    const token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/admin/users`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to fetch users");
    }

    return data;
}

export async function deleteAdminUser(userId) {

    const token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/admin/users/${userId}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to delete user");
    }

    return data;
}

export async function makeAdmin(userId) {

    const token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/admin/users/${userId}/make-admin`,
        {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to make admin");
    }

    return data;
}

export async function removeAdmin(userId) {

    const token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/admin/users/${userId}/remove-admin`,
        {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Failed to remove admin");
    }

    return data;
}