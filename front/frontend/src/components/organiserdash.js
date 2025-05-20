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
            .then(response => {
            setStats(response.data);
            console.log(response);
            })
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
                    <Nav.Item>
                        <Nav.Link eventKey="problems">
                            <Puzzle className="me-2" /> Problems & Submissions
                        </Nav.Link>
                    </Nav.Item>
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
                                        <Button
                                            variant="outline-light"
                                            size="sm"
                                            style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", minWidth: "fit-content", whiteSpace: "nowrap" }}
                                            onClick={() => window.location.href = '/participantlist'}
                                        >
                                            Participants
                                        </Button>
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
                                        <Button
                                            variant="outline-light"
                                            size="sm"
                                            style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", minWidth: "fit-content", whiteSpace: "nowrap" }}
                                            onClick={() => window.location.href = '/mentorlist'}
                                        >
                                            Manage Mentor
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card bg="success" text="white" className="shadow">
                                    <Card.Body>
                                        <Card.Title>Problem Statements</Card.Title>
                                        <Card.Text>
                                            <Users className="me-2" size={24} /> {stats.problems}
                                        </Card.Text>
                                        <Row>
                                            <Col>
                                                <Button
                                                    variant="outline-light"
                                                    size="sm"
                                                    style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", minWidth: "fit-content", whiteSpace: "nowrap" }}
                                                    onClick={() => window.location.href = '/problemlist'}
                                                >
                                                    Manage PS
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button
                                                    variant="outline-light"
                                                    size="sm"
                                                    style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", minWidth: "fit-content", whiteSpace: "nowrap" }}
                                                    onClick={() => window.location.href = '/addchallenge'}
                                                >
                                                    Add PS
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card bg="primary" text="white" className="shadow">
                                    <Card.Body>
                                        <Card.Title>Submissions</Card.Title>
                                        <Card.Text>
                                            <Users className="me-2" size={24} /> {stats.submissions}
                                        </Card.Text>
                                        <Button
                                            variant="outline-light"
                                            size="sm"
                                            style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", minWidth: "fit-content", whiteSpace: "nowrap" }}
                                            onClick={() => window.location.href = '/submissionlist'}
                                        >
                                            Submissions
                                        </Button>
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
                            <Button
                                variant="primary"
                                size="sm"
                                style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", minWidth: "fit-content", whiteSpace: "nowrap" }}
                                onClick={handleAddLogistics}
                            >
                                Add
                            </Button>
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
                            <Button
                                size="sm"
                                style={{ fontSize: "0.75rem", padding: "0.25rem 0.75rem", minWidth: "fit-content", whiteSpace: "nowrap" }}
                                onClick={() => window.location.href = '/eventlist'}
                            >
                                Manage Events
                            </Button>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="problems">
                        <h4>Problems & Submissions Overview</h4>
                        <Row xs={1} md={2} className="g-4">
                            <Col>
                                <Card className="shadow">
                                    <Card.Body>
                                        <Card.Title>Problem Statements</Card.Title>
                                        <Card.Text>
                                            <Puzzle className="me-2" size={24} /> Total: {stats.problems}
                                        </Card.Text>
                                        <Button
                                            variant="outline-info"
                                            size="sm"
                                            style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", minWidth: "fit-content", whiteSpace: "nowrap" }}
                                            onClick={() => window.location.href = '/problemlist'}
                                        >
                                            Manage Problems
                                        </Button>
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
                                        <Button
                                            variant="outline-warning"
                                            size="sm"
                                            style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", minWidth: "fit-content", whiteSpace: "nowrap" }}
                                            onClick={() => window.location.href = '/submissionlist'}
                                        >
                                            Manage Submissions
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Container>
    );
}
export default Organiserdash;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Card, Container, Nav, Tab, Row, Col, Table, CardBody, Button } from "react-bootstrap";
// import { 
//     Users, ListChecks, Puzzle, FileCode, Calendar, 
//     Briefcase, DollarSign, MessageCircle, Target, ClipboardList, 
//     BarChart3, Percent, MapPin, CheckSquare, TrendingUp 
// } from "lucide-react";

