import React, { useState } from "react";
import "../styles/register.css";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

const token = sessionStorage.getItem("token");

const Newsignup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues((values) => ({
            ...values,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(values).every((value) => value)) {
            setValid(true);
            try {
                const response = await fetch("http://localhost:5000/api/auth/signedup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(values),
                });
                if (response.ok) {
                    console.log("User signed up successfully");
                } else {
                    console.error("Failed to register user");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
        setSubmitted(true);
    };

    return (
        <div className="form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                {submitted && valid && (
                    <div>
                        <h5>Sign in successful</h5>
                    </div>
                )}

                {!valid && (
                    <>
                        <input
                            className="form-field"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={values.name}
                            onChange={handleInputChange}
                        />
                        {submitted && !values.name && (
                            <span id="name-error">Please enter a name</span>
                        )}

                        <input
                            className="form-field"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleInputChange}
                        />
                        {submitted && !values.email && (
                            <span id="email-error">Please enter an email</span>
                        )}

                        <input
                            className="form-field"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleInputChange}
                        />
                        {submitted && !values.password && (
                            <span id="password-error">Please enter a password</span>
                        )}

                        <Button type="submit">
                            Signup
                        </Button>
                        <p className="center">OR</p>
                        <Button>Signup with Google</Button>
                    </>
                )}
            </form>
        </div>
    );
};

export default Newsignup;
