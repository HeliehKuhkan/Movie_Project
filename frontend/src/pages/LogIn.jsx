import "./LogIn.css";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

function LogIn(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {

    const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 422) {
            alert("Please enter a valid email address");
        } else {
            alert(data.detail || "Email or password is incorrect");
        }

        return;
    }

    if (rememberMe) {
        localStorage.setItem("access_token", data.access_token);
    } else {
        sessionStorage.setItem("access_token", data.access_token);
    }
    
    localStorage.setItem("is_admin", data.is_admin);

    window.dispatchEvent(new Event("login"));
    alert("Login successful!");

    if (data.is_admin) {
    window.location.href = "/admin";
    } else {
    window.location.href = "/";
    }

    };

    return(
        <Fragment>
            <div className="log-in">
                <div className="main">

                    <h1 id="log">Login</h1>
                    <div className="inputs">
                        <label htmlFor="email">Email address <i className="bi bi-envelope-at"></i></label> 
                        <input type="email" name="email" id="email" placeholder="Enter your email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="pass">Password <i className="bi bi-key"></i></label>
                        <input type="password" name="pass" id="password" placeholder="Enter your password" value={password}
                        onChange={(e) => setPassword(e.target.value)} /> 
                    </div>

                    <div className="remember-forget">
                        <div id="remember">
                            <input type="checkbox" name="" id="" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                            <label htmlFor="">Remember Me</label>
                        </div>
                        {/*<a href="" id="forgetpass">forget Your Password?</a>*/}
                    </div>

                    <button className="logbtn" onClick={handleLogin}>LOGIN</button>

                    <div className="or">
                        <hr />
                        <p>OR</p>
                        <hr />
                    </div>

                    <p id="y">Don't have an account?</p>
                    <button type="button" onClick={() => navigate(`/signup`)} className="createbtn">Create Account</button>

                </div>

            </div>
            
            
        </Fragment>
    )
}

export default LogIn;