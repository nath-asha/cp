// import React, { useState, useEffect } from "react";

// function ScoreRubric() {
//   const [eventId, setEventId] = useState("");
//   const [teamId, setTeamId] = useState("");
//   const [rubric, setRubric] = useState([]);
//   const [scores, setScores] = useState([]);
//   const [evaluatorName, setEvaluatorName] = useState("");
//   const [comments, setComments] = useState("");

//   useEffect(() => {
//     if (eventId) {
//       fetch(`http://localhost:5000/api/rubric-template/${eventId}`)
//         .then(res => res.json())
//         .then(data => {
//           const criteria = data.criteria || [];
//           setRubric(criteria);
//           setScores(criteria.map(c => ({ criterion: c.name, score: 0 })));
//         })
//         .catch(err => alert("Error fetching rubric: " + err.message));
//     }
//   }, [eventId]);

//   const handleScoreChange = (i, val) => {
//     const newScores = [...scores];
//     newScores[i].score = parseInt(val) || 0;
//     setScores(newScores);
//   };

//   const handleSubmit = () => {
//     if (!eventId || !teamId || !evaluatorName) {
//       alert("Please fill in Event ID, Team ID and Evaluator Name.");
//       return;
//     }

//     fetch(`http://localhost:5000/api/rubric-score/${eventId}/team/${teamId}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ scores, evaluatorName, comments }),
//     })
//       .then(res => res.json())
//       .then(data => {
//         alert(data.message || "Score submitted.");
//         setComments("");
//       })
//       .catch(err => alert("Error submitting score: " + err.message));
//   };

//   return (
//     <div style={{ padding: 20, maxWidth: "800px", margin: "auto" }}>
//       <h2>Rubric Scoring Table</h2>

//       <input
//         placeholder="Event ID"
//         value={eventId}
//         onChange={e => setEventId(e.target.value)}
//         style={{ marginRight: 10 }}
//       />
//       <input
//         placeholder="Team ID"
//         value={teamId}
//         onChange={e => setTeamId(e.target.value)}
//         style={{ marginRight: 10 }}
//       />
//       <input
//         placeholder="Evaluator Name"
//         value={evaluatorName}
//         onChange={e => setEvaluatorName(e.target.value)}
//       />
//       <br /><br />

//       <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", textAlign: "left" }}>
//         <thead>
//           <tr>
//             <th>Criterion</th>
//             <th>Description</th>
//             <th>Max Score</th>
//             <th>Score Given</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rubric.map((c, i) => (
//             <tr key={i}>
//               <td>{c.name}</td>
//               <td>{c.description || "-"}</td>
//               <td>{c.maxScore}</td>
//               <td>
//                 <input
//                   type="number"
//                   min="0"
//                   max={c.maxScore}
//                   value={scores[i]?.score || ""}
//                   onChange={e => handleScoreChange(i, e.target.value)}
//                   style={{ width: "60px" }}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <br />
//       <textarea
//         placeholder="Evaluator Comments"
//         rows={3}
//         style={{ width: "100%" }}
//         value={comments}
//         onChange={e => setComments(e.target.value)}
//       />
//       <br /><br />
//       <button onClick={handleSubmit}>Submit Score</button>
//     </div>
//   );
// }

// export default ScoreRubric;
import React, { useState, useEffect } from "react";
import { Card, Col, Row, Table, Form, Button, Spinner, Alert, Container } from 'react-bootstrap';
import { Github } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserRole, getUserId } from './auth';


