// // import React, { useEffect, useState } from "react";
// // import "../styles/register.css";
// // import { Button } from "react-bootstrap";
// // import { ArrowLeftIcon } from "lucide-react";
// // import axios from "axios";
// // import { useGoogleLogin, googleLogout } from "@react-oauth/google";

// // const Newsignup = () => {
// //   const [user, setUser] = useState(null);
// //   const [profile, setProfile] = useState(null);

// //   const login = useGoogleLogin({
// //     onSuccess: async (codeResponse) => {
// //       try {
// //         // Send the Google token to your backend for verification and role assignment
// //         const response = await axios.post("http://localhost:5000/api/auth/google-signin", {
// //           token: codeResponse.access_token,
// //         });

// //         if (response.data) {
// //           setUser(response.data.user); // Backend should return user details
// //           setProfile(response.data.profile); // Backend should return profile info
// //           console.log("Google Sign-In successful:", response.data);
// //         }
// //       } catch (error) {
// //         console.error("Google Sign-In failed:", error);
// //       }
// //     },
// //     onError: (error) => console.log("Login Failed:", error),
// //   });

// //   // Logout function
// //   const logOut = () => {
// //     googleLogout();
// //     setUser(null);
// //     setProfile(null);
// //   };

// //   const [values, setValues] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //   });

// //   const [errors, setErrors] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //   });
// //   const [submitted, setSubmitted] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   useEffect(() => {
// //     validate();
// //   }, [values]);

// //   const validateEmail = (email) => {
// //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     return emailPattern.test(email) ? "" : "Please enter a valid email";
// //   };

// //   const validatePassword = (password) => {
// //     const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
// //     return passwordPattern.test(password)
// //       ? ""
// //       : "Password must be at least 8 characters and include one uppercase letter, one lowercase letter, one number, and one special character.";
// //   };

// //   const validate = () => {
// //     let newErrors = {};
// //     newErrors.name = values.name.trim() ? "" : "Please enter a name";
// //     newErrors.email = values.email.trim() ? validateEmail(values.email) : "Please enter an email";
// //     newErrors.password = values.password ? validatePassword(values.password) : "Please enter a password";
// //     setErrors(newErrors);
// //     return Object.values(newErrors).every((error) => error === "");
// //   };

// //   const handleInputChange = (event) => {
// //     const { name, value } = event.target;
// //     setValues((prevValues) => ({
// //       ...prevValues,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setSubmitted(true);

// //     if (validate()) {
// //       setIsSubmitting(true);
// //       try {
// //         const token = sessionStorage.getItem("token");
// //         const response = await fetch("http://localhost:5000/api/auth/signedup", {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             ...(token && { Authorization: `Bearer ${token}` }),
// //           },
// //           body: JSON.stringify(values),
// //         });

// //         if (response.ok) {
// //           console.log("User signed up successfully");
// //         } else {
// //           const errorData = await response.json();
// //           console.error("Failed to register user:", errorData);
// //         }
// //       } catch (error) {
// //         console.error("Error:", error);
// //       } finally {
// //         setIsSubmitting(false);
// //       }
// //     }
// //   };

// //   const toggleShowPassword = () => {
// //     setShowPassword(!showPassword);
// //   };

// //   return (
// //     <div className="form-container text-black">
// //       <form className="register-form text-black" onSubmit={handleSubmit}>
// //         {submitted && Object.values(errors).every((error) => error === "") && (
// //           <div>
// //             <h5>Sign up successful</h5>
// //           </div>
// //         )}

// //         <a href="/signinu">
// //           <ArrowLeftIcon />
// //           Back
// //         </a>
// //         <input
// //           className="form-field"
// //           type="text"
// //           name="name"
// //           placeholder="Name"
// //           value={values.name}
// //           onChange={handleInputChange}
// //         />
// //         {submitted && errors.name && <span className="error-message text-danger">{errors.name}</span>}

