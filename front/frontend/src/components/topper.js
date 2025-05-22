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

const Displayevent = () => {
    const { eventId } = useParams();
    const { user } = useAuth();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const role = getUserRole();
    const userId = getUserId();

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/events/${eventId}`);
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setSelectedEvent(data[0]);
                    setIsRegistered(false);
                    if (userId && data[0].participants) {
                        const participantIds = data[0].participants.map(id => String(id));
                        const currentUserId = String(userId);
                        if (participantIds.includes(currentUserId)) {
                            setIsRegistered(true);
                        }
                    }
                } else {
                    setSelectedEvent(null);
                    setIsRegistered(false);
                }
            } catch (err) {
                setIsRegistered(false);
            }
        };
        fetchEventDetails();
    }, [eventId, userId]);

    if (!selectedEvent) {
        return (
            <Container className="py-5">
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
                    <div className="spinner-border text-primary me-3" role="status"></div>
                    <span>Loading event details or event not found...</span>
                </div>
            </Container>
        );
    }

    const handleRegister = async () => {
        if (!user || !userId) {
            alert("You must be logged in to register for an event.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/events/${eventId}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            if (response.ok) {
                alert('Successfully registered for the event!');
                setIsRegistered(true);
                const updatedEventResponse = await fetch(`http://localhost:5000/events/${eventId}`);
                const updatedEventData = await updatedEventResponse.json();
                if (Array.isArray(updatedEventData) && updatedEventData.length > 0) {
                    setSelectedEvent(updatedEventData[0]);
                    const updatedParticipants = updatedEventData[0].participants?.map(id => String(id)) || [];
                    setIsRegistered(updatedParticipants.includes(String(userId)));
                }
            } else {
                const errorData = await response.json();
                alert(`Failed to register: ${errorData.message}`);
            }
        } catch (err) {
            alert('An error occurred while trying to register.');
        }
    };

    return (
        <Container className="py-4">
            <Card className="shadow mb-4">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col md={4}>
                        <img
                                src={selectedEvent.imgUrl}
                                alt="Event"
                                className="img-fluid rounded shadow-sm mb-2"
                                style={{ maxHeight: "250px", objectFit: "cover" }}
                            />
                            {/* <h2 className="mb-2 fw-bold text-primary">{selectedEvent.title || "Event Title"}</h2> */}
                            <div className="mb-2">
                                <span className="badge bg-secondary me-2">Open to All</span>
                                <span className="badge bg-success">
                                    {selectedEvent.participants?.length || 0} Registered
                                </span>
                            </div>
                            <p className="text-muted mb-1">{selectedEvent.venue}</p>
                            <p className="mb-0">{selectedEvent.date}</p>
                        </Col>
                        <Col md={8} className="text-center">
                            
                            <CountdownTimer EventName={selectedEvent.title} EventDate={selectedEvent.date} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

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
                    <Nav.Item><Nav.Link eventKey="submission">Submission</Nav.Link></Nav.Item>
                </Nav>

                <Tab.Content>
                    <Tab.Pane eventKey="overview">
                        <Row>
                            <Col md={8}>
                                <Card className="mb-3 shadow-sm">
                                    <Card.Body>
                                        <h5 className="fw-bold mb-2">Description</h5>
                                        <p>{selectedEvent.desc || "Description not available."}</p>
                                        <h6 className="fw-bold mt-4">Requirements</h6>
                                        <ul>
                                            <li>GitHub link</li>
                                            <li>Project repository</li>
                                            <li>Video demo</li>
                                        </ul>
                                        <h6 className="fw-bold mt-4">Judging Criteria</h6>
                                        <ul>
                                            <li>Innovation</li>
                                            <li>Technical Complexity</li>
                                            <li>Presentation</li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="mb-3 shadow-sm">
                                    <CardBody>
                                        {new Date() <= new Date(selectedEvent.enddate) ? (
                                            isRegistered ? (
                                                <div className="alert alert-success mb-2 py-2 text-center">
                                                    You are registered for this event!
                                                </div>
                                            ) : (
                                                <button className="btn btn-primary w-100" 
                                                style={{ margin: "15px",fontSize: "0.75rem", padding: "0.25rem 0.5rem", minWidth: "fit-content", whiteSpace: "nowrap" }} 
                                                onClick={handleRegister}>
                                                    Register now!
                                                </button>
                                            )
                                        ) : (
                                            <div className="alert alert-danger mb-2 py-2 text-center">
                                                Registration closed.
                                            </div>
                                        )}
                                    </CardBody>
                                </Card>
                                {isRegistered && role === 'user' && selectedEvent.participants?.includes(userId) && (
                                    <Card className="mb-3 shadow-sm">
                                        <CardBody className="text-center">
                                            <a href={`/createteams/${eventId}`}>
                                                <button className="btn btn-primary" style={{ margin: "15px",fontSize: "0.75rem", padding: "0.25rem 0.5rem", minWidth: "fit-content", whiteSpace: "nowrap" }}>Create Team</button>
                                            </a>
                                        </CardBody>
                                    </Card>
                                )}
                                <Card className="mb-3 shadow-sm">
                                    <Card.Body>
                                        <h6 className="fw-bold">Getting started / To Dos</h6>
                                        <ul className="mb-0">
                                            <li>Create teams before the deadline</li>
                                            <li>Choose a challenge</li>
                                            <li>Join Whatsapp group</li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Tab.Pane>

                    <Tab.Pane eventKey="prizes">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h4 className="mb-3 text-primary"><Trophy className="me-2" />Prizes</h4>
                                {selectedEvent.prizes && selectedEvent.prizes.length > 0 ? (
                                    <ul className="list-group">
                                        {selectedEvent.prizes.map((prize, index) => (
                                            <li className="list-group-item d-flex align-items-center" key={index}>
                                                <span className={`badge bg-warning text-dark me-3 fs-5`}>{index + 1}</span>
                                                <span className="fw-bold text-black">{prize}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="alert alert-warning mt-3" role="alert">
                                        No prizes listed for this event.
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="schedule">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h4 className="text-primary">Schedule</h4>
                                {selectedEvent.scheduleDetails && selectedEvent.scheduleDetails.length > 0 ? (
                                    <Table striped bordered hover responsive>
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
                                    <div className="alert alert-warning mt-3" role="alert">
                                        No schedule details available.
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="importantdates">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h4 className="mb-3 text-primary">
                                    <i className="bi bi-calendar-event"></i> Important Dates
                                </h4>
                                {selectedEvent.importantdates && selectedEvent.importantdates.length > 0 ? (
                                    <ul className="list-group list-group-flush shadow-sm">
                                        {selectedEvent.importantdates.map((date, index) => (
                                            <li
                                                key={index}
                                                className="list-group-item d-flex align-items-center"
                                            >
                                                <span className="badge bg-info text-black me-3">{index + 1}</span>
                                                <span className="text-black">{date}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="alert alert-warning mt-3" role="alert">
                                        No important dates listed.
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="challenges">
                        <Challenges eventId={eventId} />
                    </Tab.Pane>

                    <Tab.Pane eventKey="results">
                        <Leaderboard eventId={eventId} />
                    </Tab.Pane>

                    <Tab.Pane eventKey="Rules">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h5 className="mb-2 text-primary">Event Rules</h5>
                                <p>Event rules will be displayed here.</p>
                            </Card.Body>
                        </Card>
                    </Tab.Pane>
                    
                    {/* Submissions Tab.Pane for different phases */}
                    <Tab.Pane eventKey="submission">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h5 className="mb-3 text-primary">Submissions</h5>
                                {selectedEvent.submissionPhases && selectedEvent.submissionPhases.length > 0 ? (
                                    <div>
                                        {selectedEvent.submissionPhases.map((phase, idx) => (
                                            <Card className="mb-3" key={idx}>
                                                <Card.Body>
                                                    <h6 className="fw-bold">{phase.name}</h6>
                                                    <p className="mb-1 text-muted">
                                                        {phase.startDate} - {phase.endDate}
                                                    </p>
                                                    <p>{phase.description}</p>
                                                    {/*  Show a submission form/button if phase is open */}
                                                    {isRegistered && new Date() >= new Date(phase.startDate) && new Date() <= new Date(phase.endDate) ? (
                                                        <button className="btn btn-success" onClick={() => window.location.href = '/submissionphase1' }
                                                        style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", minWidth: "fit-content", whiteSpace: "nowrap" }}>
                                                            Submit for {phase.name}
                                                        </button>
                                                    ) : (
                                                        <div className="alert alert-info py-1 mb-0">
                                                            {new Date() < new Date(phase.startDate)
                                                                ? "Submission not started yet."
                                                                : "Submission closed for this phase."}
                                                        </div>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="alert alert-warning" role="alert">
                                        No submission phases defined for this event.
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="discuss">
                        <Community eventId={eventId} />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Container>
    );
};

export default Displayevent;
