import React, {useState,useEffect} from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin,googleLogout } from "@react-oauth/google";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { ArrowLeftIcon } from "lucide-react";
import axios from "axios";

const MentorGoogleSignIn = () => {
    //for storing access token n info for displaying profile
    const initialUserProperties = {
        access_token: '',
        expires_in: 0,
        id_token: '',
        scope: '',
        token_type: '',
    };

    const emailUserProfile = {
        email: '',
        fname: '',
        gname: '',
        name: '',
        picture: '',
        locale: '',
        verified_email: false,
    };

    const [emailUser, setEmailUser] = useState(initialUserProperties);
    const [emailProfile, setEmailProfile] = useState(emailUserProfile);

    //prev part with signup
    const [user,setUser] = useState([]);
    const [profile,setProfile] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse)
            console.log(codeResponse)
        },
        onError:(error) => console.log("Login Failed:",error)
    });

    const responseMessage = (response) => {
        console.log(response);
    };

    const errorMessage = (error) => {
        console.log(error);
    };

 
    useEffect(
        () => {
            if(user){
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
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
        },[user]);

    const logout = () => {
        googleLogout();
        setProfile(null);
    }

    return(
        <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                     <Row>
                         <Col>
                             <Card className="text-center shadow-lg p-4">
                                 <Card.Body>
                                     <Card.Title>Mentor Google Sign-In</Card.Title>
                                     <Card.Text>
                                         Apply as mentor and wait for approval.
                                 </Card.Text>
    <div>
    {profile ? (
      <div className="card">
        <img src={profile.picture} alt='user image' />
        <h5>User Logged in</h5>
        <p>Name: {profile.name}</p>
        <p>Email: {profile.email}</p>
        <button onClick={logout}>Log Out</button>
        </div>
    ):(
      <button className='d-flex justify-content-center align-items-center btn-lg text-sm' onClick={login}>Google Sign in</button>
    )}
    </div>
</Card.Body>
</Card>
</Col>
</Row>
</Container>
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