// //         <input
// //           className="form-field"
// //           type="email"
// //           name="email"
// //           placeholder="Email"
// //           value={values.email}
// //           onChange={handleInputChange}
// //         />
// //         {submitted && errors.email && <span className="error-message text-danger">{errors.email}</span>}

// //         <div style={{ position: "relative" }}>
// //           <input
// //             className="form-field"
// //             type={showPassword ? "text" : "password"}
// //             name="password"
// //             placeholder="Password"
// //             value={values.password}
// //             onChange={handleInputChange}
// //           />
// //           <input
// //             type="checkbox"
// //             id="showPassword"
// //             style={{ position: "absolute", left: "46%", top: "40%" }}
// //             checked={showPassword}
// //             onChange={toggleShowPassword}
// //           />
// //         </div>
// //         {submitted && errors.password && <span className="error-message text-danger">{errors.password}</span>}

// //         <Button type="submit" disabled={isSubmitting}>
// //           {isSubmitting ? "Signing Up..." : "Signup"}
// //         </Button>
// //         <p className="center">OR</p>
// //         <div style={{ display: "flex", justifyContent: "center" }}>
// //           {profile ? (
// //             <div>
// //               <img src={profile.picture} alt="user image" />
// //               <h5>User Logged in</h5>
// //               <p>Name: {profile.name}</p>
// //               <p>Email: {profile.email}</p>
// //               <button onClick={logOut}>Log Out</button>
// //             </div>
// //           ) : (
// //             <button onClick={login}>Sign in with Google</button>
// //           )}
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Newsignup;


// //old code but works in signing but it is not user  DOdo@gmail0
// import React, { useEffect, useState } from "react";
// import "../styles/register.css";
// import { Button,Card } from "react-bootstrap";
// import {ArrowLeftIcon} from 'lucide-react';
// import axios from "axios";
// import { GoogleLogin } from '@react-oauth/google';
// import {useGoogleLogin, googleLogout} from '@react-oauth/google';

// const Newsignup = () => {
//   const [user, setUser] = useState([]);
// const [profile, setProfile] = useState([]);
//     // console.log(`${user.access_token}`);

//     const initialUserProperties = {
//       access_token: '',
//       expires_in: 0,
//       id_token: '',
//       scope: '',
//       token_type: '',
//   };

//   const emailUserProfile = {
//       email: '',
//       family_name: '',
//       given_name: '',
//       hd: '',
//       id: '',
//       locale: '',
//       name: '',
//       picture: '',
//       verified_email: false,
//   };

//   const [emailUser, setEmailUser] = useState(initialUserProperties);
//       const [emailProfile, setEmailProfile] = useState(emailUserProfile);
  

//     const login = useGoogleLogin({
//       onSuccess: (codeResponse) => {
//         setUser(codeResponse)
//         console.log(codeResponse)
//       },
//       onError: (error) => console.log("Signup Failed:", error)
//     });

// //   const responseMessage = (response) => {
// //     console.log(response);
// // };
// // const errorMessage = (error) => {
// //     console.log(error);
// // };

// useEffect(() => {
//   if (!!emailUser.access_token) {
//       axios
//           .get(
//               `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${emailUser.access_token}`,
//               {
//                   headers: {
//                       Authorization: `Bearer ${emailUser.access_token}`,
//                       Accept: 'application/json',
//                   },
//               }
//           )
//           .then((res) => {
//               setEmailProfile(res.data);

//               // Save user data to MongoDB
//               const userData = {
//                   name: res.data.name,
//                   email: res.data.email,
//                   picture: res.data.picture,
//                   role: "Mentor",
//               };

//               axios
//                   .post("http://localhost:5000/api/auth/googlesignup", userData)
//                   .then((response) => {
//                       console.log("User data saved to MongoDB:", response.data);
//                   })
//                   .catch((err) => {
//                       console.error("Error saving user data to MongoDB:", err);
//                   });
//           })
//           .catch((err) => console.log('Error fetching user profile:', err));
//   }
// }, [emailUser]);

