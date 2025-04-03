import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Row, ProgressBar, Button } from 'react-bootstrap';
import { Github, File, Video } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const EvaluationPortal = () => {
  const [teams, setTeams] = useState([]);
  const { teamId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [scores, setScores] = useState({
    frontScore: "",
    backScore: "",
    uiScore: "",
    dbdesign: "",
    feedback: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`http://localhost:5000/teams/${teamId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const team = await response.json();
        setTeams(team);
      } catch (err) {
        console.error('Error fetching team data:', err);
      }
    };

    fetchTeams();
  }, [teamId]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/submissions/${teamId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setSubmissions(data);
      } catch (err) {
        console.error('Error fetching submissions data:', err);
      }
    };

    fetchSubmissions();
  }, [teamId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setScores((scores) => ({
      ...scores,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(scores).every((value) => value)) {
      setValid(true);
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
        } else {
          console.error('Failed to submit scores');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    setSubmitted(true);
  };

  const handleNextTeam = () => {
    setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % teams.length);
    setScores({
      frontScore: "",
      backScore: "",
      uiScore: "",
      dbdesign: "",
      feedback: "",
    });
    setSubmitted(false);
    setValid(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Evaluation Portal</h1>

      {teams.length > 0 && (
        <>
          <Row className="mb-4">
            <Col md={6}>
              <Card className="p-3">
                <h3>Team Name: {teams[currentTeamIndex].name}</h3>
                <h5>Members:</h5>
                <ul>
                  {teams[currentTeamIndex].members.map((member) => (
                    <li key={member}>{member}</li>
                  ))}
                </ul>
              </Card>
            </Col>
            <Col md={6}>
              <ProgressBar
                now={((currentTeamIndex + 1) / teams.length) * 100}
                label={`${currentTeamIndex + 1} / ${teams.length}`}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <h2>Submission Details</h2>
            {submissions.length > 0 &&
              submissions
                .filter((submission) => submission.teamId === teams[currentTeamIndex].teamId)
                .map((submission) => (
                  <Col md={6} key={submission._id}>
                    <Card className="p-3 mb-3">
                      <h4>Title: {submission.title}</h4>
                      <p>
                        <strong>Github:</strong>{" "}
                        <a href={submission.gitrepo} target="_blank" rel="noreferrer">
                          <Github />
                        </a>
                      </p>
                      <p>
                        <strong>Problem Statement:</strong> {submission.ps}
                      </p>
                      <p>
                        <strong>Description:</strong> {submission.projectdesc}
                      </p>
                      <p>
                        <strong>Links:</strong>{" "}
                        <a href={submission.ppt} target="_blank" rel="noreferrer">
                          Presentation
                        </a>
                        {" | "}
                        <a href={submission.preport} target="_blank" rel="noreferrer">
                          Report
                        </a>
                        {" | "}
                        <a href={submission.doc} target="_blank" rel="noreferrer">
                          Document
                        </a>
                      </p>
                    </Card>
                  </Col>
                ))}
          </Row>

          <Row>
            <h2>Evaluation Form</h2>
            <form onSubmit={handleSubmit} className="w-100">
              <Row>
                <Col md={6}>
                  <input
                    className="form-control mb-3"
                    type="number"
                    placeholder="Frontend Score"
                    name="frontScore"
                    value={scores.frontScore}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md={6}>
                  <input
                    className="form-control mb-3"
                    type="number"
                    placeholder="Backend Score"
                    name="backScore"
                    value={scores.backScore}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md={6}>
                  <input
                    className="form-control mb-3"
                    type="number"
                    placeholder="UI Score"
                    name="uiScore"
                    value={scores.uiScore}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md={6}>
                  <input
                    className="form-control mb-3"
                    type="number"
                    placeholder="DB Design Score"
                    name="dbdesign"
                    value={scores.dbdesign}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md={12}>
                  <textarea
                    className="form-control mb-3"
                    placeholder="Feedback"
                    name="feedback"
                    value={scores.feedback}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </Col>
              </Row>
              <Button type="submit" className="btn btn-primary w-100 mb-3">
                Submit Scores
              </Button>
            </form>
          </Row>

          {submitted && valid && (
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

export default EvaluationPortal;


// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Card, CardBody, CardImg, CardText, Col, Row } from 'react-bootstrap';
// import { Github, File, Video } from 'lucide-react';
// import { useParams } from 'react-router-dom';

// const EvaluationPortal = () => {
//     const [teams, setTeams] = useState([]);
//     const { teamId } = useParams();
//     const [submissions, setSubmissions] = useState([]);
//     const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
//     const [submitted, setSubmitted] = useState(false);
//     const [valid, setValid] = useState(false);
//     const [scores, setScores] = useState({
//         frontScore: "",
//     backScore: "",
//     uiScore: "",
//     dbdesign: "",
//     feedback: ""
//     });

//     useEffect(() => {
//         const fetchTeams = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/teams/${teamId}`);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 const team = await response.json();
//                 setTeams(team);
//             } catch (err) {
//                 console.error('Error fetching team data:', err);
//             }
//         };

//         fetchTeams();
//     }, [teamId]);

//     useEffect(() => {
//         const fetchSubmissions = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/submissions/${teamId}`);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 setSubmissions(data);
//             } catch (err) {
//                 console.error('Error fetching submissions data:', err);
//             }
//         };

//         fetchSubmissions();
//     }, [teamId]);

//     // const handleNextTeam = () => {
//     //     setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % teams.length);
//     // };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setScores((scores) => ({
//             ...scores,
//             [name]: value
//         }));
//     };

//     // const handleSubmit = async (e) => {
//     //     console.log("handleSubmit called!"); // Debugging
//     //     console.log("Team ID:", teamId); // Add this
//     // console.log("Scores:", scores); // Add this
//     //     e.preventDefault();
//     //     if (Object.values(scores).every(value => value)) {
//     //         setValid(true);
//     //         console.log("Team ID being sent: ", teamId); // Debugging
//     //         console.log("Scores object: ", scores); // Debugging
//     //         try {
//     //             const response = await fetch(`http://localhost:5000/teams/${teamId}`, {
//     //                 method: 'PUT',
//     //                 headers: {
//     //                     'Content-Type': 'application/json',
//     //                 },
//     //                 body: JSON.stringify(scores)
//     //             });
//     //             if (response.ok) {
//     //                 console.log('Scores submitted successfully');
//     //             } else {
//     //                 console.error('Failed to submit scores');
//     //                 const errorText = await response.text();
//     //                 console.error('Server error:', errorText);
//     //             }
//     //         } catch (error) {
//     //             console.error('Error:', error);
//     //         }
//     //     }
//     //     setSubmitted(true);
//     // };

//     const handleSubmit = async (e) => {
//         console.log("handleSubmit called!");
//         e.preventDefault();
//         if (Object.values(scores).every(value => value)) {
//             setValid(true);
//             console.log("Team ID from useParams:", teamId);
//             console.log("Scores being sent:", scores); // Check the corrected scores object
//             try {
//                 const response = await fetch(`http://localhost:5000/teams/${teamId}`, {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(scores)
//                 });
//                 if (response.ok) {
//                     console.log('Scores submitted successfully');
//                     const data = await response.json();
//                     console.log("Server Response:", data);
//                 } else {
//                     console.error('Failed to submit scores');
//                     const errorText = await response.text();
//                     console.error('Server error:', errorText);
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         }
//         setSubmitted(true);
//     };

    
//     return (
//         <div>
//             <h1>Evaluation Portal</h1>
//             <Row>
//                 {teams.length > 0 && (
//                     <>
//                         <Col>
//                             <Card>
//                                 <h1>{teams[currentTeamIndex].name}</h1>
//                             </Card>
//                         </Col>
//                         <Col>
//                             <Card>
//                                 <CardBody>
//                                     {teams[currentTeamIndex].members.map((member) => (
//                                         <h5 key={member}>{member}</h5>
//                                     ))}
//                                 </CardBody>
//                             </Card>
//                         </Col>
//                     </>
//                 )}
//             </Row>

//             <Row>
//                 <h2>Submission</h2>
//                 {teams.length > 0 && submissions.length > 0 && (
//                     submissions
//                         .filter(submission => submission.teamId === teams[currentTeamIndex].teamId) // Filter submissions
//                         .map((submission) => (
//                             <div key={submission._id}>
//                                 <Col>
//                                     <Card>
//                                         <CardBody>
//                                             <h3>Title: {submission.title}</h3>
//                                             <h4>Github Link: <a href={submission.gitrepo}><Github /></a></h4>
//                                             <h4>PS id: {submission.ps}</h4>
//                                         </CardBody>
//                                     </Card>
//                                 </Col>
//                                 <Col>
//                                     <Card>
//                                         <CardImg src={submission.thumbnail} height='250px' width='250px' alt="thumbnail" />
//                                         <CardText><a href={submission.vid}><Video /></a></CardText>
//                                     </Card>
//                                 </Col>
//                                 <Col>
//                                     <Card>
//                                         <CardBody>
//                                             <a href={submission.ppt}>Presentation Link</a>
//                                             <br />
//                                             <a href={submission.preport}>Project Report</a>
//                                             <br />
//                                             <a href={submission.doc}><File /></a>
//                                         </CardBody>
//                                     </Card>
//                                 </Col>
//                                 <Col>
//                                     <Card>
//                                         <span className="text-black">Description: <br />{submission.projectdesc}</span>
//                                     </Card>
//                                 </Col>
//                             </div>
//                         ))
//                 )}
//             </Row>

//             <Row>
//                 <h4>Scores</h4>
              
//                 <form onSubmit={handleSubmit}>
//                     {submitted && valid && (
//                         <div className="success-message">
//                             <h4>Scores submitted successfully!</h4>
//                         </div>
//                     )}
//                     <h2>Scores</h2>
//                     <input
//                         className="form-field"
//                         type="number"
//                         placeholder="Frontend"
//                         name="frontScore"
//                         value={scores.frontScore}
//                         onChange={handleInputChange}
//                     />
//                     {submitted && !scores.frontScore && (
//                         <span id="error">Please enter a number</span>
//                     )}

//                     <input
//                         className="form-field"
//                         type="number"
//                         placeholder="Backend"
//                         name="backScore"
//                         value={scores.backScore}
//                         onChange={handleInputChange}
//                     />
//                     {submitted && !scores.backScore && (
//                         <span id="error">Please enter a number</span>
//                     )}

//                     <input
//                         className="form-field"
//                         type="number"
//                         placeholder="UI"
//                         name="uiScore"
//                         value={scores.uiScore}
//                         onChange={handleInputChange}
//                     />
//                     {submitted && !scores.uiScore && (
//                         <span id="error">Please enter a number</span>
//                     )}

//                     <input
//                         className="form-field"
//                         type="number"
//                         placeholder="DB Design"
//                         name="dbdesign"
//                         value={scores.dbdesign}
//                         onChange={handleInputChange}
//                     />
//                     {submitted && !scores.dbdesign && (
//                         <span id="error">Please enter a number</span>
//                     )}

//                     <input
//                         className="form-field"
//                         type="text"
//                         placeholder="Feedback"
//                         name="feedback"
//                         value={scores.feedback}
//                         onChange={handleInputChange}
//                     />
//                     {submitted && !scores.feedback && (
//                         <span id="error">Please enter text</span>
//                     )}

//                     <button className="form-field" type="submit">
//                         Submit
//                     </button>
//                 </form>
//             </Row>

//             {/* <button className="btn btn-primary mt-3" onClick={handleNextTeam}>
//                 Next team
//             </button> */}
//             <a href='/mentordash'><button>Back to team</button></a>
//         </div>
//     );
// };

// export default EvaluationPortal;

//combined fetching both teams and submissions together but only submissions are fetched
