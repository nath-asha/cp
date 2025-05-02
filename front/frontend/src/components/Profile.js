import React from "react";
import { useAuth } from "../provider/AuthProvider";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

const Profile = () => {
    const { user, logout } = useAuth();

    const logoutHandler = () => {
        logout();
    };

    if (!user) {
        return <h1>Loading...</h1>;
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Header className="text-center">
                            <h2>Welcome, {user.firstName} {user.lastName}</h2>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={4} className="text-center">
                                    <img
                                        src={user.profilePicture || "https://via.placeholder.com/150"}
                                        alt="Profile"
                                        className="img-fluid rounded-circle mb-3"
                                        style={{ width: "150px", height: "150px" }}
                                    />
                                </Col>
                                <Col md={8}>
                                    <h5>Personal Information</h5>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>
                                    <p><strong>Address:</strong> {user.address || "Not provided"}</p>
                                    <p><strong>Bio:</strong> {user.bio || "No bio available"}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <Button
                                variant="primary"
                                className="me-2"
                                onClick={() => window.location.href = '/continueprofile'}
                            >
                                Edit Profile
                            </Button>
                            <Button variant="danger" onClick={logoutHandler}>
                                Logout
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;

// import React from "react";
// import { useAuth } from "../provider/AuthProvider";
// import { Button } from "react-bootstrap";

// const Profile = () => {
//     const { user, logout } = useAuth();

//     const logoutHandler = () => {
//         logout();
//     };

//     if (!user) {
//         return <h1>Loading...</h1>;
//     }

//     return (
//         <>
//             <h1>Welcome {user.firstName}</h1>
//             <button type="submit" onClick={logoutHandler}>
//                 Logout
//             </button>
//             <h4>Complete your profile here click below</h4>
//             <Button onClick={() => window.location.href = '/continueprofile'}>Edit Profile</Button>
//         </>
//     );
// };

// export default Profile;