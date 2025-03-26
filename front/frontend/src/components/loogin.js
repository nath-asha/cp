import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Logino = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
    const { login, error } = useAuth(); // Get error from provider
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
            await login(values.email, values.password); // Call login with email and password
            if (!error) {
                setValid(true);
                setSubmitted(true);
                navigate(redirectPath, { replace: true });
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    {submitted && valid && (
                        <div className="success-message">
                            <h3>Welcome!</h3>
                            <div>You are logged in!</div>
                            <button name="logout" onClick={handleInputChange}>Logout</button>
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
                </form>
            </div>
        </div>
    );
};

export default Logino;

// import React, { useState } from "react";
// import { useAuth } from "../provider/AuthProvider";
// import { useNavigate, useLocation } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Logino = () => {
//     const [values, setValues] = useState({
//         email: "",
//         password: "",
//     });
//     const [submitted, setSubmitted] = useState(false);
//     const [valid, setValid] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");
//     const { login } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const redirectPath = location.state?.path || "/profile";

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setValues((values) => ({
//             ...values,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrorMessage("");
//         try {
//             const response = await fetch('http://localhost:5000/api/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(values),
//             });

//             const data = await response.json();

//             if (response.ok && data.token) {
//                 login(data.token, data.user);
//                 setValid(true);
//                 setSubmitted(true);
//                 navigate(redirectPath, { replace: true });
//             } else {
//                 setErrorMessage(data.message || "Login failed. Please check your credentials.");
//                 setValid(false);
//                 setSubmitted(true);
//             }
//         } catch (error) {
//             setErrorMessage("An error occurred during login.");
//             setValid(false);
//             setSubmitted(true);
//             console.error("Login error:", error);
//         }
//     };

//     return (
//         <div className="container">
//             <div className="form-container">
//                 <form className="register-form" onSubmit={handleSubmit}>
//                     {submitted && valid && (
//                         <div className="success-message">
//                             <h3>Welcome!</h3>
//                             <div>You are logged in!</div>
//                             <button name="logout" onClick={handleInputChange}>Logout</button>
//                         </div>
//                     )}

//                     {!valid && (
//                         <>
//                             <input
//                                 className="form-field"
//                                 type="email"
//                                 placeholder="Email"
//                                 name="email"
//                                 value={values.email}
//                                 onChange={handleInputChange}
//                             />
//                             {submitted && !values.email && (
//                                 <span id="email-error">Please enter an email address</span>
//                             )}
//                             <input
//                                 className="form-field"
//                                 type="password"
//                                 placeholder="Password"
//                                 name="password"
//                                 value={values.password}
//                                 onChange={handleInputChange}
//                             />
//                             {submitted && errorMessage && !valid && (
//                                 <div className="error-message">
//                                     {errorMessage}
//                                 </div>
//                             )}
//                             <button className="form-field" type="submit">
//                                 Login
//                             </button>
//                         </>
//                     )}
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Logino;