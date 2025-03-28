import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Table, Badge, Form, Modal, ProgressBar, Nav, Tab } from 'react-bootstrap';
import { Users, BookOpen, Award, Bell, User, MessageSquare, Search, FileText, CheckSquare, AlertTriangle } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Navigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider'; // for getting logged-in user details

const MentorDashboard = () => {
    const { emailid } = useParams();
    const { user } = useAuth(); // Get the logged-in user's details from AuthProvider
    const [teams, setTeams] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mentorData, setMentorData] = useState({
        profile: {
            name: '',
            email: '',
            skills: [],
        },
        students: [],
        teams: [],
        submissions: [],
        announcements: []
    });
    const [notifications, setNotifications] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [feedbackText, setFeedbackText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");

    // Sample chart data
    const teamProgressData = [
        { day: 1, 'Team Reactors': 20, 'Code Ninjas': 15, 'React Masters': 18 },
        { day: 2, 'Team Reactors': 35, 'Code Ninjas': 28, 'React Masters': 32 },
        { day: 3, 'Team Reactors': 48, 'Code Ninjas': 45, 'React Masters': 40 },
        { day: 4, 'Team Reactors': 62, 'Code Ninjas': 56, 'React Masters': 58 },
        { day: 5, 'Team Reactors': 70, 'Code Ninjas': 65, 'React Masters': 75 }
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (user && user.emailid) {
                    const [teamsResponse, mentorResponse, notificationsResponse, submissionsResponse] = await Promise.all([
                        axios.get('http://localhost:5000/teams'),
                        axios.get(`http://localhost:5000/users/${user.emailid}`),
                        axios.get('http://localhost:5000/notifications'),
                        axios.get('http://localhost:5000/submissions')
                    ]);

                    setTeams(teamsResponse.data);
                    setSubmissions(submissionsResponse.data);

                    setMentorData({
                        ...mentorResponse.data,
                        profile: {
                            name: user.firstname,
                            email: user.email,
                            skills: mentorResponse.data.skills || []
                        },
                        students: [
                            { id: "S1001", name: "Jordan Smith", team: "Team Reactors", progress: 75, lastActive: "Today, 10:30 AM" },
                            { id: "S1002", name: "Alex Chen", team: "Code Ninjas", progress: 65, lastActive: "Today, 9:15 AM" },
                            { id: "S1003", name: "Jamie Wong", team: "React Masters", progress: 80, lastActive: "Yesterday" },
                            { id: "S1004", name: "Taylor Reed", team: "Team Reactors", progress: 60, lastActive: "Today, 11:45 AM" },
                            { id: "S1005", name: "Casey Jones", team: "Code Ninjas", progress: 50, lastActive: "2 days ago" },
                            { id: "S1006", name: "Riley Garcia", team: "React Masters", progress: 70, lastActive: "Today, 8:20 AM" }
                        ],
                        teams: teamsResponse.data,
                        announcements: [
                            { id: "A1", title: "Workshop: Advanced React Hooks", date: "Mar 18, 2025", time: "2:00 PM", location: "Room 101" },
                            { id: "A2", title: "Submission Deadline Reminder", date: "Mar 20, 2025", time: "11:59 PM", type: "reminder" }
                        ]
                    });
                    setNotifications(notificationsResponse.data);
                }
            } catch (error) {
                console.error('Error fetching mentor data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleReviewSubmission = (submission) => {
        setSelectedSubmission(submission);
        setFeedbackText(submission.feedback || "");
        setShowModal(true);
    };

    const handleSubmitFeedback = () => {
        // send this to an API
        console.log(`Submitting feedback for ${selectedSubmission.submission_id}: ${feedbackText}`);
        setShowModal(false);
    };

    const filteredSubmissions = submissions.filter((sub) => {
        if (filter === "all") return true;
        if (filter === "pending") return sub.status === "Pending Review";
        if (filter === "reviewed") return sub.status === "Reviewed";
        if (filter === "code") return sub.type === "code";
        if (filter === "document") return sub.type === "document";
        return true;
    }).filter(sub => 
        sub.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        sub.team_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getProgressVariant = (progress) => {
        if (progress >= 80) return "success";
        if (progress >= 60) return "info";
        if (progress >= 40) return "warning";
        return "danger";
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard bg-light min-vh-100">
            {/* Header */}
            <div className="bg-primary text-white shadow-sm py-4 mb-4">
                <Container>
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="fs-3 mb-0">React-a-thon Mentor Dashboard</h1>
                        <div className="d-flex align-items-center">
                            <div className="position-relative me-3">
                                <Bell size={20} className="cursor-pointer" />
                                {notifications.filter(n => !n.read).length > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {notifications.filter(n => !n.read).length}
                                    </span>
                                )}
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="bg-white rounded-circle d-flex justify-content-center align-items-center me-2" style={{ width: '35px', height: '35px' }}>
                                    <User size={20} className="text-primary" />
                                </div>
                                <span>{mentorData.profile.name}</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <Container>
                <Tab.Container defaultActiveKey="overview">
                    <Nav variant="tabs" className="mb-4">
                        <Nav.Item>
                            <Nav.Link eventKey="overview" className="px-4">Overview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="students" className="px-4">Students</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="teams" className="px-4">Teams</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="submissions" className="px-4">Submissions</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="announcements" className="px-4">Announcements</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Tab.Content>
                        {/* Overview Tab */}
                        <Tab.Pane eventKey="overview">
                            <Row className="g-4">
                                {/* Mentor Profile Card */}
                                <Col md={4}>
                                    <Card className="shadow-sm border-0 h-100">
                                        <div className="bg-primary text-white p-4">
                                            <div className="d-flex justify-content-center mb-3">
                                                <div className="bg-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: '80px', height: '80px' }}>
                                                    <User size={40} className="text-primary" />
                                                </div>
                                            </div>
                                            <h4 className="text-center mb-1">{mentorData.profile.name}</h4>
                                            <p className="text-center mb-0 opacity-75">{mentorData.profile.email}</p>
                                        </div>
                                        <Card.Body>
                                            <h5 className="mb-3">Expertise</h5>
                                            <div className="d-flex flex-wrap gap-2 mb-4">
                                                {mentorData.profile.skills && mentorData.profile.skills.length > 0 ? (
                                                    mentorData.profile.skills.map((skill, index) => (
                                                        <Badge key={index} bg="light" text="dark" className="py-2 px-3">
                                                            {skill}
                                                        </Badge>
                                                    ))
                                                ) : (
                                                    <p>No skills available.</p>
                                                )}
                                            </div>
                                            
                                            <h5 className="mb-3">Quick Stats</h5>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Students:</span>
                                                <span className="fw-bold">{mentorData.students.length}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Teams:</span>
                                                <span className="fw-bold">{mentorData.teams.length}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span>Pending Reviews:</span>
                                                <span className="fw-bold">{submissions.filter(s => s.status === "Pending Review").length}</span>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                
                                {/* Teams Progress Chart */}
                                <Col md={8}>
                                    <Card className="shadow-sm border-0 h-100">
                                        <Card.Body>
                                            <h5 className="d-flex align-items-center mb-4">
                                                <Award size={20} className="me-2 text-primary" /> Team Progress Over Time
                                            </h5>
                                            <div style={{ height: '300px' }}>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={teamProgressData}>
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="day" />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Line type="monotone" dataKey="Team Reactors" stroke="#8884d8" activeDot={{ r: 8 }} />
                                                        <Line type="monotone" dataKey="Code Ninjas" stroke="#82ca9d" />
                                                        <Line type="monotone" dataKey="React Masters" stroke="#ff7300" />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                
                                {/* Recent Submissions */}
                                <Col md={6}>
                                    <Card className="shadow-sm border-0">
                                        <Card.Body>
                                            <h5 className="d-flex align-items-center mb-3">
                                                <FileText size={20} className="me-2 text-primary" /> Recent Submissions
                                            </h5>
                                            <div className="table-responsive">
                                                <Table hover className="align-middle">
                                                    <thead>
                                                        <tr>
                                                            <th>Team</th>
                                                            <th>Title</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {submissions.slice(0, 5).map((submission) => (
                                                            <tr key={submission.submission_id}>
                                                                <td>{submission.team_name}</td>
                                                                <td>{submission.title}</td>
                                                                <td>
                                                                    <Badge bg={submission.status === 'Pending Review' ? 'warning' : 'success'}>
                                                                        {submission.status}
                                                                    </Badge>
                                                                </td>
                                                                <td>
                                                                    <Link to={`/evaluation/${submission.submission_id}`}>
                                                                        <Button variant="primary" size="sm">
                                                                            Review
                                                                        </Button>
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Tab.Pane>
                        {/* Placeholder for other tab panes */}
                        <Tab.Pane eventKey="students">
                            <h3>Students Tab Content</h3>
                        </Tab.Pane>
                        <Tab.Pane eventKey="teams">
                            <h3>Teams Tab Content</h3>
                        </Tab.Pane>
                        <Tab.Pane eventKey="submissions">
                            <h3>Submissions Tab Content</h3>
                        </Tab.Pane>
                        <Tab.Pane eventKey="announcements">
                            <h3>Announcements Tab Content</h3>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container>

            {/* Feedback Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Submit Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Feedback</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                placeholder="Enter your feedback"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmitFeedback}>
                        Submit Feedback
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MentorDashboard;