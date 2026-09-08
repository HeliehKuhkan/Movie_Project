import "./AdminDashboard.css";

import { useEffect, useState } from "react";
import { getDashboard,getRecentMovies  } from "../../api/admin";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState({
        total_movies: 0,
        total_users: 0,
        total_admins: 0,
        total_series: 0
    });

    const [recentMovies, setRecentMovies] = useState([]);

    useEffect(() => {

    const loadDashboard = async () => {
        try {

            const dashboardData = await getDashboard();
            const moviesData = await getRecentMovies();

            setDashboard(dashboardData);
            setRecentMovies(moviesData);

        } catch (error) {
            console.log(error.message);
        }
    };

    loadDashboard();

    }, []);

    return (
            <div className="admin-content-d">
                <h1>Dashboard</h1>

                <div className="dashboard-cards">
                    <div className="dashboard-card">
                        <h3>Movies</h3>
                        <p>{dashboard.total_movies}</p>
                    </div>

                    <div className="dashboard-card">
                            <h3>Series</h3>
                            <p>{dashboard.total_series}</p>
                    </div>

                    <div className="dashboard-card">
                        <h3>Users</h3>
                        <p>{dashboard.total_users}</p>
                    </div>

                    <div className="dashboard-card">
                        <h3>Admins</h3>
                        <p>{dashboard.total_admins}</p>
                    </div>
                </div>

                <div className="recent-movies">

                    <h2>Recent Movies</h2>
                    <a className="view" href="/admin/movies">view all</a>

                    <div className="recent-movies-header">
                        <span>Title</span>
                        <span>Year</span>
                        <span>Type</span>
                    </div>

                    {recentMovies.map((movie) => (
                        <div className="recent-movie" key={movie.id}>

                            <span className="title">{movie.title}</span>

                            <span>{movie.year}</span>

                            <span className="type">
                                {movie.type === "movie" ? "Movie" : "Series"}
                            </span>

                        </div>
                    ))}

                </div>

            </div>
    );
}

export default AdminDashboard;