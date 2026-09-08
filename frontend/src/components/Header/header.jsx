    import { Fragment,useState,useEffect  } from "react";
    import "./header.css";
    import { Link,useNavigate } from "react-router-dom";
    import logo from "../../assets/logo.png";

    function Header(){
        const navigate = useNavigate();
        const [search, setSearch] = useState("");
        const [isLoggedIn, setIsLoggedIn] = useState( !!(localStorage.getItem("access_token") || sessionStorage.getItem("access_token")) );

        useEffect(() => {
            const handleLogin = () => {
                setIsLoggedIn(!!(localStorage.getItem("access_token") || sessionStorage.getItem("access_token")));
            };
            
            window.addEventListener("login", handleLogin);

            return () => {
                window.removeEventListener("login", handleLogin);
            };
        }, []);

        const handleLogout = () => {
            localStorage.removeItem("access_token");
            sessionStorage.removeItem("access_token");
            setIsLoggedIn(false);
            navigate("/");
        };

        const handleSearch = (e) => {
            e.preventDefault();

            if (!search.trim()) {
                navigate("/browse");
                return;
            }

            navigate(`/search?q=${encodeURIComponent(search.trim())}`);
        };
        
        return(
            <Fragment>
                <div className="header">
                    
                    <div className="options-logo">
                        <img src={logo} alt="my logo" />
                        <Link to="/">Home</Link>
                        <Link to="/browse/movie">Movies</Link>
                        <Link to="/browse/series">Series</Link>
                        <Link to="/MyList">My List</Link>
                    </div>
                    
                    <div className="search-log">
                        <form role="search" className="search-form" onSubmit={handleSearch}>
                        <input type="search" placeholder="Search movies..." className="search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </form>
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="logout-btn">
                                LOG OUT
                            </button>
                        ) : (
                            <>
                                <Link to="/LogIn">LOG IN</Link>
                                <Link to="/signup">SIGN UP</Link>
                            </>
                        )}
                    </div>
                    

                </div>
            </Fragment>
        )
    }

    export default Header;
