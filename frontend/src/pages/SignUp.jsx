import "./SignUp.css";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(){
    const navigate = useNavigate();
    
    const [error, setError] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleSignup = async () => {
    setError("");

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {
        const response = await fetch(
            "http://127.0.0.1:8000/auth/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
            if (response.status === 422) {
                alert("Please enter a valid email address");
            } else {
                alert(data.detail || "Something went wrong");
            }

            return;
        }

        alert("Account created successfully!");

    } catch (error) {
        console.error("Signup error:", error);
        alert("Something went wrong. Please try again.");
    }
};

    return(
        <Fragment>
            <div className="sign-up">
                <div className="main">

                    <h1 id="sign">Create Account</h1>
                    <div className="sign-inputs">
                        <label htmlFor="name">Full Name <i className="bi bi-person"></i></label> 
                        <input type="text" name="name" id="name" placeholder="Enter your name" value={name}
                        onChange={(e) => setName(e.target.value)} />

                        <label htmlFor="email">Email address <i className="bi bi-envelope-at"></i></label> 
                        <input type="email" name="email" id="email" placeholder="Enter your email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="password">Password <i className="bi bi-unlock2"></i></label>
                        <input type="password" name="pass" id="password" placeholder="Enter your password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                        <label htmlFor="confirm-password">Confirm Password <i className="bi bi-unlock2"></i></label>
                        <input type="password" name="confirmPass" id="confirm-password" placeholder="Enter your password" value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} /> 
                    </div>

                    <div className="agree">
                        By clicking “Create Account”, you agree to our <a href="#">Terms</a> & <a href="#">Privacy Policy</a>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button className="CA-btn" onClick={handleSignup}>Create Account</button>

                    <div className="or">
                        <hr />
                        <p>OR</p>
                        <hr />
                    </div>

                    <button type="button" onClick={() => navigate(`/LogIn`)} className="log-btn">SIGN IN</button>

                </div>

            </div>
        </Fragment>
    )
}

export default SignUp;