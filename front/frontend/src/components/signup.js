import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignupForm1 = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        } else if (formData.email === 'example@gmail.com') {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            setSubmitted(true);
            console.log('Form submitted:', formData);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Sign Up</h2>
                {submitted && <div className="alert alert-success">Signup successful!</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                        {errors.username && <div className="text-danger">{errors.username}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                    <div className="text-center my-3">
                        <p>Or sign up with:</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            console.log('Sign up with Google clicked');
                        }}
                        className="btn btn-danger w-100"
                    >
                        Sign Up with Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm1;
