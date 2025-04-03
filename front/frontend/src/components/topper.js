import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Nav, Tab, Row, Col, Table, CardBody } from "react-bootstrap";
import {Trophy} from 'lucide-react';
import Challenges from "./challenges";
import CountdownTimer from "./CountDown";
import Community from "./community";
import Leaderboard from './Leaderboard';
//this page contains event details and registration


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
                                <Nav.Item>
                                    <Nav.Link eventKey="results" className="px-4">Leaderboard</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Rules" className="px-4">Rules</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="discuss" className="px-4">Discussions</Nav.Link>
                                </Nav.Item>
                            </Nav>

                            {/* Body of each tab */}
                            <Tab.Content>
                                <Tab.Pane eventKey="overview">
                                    <Row className="g-4">
                                        <CountdownTimer />
                                        </Row>   
                                         <button> Register now!</button>
                                        <Row>
                                        <Col md={6}>
                                            <img
                                                src={selectedEvent?.imgurl || "img"}
                                                alt="Event"
                                                className="img-fluid"
                                            />
                                        <h5>Open to All</h5>
                                        <h5>200 Registered</h5>
                                        </Col>
                                        <Col md={6}>
                                            <Card>
                                                <Card.Body>
                                                    <h5>{selectedEvent?.date || "30 April"}</h5>
                                                    <h5>{selectedEvent?.type || "Offline"}</h5>
                                                    <h5>Venue: {selectedEvent?.venue || "Skill Lab 2"}</h5>
                                                </Card.Body>
                                            </Card>
                                            {/* <Card>
                                                <Card.Body>
                                                <button>Register now!</button>
                                                    {/* <h5>{selectedEvent?.type || "Offline"}</h5> 
                                                </Card.Body>
                                            </Card> */}
                                            <Card>
                                                <Card.Body>
                                                <h4>Tech Stack</h4>
                                                <h5>{selectedEvent?.type || "Reactjs, Expressjs"}</h5>
                                                </Card.Body>
                                            </Card>
                                            <Card>
                                                <CardBody>
                                                <h4>Getting started/To Dos before the hackathon starts</h4>
                                                <p>Create teams before the deadline, preferably teams of 3</p>
                                                <p>Choose a problem statement from the challenges tab</p>
                                                <p>Join Whatsapp group</p>
                                                </CardBody>
                                            </Card>
                                            <Card>
                                                <CardBody>
                                                <p>Join the WhatsApp group here</p>
                                                <button className="btn btn-success">Join group</button>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <p>{selectedEvent?.description || "Description not available."}</p>
                                        <h4>Requirements</h4>
                                        <h5>What to build?</h5>
                                        <h5>What to submit</h5>
                                        <h6>github link to the project repository<br></br>Video demo of the project</h6>
                                        <h4>Judging Criteria</h4>
                                    </Row>
                                    {/* <div className='faq'>
                <div className="accordion" id="accordionFlushExample">
                    <div className="accordion-item">
                        <p className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                What software do I need?
                            </button>
                        </p>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Node.js and npm (or yarn).
                                A code editor (VS Code, Sublime Text, Atom).
                                A web browser (Chrome, Firefox).
                                Git (for version control).
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Should I bring a power adapter?
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body"> Yes, always bring a power adapter. Hackathons can be long, and you don't want your laptop to run out of battery.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                What if I run into technical issues?
                            </button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Work as a team to troubleshoot.
                                Utilize offline documentation.
                                Ask the hackathon organizers for assistance</div>
                        </div>
                    </div>
                </div>
            </div> */}
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
                                <Tab.Pane eventKey='results'>
                                    <Leaderboard/>
                                </Tab.Pane>
                                <Tab.Pane eventKey='discuss'>
                                    <Community/>
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