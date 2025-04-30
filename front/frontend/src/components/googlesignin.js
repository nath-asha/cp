// import React, { useState,useEffect } from 'react';
// import { useAuth } from '../provider/AuthProvider';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
// import { useGoogleLogin, googleLogout,onSignin, GoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

// const Googlesignin = () => {
//     const { signin, error: authError } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const redirectPath = location.state?.path || "/profile";

//     const initialUserProperties = {
//         access_token: '',
//         expires_in: 0,
//         id_token: '',
//         scope: '',
//         token_type: '',
//     };

//     const emailUserProfile = {
//         email: '',
//         family_name: '',
//         given_name: '',
//         hd: '',
//         id: '',
//         locale: '',
//         name: '',
//         picture: '',
//         verified_email: false,
//     };

//     //for google signin
//     const [emailUser,setEmailUser] = useState(initialUserProperties);
//     const [emailProfile, setEmailProfile] = useState(emailUserProfile);

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [localError, setLocalError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const [googleError, setGoogleError] = useState('');

//     const handleEmailPasswordSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setLocalError('');

//         try {
//             await signin(email, password, () => {
//                 navigate(redirectPath, { replace: true });
//             });
//         } catch (err) {
//             setLocalError(authError || 'Invalid email or password');
//             console.error('Email/password sign-in error:', err);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // const googleLogin = useGoogleLogin({
//     //     onSuccess: async tokenResponse => {
//     //         const token = tokenResponse.access_token;
//     //       // fetching userinfo can be done on the client or the server
//     //       const userInfo = await axios
//     //         .get('https://www.googleapis.com/oauth2/v3/userinfo', 
//     //           { headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
//     //         })
//     //       const result = userInfo.data;
//     //       console.log(result);
//     //      // contains name, email & googleId(sub)
//     //     },
//     //   });


//     // const googleLogin = useGoogleLogin({
//     //     onSuccess: async (credentialResponse) => {
//     //         try {
//     //             const res = await fetch('http://localhost:5000/api/auth/googlesignin', {
//     //                 method: 'POST',
//     //                 headers: {
//     //                     'Content-Type': 'application/json',
//     //                 },
//     //                 body: JSON.stringify({ credential: credentialResponse.credential }),
//     //             });
//     //             console.log('Google Credential Response:', credentialResponse);
//     //             console.log(credentialResponse);
//     //             const data = await res.json();

//     //             if (data.success) {
//     //                 localStorage.setItem('token', data.token);
//     //                 signin(data.user, data.token, () => {
//     //                     navigate(redirectPath, { replace: true });
//     //                 });
//     //             } else {
//     //                 setGoogleError(data.message || 'Google sign-in failed');
//     //                 console.error('Google sign-in failed:', data.message);
//     //             }
//     //         } catch (err) {
//     //             setGoogleError('Error communicating with the server for Google sign-in');
//     //             console.error('Error during Google sign-in:', err);
//     //         }
//     //     },
//     //     onError: (err) => {
//     //         setGoogleError('Google sign-in error');
//     //         console.error('Google Sign-in Failed:', err); 
//     //     },
//     // });

//     // function onSignIn(googleUser) {
//     //     var profile = googleUser.getBasicProfile();
//     //     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     //     console.log('Name: ' + profile.getName());
//     //     console.log('Image URL: ' + profile.getImageUrl());
//     //     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
//     //   }


//     const googleLogin = useGoogleLogin({
//             onSuccess: (codeResponse) => {
//                 setEmailUser(codeResponse);
//                 console.log(codeResponse);
//             },
//             onError: (error) => console.log("Login Failed:", error),
//         });

//     // useEffect(() => {
//     //         if (!!emailUser.access_token) {
//     //             axios
//     //                 .get(
//     //                     `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${emailUser.access_token}`,
//     //                     {
//     //                         headers: {
//     //                             Authorization: `Bearer ${emailUser.access_token}`,
//     //                             Accept: 'application/json',
//     //                         },
//     //                     }
//     //                 )
//     //                 .then((res) => {
//     //                     setEmailProfile(res.data);
    
//     //                     // data to Mongodb
//     //                     const userData = {
//     //                         name: res.data.name,
//     //                         email: res.data.email,
//     //                         picture: res.data.picture,
//     //                         role: "user",
//     //                     };
    
//     //                     axios
//     //                         .post("http://localhost:5000/api/auth/googlesignup", userData)
//     //                         .then((response) => {
//     //                             console.log("User data saved to MongoDB:", response.data);
//     //                         })
//     //                         .catch((err) => {
//     //                             console.error("Error saving user data to MongoDB:", err);
//     //                         });
//     //                 })
//     //                 .catch((err) => console.log('Error fetching user profile:', err));
//     //         }
//     //     }, [emailUser]);

//     useEffect(() => {
//         if (emailUser.access_token) {
//             axios
//                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${emailUser.access_token}`, {
//                     headers: {
//                         Authorization: `Bearer ${emailUser.access_token}`,
//                         Accept: 'application/json',
//                     },
//                 })
//                 .then((res) => {
//                     const userData = {
//                         name: res.data.name,
//                         email: res.data.email,
//                         picture: res.data.picture,
//                     };
    
//                     // Post to your backend to get JWT + role
//                     axios
//                         .post("http://localhost:5000/api/auth/googlesignup", userData)
//                         .then((response) => {
//                             const { token, user } = response.data;
//                             signin(user, token, () => {
//                                 // Role-based navigation
//                                 if (user.role === 'admin') {
//                                     navigate("/admin", { replace: true });
//                                 } else {
//                                     navigate(redirectPath, { replace: true });
//                                 }
//                             });
//                         })
//                         .catch((err) => {
//                             console.error("Error saving user data to MongoDB:", err);
//                             setGoogleError("Backend error: " + err.message);
//                         });
//                 })
//                 .catch((err) => {
//                     console.log('Error fetching user profile:', err);
//                     setGoogleError("Google user profile fetch failed");
//                 });
//         }
//     }, [emailUser]);
    
    
//         const logOut = () => {
//                 googleLogout();
//                 setEmailProfile(null);
//             };

//     return (
//         <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
//         <Row className="w-100">
//             <Col md={6} className="mx-auto">
//                 <Card className="shadow">
//                     <Card.Body>
//                         <h2 className="text-center mb-4">Sign In</h2>

//                         {localError && <Alert variant="danger">{localError}</Alert>}

//                         <Form onSubmit={handleEmailPasswordSubmit} className="mb-4">
//                             <Form.Group className="mb-3" controlId="formBasicEmail">
//                                 <Form.Label>Email address</Form.Label>
//                                 <Form.Control
//                                     type="email"
//                                     placeholder="Enter email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>

//                             <Form.Group className="mb-3" controlId="formBasicPassword">
//                                 <Form.Label>Password</Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     placeholder="Password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>

//                             <Button
//                                 variant="primary"
//                                 type="submit"
//                                 className="w-100"
//                                 disabled={isSubmitting}
//                             >
//                                 {isSubmitting ? 'Loading': 'Login'}
//                             </Button>
//                         </Form>

//                         <hr className="my-4" />
//                         <div className="d-flex align-items-center">
//                             {googleError && <Alert variant="danger">{googleError}</Alert>}
//                             <Card>
//                                         {/* <div class="g-signin2" data-onsuccess="onSignIn"></div> */}
//                                             {emailProfile ? (
//                                                 <div>
//                                                     {/* <img src={emailProfile.picture} alt="user image" />
//                                                     <h3>the User profile.</h3>*/}
//                                                     <div>
//                                                         <p>Name: {emailProfile.name}</p>
//                                                         <p>Email Address: {emailProfile.email}</p>
//                                                     </div> 
                            
//                                                     {/* <br /> */}
//                                                     <button onClick={logOut}>Log out</button>
//                                                 </div>
//                                             ) : (
//                                                 <Button onClick={googleLogin} variant="danger">Sign in with Google</Button>
//                                             )}
//                                         </Card>
//                             <Button
//                                 variant="outline-primary"
//                                 onClick={googleLogin}
//                                 className="w-80 mb-3 overflow-hidden">Google Signin </Button>
//                         </div>
//                         <p className="text-center">
//                             Don't have an account? <a href="/newsignup">Sign Up</a>
//                         </p>
//                     </Card.Body>
//                 </Card>
//             </Col>
//         </Row>
//     </Container>
//     );
// };

// export default Googlesignin;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../provider/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';

const Googlesignin = () => {
    const { signin, error: authError } = useAuth();
    const {gsignin} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || "/profile";

    const [emailUser, setEmailUser] = useState(null);
    const [emailProfile, setEmailProfile] = useState(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [googleError, setGoogleError] = useState('');

    // Email/Password login
    const handleEmailPasswordSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setLocalError('');
        try {
            await signin(email, password, () => {
                navigate(redirectPath, { replace: true });
            });
        } catch (err) {
            setLocalError(authError || 'Invalid email or password');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Google login
    const googleLogin = useGoogleLogin({
        onSuccess: tokenResponse => setEmailUser(tokenResponse),
        onError: err => {
            console.error("Google login failed", err);
            setGoogleError("Google login failed");
        },
    });

    // Fetch Google profile & authenticate with backend
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
                const response = await axios.post("http://localhost:5000/api/auth/googlesignup", userData);
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

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Row className="w-100">
                <Col md={6} className="mx-auto">
                    <Card className="shadow">
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign In</h2>

                            {localError && <Alert variant="danger">{localError}</Alert>}

                            <Form onSubmit={handleEmailPasswordSubmit} className="mb-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </Button>
                            </Form>

                            <hr className="my-4" />
                            {googleError && <Alert variant="danger">{googleError}</Alert>}

                            {emailProfile ? (
                                <div className="text-center">
                                    <img src={emailProfile.picture} alt="profile" width="50" className="rounded-circle mb-2" />
                                    <p>{emailProfile.name}</p>
                                    <p>{emailProfile.email}</p>
                                    <Button onClick={logOut} variant="secondary">Logout</Button>
                                </div>
                            ) : (
                                <Button onClick={googleLogin} variant="danger" className="w-100">
                                    Sign in with Google
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
    );
};

export default Googlesignin;