// function Organiserdash() {
//     const [stats, setStats] = useState({ participants: 0, mentors: 0, problems: 0, submissions: 0, eventcount: 0 });
//     const [events, setEvents] = useState([]);
//     const [logistics, setLogistics] = useState([]);
//     const [newLogisticsItem, setNewLogisticsItem] = useState('');

//     // State for new dashboard sections
//     const [eventOverview, setEventOverview] = useState({
//         name: "Tech Innovate Summit 2024",
//         dates: "2024-10-26 to 2024-10-28",
//         location: "Virtual Conference Center",
//         totalBudget: 50000,
//     });
//     const [attendanceData, setAttendanceData] = useState({
//         totalRegistrations: 0,
//         attended: 0,
//         attendanceRate: "0%",
//     });
//     const [revenueData, setRevenueData] = useState({
//         totalRevenue: 0,
//         ticketSales: 0,
//         sponsorships: 0,
//         otherRevenue: 0,
//     });
//     const [engagementData, setEngagementData] = useState({
//         sessionAttendanceAvg: "N/A",
//         feedbackSurveysCompleted: 0,
//         socialMediaInteractions: 0,
//     });
//     const [sponsorshipMarketingData, setSponsorshipMarketingData] = useState({
//         sponsorshipROI: "N/A",
//         marketingCampaignPerformance: "N/A",
//         socialMediaReach: 0,
//     });
//     const [postEventAnalysisData, setPostEventAnalysisData] = useState({
//         eventROI: "N/A",
//         attendeeSatisfaction: "N/A",
//     });

//     useEffect(() => {
//         axios.get("http://localhost:5000/api/stats")
//             .then(response => setStats(response.data))
//             .catch(error => console.error("Error fetching stats:", error));

//         const fetchEvents = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/events');
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 setEvents(data);
//             } catch (err) {
//                 console.error('Error fetching events data:', err);
//             }
//         };
//         fetchEvents();

//         const fetchLogistics = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/logistics");
//                 setLogistics(response.data);
//             } catch (error) {
//                 console.error("Error fetching logistics:", error);
//             }
//         };
//         fetchLogistics();

//     }, []);

//     // useEffect to update new dashboard sections with mock data or derived from stats
//     useEffect(() => {
//         const currentParticipants = stats.participants || 0; // Ensure participants is a number
//         const attendedCount = Math.floor(currentParticipants * 0.75); // Mock 75% attendance

//         setAttendanceData({
//             totalRegistrations: currentParticipants,
//             attended: attendedCount,
//             attendanceRate: currentParticipants > 0 ? `${((attendedCount / currentParticipants) * 100).toFixed(1)}%` : "0%",
//         });

//         const ticketSales = 50 * currentParticipants; // Assuming $50 per ticket
//         const sponsorshipRevenue = 15000; // Mock sponsorship
//         const otherRevenueMock = 2000; // Mock other revenue
//         setRevenueData({
//             ticketSales: ticketSales,
//             sponsorships: sponsorshipRevenue,
//             otherRevenue: otherRevenueMock,
//             totalRevenue: ticketSales + sponsorshipRevenue + otherRevenueMock,
//         });

//         setEngagementData({
//             sessionAttendanceAvg: "70%",
//             feedbackSurveysCompleted: Math.floor(attendedCount * 0.4), // 40% survey completion of attended
//             socialMediaInteractions: 1250 + currentParticipants * 5, // Slightly dynamic
//         });

//         setSponsorshipMarketingData({
//             sponsorshipROI: "150%",
//             marketingCampaignPerformance: "5% CTR",
//             socialMediaReach: 25000 + currentParticipants * 10, // Slightly dynamic
//         });

//         setPostEventAnalysisData({
//             eventROI: "200%",
//             attendeeSatisfaction: "4.2/5",
//         });
        
//         // If you have a primary event from the events list, you could update eventOverview
//         if (events.length > 0) {
//             // setEventOverview(prev => ({...prev, name: events[0].title, dates: events[0].date, location: events[0].venue}));
//             // For now, keeping static eventOverview as set initially
//         }

//     }, [stats.participants, events]); // Recalculate when stats.participants or events change

//     const handleAddLogistics = () => {
//         if (newLogisticsItem.trim()) {
//             axios.post("http://localhost:5000/logistics", { item: newLogisticsItem, checked: false })
//                 .then(response => {
//                     setLogistics([...logistics, response.data]);
//                     setNewLogisticsItem('');
//                 })
//                 .catch(error => console.error("Error adding logistics item:", error));
//         }
//     };

