import React, { useEffect, useState } from "react";
import "../styles/register.css";
import { Button } from "react-bootstrap";
import {ArrowLeftIcon} from 'lucide-react';
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import {useGoogleLogin, googleLogout} from '@react-oauth/google';

const Newsignup = () => {
  const [user, setUser] = useState([]);
const [profile, setProfile] = useState([]);
    // console.log(`${user.access_token}`);

    const login = useGoogleLogin({
      onSuccess: (codeResponse) => {
        setUser(codeResponse)
        console.log(codeResponse)
      },
      onError: (error) => console.log("Login Failed:", error)
    });

  const responseMessage = (response) => {
    console.log(response);
};
const errorMessage = (error) => {
    console.log(error);
};
useEffect(
  () => {
      if (user) {
          axios
              .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                  headers: {
                      Authorization: `Bearer ${user.access_token}`,
                      Accept: 'application/json'
                  }
              })
              .then((res) => {
                  setProfile(res.data);
              })
              .catch((err) => console.log(err));
      }
  },
  [ user ]);

//logout
const logOut = () => {
  googleLogout();
  setProfile(null);
};

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // To disable button during submission

  useEffect(() => {
    validate(); 
  }, [values]);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) ? "" : "Please enter a valid email";
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
    return passwordPattern.test(password)
      ? ""
      : "Password must be at least 8 characters and include one uppercase letter, one lowercase letter, one number, and one special character.";
  };

  const validate = () => {
    let newErrors = {};
    newErrors.name = values.name.trim() ? "" : "Please enter a name";
    newErrors.email = values.email.trim() ? validateEmail(values.email) : "Please enter an email";
    newErrors.password = values.password ? validatePassword(values.password) : "Please enter a password";
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === ""); //no errors then true
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validate()) {
      setIsSubmitting(true);
      try {
        const token = sessionStorage.getItem("token"); 
        const response = await fetch("http://localhost:5000/api/auth/signedup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }), 
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          console.log("User signed up successfully");
        } else {
          const errorData = await response.json();
          console.error("Failed to register user:", errorData);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container text-black">
      <form className="register-form text-black" onSubmit={handleSubmit}>
        {submitted && Object.values(errors).every((error) => error === "") && (
          <div>
            <h5>Sign up successful</h5>
          </div>
        )}

        <a href='/signinu'><ArrowLeftIcon/>Back</a>
        <input
          className="form-field"
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleInputChange}
        />
        {submitted && errors.name && <span className="error-message text-danger">{errors.name}</span>}

        <input
          className="form-field"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleInputChange}
        />
        {submitted && errors.email && <span className="error-message text-danger">{errors.email}</span>}

        <div style={{ position: "relative" }}>
          <input
            className="form-field"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleInputChange}
          />
          <input
            type="checkbox"
            id="showPassword"
            style={{ position: "absolute", left: "46%", top: "40%" }}
            checked={showPassword}
            onChange={toggleShowPassword}
          />
        </div>
        {submitted && errors.password && <span className="error-message text-danger">{errors.password}</span>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing Up..." : "Signup"}
        </Button>
        <p className="center">OR</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
        {profile ? (
          <div>
            <img src={profile.picture} alt='user image' />
            <h5>User Logged in</h5>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <button onClick={logOut}>Log Out</button>
            </div>
        ):(
          <button onClick={login}>Sign in with google</button>
        )}
        {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
        <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
        </div>
      </form>
    </div>
  );
};

export default Newsignup;