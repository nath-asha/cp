import "../styles/register.css";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PasswordChecklist from 'react-password-checklist';

export default function App() {
  const [passwordAgain, setPasswordAgain] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(values).every(value => value)) {
      setValid(true);
    }
    setSubmitted(true);
  };

  return (
        <div className="form-container bg-primary"> 
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
              type="password"
              placeholder="password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
            />
            {submitted && !values.password && (
              <span id="password-error">Please enter password</span>
            )}
<input type="password" onChange={e => setPasswordAgain(e.target.value)}/>
<PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={8}
				value={values.password}
				valueAgain={passwordAgain}
				messages={{
					minLength: "enter 8 characters.",
					specialChar: "enter special characters.",
					number: "number.",
					capital: "enter capital.",
					match: "match.",
				}}
			/>


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
            {submitted && !values.lastName && (
              <span id="last-name-error">Please enter a last name</span>
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
              placeholder="Organization"
              name="organization"
              value={values.organization}
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


            <button className="form-field" type="submit">
              Register
            </button>
          </>
        )}
      </form>
    </div>
  );
}
