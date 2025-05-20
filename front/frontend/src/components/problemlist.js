import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Form, Container, InputGroup } from "react-bootstrap";

const Problemlist = () => {
    const [problems, setProblems] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchEventId, setSearchEventId] = useState('');
    const [currentChallenge, setCurrentChallenge] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/challenges")
            .then(response => setProblems(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/challenges/${id}`);
            setProblems(problems.filter(problem => problem._id !== id));
        } catch (err) {
            console.error('Error deleting challenge:', err);
        }
    };

    const handleEdit = (problem) => {
        setCurrentChallenge(problem);
    };

    const filteredByTitle = problems.filter(problem =>
        problem.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
    const filteredByEventId = problems.filter(problem =>
        problem.eventId && problem.eventId.toLowerCase().includes(searchEventId.toLowerCase())
    );

    return (
        <Container className="my-4">
            <h2 className="mb-4 text-primary">Problem Statements</h2>
            <Row>
                <Col md={6}>
                    <Card className="mb-4 shadow-sm">
                        <Card.Body>
                            <Card.Title>Search by Title</Card.Title>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Search by Title"
                                    value={searchTitle}
                                    onChange={e => setSearchTitle(e.target.value)}
                                />
                            </InputGroup>
                            <Row>
                                {filteredByTitle.length === 0 && (
                                    <Col>
                                        <div className="text-muted">No problems found.</div>
                                    </Col>
                                )}
                                {filteredByTitle.map(problem => (
                                    <Col md={12} key={problem._id} className="mb-3">
                                        <Card className="h-100">
                                            <Card.Body>
                                                <Card.Title>{problem.title}</Card.Title>
                                                <Card.Text>{problem.description}</Card.Text>
                                                <div className="d-flex gap-2">
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        onClick={() => handleEdit(problem)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => {
                                                            if (window.confirm(`Are you sure you want to delete ${problem.title}?`)) {
                                                                handleDelete(problem._id);
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="mb-4 shadow-sm">
                        <Card.Body>
                            <Card.Title>Search by Event ID</Card.Title>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Search by Event ID"
                                    value={searchEventId}
                                    onChange={e => setSearchEventId(e.target.value)}
                                />
                            </InputGroup>
                            <Row>
                                {filteredByEventId.length === 0 && (
                                    <Col>
                                        <div className="text-muted">No problems found.</div>
                                    </Col>
                                )}
                                {filteredByEventId.map(problem => (
                                    <Col md={12} key={problem._id} className="mb-3">
                                        <Card className="h-100">
                                            <Card.Body>
                                                <Card.Title>{problem.title}</Card.Title>
                                                <Card.Text>{problem.description}</Card.Text>
                                                <div className="d-flex gap-2">
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        onClick={() => handleEdit(problem)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => {
                                                            if (window.confirm(`Are you sure you want to delete ${problem.title}?`)) {
                                                                handleDelete(problem._id);
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
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
    );
};

export default Problemlist;