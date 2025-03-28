import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Table, Badge, Form, Modal, ProgressBar, Nav, Tab, Alert } from 'react-bootstrap';
import { 
    Users, BookOpen, Award, Bell, User, MessageSquare, 
    Search, FileText, CheckSquare, AlertTriangle, 
    Clock, Mail, Calendar, GitBranch, Star 
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';

const MentorDashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [mentorData, setMentorData] = useState({
        profile: { name: '', email: '', skills: [] },
        students: [],
        teams: [],
        submissions: [],
        announcements: []
    });
    const [students, setStudents] = useState([]);
    const [teams, setTeams] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');

    // Sample data generation functions
    const generateStudentData = () => [
        { id: 'S001', name: 'Alex Chen', team: 'React Rockets', progress: 75, email: 'alex.chen@example.com' },
        { id: 'S002', name: 'Jordan Smith', team: 'Code Ninjas', progress: 60, email: 'jordan.smith@example.com' },
        { id: 'S003', name: 'Taylor Wong', team: 'Web Warriors', progress: 85, email: 'taylor.wong@example.com' },
        { id: 'S004', name: 'Riley Garcia', team: 'React Masters', progress: 70, email: 'riley.garcia@example.com' }
    ];

    const generateTeamData = () => [
        { 
            id: 'T001', 
            name: 'React Rockets', 
            members: 4, 
            project: 'E-Learning Platform', 
            progress: 75,
            skills: ['React', 'Node.js', 'MongoDB']
        },
        { 
            id: 'T002', 
            name: 'Code Ninjas', 
            members: 5, 
            project: 'Social Media Dashboard', 
            progress: 65,
            skills: ['React', 'Redux', 'Firebase']
        },
        { 
            id: 'T003', 
            name: 'Web Warriors', 
            members: 3, 
            project: 'Healthcare Management App', 
            progress: 80,
            skills: ['React Native', 'GraphQL', 'TypeScript']
        }
    ];

    const generateSubmissionsData = () => [
        { 
            id: 'SUB001', 
            title: 'Project Proposal', 
            team: 'React Rockets', 
            status: 'Pending Review', 
            submittedDate: '2025-03-15',
            type: 'document'
        },
        { 
            id: 'SUB002', 
            title: 'Prototype MVP', 
            team: 'Code Ninjas', 
            status: 'Reviewed', 
            submittedDate: '2025-03-10',
            type: 'code'
        },
        { 
            id: 'SUB003', 
            title: 'Final Presentation Deck', 
            team: 'Web Warriors', 
            status: 'Pending Review', 
            submittedDate: '2025-03-20',
            type: 'document'
        }
    ];

    const generateAnnouncementsData = () => [
        { 
            id: 'ANN001', 
            title: 'Midterm Project Check-in', 
            date: '2025-03-25', 
            time: '14:00', 
            description: 'Mandatory project status update for all teams'
        },
        { 
            id: 'ANN002', 
            title: 'React Workshop', 
            date: '2025-04-02', 
            time: '10:00', 
            description: 'Advanced React Hooks and Performance Optimization'
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate data fetching
                setStudents(generateStudentData());
                setTeams(generateTeamData());
                setSubmissions(generateSubmissionsData());
                
                setMentorData({
                    profile: {
                        name: user?.firstname || 'Mentor Name',
                        email: user?.email || 'mentor@example.com',
                        skills: ['React', 'JavaScript', 'Web Development']
                    },
                    students: generateStudentData(),
                    teams: generateTeamData(),
                    submissions: generateSubmissionsData(),
                    announcements: generateAnnouncementsData()
                });

                setNotifications([
                    { id: 'N001', message: 'New submission from React Rockets', read: false },
                    { id: 'N002', message: 'Team Code Ninjas updated project status', read: false }
                ]);
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const renderOverviewTab = () => (
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
                        <h5 className="mb-3">Quick Stats</h5>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Students:</span>
                            <span className="fw-bold">{students.length}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Teams:</span>
                            <span className="fw-bold">{teams.length}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Pending Submissions:</span>
                            <span className="fw-bold">{submissions.filter(s => s.status === 'Pending Review').length}</span>
                        </div>
                    </Card.Body>
                </Card>
            </Col>

            {/* Recent Submissions */}
            <Col md={8}>
                <Card className="shadow-sm border-0">
                    <Card.Body>
                        <h5 className="d-flex align-items-center mb-3">
                            <FileText size={20} className="me-2 text-primary" /> Recent Submissions
                        </h5>
                        <Table hover responsive>
                            <thead>
                                <tr>
                                    <th>Team</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.slice(0, 3).map(submission => (
                                    <tr key={submission.id}>
                                        <td>{submission.team}</td>
                                        <td>{submission.title}</td>
                                        <td>
                                            <Badge 
                                                bg={submission.status === 'Pending Review' ? 'warning' : 'success'}
                                            >
                                                {submission.status}
                                            </Badge>
                                        </td>
                                        <td>
                                            <Button variant="primary" size="sm">
                                                Review
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );

    const renderStudentsTab = () => (
        <Card>
            <Card.Header>
                <h4 className="d-flex align-items-center">
                    <Users className="me-2 text-primary" /> Student Management
                </h4>
            </Card.Header>
            <Card.Body>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Team</th>
                            <th>Progress</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.team}</td>
                                <td>
                                    <ProgressBar 
                                        now={student.progress} 
                                        label={`${student.progress}%`} 
                                        variant="primary" 
                                    />
                                </td>
                                <td>{student.email}</td>
                                <td>
                                    <Button variant="outline-primary" size="sm" className="me-2">
                                        View Details
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );

    const renderTeamsTab = () => (
        <Row>
            {teams.map(team => (
                <Col md={4} key={team.id} className="mb-4">
                    <Card className="h-100">
                        <Card.Header className="bg-primary text-white">
                            <h5 className="mb-0">{team.name}</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Members:</span>
                                <Badge bg="secondary">{team.members}</Badge>
                            </div>
                            <div className="mb-3">
                                <strong>Project:</strong> {team.project}
                            </div>
                            <div className="mb-3">
                                <strong>Skills:</strong>
                                <div className="d-flex flex-wrap gap-2 mt-2">
                                    {team.skills.map(skill => (
                                        <Badge key={skill} bg="light" text="dark">{skill}</Badge>
                                    ))}
                                </div>
                            </div>
                            <ProgressBar 
                                now={team.progress} 
                                label={`${team.progress}%`} 
                                variant="primary" 
                            />
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="outline-primary" className="w-100">
                                Team Details
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    );

    const renderSubmissionsTab = () => (
        <Card>
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">
                        <FileText className="me-2 text-primary" /> 
                        Submissions Tracker
                    </h4>
                    <Form.Select style={{ width: '200px' }}>
                        <option>Filter by Status</option>
                        <option>Pending Review</option>
                        <option>Reviewed</option>
                    </Form.Select>
                </div>
            </Card.Header>
            <Card.Body>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>Submission ID</th>
                            <th>Title</th>
                            <th>Team</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Submitted Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map(submission => (
                            <tr key={submission.id}>
                                <td>{submission.id}</td>
                                <td>{submission.title}</td>
                                <td>{submission.team}</td>
                                <td>
                                    <Badge bg={submission.type === 'code' ? 'info' : 'secondary'}>
                                        {submission.type}
                                    </Badge>
                                </td>
                                <td>
                                    <Badge 
                                        bg={submission.status === 'Pending Review' ? 'warning' : 'success'}
                                    >
                                        {submission.status}
                                    </Badge>
                                </td>
                                <td>{submission.submittedDate}</td>
                                <td>
                                    <Button variant="primary" size="sm">
                                        Review
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );

    const renderAnnouncementsTab = () => (
        <Card>
            <Card.Header>
                <h4 className="d-flex align-items-center">
                    <Bell className="me-2 text-primary" /> 
                    Announcements & Upcoming Events
                </h4>
            </Card.Header>
            <Card.Body>
                {mentorData.announcements.map(announcement => (
                    <Alert key={announcement.id} variant="light" className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-1">{announcement.title}</h5>
                            <p className="text-muted mb-0">{announcement.description}</p>
                            <small className="text-muted">
                                <Calendar size={14} className="me-1" />
                                {announcement.date} at {announcement.time}
                            </small>
                        </div>
                        <Button variant="outline-primary" size="sm">
                            Details
                        </Button>
                    </Alert>
                ))}
            </Card.Body>
        </Card>
    );

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
        <Container fluid className="dashboard bg-light min-vh-100 p-4">
            <Row className="mb-4">
                <Col>
                    <h1 className="display-6">
                        Mentor Dashboard - {mentorData.profile.name}
                    </h1>
                </Col>
            </Row>

            <Tab.Container defaultActiveKey="overview">
                <Nav variant="tabs" className="mb-4">
                    {['overview', 'students', 'teams', 'submissions', 'announcements'].map(tab => (
                        <Nav.Item key={tab}>
                            <Nav.Link eventKey={tab} className="text-capitalize">
                                {tab}
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>

                <Tab.Content>
                    <Tab.Pane eventKey="overview">
                        {renderOverviewTab()}
                    </Tab.Pane>
                    <Tab.Pane eventKey="students">
                        {renderStudentsTab()}
                    </Tab.Pane>
                    <Tab.Pane eventKey="teams">
                        {renderTeamsTab()}
                    </Tab.Pane>
                    <Tab.Pane eventKey="submissions">
                        {renderSubmissionsTab()}
                    </Tab.Pane>
                    <Tab.Pane eventKey="announcements">
                        {renderAnnouncementsTab()}
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Container>
    );
};

export default MentorDashboard;