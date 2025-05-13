import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Nav, Tab, Row, Col, Table, CardBody } from "react-bootstrap";
import CountdownTimer from "./CountDown";
import { Trophy } from "lucide-react";
import { useAuth } from "../provider/AuthProvider";
import Community from "./community";
import Leaderboard from './Leaderboard';
import Challenges from "./challenges";
import { useParams } from "react-router-dom";
import { getUserRole, getUserId } from './auth';
const role = getUserRole();
const userId = getUserId(); 

const Displayevent = () => {
    const { eventId } = useParams();
    const { user } = useAuth();
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/events/${eventId}`);
                const data = await response.json();
                console.log(data);
                if (Array.isArray(data) && data.length > 0) {
                    setSelectedEvent(data[0]);
                } else {
                    setSelectedEvent(null);
                    console.warn("No event data found for this ID.");
                }
            } catch (err) {
                console.error('Error fetching events data:', err);
            }
        };
        fetchEventDetails();
    }, [eventId]);

    if (!selectedEvent) {
        return <p>Loading event details or event not found...</p>;
    }

    const handleRegister = async () => {
        if (!user || !user.id) {
            alert("You must be logged in to register for an event.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5000/events/${eventId}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.id }) // user.id is valid
            });
    
            if (response.ok) {
                alert('Successfully registered for the event!');
            } else {
                const errorData = await response.json();
                alert(`Failed to register: ${errorData.message}`);
            }
        } catch (err) {
            console.error('Error during registration:', err);
            alert('An error occurred while trying to register.');
        }
    };
    return (
        <div>
            <h2 className="mb-4">{selectedEvent.title || "Event Title"}</h2>
            <Container>
                <Tab.Container defaultActiveKey="overview">
                    <Nav variant="tabs" className="mb-4">
                        <Nav.Item><Nav.Link eventKey="overview">Overview</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="prizes">Prizes</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="schedule">Schedule</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="importantdates">Important Dates</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="challenges">Problem Statements</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="results">Leaderboard</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="Rules">Rules</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="discuss">Discussions</Nav.Link></Nav.Item>
                    </Nav>

                    <Tab.Content>
                        <Tab.Pane eventKey="overview">
                            <Row className="g-4">
                                <CountdownTimer />
                                
                                <Col md={6}>
                                    <h3 className="text-blue">{selectedEvent.title}</h3>
                                    <img src={selectedEvent.imgUrl} alt="Event" className="img-fluid" />
                                    <h5>Open to All</h5>
                                    <h5>190 Registered</h5>
                                </Col>
                                <Col md={6}>
                                    <Card>
                                        <CardBody>
                                            {new Date() <= new Date(selectedEvent.enddate) ? (
                                                <button className="btn btn-primary btn-sm" onClick={handleRegister}>
                                                    Register now!
                                                </button>
                                            ) : (
                                                <p className="text-danger">Registration closed.</p>
                                            )}
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody>
                                            {user && role === 'user' && selectedEvent.registeredUsers?.includes(user.id) ? (
                                                <a href='/createteams'>
                                                    <button className="btn btn-primary btn-sm">Create Team</button>
                                                </a>
                                            ) : (
                                                <p className="text-black mt-2">
                                                    Please register for the event first.
                                                </p>
                                            )}
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <Card.Body>
                                            <h5>{selectedEvent.date}</h5>
                                            <h5>{selectedEvent.venue}</h5>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <CardBody>
                                            <h4>Getting started / To Dos</h4>
                                            <p>Create teams before the deadline</p>
                                            <p>Choose a challenge</p>
                                            <p>Join Whatsapp group</p>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <p>{selectedEvent.desc || "Description not available."}</p>
                                <h4>Requirements</h4>
                                <ul>
                                    <li>GitHub link</li>
                                    <li>Project repository</li>
                                    <li>Video demo</li>
                                </ul>
                                <h4>Judging Criteria</h4>
                            </Row>
                        </Tab.Pane>

                        <Tab.Pane eventKey="prizes">
                            {selectedEvent.prizes && selectedEvent.prizes.length > 0 ? (
                                <ul>
                                    {selectedEvent.prizes.map((prize, index) => (
                                        <h1 className="hero" key={index}><Trophy /> {index + 1} : {prize}</h1>
                                    ))}
                                </ul>
                            ) : (
                                <p>No prizes listed for this event.</p>
                            )}
                        </Tab.Pane>

                        <Tab.Pane eventKey="schedule">
                            {selectedEvent.scheduleDetails && selectedEvent.scheduleDetails.length > 0 ? (
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Event</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedEvent.scheduleDetails.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.date}</td>
                                                <td>{item.time}</td>
                                                <td>{item.event}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                <p>No schedule details available.</p>
                            )}
                        </Tab.Pane>

                        <Tab.Pane eventKey="importantdates">
                            {selectedEvent.importantdates && selectedEvent.importantdates.length > 0 ? (
                                <ul>
                                    {selectedEvent.importantdates.map((date, index) => (
                                        <li key={index}>{date}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No important dates listed.</p>
                            )}
                        </Tab.Pane>

                        <Tab.Pane eventKey="challenges">
                            <Challenges eventId={eventId} />
                        </Tab.Pane>

                        <Tab.Pane eventKey="results">
                            <Leaderboard eventId={eventId} />
                        </Tab.Pane>

                        <Tab.Pane eventKey="Rules">
                            <p>Event rules will be displayed here.</p>
                        </Tab.Pane>

                        <Tab.Pane eventKey="discuss">
                            <Community eventId={eventId} />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container>
        </div>
    );
};

export default Displayevent;