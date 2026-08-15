import { Fragment } from "react";
import "./LogIn.css";

function LogIn(){
    return(
        <Fragment>
            <div className="log-in">
                <div className="main">

                    <h1 id="log">Login</h1>
                    <div className="inputs">
                        <label htmlFor="email">Email address <i class="bi bi-envelope-at"></i></label> 
                        <input type="email" name="email" id="email" placeholder="Enter your email" />

                        <label htmlFor="pass">Password <i class="bi bi-key"></i></label>
                        <input type="password" name="pass" id="password" placeholder="Enter your password" /> 
                    </div>

                    <div className="remember-forget">
                        <div id="remember">
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">Remember Me</label>
                        </div>
                        <a href="" id="forgetpass">forget Your Password?</a>
                    </div>

                    <button className="logbtn">LOGIN</button>

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