//     const handleLogisticsCheck = (id) => {
//         const itemToUpdate = logistics.find(item => item._id === id);
//         if (itemToUpdate) {
//              axios.put(`http://localhost:5000/logistics/${id}`, { checked: !itemToUpdate.checked })
//                 .then(response => {
//                     setLogistics(logistics.map(item => item._id === id ? response.data : item));
//                 })
//                 .catch(error => console.error("Error updating logistics item:", error));
//         }
//     };

//     return (
//         <Container fluid className="mt-4 mb-5"> {/* Added mb-5 for bottom padding */}
//             <h2>Organiser Dashboard</h2>
//             <Tab.Container id="dashboard-tabs" defaultActiveKey="overview">
//                 <Nav variant="tabs" className="mb-3 flex-wrap"> {/* Added mb-3 and flex-wrap for better responsive tabs */}
//                     <Nav.Item>
//                         <Nav.Link eventKey="overview">
//                             <Briefcase className="me-2" /> Event Overview
//                         </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link eventKey="registrations">
//                             <Users className="me-2" /> Registration & Attendance
//                         </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link eventKey="sales">
//                             <DollarSign className="me-2" /> Sales & Revenue
//                         </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link eventKey="engagement">
//                             <MessageCircle className="me-2" /> Engagement & Feedback
//                         </Nav.Link>
//                     </Nav.Item>
//                      <Nav.Item>
//                         <Nav.Link eventKey="sponsorship">
//                             <Target className="me-2" /> Sponsorship & Marketing
//                         </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link eventKey="logistics">
//                             <ListChecks className="me-2" /> Logistics & Operations
//                         </Nav.Link>
//                     </Nav.Item>
//                      <Nav.Item>
//                         <Nav.Link eventKey="postevent">
//                             <ClipboardList className="me-2" /> Post-Event Analysis
//                         </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link eventKey="events">
//                          <Calendar className="me-2" /> Event Details
//                         </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link eventKey="problems">
//                             <Puzzle className="me-2" /> Problems & Submissions
//                         </Nav.Link>
//                     </Nav.Item>
//                 </Nav>
//                 <Tab.Content>
//                     <Tab.Pane eventKey="overview">
//                         <h4>Event Overview</h4>
//                         <Row xs={1} md={2} lg={3} className="g-4">
//                             <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title><Briefcase className="me-2" /> Event Name</Card.Title>
//                                         <Card.Text>{eventOverview.name}</Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title><Calendar className="me-2" /> Dates</Card.Title>
//                                         <Card.Text>{eventOverview.dates}</Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title><MapPin className="me-2" /> Location</Card.Title>
//                                         <Card.Text>{eventOverview.location}</Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title><DollarSign className="me-2" /> Total Budget</Card.Title>
//                                         <Card.Text>${eventOverview.totalBudget.toLocaleString()}</Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                              <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title><ListChecks className="me-2" /> Total Events Managed</Card.Title>
//                                         <Card.Text>{stats.eventcount}</Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         </Row>
//                     </Tab.Pane>

//                     <Tab.Pane eventKey="registrations">
//                         <h4>Registration & Attendance Overview</h4>
//                         <Row xs={1} md={2} lg={3} className="g-4">
//                             <Col>
//                                 <Card bg="primary" text="white" className="shadow">
//                                     <Card.Body>
//                                         <Card.Title>Total Registrations</Card.Title>
//                                         <Card.Text>
//                                             <Users className="me-2" size={24} /> {attendanceData.totalRegistrations}
//                                         </Card.Text>
//                                         <Button variant="outline-light" size="sm" onClick={() => window.location.href = '/participantlist'}>Manage Participants</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                              <Col>
//                                 <Card bg="info" text="white" className="shadow">
//                                     <Card.Body>
//                                         <Card.Title>Attendance Rate</Card.Title>
//                                         <Card.Text>
//                                             <Percent className="me-2" size={24} /> {attendanceData.attendanceRate}
//                                         </Card.Text>
//                                         <Card.Text><small>Attended: {attendanceData.attended} / Registered: {attendanceData.totalRegistrations}</small></Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col>
//                                 <Card bg="success" text="white" className="shadow">
//                                     <Card.Body>
//                                         <Card.Title>Mentors</Card.Title>
//                                         <Card.Text>
//                                             <Users className="me-2" size={24} /> {stats.mentors}
//                                         </Card.Text>
//                                         <Button variant="outline-light" size="sm" onClick={() => window.location.href = '/mentorlist'}>Manage Mentors</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title>Demographic Info</Card.Title>
//                                         <Card.Text>
//                                             <BarChart3 className="me-2" size={24} /> (Placeholder for demographic charts/data)
//                                         </Card.Text>
//                                          <Button variant="outline-secondary" size="sm" disabled>View Demographics</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         </Row>
//                     </Tab.Pane>

