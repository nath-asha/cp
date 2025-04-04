import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, ProgressBar, Badge, Dropdown } from 'react-bootstrap';
import { Calendar, User, BookOpen, Users, Award, Bell } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DynamicChart from './charts';
import Teammanager from './teammanager';
import { useAuth } from '../provider/AuthProvider';

const Dashboard = () => {
    const {user} = useAuth();
    const [data, setData] = useState({
        submissions: [],
        teamRequests: [],
        scores: [],
        leaderboard: [],
        profile: {},
        mentor: {}
    });
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false); // State to toggle notifications dropdown

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [dashboardData, teamData, submissionData, notificationData] = await Promise.all([
                    axios.get('http://localhost:5000/api/dashboard-data'),
                    axios.get('http://localhost:5000/teams'),
                    axios.get('http://localhost:5000/submissions'),
                    axios.get('http://localhost:5000/notifications')
                ]);

                setData({
                    ...dashboardData.data,
                teams: teamData.data || [],
                submissions: submissionData.data || [],
                teamRequests: teamData.data || [],
                notifications: notificationData.data || [],
                profile: dashboardData.data.profile?.username ? dashboardData.data.profile : {},
                mentor: dashboardData.data.mentor?.name ? dashboardData.data.mentor : {}
            // {
                    //     username: "Jordan Smith",
                    //     email: "jordan@example.com",
                    //     _id: "P12345",
                    //     team: "Team Hackers"
                    // },
                    // mentor: dashboardData.data.mentor.name ? dashboardData.data.mentor : []
                    // {
                    //     name: "Dr. Alex Johnson",
                    //     email: "alex@mentor.edu"
                    // }
                });
                setNotifications(notificationData.data);
            } catch (error) {
                console.error('Error fetching dashboard data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Submitted': return 'success';
            case 'In Review': return 'warning';
            case 'Rejected': return 'danger';
            default: return 'primary';
        }
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
            <div className="bg-primary text-white shadow-sm py-4 mb-4">
                <Container>
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="fs-3 mb-0">React-a-thon Dashboard</h1>
                        <div className="d-flex align-items-center">
                            <div className="position-relative me-3">
                                <Bell size={20} className="cursor-pointer" onClick={toggleNotifications} />
                                {notifications.filter(n => !n.read).length > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {notifications.filter(n => !n.read).length}
                                    </span>
                                )}
                                {showNotifications && (
                                    <div className="dropdown-menu dropdown-menu-end show" style={{ position: 'absolute', top: '30px', right: '0px', zIndex: 1050 }}>
                                        <div className="dropdown-header d-flex justify-content-between align-items-center">
                                            <span>Notifications</span>
                                            <Button variant="link" size="sm" onClick={markAllAsRead}>Mark all as read</Button>
                                        </div>
                                        {notifications.length > 0 ? (
                                            notifications.map((notification, index) => (
                                                <div key={index} className={`dropdown-item ${notification.read ? '' : 'bg-light'}`}>
                                                    <p className="mb-0">{notification.message}</p>
                                                    <small className="text-muted">{notification.timestamp}</small>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="dropdown-item text-center text-muted">
                                                No notifications
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="bg-white rounded-circle d-flex justify-content-center align-items-center me-2" style={{ width: '35px', height: '35px' }}>
                                    <User size={20} className="text-primary" />
                                </div>
                                <span>{data.profile.username}</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <Container>
                <Row className="g-4">
                    {/* Profile & Mentor Card */}
                    <Col md={4}>
                        <Card className="shadow-sm h-100 border-0 overflow-hidden">
                            <div className="bg-primary text-white p-4">
                                <div className="d-flex justify-content-center mb-3">
                                    <div className="bg-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: '80px', height: '80px' }}>
                                        <User size={40} className="text-primary" />
                                    </div>
                                </div>
                                <h4 className="text-center mb-1">{data.profile.username}</h4>
                                <p className="text-center mb-0 opacity-75">{data.profile.email}</p>
                                <p className="text-center mb-0 opacity-75">ID: {data.profile._id}</p>
                                <p className="text-center mb-0 opacity-75">Team: {data.profile.team}</p>
                            </div>
                            <Card.Body className="bg-white">
                                <h5 className="d-flex align-items-center mb-3">
                                    <Award size={20} className="me-2 text-primary" /> Your Mentor
                                </h5>
                                <div className="d-flex align-items-center">
                                    <div className="bg-light rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: '50px', height: '50px' }}>
                                        <User size={25} className="text-primary" />
                                    </div>
                                    <div>
                                        <h6 className="mb-0">{data.mentor.name}</h6>
                                        <p className="mb-0 text-muted small">{data.mentor.email}</p>
                                    </div>
                                </div>
                                <div className="d-grid mt-3">
                                    <Button variant="outline-primary" size="sm">Contact Mentor</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Chart Card */}
                    <Col md={8}>
                        <Card className="shadow-sm h-100 border-0">
                            <Card.Body>
                                <h5 className="d-flex align-items-center mb-3">
                                    <Calendar size={20} className="me-2 text-primary" /> Progress Overview
                                </h5>
                                <div style={{ height: '250px' }}>
                                    <DynamicChart />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Progress Metrics */}
                    <Col md={6}>
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <h5 className="d-flex align-items-center mb-3">
                                    <BookOpen size={20} className="me-2 text-primary" /> Progress Metrics
                                </h5>
                                
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span>Code Completion</span>
                                        <span>75%</span>
                                    </div>
                                    <ProgressBar variant="success" now={75} className="mb-3" />
                                    
                                    <div className="d-flex justify-content-between mb-1">
                                        <span>Testing</span>
                                        <span>50%</span>
                                    </div>
                                    <ProgressBar variant="info" now={50} className="mb-3" />
                                    
                                    <div className="d-flex justify-content-between mb-1">
                                        <span>Documentation</span>
                                        <span>25%</span>
                                    </div>
                                    <ProgressBar variant="warning" now={25} className="mb-3" />
                                    
                                    <div className="d-flex justify-content-between mb-1">
                                        <span>Presentation</span>
                                        <span>10%</span>
                                    </div>
                                    <ProgressBar variant="danger" now={10} />
                                </div>
                                
                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <div>
                                        <h6 className="mb-0">Overall Completion</h6>
                                        <p className="text-muted mb-0 small">Last updated: Today at 10:30 AM</p>
                                    </div>
                                    <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: '60px', height: '60px' }}>
                                        <h3 className="mb-0">48%</h3>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Submissions */}
                    <Col md={6}>
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <h5 className="d-flex align-items-center mb-3">
                                    <BookOpen size={20} className="me-2 text-primary" /> Submissions
                                </h5>
                                
                                {data.submissions.map((submission, index) => (
                                    // {mentors.map((m, index) => (
                                    //     m.role === 'Mentor' ? (
                                    //     <tr key={m._id}>
                                    submission.team_id==='user.team_id'?(
                                    <Card key={index} className="mb-3 border-0 shadow-sm">
                                        <Card.Body>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6 className="mb-1">{submission.title}</h6>
                                                    <Badge bg={getStatusColor(submission.status)}>{submission.status}</Badge>
                                                </div>
                                                {submission.score !== null && (
                                                    <div className="bg-light rounded-circle d-flex justify-content-center align-items-center" style={{ width: '45px', height: '45px' }}>
                                                        <h6 className="mb-0">{submission.score}</h6>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="d-flex mt-3">
                                                <Button variant="outline-primary" size="sm" className="me-2">View</Button>
                                                {submission.status !== 'Submitted' && (
                                                    <Button variant="primary" size="sm">Edit</Button>
                                                )}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    )  : null 
                            ))}
                                
                                <div className="d-grid mt-3">
                                    <Button variant="primary">New Submission</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <div className='row-md-4'>
                        <div className='col'>
                        <Teammanager />
                        </div>
                    </div>

                    {/* Team Requests */}
                    <Col md={12}>
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <h5 className="d-flex align-items-center mb-3">
                                    <Users size={20} className="me-2 text-primary" /> Team Requests
                                </h5>
                                
                                <Row xs={1} md={2} lg={3} className="g-3">
                                    {data.teamRequests.map((request, index) => (
                                        <Col key={index}>
                                            <Card className="h-100 border-0 shadow-sm">
                                                <Card.Body>
                                                    <div className="d-flex align-items-center mb-3">
                                                        <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: '40px', height: '40px' }}>
                                                            <User size={20} />
                                                        </div>
                                                        <div>
                                                            <h6 className="mb-0">{request.requestedBy}</h6>
                                                            <Badge bg="info" className="mt-1">{request.teamName}</Badge>
                                                        </div>
                                                    </div>
                                                    <p className="small text-muted mb-3">
                                                        Wants to join your team for the React-a-thon challenge
                                                    </p>
                                                    <div className="d-flex">
                                                        <Button variant="success" className="me-2" size="sm">Accept</Button>
                                                        <Button variant="outline-danger" size="sm">Decline</Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;