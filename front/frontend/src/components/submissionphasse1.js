import { useState, useEffect } from "react";
import { Form, Button, Alert, Card, Row, Col, ProgressBar, InputGroup } from "react-bootstrap";
import { FaProjectDiagram, FaLink, FaRegImage } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const token = sessionStorage.getItem("token");

const Submissionsphase1 = () => {
    const [submissions, setSubmissions] = useState({
        title: "",
        projectdesc: "",
        ps: "",
        thumbnail: "",
        team_id: "",
        gitrepo: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [deadline, setDeadline] = useState(null);
    const [problemStatements, setProblemStatements] = useState([]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSubmissions((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, gitrepo, projectdesc, ps } = submissions;
        if (!title || !gitrepo || !projectdesc || !ps) {
            alert("Please fill in all required fields.");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/submissions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(submissions),
            });
            if (response.ok) {
                setSubmitted(true);
                setSubmissions({
                    title: "",
                    projectdesc: "",
                    ps: "",
                    thumbnail: "",
                    team_id: "",
                    gitrepo: "",
                });
            } else {
                alert("Failed to submit.");
            }
        } catch (error) {
            alert("Error submitting form.");
        }
    };

    useEffect(() => {
        const fetchProblemStatements = async () => {
            try {
                const response = await fetch("http://localhost:5000/challenges", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setProblemStatements(data);
                }
            } catch {}
        };
        fetchProblemStatements();
        // Example deadline
        setDeadline(new Date(Date.now() + 1000 * 60 * 60 * 24));
    }, []);

    return (
        <div className="container mt-5">
            <Row className="justify-content-center">
                <Col md={8} lg={7}>
                    <Card className="shadow-lg">
                        <Card.Body>
                            <h2 className="mb-4 text-center text-primary">
                                <FaProjectDiagram className="mb-2" /> Project Submission
                            </h2>
                            <ProgressBar now={100} label="Phase 1" className="mb-4" variant="info" />
                            {submitted && (
                                <Alert variant="success" className="text-center">
                                    Submission successful! Thank you for submitting your project.
                                </Alert>
                            )}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <FaProjectDiagram className="me-2" />
                                        Project Title
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter project title"
                                        name="title"
                                        value={submissions.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <FaLink className="me-2" />
                                        GitHub Repository Link
                                    </Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text></InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder="github repository url"
                                            name="gitrepo"
                                            value={submissions.gitrepo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Describe your project"
                                        name="projectdesc"
                                        value={submissions.projectdesc}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Select Problem Statement</Form.Label>
                                    <Form.Select
                                        value={submissions.ps}
                                        onChange={(e) =>
                                            setSubmissions((prev) => ({ ...prev, ps: e.target.value }))
                                        }
                                        required
                                    >
                                        <option value="">Select problem statement</option>
                                        {problemStatements.map((ps) => (
                                            <option className="text-black" key={ps.track_id} value={ps.track_id}>
                                                {ps.title}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <FaRegImage className="me-2" />
                                        Thumbnail Link
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Drive link (ensure editor permissions)"
                                        name="thumbnail"
                                        value={submissions.thumbnail}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button type="submit" variant="primary" size="lg">
                                        Submit Project
                                    </Button>
                                </div>
                            </Form>
                            {deadline && (
                                <Alert variant="warning" className="mt-4 text-center">
                                    Deadline for this step: <b>{deadline.toLocaleString()}</b>
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Submissionsphase1;
