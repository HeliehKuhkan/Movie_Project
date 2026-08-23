import "./LogIn.css";
import { Fragment, useState } from "react";

function LogIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        alert(data.detail);
        return;
    }

    localStorage.setItem("access_token", data.access_token);
    window.dispatchEvent(new Event("login"));
    alert("Login successful!");
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
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">Remember Me</label>
                        </div>
                        <a href="" id="forgetpass">forget Your Password?</a>
                    </div>

                    <button className="logbtn" onClick={handleLogin}>LOGIN</button>

                    <div className="or">
                        <hr />
                        <p>OR</p>
                        <hr />
                    </div>

                    <p id="y">Don't have an account?</p>
                    <button className="createbtn">Create Account</button>

                </div>

            </div>
            
            
        </Fragment>
    )
}

export default LogIn;