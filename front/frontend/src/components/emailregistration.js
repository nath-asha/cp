import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RegistrationForm() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    team: "",
    address: "",
    organization: "",
    description: "",
    skills: "",
    github_url: "",
    linkedin_url: "",
    twitter_url: "",
    USN: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (Object.values(values).every((value) => value)) {
      setValid(true);
      try {
        const response = await axios.post("/api/auth/register", values); // Backend API endpoint
        console.log("Registration successful:", response.data);
        navigate("/verification"); // Navigate to the verification page
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again.");
      }
    } else {
      setValid(false);
    }

    setSubmitted(true);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        {submitted && valid && (
          <div className="alert alert-success text-center">
            <h3>Welcome {values.firstName} {values.lastName}</h3>
            <p>Your registration was successful!</p>
          </div>
        )}

        {!valid && submitted && (
          <div className="alert alert-danger text-center">
            Please fill in all required fields.
          </div>
        )}

        <div className="form-group">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control mb-3"
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Phone"
            name="phone"
            value={values.phone}
            onChange={handleInputChange}
            pattern="\d{10}"
            title="Please enter a valid 10-digit phone number"
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="USN"
            name="USN"
            value={values.USN}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Role"
            name="role"
            value={values.role}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Team"
            name="team"
            value={values.team}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Address"
            name="address"
            value={values.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Organization"
            name="organization"
            value={values.organization}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <textarea
            className="form-control mb-3"
            placeholder="Description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            rows={3}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Skills"
            name="skills"
            value={values.skills}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="GitHub URL"
            name="github_url"
            value={values.github_url}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="LinkedIn URL"
            name="linkedin_url"
            value={values.linkedin_url}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Twitter URL"
            name="twitter_url"
            value={values.twitter_url}
            onChange={handleInputChange}
            required
          />
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Registration() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/register', { email, password }); // backend api endpoint
//       console.log(response.data);
//       navigate('/verification');
//     } catch (error) {
//       console.error('Registration failed:', error);
//       alert('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2 className='text-black'>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Registration;