//                     <Tab.Pane eventKey="sales">
//                         <h4>Sales & Revenue</h4>
//                         <Row xs={1} md={2} lg={3} className="g-4">
//                             <Col>
//                                 <Card bg="warning" text="dark" className="shadow">
//                                     <Card.Body>
//                                         <Card.Title><DollarSign className="me-2" /> Total Revenue</Card.Title>
//                                         <Card.Text>${revenueData.totalRevenue.toLocaleString()}</Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title>Ticket Sales</Card.Title>
//                                         <Card.Text>${revenueData.ticketSales.toLocaleString()}</Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title>Sponsorships Revenue</Card.Title>
//                                         <Card.Text>${revenueData.sponsorships.toLocaleString()}</Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                              <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title>Other Revenue Streams</Card.Title>
//                                         <Card.Text>${revenueData.otherRevenue.toLocaleString()}</Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         </Row>
//                     </Tab.Pane>

//                     <Tab.Pane eventKey="engagement">
//                         <h4>Engagement & Feedback</h4>
//                         <Row xs={1} md={2} lg={3} className="g-4">
//                             <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title><BarChart3 className="me-2" /> Session Attendance (Avg)</Card.Title>
//                                         <Card.Text>{engagementData.sessionAttendanceAvg}</Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title><ClipboardList className="me-2" /> Feedback Surveys</Card.Title>
//                                         <Card.Text>Completed: {engagementData.feedbackSurveysCompleted}</Card.Text>
//                                          <Button variant="outline-secondary" size="sm" className="mt-2" onClick={() => alert("Navigate to survey results")}>View Survey Results</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title><MessageCircle className="me-2" /> Social Media Interactions</Card.Title>
//                                         <Card.Text>{engagementData.socialMediaInteractions.toLocaleString()}</Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         </Row>
//                     </Tab.Pane>
                    
//                     <Tab.Pane eventKey="sponsorship">
//                         <h4>Sponsorship & Marketing</h4>
//                         <Row xs={1} md={2} lg={3} className="g-4">
//                             <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title><Target className="me-2" /> Sponsorship ROI</Card.Title>
//                                         <Card.Text>{sponsorshipMarketingData.sponsorshipROI}</Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title><BarChart3 className="me-2" /> Marketing Campaign Performance</Card.Title>
//                                         <Card.Text>{sponsorshipMarketingData.marketingCampaignPerformance}</Card.Text>
//                                          <Button variant="outline-secondary" size="sm" className="mt-2" onClick={() => alert("View campaign details")}>Campaign Details</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title><Users className="me-2" /> Social Media Reach</Card.Title>
//                                         <Card.Text>{sponsorshipMarketingData.socialMediaReach.toLocaleString()}</Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                              <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title>Sponsorship Levels</Card.Title>
//                                         <Card.Text><ListChecks className="me-2" /> (Platinum: 5, Gold: 10, Silver: 15)</Card.Text> {/* Example data */}
//                                          <Button variant="outline-secondary" size="sm" className="mt-2" onClick={() => alert("Manage sponsorship packages")}>Manage Packages</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         </Row>
//                     </Tab.Pane>

