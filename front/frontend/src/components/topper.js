import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Nav, Tab, Row, Col, Table } from "react-bootstrap";
import { Trophy } from 'lucide-react';
import Challenges from "./challenges";
import CountdownTimer from "./CountDown";
import { getUserRole } from "./auth";
import Community from "./community";
import Leaderboard from './Leaderboard';
import { useParams } from "react-router-dom";

const Displayevent = () => {
    const { eventId } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [challenges, setChallenges] = useState([]);
    const role = getUserRole();

    // Fetch Event Details
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/events/${eventId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setEventDetails(data);
            } catch (err) {
                console.error('Error fetching events data:', err);
            }
        };
        fetchEventDetails();
    }, [eventId]);

    // Fetch Challenges
    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const response = await fetch(`http://localhost:5000/displaychallenge/${eventId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setChallenges(data);
            } catch (err) {
                console.error('Error fetching challenges:', err);
            }
        };
        fetchChallenges();
    }, [eventId]);

    return (
        <div>
            {eventDetails ? (
                <div>
                    <h2 className="mb-4">{eventDetails.title}</h2>
                    <Container>
                        <Tab.Container defaultActiveKey="overview">
                            <Nav variant="tabs" className="mb-4">
                                <Nav.Item><Nav.Link eventKey="overview" className="px-4">Overview</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link eventKey="prizes" className="px-4">Prizes</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link eventKey="schedule" className="px-4">Schedule</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link eventKey="importantdates" className="px-4">Important Dates</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link eventKey="challenges" className="px-4">Problem Statements</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link eventKey="results" className="px-4">Leaderboard</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link eventKey="Rules" className="px-4">Rules</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link eventKey="discuss" className="px-4">Discussions</Nav.Link></Nav.Item>
                            </Nav>

                            <Tab.Content>
                                <Tab.Pane eventKey="overview">
                                    <Row className="g-4">
                                        <CountdownTimer />
                                        {role === 'user' ? (
                                            <button className="btn btn-primary">Register now!</button>
                                        ) : (
                                            <p>Please register as Participant first</p>
                                        )}
                                        <Col md={6}>
                                            <img src={eventDetails.imgurl || "img"} alt="Event" className="img-fluid" />
                                            <h5>Open to All</h5>
                                            <h5>{eventDetails.registeredCount || 200} Registered</h5>
                                        </Col>
                                        <Col md={6}>
                                            <Card><Card.Body>
                                                <h5>{eventDetails.date}</h5>
                                                <h5>{eventDetails.type}</h5>
                                                <h5>Venue: {eventDetails.venue}</h5>
                                            </Card.Body></Card>
                                            <Card><Card.Body>
                                                <h4>Tech Stack</h4>
                                                <h5>{eventDetails.techstack}</h5>
                                            </Card.Body></Card>
                                            <Card><Card.Body>
                                                <h4>Getting started / To-dos</h4>
                                                <p>Create teams before the deadline, preferably of 3</p>
                                                <p>Choose a problem statement from the challenges tab</p>
                                                <p>Join the WhatsApp group</p>
                                            </Card.Body></Card>
                                            <Card><Card.Body>
                                                <p>Join the WhatsApp group here</p>
                                                {(role === 'user' || role === 'mentor') ? (
                                                    <button className="btn btn-success">Join group</button>
                                                ) : (
                                                    <p>To apply, please register as Participant first</p>
                                                )}
                                            </Card.Body></Card>
                                        </Col>
                                        <Col>
                                            <h4>Description</h4>
                                            <p>{eventDetails.description}</p>
                                            <h4>Requirements</h4>
                                            <ul>
                                                <li>What to build: {eventDetails.requirements?.build || "Details to be announced"}</li>
                                                <li>What to submit: {eventDetails.requirements?.submit || "GitHub link, demo video, etc."}</li>
                                            </ul>
                                            <h4>Judging Criteria</h4>
                                            <p>{eventDetails.judgingCriteria || "Criteria will be based on innovation, feasibility, and impact."}</p>
                                        </Col>
                                    </Row>
                                </Tab.Pane>

                                <Tab.Pane eventKey="prizes">
                                    <h4>Prizes</h4>
                                    {eventDetails.prizes?.length ? (
                                        <ul>
                                            {eventDetails.prizes.map((prize, idx) => (
                                                <li key={idx}>{prize}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No prizes listed.</p>
                                    )}
                                </Tab.Pane>

                                <Tab.Pane eventKey="schedule">
                                    <h4>Schedule</h4>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr><th>Date</th><th>Event</th></tr>
                                        </thead>
                                        <tbody>
                                            {eventDetails.schedule?.length ? (
                                                eventDetails.schedule.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td>{item.date}</td>
                                                        <td>{item.name}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr><td colSpan="2" className="text-center">No schedule details available.</td></tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Tab.Pane>

                                <Tab.Pane eventKey="challenges">
                                    <Challenges data={challenges} />
                                </Tab.Pane>

                                <Tab.Pane eventKey='results'>
                                    <Leaderboard />
                                </Tab.Pane>

                                <Tab.Pane eventKey='discuss'>
                                    <Community />
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Container>
                </div>
            ) : (
                <p>Loading event details...</p>
            )}
        </div>
    );
};

export default Displayevent;

{/* Add important dates with functions to make it visually appealing */}
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
              {/* <Card>
                                                <Card.Body>
                                                <button>Register now!</button>
                                                    {/* <h5>{selectedEvent?.type || "Offline"}</h5> 
                                                </Card.Body>
                                            </Card> */}