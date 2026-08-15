import { Fragment } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Header(){
    
    return(
        <Fragment>
            <div className="header">
                
                <div className="options-logo">
                    <img src="./src/assets/logo.png" alt="my logo" />
                    <Link to="/">Home</Link>
                    <Link to="/browse/movie">Movies</Link>
                    <Link to="/browse/series">Series</Link>
                    <Link to="/MyList">My List</Link>
                </div>
                
                <div className="search-log">
                    <form role="search" className="search-form">
                    <input type="search" placeholder="Search movies..." className="search" />
                    </form>
                    <Link to="/LogIn">LOG IN</Link>
                    <Link to="/signup">SIGN UP</Link>
                </div>
                

            </div>
        </Fragment>
    )
}

export default Header;