//                     <Tab.Pane eventKey="logistics">
//                         <h4>Logistics & Operations Management</h4>
//                         <Row>
//                             <Col md={7}>
//                                 <h5>Logistics Checklist</h5>
//                                 <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
//                                     {logistics.map(item => (
//                                         <li key={item._id} className="d-flex align-items-center mb-2 p-2 border rounded">
//                                             <input
//                                                 type="checkbox"
//                                                 className="form-check-input me-3"
//                                                 style={{ transform: 'scale(1.2)'}}
//                                                 checked={item.checked}
//                                                 onChange={() => handleLogisticsCheck(item._id)}
//                                                 id={`logistics-${item._id}`}
//                                             />
//                                             <label htmlFor={`logistics-${item._id}`} className={item.checked ? 'text-decoration-line-through text-muted' : ''} style={{cursor: 'pointer'}}>{item.item}</label>
//                                         </li>
//                                     ))}
//                                      {logistics.length === 0 && <p>No logistics items yet. Add some below.</p>}
//                                 </ul>
//                                 <div className="d-flex mt-3">
//                                     <input
//                                         type="text"
//                                         className="form-control me-2"
//                                         placeholder="Add new logistics item"
//                                         value={newLogisticsItem}
//                                         onChange={(e) => setNewLogisticsItem(e.target.value)}
//                                     />
//                                     <Button variant="primary" onClick={handleAddLogistics}>Add Item</Button>
//                                 </div>
//                             </Col>
//                             <Col md={5}>
//                                 <h5 className="mt-3 mt-md-0">Efficiency Metrics</h5>
//                                 <Card className="shadow-sm mt-2">
//                                     <Card.Body>
//                                         <Card.Title><CheckSquare className="me-2" /> Logistics Efficiency</Card.Title>
//                                         <Card.Text className="mb-1">Venue Setup: <span className="badge bg-success">On Time</span></Card.Text>
//                                         <Card.Text className="mb-1">Vendor Performance: <span className="badge bg-primary">Good</span></Card.Text>
//                                         <Card.Text>Overall Status: <span className="badge bg-info">Smooth Operations</span></Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         </Row>
//                     </Tab.Pane>

//                     <Tab.Pane eventKey="postevent">
//                         <h4>Post-Event Analysis</h4>
//                         <Row xs={1} md={2} lg={3} className="g-4">
//                             <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title><TrendingUp className="me-2" /> Event ROI</Card.Title>
//                                         <Card.Text>{postEventAnalysisData.eventROI}</Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title><ClipboardList className="me-2" /> Attendee Satisfaction</Card.Title>
//                                         <Card.Text>{postEventAnalysisData.attendeeSatisfaction}</Card.Text>
//                                          <Button variant="outline-secondary" size="sm" className="mt-2" onClick={() => alert("View detailed satisfaction report")}>View Report</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col>
//                                 <Card className="shadow-sm">
//                                     <Card.Body>
//                                         <Card.Title><Calendar className="me-2" /> Future Event Planning</Card.Title>
//                                         <Card.Text>Key insights gathered for next event.</Card.Text>
//                                         <Button variant="outline-info" size="sm" className="mt-2" onClick={() => alert("Access planning documents")}>Access Insights</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         </Row>
//                     </Tab.Pane>
                    
//                     <Tab.Pane eventKey="events">
//                         <h4>Event Management</h4>
//                         <p>Total Number of Events Listed: {events.length}</p>
//                         <Row xs={1} md={2} lg={3} xl={4} className="g-4">
//                             {events.map(event => (
//                                 <Col key={event._id}>
//                                     <Card className="shadow h-100">
//                                         {event.imgUrl && <Card.Img variant="top" src={event.imgUrl} alt={event.title} style={{ height: '150px', objectFit: 'cover' }} />}
//                                         <Card.Body className="d-flex flex-column">
//                                             <Card.Title>{event.title}</Card.Title>
//                                             <Card.Subtitle className="mb-2 text-muted">Event ID: {event.eventId}</Card.Subtitle>
//                                             <Card.Text className="flex-grow-1">{event.desc && event.desc.length > 80 ? `${event.desc.substring(0, 80)}...` : event.desc}</Card.Text>
//                                             <Card.Text><small className="text-muted">Date: {new Date(event.date).toLocaleDateString()}</small></Card.Text>
//                                             <Card.Text><small className="text-muted">Venue: {event.venue}</small></Card.Text>
//                                         </Card.Body>
//                                         {/* <Card.Footer className="bg-light border-top-0">
//                                             <Button variant="outline-primary" size="sm" onClick={() => alert(`Manage Event: ${event.title}`)}>Manage Event</Button>
//                                         </Card.Footer> */}
//                                     </Card>
//                                 </Col>
//                             ))}
//                              {events.length === 0 && <Col><p>No events found or yet to load.</p></Col>}
//                         </Row>
//                         <div className="mt-4">
//                             <Button variant="primary" onClick={() => window.location.href = '/eventlist'}>Manage All Events</Button>
//                         </div>
//                     </Tab.Pane>

