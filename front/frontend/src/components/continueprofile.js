import "../styles/register.css";
import React, { useEffect, useState } from "react";

const token = sessionStorage.getItem('token');

export default function Continueprofile() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    organization: "",
    description: "",
    skills: "",
    github_url: "",
    linkedin_url: "",
    twitter_url: "",
    USN: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validatePhone = (phone) => /^\d{10}$/.test(phone) ? "" : "Please enter a valid 10-digit phone number";

  const validateUSN = (USN) => /^[1-4][A-Za-z]{2}[0-9]{2}[A-Za-z]{2}[0-9]{3}$/.test(USN) ? "" : "Please enter a valid USN in the format 4sf21is052";
  const validateGithub = (github_url) => /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/.test(github_url) ? "" : "Please enter a valid GitHub URL";

  const validateLinkedin = (linkedin_url) => /^(https?:\/\/)?(www\.)?(linkedin\.com\/in|linkedin\.com\/pub)\/[A-Za-z0-9_-]+\/?$/.test(linkedin_url) ? "" : "Please enter a valid LinkedIn URL";

  const validateTwitter = (twitter_url) => /^(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?$/.test(twitter_url) ? "" : "Please enter a valid Twitter URL";

  const validate = () => {
    const newErrors = {
      firstName: values.firstName.trim() ? "" : "Please enter a first name",
      lastName: values.lastName.trim() ? "" : "Please enter a last name",
      phone: values.phone.trim() ? validatePhone(values.phone) : "Please enter a phone number",
      organization: values.organization.trim() ? "" : "Please enter your organization",
      description: values.description.trim() ? "" : "Please enter a description",
      skills: values.skills.trim() ? "" : "Please enter your skills",
      github_url: values.github_url.trim() ? validateGithub(values.github_url) : "Please enter your GitHub profile URL",
      linkedin_url: values.linkedin_url.trim() ? validateLinkedin(values.linkedin_url) : "Please enter your LinkedIn profile URL",
      twitter_url: values.twitter_url.trim() ? validateTwitter(values.twitter_url) : "Please enter your Twitter profile URL",
      USN: values.USN.trim() ? validateUSN(values.USN) : "Please enter a USN",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validate()) {
      setIsSubmitting(true);
      try {
        const response = await fetch("http://localhost:5000/api/auth/profilesignup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Profile updated successfully:", data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        {submitted && Object.values(errors).every((error) => error === "") && (
          <div className="success-message">
            <h3>Welcome {values.firstName} {values.lastName}</h3>
            <div>Your profile is now complete!</div>
          </div>
        )}

        <label>First Name</label>
        <input
          className="form-field"
          type="text"
          placeholder="First Name"
          name="firstName"
          value={values.firstName}
          onChange={handleInputChange}
        />
        {submitted && errors.firstName && <span className="text-danger">{errors.firstName}</span>}

        <label>Last Name</label>
        <input
          className="form-field"
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={handleInputChange}
        />
        {submitted && errors.lastName && <span className="text-danger">{errors.lastName}</span>}

        <label>Phone</label>
        <input
          className="form-field"
          type="text"
          placeholder="Phone"
          name="phone"
          value={values.phone}
          onChange={handleInputChange}
        />
        {submitted && errors.phone && <span className="text-danger">{errors.phone}</span>}

        <label>USN</label>
        <input
          className="form-field"
          type="text"
          placeholder="USN"
          name="USN"
          value={values.USN}
          onChange={handleInputChange}
        />
        {submitted && errors.USN && <span className="text-danger">{errors.USN}</span>}

        <label>Organization</label>
        <input
          className="form-field"
          type="text"
          placeholder="Organization"
          name="organization"
          value={values.organization}
          onChange={handleInputChange}
        />
        {submitted && errors.organization && <span className="text-danger">{errors.organization}</span>}

        <label>Description</label>
        <input
          className="form-field"
          type="text"
          placeholder="Description"
          name="description"
          value={values.description}
          onChange={handleInputChange}
        />
        {submitted && errors.description && <span className="text-danger">{errors.description}</span>}

        <label>Skills</label>
        <input
          className="form-field"
          type="text"
          placeholder="Skills"
          name="skills"
          value={values.skills}
          onChange={handleInputChange}
        />
        {submitted && errors.skills && <span className="text-danger">{errors.skills}</span>}

        <label>GitHub URL</label>
        <input
          className="form-field"
          type="text"
          placeholder="GitHub URL"
          name="github_url"
          value={values.github_url}
          onChange={handleInputChange}
        />
        {submitted && errors.github_url && <span className="text-danger">{errors.github_url}</span>}

        <label>LinkedIn URL</label>
        <input
          className="form-field"
          type="text"
          placeholder="LinkedIn URL"
          name="linkedin_url"
          value={values.linkedin_url}
          onChange={handleInputChange}
        />
        {submitted && errors.linkedin_url && <span className="text-danger">{errors.linkedin_url}</span>}

        <label>Twitter URL</label>
        <input
          className="form-field"
          type="text"
          placeholder="Twitter URL"
          name="twitter_url"
          value={values.twitter_url}
          onChange={handleInputChange}
        />
        {submitted && errors.twitter_url && <span className="text-danger">{errors.twitter_url}</span>}

        <button className="form-field" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
}