// // useEffect(
// //   () => {
// //       if (user) {
// //           axios
// //               .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
// //                   headers: {
// //                       Authorization: `Bearer ${user.access_token}`,
// //                       Accept: 'application/json'
// //                   }
// //               })
// //               .then((res) => {
// //                   setProfile(res.data);
// //               })
// //               .catch((err) => console.log(err));
// //       }
// //   },
// //   [ user ]);

// //logout
// const logOut = () => {
//   googleLogout();
//   setEmailProfile(null);
// };

//   const [values, setValues] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "user",
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     email: "",
//     password: "",
//     user:"",
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false); // To disable button during submission

//   useEffect(() => {
//     validate(); 
//   }, [values]);

//   const validateEmail = (email) => {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email) ? "" : "Please enter a valid email";
//   };

//   const validatePassword = (password) => {
//     const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
//     return passwordPattern.test(password)
//       ? ""
//       : "Password must be at least 8 characters and include one uppercase letter, one lowercase letter, one number, and one special character.";
//   };

//   const validate = () => {
//     let newErrors = {};
//     newErrors.name = values.name.trim() ? "" : "Please enter a name";
//     newErrors.email = values.email.trim() ? validateEmail(values.email) : "Please enter an email";
//     newErrors.password = values.password ? validatePassword(values.password) : "Please enter a password";
//     setErrors(newErrors);
//     return Object.values(newErrors).every((error) => error === ""); //no errors then true
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitted(true);

//     if (validate()) {
//       setIsSubmitting(true);
//       try {
//         const token = sessionStorage.getItem("token"); 
//         const response = await fetch("http://localhost:5000/api/auth/signedup", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` }), 
//           },
//           body: JSON.stringify(values),
//         });

//         if (response.ok) {
//           console.log("User signed up successfully");
//         } else {
//           const errorData = await response.json();
//           console.error("Failed to register user:", errorData);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="form-container text-black">
//       <form className="register-form text-black" onSubmit={handleSubmit}>
//         {submitted && Object.values(errors).every((error) => error === "") && (
//           <div>
//             <h5>Sign up successful</h5>
//           </div>
//         )}

//         <a href='/signinu'><ArrowLeftIcon/>Back</a>
//         <input
//           className="form-field"
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={values.name}
//           onChange={handleInputChange}
//         />
//         {submitted && errors.name && <span className="error-message text-danger">{errors.name}</span>}

//         <input
//           className="form-field"
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={values.email}
//           onChange={handleInputChange}
//         />
//         {submitted && errors.email && <span className="error-message text-danger">{errors.email}</span>}

//         <div style={{ position: "relative" }}>
//           <input
//             className="form-field"
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             value={values.password}
//             onChange={handleInputChange}
//           />
//           <input
//             type="checkbox"
//             id="showPassword"
//             style={{ position: "absolute", left: "46%", top: "40%" }}
//             checked={showPassword}
//             onChange={toggleShowPassword}
//           />
//         </div>
//         {submitted && errors.password && <span className="error-message text-danger">{errors.password}</span>}

//         <Button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? "Signing Up..." : "Signup"}
//         </Button>
//         <p className="center">OR</p>
//         {/* <div style={{ display: "flex", justifyContent: "center" }}>
//         {profile ? (
//           <div className="card">
//             <img src={profile.picture} alt='user image' />
//             <h5>User Logged in</h5>
//             <p>Name: {profile.name}</p>
//             <p>Email: {profile.email}</p>
//             <button onClick={logOut}>Log Out</button>
//             {/* {values.name}=={profile.name}
//             {values.email}=={profile.email} 
//             </div>
//         ):(
//           <button onClick={login}>Sign in with google</button>
//         )}
//         {/* {values.cred}={user.access_token}; 
//         {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
//         {/* <GoogleLogin
//   onSuccess={credentialResponse => {
//     console.log(credentialResponse);
//   }}
//   onError={() => {
//     console.log('Login Failed');
//   }}
// /> */}