//                      <Tab.Pane eventKey="problems">
//                         <h4>Problems & Submissions Overview</h4>
//                         <Row xs={1} md={2} className="g-4">
//                             <Col>
//                                 <Card className="shadow">
//                                     <Card.Body>
//                                         <Card.Title>Problem Statements</Card.Title>
//                                         <Card.Text>
//                                             <Puzzle className="me-2" size={24} /> Total: {stats.problems}
//                                         </Card.Text>
//                                         <Button variant="outline-info" size="sm" onClick={() => window.location.href = '/problemlist'}>Manage Problems</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col>
//                                 <Card className="shadow">
//                                     <Card.Body>
//                                         <Card.Title>Submissions</Card.Title>
//                                         <Card.Text>
//                                             <FileCode className="me-2" size={24} /> Total: {stats.submissions}
//                                         </Card.Text>
//                                         <Button variant="outline-warning" size="sm" onClick={() => window.location.href = '/submissionlist'}>Manage Submissions</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         </Row>
//                     </Tab.Pane> 
//                 </Tab.Content>
//             </Tab.Container>
//         </Container>
//     );
// }

// export default Organiserdash;

//add deadlines in events page 
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Card, Container, Nav, Tab, Row, Col, Button, Form } from "react-bootstrap";
// import { Users, ListChecks, Puzzle, FileCode, CalendarEvent } from "lucide-react";

// function Organiserdash() {
//     const [stats, setStats] = useState({ participants: 0, mentors: 0, problems: 0, submissions: 0, eventcount: 0 });
//     const [events, setEvents] = useState([]);
//     const [logistics, setLogistics] = useState([]);
//     const [newLogisticsItem, setNewLogisticsItem] = useState('');
//     const [deadlines, setDeadlines] = useState({}); // State to manage deadlines

//     useEffect(() => {
//         axios.get("http://localhost:5000/api/stats")
//             .then(response => setStats(response.data))
//             .catch(error => console.error("Error fetching stats:", error));

//         const fetchEvents = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/events');
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 setEvents(data);
//             } catch (err) {
//                 console.error('Error fetching events data:', err);
//             }
//         };
//         fetchEvents();

//         const fetchLogistics = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/logistics");
//                 setLogistics(response.data);
//             } catch (error) {
//                 console.error("Error fetching logistics:", error);
//             }
//         };
//         fetchLogistics();
//     }, []);

//     const handleAddLogistics = () => {
//         if (newLogisticsItem.trim()) {
//             axios.post("http://localhost:5000/logistics", { item: newLogisticsItem, checked: false })
//                 .then(response => {
//                     setLogistics([...logistics, response.data]);
//                     setNewLogisticsItem('');
//                 })
//                 .catch(error => console.error("Error adding logistics item:", error));
//         }
//     };

//     const handleLogisticsCheck = (id) => {
//         const updatedLogistics = logistics.map(item => {
//             if (item._id === id) {
//                 return { ...item, checked: !item.checked };
//             }
//             return item;
//         });
//         setLogistics(updatedLogistics);
//         const updatedItem = updatedLogistics.find(item => item._id === id);
//         if (updatedItem) {
//             axios.put(`http://localhost:5000/logistics/${id}`, { checked: updatedItem.checked })
//                 .catch(error => console.error("Error updating logistics item:", error));
//         }
//     };

//     const handleDeadlineChange = (eventId, type, value) => {
//         setDeadlines(prev => ({
//             ...prev,
//             [eventId]: {
//                 ...prev[eventId],
//                 [type]: value
//             }
//         }));
//     };

