import React,{useState,useEffect} from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate ,useLocation } from "react-router-dom";
import { Container,Row,Col,Card,Form,Button,Alert } from "react-bootstrap";
import { useGoogleLogin,googleLogout } from "@react-oauth/google";
import axios from "axios";

import MentorGoogleSignIn from "./mentorgooglesignin";

const Gsignsimpler = () => {
    const {gsignin} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || "/profile";

    const [emailUser,setEmailUser] = useState(null);
    const [emailProfile, setEmailProfile] = useState(null);

    const [localError, setLocalError] = useState('');
    const [googleError,setGoogleError] = useState('');
    const [isSubmitting,setIsSubmitting] = useState('');

   const googleLogin = useGoogleLogin({
           onSuccess: tokenResponse => setEmailUser(tokenResponse),
           onError: err => {
               console.error("Google login failed", err);
               setGoogleError("Google login failed");
           },
       });

    //Fetch Google profile & authenticate with backend
       useEffect(() => {
        if (!emailUser?.access_token) return;

        axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: {
                Authorization: `Bearer ${emailUser.access_token}`,
            }
        })
        .then(async (res) => {
            const userData = {
                name: res.data.name,
                email: res.data.email,
                picture: res.data.picture,
                id: res.data.id, //Google user ID
            };
            setEmailProfile(res.data);
            console.log("Google user profile",res.data);

            try {
                const response = await axios.post("http://localhost:5000/api/auth//gsigninsimpler", userData);
                const { token, user } = response.data;
                
                gsignin(user, token, () => {
                    // if (user.role === 'admin') {
                    //     navigate("/admin", { replace: true });
                    // } else {
                        navigate(redirectPath, { replace: true });
                    // }
                    console.log("hello read this");
                    console.log("token: ",token,"user: ",user);
                });
            } catch (err) {
                console.error("Backend error:", err);
                setGoogleError("Error saving user to backend");
                
            }
        })
        .catch((err) => {
            console.error("Google profile fetch failed", err);
            setGoogleError("Failed to fetch Google profile");
        });
        
    }, [emailUser]);
    
    const logOut = () => {
            googleLogout();
            setEmailProfile(null);
        };

    return(
        <Container className="d-flex justify-content-center align-items-center" style={{minHeight:'80vh'}}>
            <Row className="w-100">
                <Col md={6} className="mx-auto">
                <Card className="shadow">
                    <Card.Body>
                        <h1 className="font-weight-bold text-black text-center">Are you a participant?</h1>
                            {googleError && <Alert variant="danger">{googleError}</Alert>}
                            {emailProfile ? (
                                <div className="text-center">
                                    <img src={emailProfile.picture} alt="profile" width="50" className="rounded-circle mb-2" />
                                    <p>{emailProfile.name}</p>
                                    <p>{emailProfile.email}</p>
                                    <Button onClick={logOut} variant="secondary">Logout</Button>
                                </div>
                            ) : (
                                <Button onClick={googleLogin} variant="outline-primary" className="w-100 overflow-hidden h-100">
                                    Google Signin
                                </Button>
                            )}

                            <p className="text-center mt-3">
                                Don't have an account? <a href="/newsignup">Sign Up</a>
                            </p>
                    </Card.Body>
                </Card>
                </Col>
                <Col md={6} className="mx-auto">
                <Card className="shadow">
                    <Card.Body>
                        <h1 className="font-weight-bold text-black text-center">Interested to mentor?</h1>
                            {googleError && <Alert variant="danger">{googleError}</Alert>}
                            {emailProfile ? (
                                <div className="text-center">
                                    <img src={emailProfile.picture} alt="profile" width="50" className="rounded-circle mb-2" />
                                    <p>{emailProfile.name}</p>
                                    <p>{emailProfile.email}</p>
                                    <Button onClick={logOut} variant="secondary">Logout</Button>
                                </div>
                            ) : (
                                <Button onClick={googleLogin} variant="outline-primary" className="w-100 overflow-hidden h-100">
                                    Google Signin
                                </Button>
                            )}

                            <p className="text-center mt-3">
                                Don't have an account? <a href="/newsignup">Sign Up</a>
                            </p>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    )};