// <div className="d-flex justify-content-center align-items-center">
//             <Card>
//             {/* <div class="g-signin2" data-onsuccess="onSignIn"></div> */}
//                 {emailProfile ? (
//                     <div>
//                         <img src={emailProfile.picture} alt="user image" />
//                         <h3>the User profile.</h3>

//                         <div>
//                             <p>Name: {emailProfile.name}</p>
//                             <p>Email Address: {emailProfile.email}</p>
//                         </div>

//                         <br />
//                         <button onClick={logOut}>Log out</button>
//                     </div>
//                 ) : (
//                     <button onClick={() => login()}>Sign in with Google</button>
//                 )}
//             </Card>
//         </div>

// {/* <p className="justify-center">OR</p>
//         {/* style={{ display: "flex", justifyContent: "center" }} 
//         <div >
//         {profile ? (
//           <div>
//             {profile ? (
//                  <button onClick={login}>Sign in with google</button> 
//             ) : (         
//                <button onClick={logOut}>Log Out</button>
//             )}
//             </div>
//         ):(
//           <div>
//                     <img src={profile.picture} alt="user image" />
//                     <h3>User Logged in</h3>
//                     <p>Name: {profile.name}</p>
//                     <p>Email Address: {profile.email}</p>
//                     <br />
//                     <br />
//                     <button onClick={logOut}>Log out</button>
//                 </div>
//         )}
//          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> 
//          <GoogleLogin
//   onSuccess={credentialResponse => {
//     console.log(credentialResponse);
//   }}
//   onError={() => {
//     console.log('Login Failed');
//   }}
// /> 
//         </div> */}
//       </form>
//     </div>
//   );
// };

// export default Newsignup;

import React, { useEffect, useState } from "react";
import "../styles/register.css";
import { Button,Card,Container,Row,Col,Alert, CardBody,Form } from "react-bootstrap";
import { ArrowLeftIcon } from "lucide-react";
import axios from "axios";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";

const Newsignup = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [localError, setLocalError] = useState('');
  const [googleError, setGoogleError] = useState('');

  const initialUserProperties = {
    access_token: '',
    expires_in: 0,
    id_token: '',
    scope: '',
    token_type: '',
};

const emailUserProfile = {
    email: '',
    family_name: '',
    given_name: '',
    hd: '',
    id: '',
    locale: '',
    name: '',
    picture: '',
    verified_email: false,
};

