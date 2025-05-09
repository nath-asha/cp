import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Row, ProgressBar, Button, Table } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const EvaluationRubrics = () => {
    const [teams, setTeams] = useState([]);
    const { teamId } = useParams();
    const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [scores, setScores] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(`http://localhost:5000/teams/${teamId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                // Ensure the response is an array
                setTeams(Array.isArray(data) ? data : [data]);
            } catch (err) {
                console.error('Error fetching team data:', err);
            }
        };

        fetchTeams();
    }, [teamId]);

    const handleInputChange = (event, rubric) => {
        const { value } = event.target;
        setScores((prevScores) => ({
            ...prevScores,
            [rubric]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/teams/${teamId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(scores),
            });
            if (response.ok) {
                console.log('Scores submitted successfully');
                setSubmitted(true);
            } else {
                console.error('Failed to submit scores');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleNextTeam = () => {
        if (teams.length > 0) {
            setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % teams.length);
            setScores({});
            setSubmitted(false);
        }
    };

    const rubrics = [
        { name: 'Frontend', key: 'frontScore' },
        { name: 'Backend', key: 'backScore' },
        { name: 'UI Design', key: 'uiScore' },
        { name: 'Database Design', key: 'dbdesign' },
        { name: 'Feedback', key: 'feedback' },
    ];

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 text-black">Evaluation Portal</h1>

            {teams.length > 0 ? (
                <>
                    <Row className="mb-4">
                        <Col md={6}>
                            <Card className="p-3">
                                <h3>Team Name: {teams[currentTeamIndex]?.name || 'N/A'}</h3>
                                <h5>Members:</h5>
                                <ul>
                                    {Array.isArray(teams[currentTeamIndex]?.members) ? (
                                        teams[currentTeamIndex].members.map((member, index) => (
                                            <li key={index}>{member}</li>
                                        ))
                                    ) : (
                                        <li>No members available</li>
                                    )}
                                </ul>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <h6>Progress</h6>
                            <ProgressBar
                                now={((currentTeamIndex + 1) / teams.length) * 100}
                                label={`${currentTeamIndex + 1} / ${teams.length}`}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <h2>Evaluation Rubrics</h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Rubric</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rubrics.map((rubric) => (
                                    <tr key={rubric.key}>
                                        <td>{rubric.name}</td>
                                        <td>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="form-control"
                                                value={scores[rubric.key] || ''}
                                                onChange={(e) => handleInputChange(e, rubric.key)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>

                    <Button
                        onClick={handleSubmit}
                        className="btn btn-primary w-100 mb-3"
                    >
                        Submit Scores
                    </Button>

                    {submitted && (
                        <div className="alert alert-success text-center">
                            Scores submitted successfully!
                        </div>
                    )}

                    <Button
                        onClick={handleNextTeam}
                        className="btn btn-secondary w-100 mt-3"
                    >
                        Next Team
                    </Button>
                </>
            ) : (
                <div className="alert alert-warning text-center">
                    No teams available to evaluate.
                </div>
            )}

            <Button
                onClick={() => navigate('/mentordash')}
                className="btn btn-dark w-100 mt-4"
            >
                Back to Dashboard
            </Button>
        </div>
    );
};

export default EvaluationRubrics;
