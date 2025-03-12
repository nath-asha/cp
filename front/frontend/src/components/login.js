import "../styles/register.css";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setValid(true);
        setSubmitted(true);
      } else {
        setErrorMessage(data.message || "Login failed. Please check your credentials.");
        setValid(false);
        setSubmitted(true);
      }
    } catch (error) {
      setErrorMessage("An error occurred during login.");
      setValid(false);
      setSubmitted(true);
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
            </div>
          )}

          {!valid && (
            <input
              className="form-field"
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
            />
          )}

          {submitted && !values.email && (
            <span id="email-error">Please enter an email address</span>
          )}

          {!valid && (
            <input
              className="form-field"
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
            />
          )}

          {submitted && errorMessage && !valid && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}

          {!valid && (
            <button className="form-field" type="submit">
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// function Login() {
//   return (
//     <Form>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control type="email" placeholder="Enter email" />
//         <Form.Text className="text-muted">
//           We'll never share your email with anyone else.
//         </Form.Text>
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control type="password" placeholder="Password" />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicCheckbox">
//         <Form.Check type="checkbox" label="Check me out" />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//     </Form>
//   );
// }

// export default Login;