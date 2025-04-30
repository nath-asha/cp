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
                const response = await axios.post("http://localhost:5000/api/auth/googlesignin", userData);
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