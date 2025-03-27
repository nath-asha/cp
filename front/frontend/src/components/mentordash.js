import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Table, Badge, Nav, Tab, ProgressBar } from 'react-bootstrap';
import { Users, BookOpen, Award, Bell, User, FileText } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../provider/AuthProvider'; 

const MentorDashboard = () => {
    const { user } = useAuth(); // Get the logged-in user's details from AuthProvider
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mentorData, setMentorData] = useState({
        profile: {},
        students: [],
        teams: [],
        submissions: [],
        announcements: []
    });
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch teams and mentor-specific data
                const [teamsResponse, mentorResponse, notificationsResponse] = await Promise.all([
                    axios.get('http://localhost:5000/teams'),
                    axios.get(`http://localhost:5000/users/${user.email}`), // Fetch mentor data using logged-in user's email
                    axios.get('http://localhost:5000/notifications')
                ]);

                setTeams(teamsResponse.data);
                setMentorData({
                    ...mentorResponse.data,
                    profile: {
                        name: user.name, // Use logged-in user's name
                        email: user.email, // Use logged-in user's email
                        department: mentorResponse.data.department || "N/A",
                        expertise: mentorResponse.data.expertise || "N/A"
                    }
                });
                setNotifications(notificationsResponse.data);
            } catch (error) {
                console.error('Error fetching mentor data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

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
                                            <p className="text-center mb-0 opacity-75">{mentorData.profile.department}</p>
                                        </div>
                                        <Card.Body>
                                            <h5 className="mb-3">Expertise</h5>
                                            <div className="d-flex flex-wrap gap-2 mb-4">
                                                {mentorData.profile.skills.map((skill, index) => (
                                                    <Badge key={index} bg="light" text="dark" className="py-2 px-3">
                                                        {skill}
                                                    </Badge>
                                                ))}
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
                                                <span className="fw-bold">{mentorData.submissions.filter(s => s.status === "Pending Review").length}</span>
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
                                                {/* Add your chart component here */}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container>
        </div>
    );
};

export default MentorDashboard;
