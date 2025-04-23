import React, { useState,useEffect } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserRole, clearToken } from "./auth";

const Signinuser = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        role: "user",
    });

    const [role, setRole] = useState(null);

    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
    const { signin, error } = useAuth(); // Get error from provider
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || "/profile";

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues((values) => ({
            ...values,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signin(values.email, values.password); // Call login with email and password
            if (!error) {
                setValid(true);
                setSubmitted(true);
                navigate(redirectPath, { replace: true });
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    useEffect(() => {
        // Get role on initial load
        const userRole = getUserRole();
        setRole(userRole);
        console.log("User Role on Load:", userRole);
    }, []);

    const handleLogout = () => {
        clearToken();
        setRole(null);
    };


    return (
        <div className="container">
            <div className="form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    {submitted && valid && (
                        <div className="success-message">
                            {/* <h3>Welcome!</h3>
                            <div>You are logged in!</div>
                            <button name="logout" onClick={handleInputChange}>Logout</button> */}
                             <h3>Welcome to HackaFest</h3>
                             <div>You are logged in!</div>
                            {role && <p>Your role is: {role}</p>}
                            {role === "user" && <button>Choose</button>}
                            <button onClick={() => { handleLogout(); }}>Logout</button>
                        
                        </div>
                    )}

                    {!valid && (
                        <>
                            {error && <div className="error-message">{error}</div>}
                            <input
                                className="form-field"
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                            />
                            {submitted && !values.email && (
                                <span id="email-error">Please enter an email address</span>
                            )}
                            <input
                                className="form-field"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={values.password}
                                onChange={handleInputChange}
                            />
                            <button className="form-field" type="submit">
                                Login
                            </button>
                        </>
                    )}
                    <p>Don't have an account <a href="/newsignup">Signup</a></p>

                </form>
            </div>
        </div>
    );
};

export default Signinuser;