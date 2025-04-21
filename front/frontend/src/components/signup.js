import React, { useState } from 'react';

const SignupForm = () => {
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
        }
        else if(!formData.email === 'example@gmail.com'){
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
        <div style={styles.container}>
            <h2 style={styles.title}>Sign Up</h2>
            {submitted && <p style={styles.successMessage}>Signup successful!</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="username" style={styles.label}>Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    {errors.username && <p style={styles.error}>{errors.username}</p>}
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    {errors.email && <p style={styles.error}>{errors.email}</p>}
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="password" style={styles.label}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    {errors.password && <p style={styles.error}>{errors.password}</p>}
                </div>
                <button type="submit" style={styles.submitButton}>Sign Up</button>
                <div style={styles.divider}>
                    <p>Or sign up with:</p>
                </div>
                <button
                    type="button"
                    onClick={() => {
                        console.log('Sign up with Google clicked');
                    }}
                    style={styles.googleButton}
                >
                    Sign Up with Google
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        padding: '110px',
        margin: '80px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    submitButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    googleButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4285F4',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    divider: {
        textAlign: 'center',
        margin: '15px 0',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        marginTop: '5px',
    },
    successMessage: {
        color: 'green',
        textAlign: 'center',
        marginBottom: '15px',
    },
};

export default SignupForm;