export default Gsignsimpler;

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../provider/AuthProvider';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Container, Row, Col, Card, Form, Button, Alert, Tabs, Tab } from 'react-bootstrap';
// import { useGoogleLogin, googleLogout } from '@react-oauth/google';
// import axios from 'axios';

// const Gsignsimpler = () => {
//     const { gsignin } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const redirectPath = location.state?.path || "/profile";

//     const [emailUser, setEmailUser] = useState(null);
//     const [emailProfile, setEmailProfile] = useState(null);
//     const [googleError, setGoogleError] = useState('');
//     const [activeTab, setActiveTab] = useState('user');

//     // Google login for user
//     const googleLoginUser = useGoogleLogin({
//         onSuccess: tokenResponse => setEmailUser(tokenResponse),
//         onError: err => {
//             console.error("Google login failed for user", err);
//             setGoogleError("Google login failed for user");
//         },
//     });

//     // Google login for mentor
//     const googleLoginMentor = useGoogleLogin({
//         onSuccess: tokenResponse => setEmailUser(tokenResponse),
//         onError: err => {
//             console.error("Google login failed for mentor", err);
//             setGoogleError("Google login failed for mentor");
//         },
//     });

//     // Fetch Google profile & authenticate with backend
//     useEffect(() => {
//         if (!emailUser?.access_token) return;

//         axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
//             headers: {
//                 Authorization: `Bearer ${emailUser.access_token}`,
//             }
//         })
//         .then(async (res) => {
//             const userData = {
//                 name: res.data.name,
//                 email: res.data.email,
//                 picture: res.data.picture,
//                 googleId: res.data.id, //Google user ID
//                 role: activeTab, // Set the role based on the active tab
//             };
//             setEmailProfile(res.data);
//             console.log("Google user profile", res.data);

//             try {
//                 const response = await axios.post("http://localhost:5000/api/auth/googlesignin", userData);
//                 const { token, user } = response.data;

//                 gsignin(user, token, () => {
//                     navigate(redirectPath, { replace: true });
//                     console.log("Google sign-in successful");
//                     console.log("token: ", token, "user: ", user);
//                 });
//             } catch (err) {
//                 console.error("Backend error:", err);
//                 setGoogleError("Error saving user to backend");
//             }
//         })
//         .catch((err) => {
//             console.error("Google profile fetch failed", err);
//             setGoogleError("Failed to fetch Google profile");
//         });

//     }, [emailUser, activeTab, gsignin, navigate, redirectPath]);


//     const logOut = () => {
//         googleLogout();
//         setEmailProfile(null);
//     };

//     return (
//         <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
//             <Row className="w-100">
//                 <Col md={6} className="mx-auto">
//                     <Card className="shadow">
//                         <Card.Body>
//                             <h2 className="text-center mb-4">Sign In</h2>

//                             {googleError && <Alert variant="danger">{googleError}</Alert>}

//                             <Tabs
//                                 activeKey={activeTab}
//                                 id="controlled-tab-example"
//                                 className="mb-3"
//                                 onSelect={(k) => setActiveTab(k)}
//                             >
//                                 <Tab eventKey="user" title="User">
//                                     <div className="text-center mb-3">
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
//                                                 Sign in with Google
//                                             </Button>
//                                         )}
//                                     </div>
//                                 </Tab>
//                                 <Tab eventKey="mentor" title="Mentor">
//                                     <div className="text-center mb-3">
//                                         <p>Do you want to mentor?</p>
//                                         {emailProfile ? (
//                                             <div>
//                                                 <img src={emailProfile.picture} alt="profile" width="50" className="rounded-circle mb-2" />
//                                                 <p>{emailProfile.name}</p>
//                                                 <p>{emailProfile.email}</p>
//                                                 <Button onClick={logOut} variant="secondary">Logout</Button>
//                                             </div>
//                                         ) : (
//                                             <Button onClick={googleLoginMentor} variant="danger" className="w-100">
//                                                 Sign in with Google
//                                             </Button>
//                                         )}
//                                     </div>
//                                 </Tab>
//                             </Tabs>

//                             <hr className="my-4" />

//                             <p className="text-center mt-3">
//                                 Don't have an account? <a href="/newsignup">Sign Up</a>
//                             </p>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Gsignsimpler;