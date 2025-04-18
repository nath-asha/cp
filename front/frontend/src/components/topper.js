import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Nav, Tab, Row, Col, Table, CardBody } from "react-bootstrap";
import CountdownTimer from "./CountDown";
import { Trophy } from "lucide-react";
import { getUserRole } from "./auth";
import Community from "./community";
import Leaderboard from './Leaderboard';
import Challenges from "./challenges"; // Assuming this component handles fetching challenges
import { useParams } from "react-router-dom";

const Displayevent = () => {
    const { eventId } = useParams();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const role = getUserRole();

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
                                    {/* Assuming you have a way to track registered users */}
                                    <h5>190 Registered</h5>
                                </Col>
                                <Col md={6}>
                                <Card>
                                <CardBody>
                                            {role === 'user' ? (
                                    <button className="btn btn-primary btn-sm">Register now!</button>
                                ) : (
                                    <p>Please register as Participant first</p>
                                )}
                                        </CardBody>
                                </Card>
                                    <Card>
                                        <Card.Body>
                                            <h5>{selectedEvent.date}</h5>
                                            <h5>{selectedEvent.venue}</h5>
                                            {/* Assuming 'type' is not directly available in this data */}
                                            {/* <h5>{selectedEvent.type}</h5> */}
                                        </Card.Body>
                                    </Card>
                                    {/* Assuming techStack is not directly available in this data */}
                                    {/* <Card>
                                        <Card.Body>
                                            <h4>Tech Stack</h4>
                                            <h5>{selectedEvent.techStack}</h5>
                                        </Card.Body>
                                    </Card> */}
                                    <Card>
                                        <CardBody>
                                            <h4>Getting started / To Dos</h4>
                                            <p>Create teams before the deadline</p>
                                            <p>Choose a challenge</p>
                                            <p>Join Whatsapp group</p>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody>
                                            <p>Join WhatsApp Group</p>
                                            {role === 'user' || role === 'mentor' ? (
                                                <button className="btn btn-success">Join group</button>
                                            ) : (
                                                <p>To Apply, register as Participant first</p>
                                            )}
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
                                    {/* <img src="medals-gold-silver-bronze-illustration-champion-awards-first_33099-744.png"></img> */}
                                    {selectedEvent.prizes.map((prize, index) => (
                                        <h1 className="hero" key={index}><Trophy/>                 {index+1} : {prize}</h1>
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
                            {/* Add content for event rules here */}
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