const [emailUser, setEmailUser] = useState(initialUserProperties);
    const [emailProfile, setEmailProfile] = useState(emailUserProfile);

  // const login = useGoogleLogin({
  //   onSuccess: async (codeResponse) => {
  //     try {
  //       // Send the Google token to your backend for verification and role assignment
  //       const response = await axios.post("http://localhost:5000/api/auth/google-signin", {
  //         token: codeResponse.access_token, // You are sending the access token here
  //       });

  //       if (response.data) {
  //         setUser(response.data.user); // Backend should return user details
  //         setProfile(response.data.profile); // Backend should return profile info
  //         console.log("Google Sign-In successful:", response.data);
  //       }
  //     } catch (error) {
  //       console.error("Google Sign-In failed:", error);
  //     }
  //   },
  //   onError: (error) => console.log("Login Failed:", error),
  // });

   const login = useGoogleLogin({
          onSuccess: (codeResponse) => {
              setEmailUser(codeResponse);
              console.log(codeResponse);
          },
          onError: (error) => console.log("Login Failed:", error),
      });
  
      useEffect(() => {
          if (!!emailUser.access_token) {
              axios
                  .get(
                      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${emailUser.access_token}`,
                      {
                          headers: {
                              Authorization: `Bearer ${emailUser.access_token}`,
                              Accept: 'application/json',
                          },
                      }
                  )
                  .then((res) => {
                      setEmailProfile(res.data);
  
                      // Save user data to MongoDB
                      const userData = {
                          name: res.data.name,
                          email: res.data.email,
                          picture: res.data.picture,
                          role: "Mentor",
                      };
  
                      axios
                          .post("http://localhost:5000/api/auth/googlesignup", userData)
                          .then((response) => {
                              console.log("User data saved to MongoDB:", response.data);
                          })
                          .catch((err) => {
                              console.error("Error saving user data to MongoDB:", err);
                          });
                  })
                  .catch((err) => console.log('Error fetching user profile:', err));
          }
      }, [emailUser]);
      
  // Logout function
  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
    setEmailProfile(null);
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    return Object.values(newErrors).every((error) => error === "");
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
    <Container className="d-flex justify-content-center align-items-center" style={{minHeight:'80vh'}}>
      <Row className="w-100">
        <Col md={6} className="mx-auto">
        <Card className="shadow">
          <Card.Body>
            <h2>Sign up as User</h2>
            {localError && <Alert variant="danger">{localError}</Alert>}
        
      <Form className="mb-4 text-black" onSubmit={handleSubmit}>
        {submitted && Object.values(errors).every((error) => error === "") && (
          <div>
            <h5>Sign up successful</h5>
          </div>
        )}
        <a href="/googlesignin">
          <ArrowLeftIcon />
          Back
        </a> 
       <Form.Group className='mb-3'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          // className="form-field"
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleInputChange}
        />
        {submitted && errors.name && <span className="error-message text-danger">{errors.name}</span>}
       </Form.Group>

       <Form.Group className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          className="form-field"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleInputChange}
        />
         </Form.Group>
        {submitted && errors.email && <span className="error-message text-danger">{errors.email}</span>}

        <div style={{ position: "relative" }}>
        <Form.Group className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control
            className="form-field"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleInputChange}
          />
          <Form.Control
            type="checkbox"
            id="showPassword"
            style={{ position: "absolute", left: "46%", top: "40%" }}
            checked={showPassword}
            onChange={toggleShowPassword}
          />
          </Form.Group>


        </div>
        {submitted && errors.password && <span className="error-message text-danger">{errors.password}</span>}

        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing Up..." : "Signup"}
        </Button>
        </Form>
        {googleError && <Alert variant="danger">{googleError}</Alert>}
        <p className="center">OR</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {profile ? (
            <div>
              <img src={profile.picture} alt="user image" />
              <h5>User Logged in</h5>
              <p>Name: {profile.name}</p>
              <p>Email: {profile.email}</p>
              <button onClick={logOut}>Log Out</button>
            </div>
          ) : (
            // 
            <Card>
            {/* <div class="g-signin2" data-onsuccess="onSignIn"></div> */}
                {emailProfile ? (
                   <div className="text-center">
                   <img src={emailProfile.picture} alt="profile" width="50" className="rounded-circle mb-2" />
                   <p>{emailProfile.name}</p>
                   <p>{emailProfile.email}</p>
                      <Button onClick={logOut} variant="secondary">Logout</Button>
                    </div>
                ) : (
                    <Button onClick={() => login()} variant="danger" className="w-100">
                                    Sign in with Google
                                </Button>
                )}
            </Card>
          )}
        </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Newsignup;


// import React, { useEffect, useState } from "react";
// import "../styles/register.css";
// import { Button, Card, Container, Row, Col, Alert, Tabs, Tab } from "react-bootstrap";
// import { ArrowLeftIcon } from "lucide-react";
// import axios from "axios";
// import { useGoogleLogin, googleLogout } from "@react-oauth/google";

// const Newsignup = () => {
//     const [emailUser, setEmailUser] = useState(null);
//     const [emailProfile, setEmailProfile] = useState(null);
//     const [googleError, setGoogleError] = useState('');
//     const [activeTab, setActiveTab] = useState('user');

//     const googleLoginUser = useGoogleLogin({
//         onSuccess: tokenResponse => setEmailUser(tokenResponse),
//         onError: error => {
//             console.error("Google login failed for user", error);
//             setGoogleError("Google login failed for user");
//         },
//     });

//     const googleLoginMentor = useGoogleLogin({
//         onSuccess: tokenResponse => setEmailUser(tokenResponse),
//         onError: error => {
//             console.error("Google login failed for mentor", error);
//             setGoogleError("Google login failed for mentor");
//         },
//     });

//     useEffect(() => {
//         if (!!emailUser?.access_token) {
//             axios
//                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${emailUser.access_token}`, {
//                     headers: {
//                         Authorization: `Bearer ${emailUser.access_token}`,
//                         Accept: 'application/json',
//                     },
//                 })
//                 .then((res) => {
//                     setEmailProfile(res.data);
//                     const userData = {
//                         name: res.data.name,
//                         email: res.data.email,
//                         picture: res.data.picture,
//                         role: activeTab === 'mentor' ? "Mentor" : "User",
//                     };

//                     axios
//                         .post("http://localhost:5000/api/auth/googlesignup", userData)
//                         .then((response) => {
//                             console.log("User data saved to MongoDB:", response.data);
//                             // Optionally redirect the user or update UI upon successful signup
//                         })
//                         .catch((err) => {
//                             console.error("Error saving user data to MongoDB:", err);
//                             setGoogleError("Error saving user data");
//                         });
//                 })
//                 .catch((err) => {
//                     console.log('Error fetching user profile:', err);
//                     setGoogleError('Failed to fetch Google profile');
//                 });
//         }
//     }, [emailUser, activeTab]);

//     const logOut = () => {
//         googleLogout();
//         setEmailProfile(null);
//         setEmailUser(null);
//     };

//     return (
//         <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
//             <Row className="w-100">
//                 <Col md={6} className="mx-auto">
//                     <Card className="shadow">
//                         <Card.Body>
//                             <h2 className="text-center mb-4">Sign Up</h2>
//                             {googleError && <Alert variant="danger">{googleError}</Alert>}
//                             <a href="/googlesignin" className="mb-3 d-block">
//                                 <ArrowLeftIcon /> Back to Sign In
//                             </a>

//                             <Tabs
//                                 activeKey={activeTab}
//                                 id="controlled-tab-example"
//                                 className="mb-3"
//                                 onSelect={(k) => setActiveTab(k)}
//                             >
//                                 <Tab eventKey="user" title="User">
//                                     <div className="text-center mt-3">
//                                         <p>Are you a participant?</p>
//                                         {emailProfile ? (
//                                             <div>
//                                                 <img src={emailProfile.picture} alt="profile" width="50" className="rounded-circle mb-2" />
//                                                 <p>{emailProfile.name}</p>
//                                                 <p>{emailProfile.email}</p>
//                                                 <Button onClick={logOut} variant="secondary">Logout</Button>
//                                             </div>
//                                         ) : (
//                                             <Button onClick={googleLoginUser} variant="danger" className="w-100">
//                                                 Sign up with Google
//                                             </Button>
//                                         )}
//                                     </div>
//                                 </Tab>
//                                 <Tab eventKey="mentor" title="Mentor">
//                                     <div className="text-center mt-3">
//                                         <p>Are you looking to mentor?</p>
//                                         {emailProfile ? (
//                                             <div>
//                                                 <img src={emailProfile.picture} alt="profile" width="50" className="rounded-circle mb-2" />
//                                                 <p>{emailProfile.name}</p>
//                                                 <p>{emailProfile.email}</p>
//                                                 <Button onClick={logOut} variant="secondary">Logout</Button>
//                                             </div>
//                                         ) : (
//                                             <Button onClick={googleLoginMentor} variant="danger" className="w-100">
//                                                 Sign up with Google
//                                             </Button>
//                                         )}
//                                     </div>
//                                 </Tab>
//                             </Tabs>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Newsignup;