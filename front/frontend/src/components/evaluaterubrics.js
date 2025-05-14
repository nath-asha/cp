// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Card, Col, Row, ProgressBar, Button, Table } from 'react-bootstrap';
// import { useParams, useNavigate } from 'react-router-dom';

// const EvaluationRubrics = () => {
//     const [teams, setTeams] = useState([]);
//     const { teamId } = useParams();
//     const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
//     const [submitted, setSubmitted] = useState(false);
//     const [scores, setScores] = useState({});
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchTeams = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/teams/${teamId}`);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 // Ensure the response is an array
//                 setTeams(Array.isArray(data) ? data : [data]);
//             } catch (err) {
//                 console.error('Error fetching team data:', err);
//             }
//         };

//         fetchTeams();
//     }, [teamId]);

//     const handleInputChange = (event, rubric) => {
//         const { value } = event.target;
//         setScores((prevScores) => ({
//             ...prevScores,
//             [rubric]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`http://localhost:5000/teams/${teamId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(scores),
//             });
//             if (response.ok) {
//                 console.log('Scores submitted successfully');
//                 setSubmitted(true);
//             } else {
//                 console.error('Failed to submit scores');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const handleNextTeam = () => {
//         if (teams.length > 0) {
//             setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % teams.length);
//             setScores({});
//             setSubmitted(false);
//         }
//     };

//     const rubrics = [
//         { name: 'Frontend', key: 'frontScore' },
//         { name: 'Backend', key: 'backScore' },
//         { name: 'UI Design', key: 'uiScore' },
//         { name: 'Database Design', key: 'dbdesign' },
//         { name: 'Feedback', key: 'feedback' },
//     ];

//     return (
//         <div className="container mt-5">
//             <h1 className="text-center mb-4 text-black">Evaluation Portal</h1>

//             {teams.length > 0 ? (
//                 <>
//                     <Row className="mb-4">
//                         <Col md={6}>
//                             <Card className="p-3">
//                                 <h3>Team Name: {teams[currentTeamIndex]?.name || 'N/A'}</h3>
//                                 <h5>Members:</h5>
//                                 <ul>
//                                     {Array.isArray(teams[currentTeamIndex]?.members) ? (
//                                         teams[currentTeamIndex].members.map((member, index) => (
//                                             <li key={index}>{member}</li>
//                                         ))
//                                     ) : (
//                                         <li>No members available</li>
//                                     )}
//                                 </ul>
//                             </Card>
//                         </Col>
//                         <Col md={6}>
//                             <h6>Progress</h6>
//                             <ProgressBar
//                                 now={((currentTeamIndex + 1) / teams.length) * 100}
//                                 label={`${currentTeamIndex + 1} / ${teams.length}`}
//                             />
//                         </Col>
//                     </Row>

//                     <Row>
//                         <h2>Evaluation Rubrics</h2>
//                         <Table striped bordered hover>
//                             <thead>
//                                 <tr>
//                                     <th>Rubric</th>
//                                     <th>Score</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {rubrics.map((rubric) => (
//                                     <tr key={rubric.key}>
//                                         <td>{rubric.name}</td>
//                                         <td>
//                                             <input
//                                                 type="number"
//                                                 step="0.01"
//                                                 className="form-control"
//                                                 value={scores[rubric.key] || ''}
//                                                 onChange={(e) => handleInputChange(e, rubric.key)}
//                                             />
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </Table>
//                     </Row>

//                     <Button
//                         onClick={handleSubmit}
//                         className="btn btn-primary w-100 mb-3"
//                     >
//                         Submit Scores
//                     </Button>

//                     {submitted && (
//                         <div className="alert alert-success text-center">
//                             Scores submitted successfully!
//                         </div>
//                     )}

//                     <Button
//                         onClick={handleNextTeam}
//                         className="btn btn-secondary w-100 mt-3"
//                     >
//                         Next Team
//                     </Button>
//                 </>
//             ) : (
//                 <div className="alert alert-warning text-center">
//                     No teams available to evaluate.
//                 </div>
//             )}