function ScoreRubric() {
  const { eventId, teamId } = useParams();
  const [teams, setTeams] = useState([]);
  const [rubric, setRubric] = useState([]);
  const [scores, setScores] = useState([]);
  const [evaluatorName, setEvaluatorName] = useState("");
  const [comments, setComments] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [loadingRubric, setLoadingRubric] = useState(true);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const navigate = useNavigate();

  // Fetch evaluator name from signed-in user
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = getUserId();
        if (!userId) return;

        const response = await fetch(`http://localhost:5000/signups/${userId}`);
        if (!response.ok) {
          console.warn(`Failed to fetch user data. Status: ${response.status}`);
          return;
          console.log(userId);
        }

        const data = await response.json();
        if (data && data.firstName) {
          setEvaluatorName(data.firstName);
        } else {
          console.warn("No evaluator name found for this user.");
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  // Fetch rubric
  useEffect(() => {
    if (eventId) {
      setLoadingRubric(true);
      fetch(`http://localhost:5000/api/rubric-template/${eventId}`)
        .then(res => {
          if (!res.ok) throw new Error("Rubric not found");
          return res.json();
        })
        .then(data => {
          const criteria = data.criteria || [];
          setRubric(criteria);
          setScores(criteria.map(c => ({ criterion: c.name, score: 0 })));
        })
        .catch(err => setSubmitStatus({ type: "danger", message: "Error fetching rubric: " + err.message }))
        .finally(() => setLoadingRubric(false));
    }
  }, [eventId]);

  // Fetch teams
  useEffect(() => {
    const fetchTeams = async () => {
      setLoadingTeams(true);
      try {
        const response = await fetch(`http://localhost:5000/teams/${teamId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const team = await response.json();
        setTeams(team);
      } catch (err) {
        setSubmitStatus({ type: "danger", message: "Error fetching team data: " + err.message });
      } finally {
        setLoadingTeams(false);
      }
    };

    fetchTeams();
  }, [teamId]);

  // Fetch submissions for all teams in this event
  useEffect(() => {
    if (teamId) {
      setLoadingSubmissions(true);
      fetch(`http://localhost:5000/submissions/${teamId}`)
        .then(res => {
          if (!res.ok) throw new Error("Could not fetch submissions");
          return res.json();
        })
        .then(data => {
          setSubmissions(data);
        })
        .catch(err => {
          setSubmissions([]);
          setSubmitStatus({ type: "danger", message: "Error fetching submissions: " + err.message });
        })
        .finally(() => setLoadingSubmissions(false));
    }
  }, [teamId]);

  const handleScoreChange = (i, val) => {
    const newScores = [...scores];
    newScores[i].score = parseFloat(val) || 0;
    setScores(newScores);
  };

  const calculateTotalScore = () => {
    return scores.reduce((sum, s) => sum + (s.score || 0), 0);
  };

  const handleSubmit = () => {
    setSubmitStatus({ type: "", message: "" });
    if (!evaluatorName) {
      setSubmitStatus({ type: "warning", message: "Please fill in all required fields." });
      return;
    }

    const totalScore = calculateTotalScore();

    fetch(`http://localhost:5000/api/rubric-score/${eventId}/team/${teamId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scores,
        evaluatorName,
        comments,
        totalScore,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message?.toLowerCase().includes("error")) throw new Error(data.message);
        setSubmitStatus({ type: "success", message: "Score submitted successfully" });
        setComments("");
      })
      .catch(err => setSubmitStatus({ type: "danger", message: "Error submitting score: " + err.message }));
  };

  return (
    <Container style={{ paddingTop: 24, maxWidth: 950 }}>
      <h2 className="mb-4">Evaluation Rubrics</h2>

      {submitStatus.message && (
        <Alert variant={submitStatus.type} onClose={() => setSubmitStatus({ type: "", message: "" })} dismissible>
          {submitStatus.message}
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
                <h3>Evaluator Name</h3>
                <h4>{evaluatorName}</h4>
            </Col>
            <Col md={4}>
                <h3>Event ID</h3>
                <h4>{eventId}</h4>
            </Col>
            <Col md={4}>
              <h3>Event ID</h3>
                <h4>{teamId}</h4>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <h4 className="mb-3">Team Submissions for this Event</h4>
      <Card className="mb-4">
        <Card.Body>
          {loadingSubmissions ? (
            <div className="text-center"><Spinner animation="border" size="sm" /> Loading submissions...</div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Team ID</th>
                  <th>Team Name</th>
                  <th>Submission Title</th>
                  <th>Submitted At</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-muted">No submissions found for this event.</td>
                  </tr>
                ) : (
                  submissions.map((sub, idx) => (
                    <tr key={idx}>
                      <td>{sub.teamId || sub.team_id}</td>
                      <td>{sub.teamName || sub.name}</td>
                      <td>{sub.title || sub.submissionTitle || "-"}</td>
                      <td>{sub.submittedAt ? new Date(sub.createdAt).toLocaleString() : "-"}</td>
                      <td>
                        {sub.gitrepo ? (
                          <a href={sub.gitrepo} target="_blank" rel="noopener noreferrer">
                            <Github size={18} /> Repo
                          </a>
                        ) : sub.preport ? (
                          <a href={sub.preport} target="_blank" rel="noopener noreferrer">Report</a>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {loadingTeams ? (
        <div className="mb-4 text-center"><Spinner animation="border" size="sm" /> Loading team info...</div>
      ) : teams.length > 0 && (
        <>
          <Row className="mb-4">
            <Col md={6}>
              <Card>
                <Card.Body>
                  <h5 className="mb-2">Team Name: <span className="text-primary">{teams[currentTeamIndex].name}</span></h5>
                  <div>
                    <strong>Members:</strong>
                    <ul className="mb-0">
                      {teams[currentTeamIndex].members.map((member, idx) => (
                        <li key={member.user_id || member._id || idx}>
                          {member.name || member.user_id || member._id || JSON.stringify(member)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
      {/* <embed src={url} title="Document" width="100%" height="600px" /> */}
    </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <h5>Submission Details</h5>
              {submissions.length > 0 &&
                submissions
                  .filter((submission) => submission.teamId === teams[currentTeamIndex].teamId)
                  .map((submission) => (
                    <Card className="mb-3" key={submission._id}>
                      <Card.Body>
                        <h6>Title: {submission.title}</h6>
                        <p>
                          <strong>Github:</strong>{" "}
                          {submission.gitrepo ? (
                            <a href={submission.gitrepo} target="_blank" rel="noreferrer">
                              <Github size={18} />
                            </a>
                          ) : "-"}
                        </p>
                        <p>
                          <strong>Problem Statement:</strong> {submission.ps}
                        </p>
                        <p>
                          <strong>Description:</strong> {submission.projectdesc}
                        </p>
                        <p>
                          <strong>Links:</strong>{" "}
                          {submission.ppt && (
                            <a href={submission.ppt} target="_blank" rel="noreferrer" className="me-2">
                              Presentation
                            </a>
                          )}
                          {submission.preport && (
                            <a href={submission.preport} target="_blank" rel="noreferrer" className="me-2">
                              Report
                            </a>
                          )}
                          {submission.doc && (
                            <a href={submission.doc} target="_blank" rel="noreferrer">
                              Document
                            </a>
                          )}
                        </p>
                      </Card.Body>
                    </Card>
                  ))}
            </Col>
          </Row>
        </>
      )}

      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3">Rubric Scoring Table</h5>
          {loadingRubric ? (
            <div className="text-center"><Spinner animation="border" size="sm" /> Loading rubric...</div>
          ) : (
            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>Parameter</th>
                  <th>Description</th>
                  <th>Max Score</th>
                  <th>Score Given</th>
                </tr>
              </thead>
              <tbody>
                {rubric.map((c, i) => (
                  <tr key={i}>
                    <td>{c.name}</td>
                    <td>{c.description || "-"}</td>
                    <td>{c.maxScore}</td>
                    <td style={{ maxWidth: 100 }}>
                      <Form.Control
                        type="number"
                        min="0"
                        max={c.maxScore}
                        value={scores[i]?.score || ""}
                        onChange={e => handleScoreChange(i, e.target.value)}
                        style={{ width: "80px" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} className="text-end fw-bold">Total</td>
                  <td colSpan={2} className="fw-bold">{calculateTotalScore()}</td>
                </tr>
              </tfoot>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Form.Group>
            <Form.Label>Evaluator Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Evaluator Comments"
              value={comments}
              onChange={e => setComments(e.target.value)}
            />
          </Form.Group>
        </Card.Body>
      </Card>

      <div className="text-end mb-5">
        <Button variant="primary" onClick={handleSubmit}>
          Submit Score
        </Button>
      </div>
    </Container>
  );
}

export default ScoreRubric;