import { Fragment } from "react";
import "./footer.css";

function Footer(){
    return(
    <Fragment>
        <div className="footer">
            <a className="ins"><i className="bi bi-instagram"></i></a>
            <a className="tel"><i className="bi bi-telegram"></i></a>

            <p>© {new Date().getFullYear()} Movie. Built with React & FastAPI.</p>

        </div>

    </Fragment>
    )
}

export default Footer;