//             <Button
//                 onClick={() => navigate('/mentordash')}
//                 className="btn btn-dark w-100 mt-4"
//             >
//                 Back to Dashboard
//             </Button>
//         </div>
//     );
// };

// export default EvaluationRubrics;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { useAuth } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom'; // Updated import

const EvaluationPortal = () => {
  const { user } = useAuth();  // Fetch the logged-in user (judge)
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [submissions, setSubmissions] = useState([]);
  const [rubrics, setRubrics] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [scores, setScores] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch submissions and rubric data
    const fetchData = async () => {
      try {
        // Fetch submissions, rubrics, and evaluation data
        const [submissionsRes, rubricsRes] = await Promise.all([
          axios.get('http://localhost:5000/submissions'), // Fetch all project submissions
          axios.get('http://localhost:5000/rubrics') // Fetch rubric structure
        ]);
        
        setSubmissions(submissionsRes.data);
        setRubrics(rubricsRes.data);
      } catch (error) {
        console.error('Error fetching submissions or rubrics:', error);
      }
    };
    
    fetchData();
  }, []);

  const handleGrading = (submissionId) => {
    setSelectedSubmission(submissions.find(sub => sub.id === submissionId));
    setShowModal(true);
  };

  const handleScoreChange = (rubricId, score) => {
    setScores({
      ...scores,
      [rubricId]: score
    });
  };

  const handleFinalizeScore = () => {
    // Finalize the score for this submission
    const finalScore = Object.values(scores).reduce((acc, score) => acc + score, 0);
    console.log(`Final score for ${selectedSubmission.title}: ${finalScore}`);

    // You can send the score to the server here, e.g., axios.post('/finalize-score', { submissionId: selectedSubmission.id, score: finalScore });

    // Close modal
    setShowModal(false);
  };

  return (
    <Container>
      <Row>
        <Col md={12} className="my-4">
          <h3>Evaluation Portal</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Project Title</th>
                <th>Mentor</th>
                <th>View Submission</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td>{submission.title}</td>
                  <td>{submission.mentor.name}</td>
                  <td>
                    <Button variant="info" onClick={() => handleGrading(submission.id)}>
                      View
                    </Button>
                  </td>
                  <td>
                    <Button variant="primary" onClick={() => handleGrading(submission.id)}>
                      Grade
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Grading Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Grading - {selectedSubmission?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <h5>Grading Rubric</h5>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Criteria</th>
                    <th>Excellent</th>
                    <th>Good</th>
                    <th>Average</th>
                    <th>Poor</th>
                  </tr>
                </thead>
                <tbody>
                  {rubrics.map((rubric) => (
                    <tr key={rubric.id}>
                      <td>{rubric.name}</td>
                      <td>
                        <Form.Check 
                          type="radio" 
                          name={`rubric-${rubric.id}`} 
                          value={4} 
                          checked={scores[rubric.id] === 4} 
                          onChange={() => handleScoreChange(rubric.id, 4)} 
                        />
                      </td>
                      <td>
                        <Form.Check 
                          type="radio" 
                          name={`rubric-${rubric.id}`} 
                          value={3} 
                          checked={scores[rubric.id] === 3} 
                          onChange={() => handleScoreChange(rubric.id, 3)} 
                        />
                      </td>
                      <td>
                        <Form.Check 
                          type="radio" 
                          name={`rubric-${rubric.id}`} 
                          value={2} 
                          checked={scores[rubric.id] === 2} 
                          onChange={() => handleScoreChange(rubric.id, 2)} 
                        />
                      </td>
                      <td>
                        <Form.Check 
                          type="radio" 
                          name={`rubric-${rubric.id}`} 
                          value={1} 
                          checked={scores[rubric.id] === 1} 
                          onChange={() => handleScoreChange(rubric.id, 1)} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFinalizeScore}>
            Finalize Score
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EvaluationPortal;
