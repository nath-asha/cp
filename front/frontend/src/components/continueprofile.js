import "../styles/register.css";
import React, { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';

const token = sessionStorage.getItem('token');

export default function Continueprofile() {
  //update and validate form so that incorrect data is not submitted
  //show error if dummy data is entered
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    role: "",
    team: "",
    organization: "",
    description: "",
    skills: "",
    github_url: "",
    linkedin_url: "",
    twitter_url: "",
    USN: "",
  });
  
  const[errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    role: "",
    team: "",
    organization: "",
    description: "",
    skills: "",
    github_url: "",
    linkedin_url: "",
    twitter_url: "",
    USN: "",
  })
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value
    }));
  };

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    validate();
  }, [values]);

  const validatePhone = (phone) => {
    const phonePattern = /^\d{10}$/; // 10 digit number
    return phonePattern.test(phone) ? "" : "Please enter a valid 10 digit phone number";
  }  

  const validateUSN = (USN) => {
    const usnPattern = /^[1-9][0-9]{1,2}[A-Z]{2}[0-9]{2}$/;
    return usnPattern.test(USN) ? "" : "Please enter a valid USN";
  }

  const validateGithub = (github_url) => {
    const githubPattern = /^(https?:\/\/)?(www\.)?github\.com\/+\/?$/;
    return githubPattern.test(github_url) ? "" : "Please enter a valid GitHub URL";
  }

  const validateLinkedin = (linkedin_url) => {
    const linkedPattern = /^(https?:\/\/)?(www\.)?(linkedin\.com\/in|linkedin\.com\/pub)\/[A-Za-z0-9_-]+\/?$/;
    return linkedPattern.test(linkedin_url) ? "" : "Please enter a valid linkedin URL";
  }

  const validatetwitter = (twitter_url) => {
    const twitPattern = /^(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9]+\/?$/;
    return twitPattern.test(twitter_url) ? "" : "Please enter a valid linkedin URL";
  }

  const validate = () => {
    let newErrors = {};
    newErrors.firstName = values.firstName.trim() ? "" : "Please enter a first name";
    newErrors.lastName = values.lastName.trim() ? "" : "Please enter a last name";
    newErrors.phone = values.phone.trim() ? validatePhone(values.phone) : "Please enter a phone number";
    newErrors.role = values.role.trim() ? "" : "Please select your role";
    newErrors.team = values.team.trim() ? "" : "Please enter your team";
    newErrors.organization = values.organization.trim() ? "" : "Please enter organisation";
    newErrors.description = values.description.trim() ? "" : "Please enter a description";
    newErrors.skills = values.skills.trim() ? "" : "Please enter skills";
    newErrors.github_url = values.github_url.trim() ? validateGithub(values.github_url) : "Please enter github profile";
    newErrors.linkedin_url = values.linkedin_url.trim() ? validateLinkedin(values.linkedin_url) : "Please enter linkedin_url";
    newErrors.twitter_url = values.twitter_url.trim() ? validatetwitter(values.twitter_url) : "Please enter X url";
    newErrors.USN = values.USN.trim() ? validateUSN(values.USN) : "Please enter a USN";
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === ""); //no errors then true
  }
  const [valid, setValid] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false); // To disable button during submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    
    if(validate()) {
      setIsSubmitting(true);
      try{
        const token = sessionStorage.getItem('token');
        const response = await fetch("http://localhost:5000/api/auth/profilesignup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}`}),
          },
          body: JSON.stringify(values),
        });

        if(response.ok) {
          const data = await response.json();
          console.log("Profile updated successfully:", data);
          setValid(true);
          setSubmitted(true);
        }
      }catch (error){
        console.error("Error:",error);
      }finally{
        setIsSubmitting(false);
      }
    }
  };


  return (
    <div className="form-container"> 
      
        <form className="register-form" onSubmit={handleSubmit}>
          {submitted && valid && Response.ok(
            <div className="success-message">
              <h3>Welcome {values.firstName} {values.lastName}</h3>
              <div>Your profile is now complete!</div>
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

              
              {/* <input 
                className="form-field"
                type="text"
                placeholder="Batch"
              /> */}

              
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
              {submitted && !values.phone &&  (
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
              {submitted && !values.role && (
                <span id="role-error">Please select your role</span>
              )}

              <input
                className="form-field"
                type="text"
                placeholder="Team"
                name="team"
                value={values.team}
                onChange={handleInputChange}
              />
              {submitted && !values.team && (
                <span id="team-error">Please enter your team</span>
              )}

              <input
                className="form-field"
                type="text"
                placeholder="Organization"
                name="organization"
                value={values.organization}
                onChange={handleInputChange}
              />
              {submitted && !values.organization && (
                <span id="organisation-error">Please enter organisation</span>
              )}

              <input
                className="form-field"
                type="text"
                placeholder="Description"
                name="description"
                value={values.description}
                onChange={handleInputChange}
              />
              {submitted && !values.description && (
                <span id="description-error">Please enter a description</span>
              )}

              <input
                className="form-field"
                type="text"
                placeholder="Skills"
                name="skills"
                value={values.skills}
                onChange={handleInputChange}
              />
              {submitted && !values.skills && (
                <span id="skills-error">Please enter skills</span>
              )}

              <input
                className="form-field"
                type="text"
                placeholder="GitHub URL"
                name="github_url"
                value={values.github_url}
                onChange={handleInputChange}
              />
              {submitted && !values.github_url && (
                <span id="github_url-error">Please enter github profile</span>
              )}

              <input
                className="form-field"
                type="text"
                placeholder="LinkedIn URL"
                name="linkedin_url"
                value={values.linkedin_url}
                onChange={handleInputChange}
              />
              {submitted && !values.linkedin_url && (
                <span id="linkedin_url-error">Please enter linkedin_url</span>
              )}

              <input
                className="form-field"
                type="text"
                placeholder="Twitter URL"
                name="twitter_url"
                value={values.twitter_url}
                onChange={handleInputChange}
              />
              {submitted && !values.twitter_url && (
                <span id="twitter-error">Please enter X url</span>
              )}

              <button className="form-field" type="submit" onClick={handleSubmit}>
                Register
              </button>
            </>
          )}
        </form>
      </div>
  );
}
