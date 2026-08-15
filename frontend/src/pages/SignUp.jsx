import { Fragment } from "react";
import "./SignUp.css";

function SignUp(){
    return(
        <Fragment>
            <div className="sign-up">
                <div className="main">

                    <h1 id="sign">Create Account</h1>
                    <div className="sign-inputs">
                        <label htmlFor="name">Full Name <i class="bi bi-person"></i></label> 
                        <input type="text" name="name" id="name" placeholder="Enter your name" />

                        <label htmlFor="email">Email address <i class="bi bi-envelope-at"></i></label> 
                        <input type="email" name="email" id="email" placeholder="Enter your email" />

                        <label htmlFor="pass">Password <i class="bi bi-unlock2"></i></label>
                        <input type="password" name="pass" id="password" placeholder="Enter your password" />

                        <label htmlFor="pass">Confirm Password <i class="bi bi-unlock2"></i></label>
                        <input type="password" name="pass" id="password" placeholder="Enter your password" /> 
                    </div>

                    <div className="agree">
                        <input type="checkbox" name="" id="" />
                        I agree to the <a href="#">Terms</a> & <a href="#">Privacy Policy</a>
                    </div>

                    <button className="CA-btn">Create Account</button>

                    <div className="or">
                        <hr />
                        <p>OR</p>
                        <hr />
                    </div>

                    <p id="x">Already have an account?</p>
                    <button className="log-btn">SIGN IN</button>

                </div>

            </div>
        </Fragment>
    )
}

export default SignUp;