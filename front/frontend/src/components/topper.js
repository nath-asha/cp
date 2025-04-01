import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Nav, Tab, Row, Col, Table } from "react-bootstrap";
import Challenges from "./challenges";
import CountdownTimer from "./CountDown";

const Displayevent = () => {
    const [events, setEvents] = useState([]); // Initialize as an array
    const [selectedEvent, setSelectedEvent] = useState(null); // To handle a specific event

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/challenges`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setEvents(data);
                if (data.length > 0) {
                    setSelectedEvent(data[0]); // Set the first event as the default selected event
                }
            } catch (err) {
                console.error('Error fetching challenges:', err);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {events.length > 0 ? (
                <div>
                    <h2 className="mb-4">{selectedEvent?.title || "Event Title"}</h2>
                    <Container>
                        {/* Header of the tab */}
                        <Tab.Container defaultActiveKey="overview">
                            <Nav variant="tabs" className="mb-4">
                                <Nav.Item>
                                    <Nav.Link eventKey="overview" className="px-4">Overview</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="prizes" className="px-4">Prizes</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="schedule" className="px-4">Schedule</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="importantdates" className="px-4">Important Dates</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="challenges" className="px-4">Problem Statements</Nav.Link>
                                </Nav.Item>
                            </Nav>

                            {/* Body of each tab */}
                            <Tab.Content>
                                <Tab.Pane eventKey="overview">
                                    <Row className="g-4">
                                        <CountdownTimer />
                                        <button className="btn btn-primary">Register now!</button>
                                        <Col md={4}>
                                            <img
                                                src={selectedEvent?.imgurl || "https://via.placeholder.com/150"}
                                                alt="Event"
                                                className="img-fluid"
                                            />
                                            <p>{selectedEvent?.description || "Description not available."}</p>
                                            <h4>Tech Stack</h4>
                                        </Col>
                                        <Col md={4}>
                                            <Card>
                                                <Card.Body>
                                                    <h5>{selectedEvent?.date || "Date not available"}</h5>
                                                    <h5>{selectedEvent?.type || "Location not available"}</h5>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <h4>Getting started/To Dos before the hackathon starts</h4>
                                        <p>Join the WhatsApp group here</p>
                                        <button className="btn btn-success">Join group</button>
                                        <p>Create teams before the deadline, preferably teams of 3</p>
                                        <p>Choose a problem statement from the challenges tab</p>
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="prizes">
                                    <p>{selectedEvent?.prizes || "Prize details not available."}</p>
                                    <h5>Tracks available:</h5>
                                    <ul>
                                        {selectedEvent?.tracks?.length > 0 ? (
                                            selectedEvent.tracks.map((track, index) => (
                                                <li key={index}>{track}</li>
                                            ))
                                        ) : (
                                            <p>No tracks available.</p>
                                        )}
                                    </ul>
                                </Tab.Pane>
                                <Tab.Pane eventKey="schedule">
                                    <p>{selectedEvent?.schedule || "Schedule details not available."}</p>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Event</th>
                                                <th>Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedEvent?.scheduleDetails?.length > 0 ? (
                                                selectedEvent.scheduleDetails.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.date}</td>
                                                        <td>{item.event}</td>
                                                        <td>{item.time}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" className="text-center">No schedule details available.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Tab.Pane>
                                <Tab.Pane eventKey="importantdates">
                                    <p>{selectedEvent?.importantdates || "Important dates not available."}</p>
                                    {/* Add important dates with functions to make it visually appealing */}
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Event</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedEvent?.scheduleDetails?.length > 0 ? (
                                                selectedEvent.scheduleDetails.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.date}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" className="text-center">No schedule details available.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Tab.Pane>
                                <Tab.Pane eventKey="challenges">
                                    <Challenges />
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Container>
                </div>
            ) : (
                <p>No challenges found for this track.</p>
            )}
        </div>
    );
};

export default Displayevent;