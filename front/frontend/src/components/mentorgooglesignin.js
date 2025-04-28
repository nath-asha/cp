import React, { useState, useEffect } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { Card } from "react-bootstrap";
import axios from "axios";

const MentorGoogleSignIn = () => {
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

    const logOut = () => {
        googleLogout();
        setEmailProfile(null);
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Card>
            {/* <div class="g-signin2" data-onsuccess="onSignIn"></div> */}
                {emailProfile ? (
                    <div>
                        <img src={emailProfile.picture} alt="user image" />
                        <h3>the User profile.</h3>

                        <div>
                            <p>Name: {emailProfile.name}</p>
                            <p>Email Address: {emailProfile.email}</p>
                        </div>

                        <br />
                        <button onClick={logOut}>Log out</button>
                    </div>
                ) : (
                    <button onClick={() => login()}>Sign in with Google</button>
                )}
            </Card>
        </div>
    );
};

export default MentorGoogleSignIn;

// const MentorGoogleSignIn = ({ onSuccess, onFailure }) => { 
//     const clientId = process.env.REACT_APP_CLIENT_ID;

//     const handleSuccess = (response) => {
//         console.log('Google Sign-In Success:', response);
//         if (onSuccess) {
//             onSuccess(response);
//         }
//     };

//     const handleFailure = (error) => {
//         console.error('Google Sign-In Error:', error);
//         if (onFailure) {
//             onFailure(error);
//         }
//     };

//     return (
//         <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//             <Row>
//                 <Col>
//                     <Card className="text-center shadow-lg p-4">
//                         <Card.Body>
//                             <Card.Title>Mentor Google Sign-In</Card.Title>
//                             <Card.Text>
//                                 Apply as mentor and wait for approval.
//                             </Card.Text>
//                             <GoogleLogin
//                                 clientId={clientId}
//                                 buttonText="Sign in with Google"
//                                 onSuccess={handleSuccess}
//                                 onFailure={handleFailure}
//                                 cookiePolicy={'single_host_origin'}
//                                 render={(renderProps) => (
//                                     <Button
//                                         variant="primary"
//                                         onClick={renderProps.onClick}
//                                         disabled={renderProps.disabled}
//                                     >
//                                         Sign in with Google
//                                     </Button>
//                                 )}
//                             />
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default MentorGoogleSignIn;