import "../styles/register.css";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
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
    USN: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(values).every(value => value)) {
      setValid(true);
      try {
        const response = await fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
        if (response.ok) {
          console.log('User registered successfully');
        } else {
          console.error('Failed to register user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    setSubmitted(true);
  };

  return (
    <div className="container-md">
      <div className="form-container"> 
        <form className="register-form" onSubmit={handleSubmit}>
          {submitted && valid && (
            <div className="success-message">
              <h3>Welcome {values.firstName} {values.lastName}</h3>
              <div>Your registration was successful!</div>
            </div>
          )}
          {!valid && (
            <>
              <input
                className="form-field"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleInputChange}
              />
              {submitted && !values.firstName && (
                <span id="first-name-error">Please enter a first name</span>
              )}

              <input
                className="form-field"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleInputChange}
              />
              {submitted && !values.lastName && (
                <span id="last-name-error">Please enter a last name</span>
              )}

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
                type="text"
                placeholder="Batch"
              />

              <input
                className="form-field"
                type="text"
                placeholder="Phone"
                name="phone"
                value={values.phone}
                onChange={handleInputChange}
                pattern="\d{10}"
                title="Please enter a valid 10 digit phone number"
              />
              {submitted && !values.phone && (
                <span id="phone-error">Please enter a phone number</span>
              )}

              <input
                className="form-field"
                type="text"
                placeholder="USN"
                name="USN"
                value={values.USN}
                onChange={handleInputChange}
              />
              {submitted && !values.USN && (
                <span id="usn-error">Please enter a USN</span>
              )}

              <input
                className="form-field"
                type="text"
                placeholder="Role"
                name="role"
                value={values.role}
                onChange={handleInputChange}
              />

              <input
                className="form-field"
                type="text"
                placeholder="Team"
                name="team"
                value={values.team}
                onChange={handleInputChange}
              />

              <input
                className="form-field"
                type="text"
                placeholder="Address"
                name="address"
                value={values.address}
                onChange={handleInputChange}
              />

              <input
                className="form-field"
                type="text"
                placeholder="Organization"
                name="organization"
                value={values.organization}
                onChange={handleInputChange}
              />

              <input
                className="form-field"
                type="text"
                placeholder="Description"
                name="description"
                value={values.description}
                onChange={handleInputChange}
              />

              <input
                className="form-field"
                type="text"
                placeholder="Skills"
                name="skills"
                value={values.skills}
                onChange={handleInputChange}
              />

              <input
                className="form-field"
                type="text"
                placeholder="GitHub URL"
                name="github_url"
                value={values.github_url}
                onChange={handleInputChange}
              />

              <input
                className="form-field"
                type="text"
                placeholder="LinkedIn URL"
                name="linkedin_url"
                value={values.linkedin_url}
                onChange={handleInputChange}
              />

              <input
                className="form-field"
                type="text"
                placeholder="Twitter URL"
                name="twitter_url"
                value={values.twitter_url}
                onChange={handleInputChange}
              />

              <button className="form-field" type="submit">
                Register
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
