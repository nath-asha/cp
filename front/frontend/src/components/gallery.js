import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

function Gallery() {
    return (
        <Container fluid className="py-5 bg-light">
            <Row className="justify-content-center mb-4">
                <Col md={8}>
                    <Card className="shadow-sm border-0 text-center mb-3">
                        <Card.Body>
                            <Card.Title as="h1" className="text-success mb-2">Gallery</Card.Title>
                            <Card.Subtitle as="h3" className="text-primary mb-0">Reactathon 2024</Card.Subtitle>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center mb-5">
                <Col md={8}>
                    <Carousel className="shadow rounded overflow-hidden">
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                style={{ height: '400px', objectFit: 'cover' }}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP9R68N9hVrXMcnR1T4VCjCPmMhGIVZv6oEAgEPp41RS_voHGPCGNELYG7PVC9keGNdQE&usqp=CAU"
                                alt="First slide"
                            />
                            <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
                                <h3 className="text-success">React-a-thon</h3>
                                <p className="text-white">Create Solutions that speak</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                style={{ height: '400px', objectFit: 'cover' }}
                                src="https://img.freepik.com/free-vector/hackathon-doodle-hand-drawing-team-programmers-web-developers-managers-graphic-designers-deve_88138-1348.jpg?t=st=1741146510~exp=1741150110~hmac=aa36e1836d63a2fa40cf74e6d2efca9fe0c2bb91bbfb7d1a27f71d9d91a5486a&w=1380"
                                alt="Second slide"
                            />
                            <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
                                <h3 className="text-primary">React-a-thon</h3>
                                <p className="text-white">Create Solutions that speak.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-sm border-0 text-center mb-3">
                        <Card.Body>
                            <Card.Subtitle as="h3" className="text-primary mb-0">Reactathon</Card.Subtitle>
                        </Card.Body>
                    </Card>
                    <Carousel className="shadow rounded overflow-hidden">
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                style={{ height: '400px', objectFit: 'cover' }}
                                src="https://img.freepik.com/free-vector/hackathon-doodle-hand-drawing-team-programmers-web-developers-managers-graphic-designers-deve_88138-1348.jpg?t=st=1741146510~exp=1741150110~hmac=aa36e1836d63a2fa40cf74e6d2efca9fe0c2bb91bbfb7d1a27f71d9d91a5486a&w=1380"
                                alt="First slide"
                            />
                            <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
                                <h3 className="text-success">React-a-thon</h3>
                                <p className="text-white">Create Solutions that speak</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                style={{ height: '400px', objectFit: 'cover' }}
                                src="https://img.freepik.com/free-vector/hackathon-doodle-hand-drawing-team-programmers-web-developers-managers-graphic-designers-deve_88138-1348.jpg?t=st=1741146510~exp=1741150110~hmac=aa36e1836d63a2fa40cf74e6d2efca9fe0c2bb91bbfb7d1a27f71d9d91a5486a&w=1380"
                                alt="Second slide"
                            />
                            <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
                                <h3 className="text-primary">React-a-thon</h3>
                                <p className="text-white">Create Solutions that speak.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
}

export default Gallery;