//     const saveDeadline = (eventId, type) => {
//         const deadline = deadlines[eventId]?.[type];
//         if (deadline) {
//             axios.put(`http://localhost:5000/events/${eventId}/deadlines`, { type, deadline })
//                 .then(() => alert(`Deadline for ${type} updated successfully!`))
//                 .catch(error => console.error("Error updating deadline:", error));
//         }
//     };

//     return (
//         <Container fluid className="mt-4">
//             <h2>Organiser Dashboard</h2>
//             <Tab.Container id="dashboard-tabs" defaultActiveKey="registrations">
//                 <Nav variant="tabs">
//                     <Nav.Item>
//                         <Nav.Link eventKey="registrations">
//                             <Users className="me-2" /> Registrations
//                         </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link eventKey="logistics">
//                             <ListChecks className="me-2" /> Logistics
//                         </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link eventKey="events">
//                             Events
//                         </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                         <Nav.Link eventKey="problems">
//                             <Puzzle className="me-2" /> Problems & Submissions
//                         </Nav.Link>
//                     </Nav.Item>
//                 </Nav>
//                 <Tab.Content className="mt-3">
//                     <Tab.Pane eventKey="events">
//                         <h4>Event Management</h4>
//                         <p>Total Number of Events: {events.length}</p>
//                         <Row xs={1} md={2} lg={3} xl={4} className="g-4">
//                             {events.map(event => (
//                                 <Col key={event._id}>
//                                     <Card className="shadow">
//                                         {event.imgUrl && <Card.Img variant="top" src={event.imgUrl} alt={event.title} style={{ height: '150px', objectFit: 'cover' }} />}
//                                         <Card.Body>
//                                             <Card.Title>{event.title}</Card.Title>
//                                             <Card.Subtitle className="mb-2 text-muted">Event ID: {event.eventId}</Card.Subtitle>
//                                             <Card.Text>{event.desc && event.desc.length > 80 ? `${event.desc.substring(0, 80)}...` : event.desc}</Card.Text>
//                                             <Card.Text><small className="text-muted">Date: {event.date}</small></Card.Text>
//                                             <Card.Text><small className="text-muted">Venue: {event.venue}</small></Card.Text>
//                                             <Form.Group className="mb-2">
//                                                 <Form.Label>Registration Deadline</Form.Label>
//                                                 <Form.Control
//                                                     type="datetime-local"
//                                                     value={deadlines[event._id]?.registration || ''}
//                                                     onChange={(e) => handleDeadlineChange(event._id, 'registration', e.target.value)}
//                                                 />
//                                                 <Button
//                                                     variant="primary"
//                                                     size="sm"
//                                                     className="mt-2"
//                                                     onClick={() => saveDeadline(event._id, 'registration')}
//                                                 >
//                                                     Save
//                                                 </Button>
//                                             </Form.Group>
//                                             <Form.Group className="mb-2">
//                                                 <Form.Label>Submission Deadline</Form.Label>
//                                                 <Form.Control
//                                                     type="datetime-local"
//                                                     value={deadlines[event._id]?.submission || ''}
//                                                     onChange={(e) => handleDeadlineChange(event._id, 'submission', e.target.value)}
//                                                 />
//                                                 <Button
//                                                     variant="primary"
//                                                     size="sm"
//                                                     className="mt-2"
//                                                     onClick={() => saveDeadline(event._id, 'submission')}
//                                                 >
//                                                     Save
//                                                 </Button>
//                                             </Form.Group>
//                                             <Form.Group className="mb-2">
//                                                 <Form.Label>Team Formation Deadline</Form.Label>
//                                                 <Form.Control
//                                                     type="datetime-local"
//                                                     value={deadlines[event._id]?.teamFormation || ''}
//                                                     onChange={(e) => handleDeadlineChange(event._id, 'teamFormation', e.target.value)}
//                                                 />
//                                                 <Button
//                                                     variant="primary"
//                                                     size="sm"
//                                                     className="mt-2"
//                                                     onClick={() => saveDeadline(event._id, 'teamFormation')}
//                                                 >
//                                                     Save
//                                                 </Button>
//                                             </Form.Group>
//                                         </Card.Body>
//                                     </Card>
//                                 </Col>
//                             ))}
//                         </Row>
//                     </Tab.Pane>
//                 </Tab.Content>
//             </Tab.Container>
//         </Container>
//     );
// }

// export default Organiserdash;
