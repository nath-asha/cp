import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const Lay = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={5}>
                <div class="p-3">
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Participant Registration</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Participants register here</Card.Subtitle>
                            <Button variant="btn btn-outline-primary" onClick={() => window.location.href = '/api/users'}>
                                Register
                            </Button>
                            <Card.Text>Already have an account?</Card.Text>
                            <Card.Text>Login below</Card.Text>
                            <Button variant="btn btn-outline-primary" onClick={() => window.location.href = '/api/users'}>
                                Login
                            </Button>
                        </Card.Body>
                    </Card>
                    </div>
                </Col>
                <Col md={5}>
                <div class="p-3">
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Mentor Registration</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Mentors register here</Card.Subtitle>
                            <Button variant="btn btn-outline-primary" onClick={() => window.location.href = '/api/users'}>
                                Register
                            </Button>
                            <Card.Text>Already have an account?</Card.Text>
                            <Card.Text>Login below</Card.Text>
                            <Button variant="btn btn-outline-primary" onClick={() => window.location.href = '/api/users'}>
                                Login
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Lay;


// import React from 'react';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import { Card, CardContent } from "@mui/material"; 

// const Lay = () => {
//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-5">
//                     <Card className="card-md-5">
//                         <CardContent>
//                             <h5 className="card-title">Participant registration</h5>
//                             <h6 className="card-subtitle mb-2 text-muted">Participants register here</h6>
//                             <button className="btn btn-primary" onClick={() => window.location.href = '/api/users'}>Register</button>
//                         </CardContent>
//                     </Card>
//                 </div>
//                 <div className="col-md-5">
//                     <Card className="card-md-5">
//                         <CardContent>
//                             <h5 className="card-title">Mentor registration</h5>
//                             <h6 className="card-subtitle mb-2 text-muted">Mentors register here</h6>
//                             <button className="btn btn-primary" onClick={() => window.location.href = '/api/users'}>Register</button>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Lay;
