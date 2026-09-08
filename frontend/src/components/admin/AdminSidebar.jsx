import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar() {
    const navigate = useNavigate();


    const handleLogout = () => {
            localStorage.removeItem("access_token");
            sessionStorage.removeItem("access_token");
            navigate("/");
        };

    return (
        <aside className="admin-sidebar">
            <h2>ADMIN PANEL</h2>

            <nav className="admin-nav">
                <NavLink to="/admin" end>
                    <i className="bi bi-grid"></i> <span>Dashboard</span>
                </NavLink>

                <NavLink to="/admin/movies">
                    <i className="bi bi-film"></i> <span>Movies</span>
                </NavLink>

                <NavLink to="/admin/users">
                    <i className="bi bi-people"></i> <span>Users</span>
                </NavLink>

            </nav>

            <button onClick={handleLogout} className="admin-logout">
                <i className="bi bi-box-arrow-left"></i> Logout
            </button>
        </aside>
    );
}

export default AdminSidebar;