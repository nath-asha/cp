import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Nav, Tab, Row, Col, Table, CardBody, Button } from "react-bootstrap";
import { Users, ListChecks, Puzzle, FileCode, CalendarEvent } from "lucide-react";

function Organiserdash() {
    const [stats, setStats] = useState({ participants: 0, mentors: 0, problems: 0, submissions: 0, eventcount: 0 });
    const [events, setEvents] = useState([]);
    const [logistics, setLogistics] = useState([]);
    const [newLogisticsItem, setNewLogisticsItem] = useState('');

    useEffect(() => {
        axios.get("http://localhost:5000/api/stats")
            .then(response => setStats(response.data))
            .catch(error => console.error("Error fetching stats:", error));

        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/events');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setEvents(data);
            } catch (err) {
                console.error('Error fetching events data:', err);
            }
        };
        fetchEvents();

        const fetchLogistics = async () => {
            try {
                const response = await axios.get("http://localhost:5000/logistics");
                setLogistics(response.data);
            } catch (error) {
                console.error("Error fetching logistics:", error);
            }
        };
        fetchLogistics();

    }, []);

    const handleAddLogistics = () => {
        if (newLogisticsItem.trim()) {
            axios.post("http://localhost:5000/logistics", { item: newLogisticsItem, checked: false })
                .then(response => {
                    setLogistics([...logistics, response.data]);
                    setNewLogisticsItem('');
                })
                .catch(error => console.error("Error adding logistics item:", error));
        }
    };

    const handleLogisticsCheck = (id) => {
        const updatedLogistics = logistics.map(item => {
            if (item._id === id) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        setLogistics(updatedLogistics);
        const updatedItem = updatedLogistics.find(item => item._id === id);
        if (updatedItem) {
            axios.put(`http://localhost:5000/logistics/${id}`, { checked: updatedItem.checked })
                .catch(error => console.error("Error updating logistics item:", error));
        }
    };

    return (
        <Container fluid className="mt-4">
            <h2>Organiser Dashboard</h2>
            <Tab.Container id="dashboard-tabs" defaultActiveKey="registrations">
                <Nav variant="tabs">
                    <Nav.Item>
                        <Nav.Link eventKey="registrations">
                            <Users className="me-2" /> Registrations
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="logistics">
                            <ListChecks className="me-2" /> Logistics
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="events">
                         Events
                        </Nav.Link>
                    </Nav.Item>
                    {/* <Nav.Item>
                        <Nav.Link eventKey="problems">
                            <Puzzle className="me-2" /> Problems & Submissions
                        </Nav.Link>
                    </Nav.Item> */}
                </Nav>
                <Tab.Content className="mt-3">
                    <Tab.Pane eventKey="registrations">
                        <h4>Registration Overview</h4>
                        <Row xs={1} md={2} lg={4} className="g-4">
                            <Col>
                                <Card bg="primary" text="white" className="shadow">
                                    <Card.Body>
                                        <Card.Title>Participants</Card.Title>
                                        <Card.Text>
                                            <Users className="me-2" size={24} /> {stats.participants}
                                        </Card.Text>
                                        <Button variant="outline-light" size="sm" onClick={() => window.location.href = '/participantlist'}>Manage Participants</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card bg="success" text="white" className="shadow">
                                    <Card.Body>
                                        <Card.Title>Mentors</Card.Title>
                                        <Card.Text>
                                            <Users className="me-2" size={24} /> {stats.mentors}
                                        </Card.Text>
                                        <Button variant="outline-light" size="sm" onClick={() => window.location.href = '/mentorlist'}>Manage Mentors</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="logistics">
                        <h4>Logistics Management</h4>
                        <ul>
                            {logistics.map(item => (
                                <li key={item._id} className="d-flex align-items-center mb-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input me-2"
                                        checked={item.checked}
                                        onChange={() => handleLogisticsCheck(item._id)}
                                    />
                                    <span className={item.checked ? 'text-decoration-line-through' : ''}>{item.item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="d-flex">
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Add new item"
                                value={newLogisticsItem}
                                onChange={(e) => setNewLogisticsItem(e.target.value)}
                            />
                            <Button variant="primary" onClick={handleAddLogistics}>Add</Button>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="events">
                        <h4>Event Management</h4>
                        <p>Total Number of Events: {events.length}</p>
                        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                            {events.map(event => (
                                <Col key={event._id}>
                                    <Card className="shadow">
                                        {event.imgUrl && <Card.Img variant="top" src={event.imgUrl} alt={event.title} style={{ height: '150px', objectFit: 'cover' }} />}
                                        <Card.Body>
                                            <Card.Title>{event.title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Event ID: {event.eventId}</Card.Subtitle>
                                            <Card.Text>{event.desc && event.desc.length > 80 ? `${event.desc.substring(0, 80)}...` : event.desc}</Card.Text>
                                            <Card.Text><small className="text-muted">Date: {event.date}</small></Card.Text>
                                            <Card.Text><small className="text-muted">Venue: {event.venue}</small></Card.Text>
                                        </Card.Body>
                                        <Card.Footer className="bg-light border-top-0">
                                            {/* <Button variant="outline-primary" size="sm" onClick={() => window.location.href = '/eventlist'}>Manage Event</Button> */}
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <div className="mt-3">
                            <Button onClick={() => window.location.href = '/eventlist'}>Manage Events</Button>
                        </div>
                    </Tab.Pane>
                    {/* <Tab.Pane eventKey="problems">
                        <h4>Problems & Submissions Overview</h4>
                        <Row xs={1} md={2} className="g-4">
                            <Col>
                                <Card className="shadow">
                                    <Card.Body>
                                        <Card.Title>Problem Statements</Card.Title>
                                        <Card.Text>
                                            <Puzzle className="me-2" size={24} /> Total: {stats.problems}
                                        </Card.Text>
                                        <Button variant="outline-info" size="sm" onClick={() => window.location.href = '/problemlist'}>Manage Problems</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="shadow">
                                    <Card.Body>
                                        <Card.Title>Submissions</Card.Title>
                                        <Card.Text>
                                            <FileCode className="me-2" size={24} /> Total: {stats.submissions}
                                        </Card.Text>
                                        <Button variant="outline-warning" size="sm" onClick={() => window.location.href = '/submissionlist'}>Manage Submissions</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Tab.Pane> */}
                </Tab.Content>
            </Tab.Container>
            <div id="problems">
                        <h4>Problems & Submissions Overview</h4>
                        <Row xs={1} md={2} className="g-4">
                            <Col>
                                <Card className="shadow">
                                    <Card.Body>
                                        <Card.Title>Problem Statements</Card.Title>
                                        <Card.Text>
                                            <Puzzle className="me-2" size={24} /> Total: {stats.problems}
                                        </Card.Text>
                                        <Button variant="outline-info" size="sm" onClick={() => window.location.href = '/problemlist'}>Manage Problems</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="shadow">
                                    <Card.Body>
                                        <Card.Title>Submissions</Card.Title>
                                        <Card.Text>
                                            <FileCode className="me-2" size={24} /> Total: {stats.submissions}
                                        </Card.Text>
                                        <Button variant="outline-warning" size="sm" onClick={() => window.location.href = '/submissionlist'}>Manage Submissions</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
        </Container>
    );
}

export default Organiserdash;