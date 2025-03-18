import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardImg, CardLink, CardText, CardTitle, Col, Row } from 'react-bootstrap';

const EvaluationPortal = () => {
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/teams'); // Updated API route
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const team = await response.json();
            setTeams(team);
            console.log('no issue');
          } catch (err) {
            console.error('Error fetching problem statement data:', err);
          }
        };
    
        fetchData();
      }, []);

       const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
      
          const handleNextteam = () => {
              setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % teams.length);
          };
    
    //SCORE STORE
    //this is for storing the marks of teams after evaluation in scores

      const [submitted, setSubmitted] = useState(false);
      const [valid, setValid] = useState(false);
      const [scores, setScores] = useState({
                name: "" ,
                team_id: "",
                members : [],
                project_id : "",
                project : "",
                createdAt : "",
                mentor : "",
                frontScore: "",
                backScore: "",
                uiScore: "",
                dbdesign: ""
     });

     const handleinputChange = (event) => {
      const {name, value} = event.target;
      setScores((scores) => ({
        ...scores,
        [name]: value
      }));
     };

     const handleSubmit = async (e) => {
      e.preventDefault();
      if(Object.values(scores).every(value => value)) {
        setValid(true);
        try {
          const response = await fetch('http://localhost:5000/teams', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(scores)
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

    //SUBMISSIONS REVIEW OF THE TEAMS
    //this is for fetching data from submissions collections and displaying it for evaluation

    const [submissions, setSubmissions] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/submissions');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setSubmissions(data);
          console.log('no issue');
        }catch (err) {
          console.error('Error fetching submissions data:',err);
        }
      };
      fetchData();
    },[]);

    const [currentSubIndex, setCurrentSubIndex] = useState(0);
      
          const handleNextsub = () => {
              setCurrentSubIndex((prevIndex) => (prevIndex + 1) % submissions.length);
          };

    return (
        <div>
            <h1>Evaluation Portal</h1>
            {/* {teams.map((teams) => (
              <div className="col-md-4" key={teams.id}>
                <div className="card mb-4">
                  <div className="card-header">
                      Team: {teams.name}
                  </div>
                  <img src={teams.imgurl} className="card-img-top" alt="problem statement image" />
                  <div className="card-body">
                  <h5 className="card-title">{teams.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{teams.description}</h6>

                </div>
              </div>
          </div>
        ))} */}
      <Row>
        {teams.length > 0 && (
          <>
            <Col>
            <Card>
              <h1>{teams[currentTeamIndex].name}</h1>
              </Card>
            </Col>
            <Col>
            <Card>
            <CardBody>
              {teams[currentTeamIndex].members.map((member, index) => (
                <h5 key={index}>{member}</h5>
              ))}
              </CardBody>
              </Card>
            </Col>
          </>
        )}
      </Row>
      <Row>
        <h4>Submissions</h4>
      </Row>
      <Row>
      {submissions.map((submissions) => (
        <div key={submissions.id}>
          <Card>
            <CardImg src={submissions.thumbnail} alt="thumbnail" />
            <CardText><a href={submissions.vid}>Demo Video :{submissions.vid}</a></CardText>
          </Card>
          <Col> 
          <Card>
            <CardBody>
            <h3>Title :{submissions.title}</h3>
            <h4>Github Link:<a href={submissions.gitrepo}>{submissions.gitrepo}</a></h4>
            <h4>PS id :{submissions.ps}</h4>
            </CardBody>
          </Card>
          </Col>
          <Col>
          <Card>
            <CardBody>
              <a href={submissions.ppt}>Presentation Link: {submissions.ppt}</a>
              <br></br>
              <a href={submissions.preport}>Project Report: {submissions.preport}</a>
              <br></br>
              <a href={submissions.doc}>Documentation : {submissions.doc}</a>
            </CardBody>
          </Card>
          </Col>
          <Col>
          <Card>
            <span className='text-black'>Description:  <br></br>{submissions.projectdesc}</span>
          </Card>
          </Col>
        </div>
      ))}
      </Row>
      <Row>
        <h4>Scores</h4>
        <form onSubmit={handleSubmit}>
          {submitted && valid && (
            <div className="success-message">
              <h4>Scores submitted successfully!</h4>
            </div>
          )}
          <h2>Scores</h2>

            <input
              className="form-field"
              type="number"
              placeholder="Frontend"
              name="frontScore"
              value={scores.frontScore}
              onChange={handleinputChange}
            />
            {submitted && !scores.frontScore && (
              <span id="error">Please enter a number</span>
            )}

            <input
              className="form-field"
              type="number"
              placeholder="Backend"
              name="backScore"
              value={scores.backScore}
              onChange={handleinputChange}
            />
            {submitted && !scores.backScore && (
              <span id="error">Please enter a number</span>
            )}
          
            <input
              className="form-field"
              type="number"
              placeholder="UI"
              name="uiScore"
              value={scores.uiScore}
              onChange={handleinputChange}
            />
            {submitted && !scores.uiScore && (
              <span id="error">Please enter a number</span>
            )}
          
            <input
              className="form-field"
              type="number"
              placeholder="DB Design"
              name="dbdesign"
              value={scores.dbdesign}
              onChange={handleinputChange}
            />
            {submitted && !scores.dbdesign && (
              <span id="error">Please enter a number</span>
            )}
          

          <button className="form-field" type="submit">
            Submit
          </button>
        </form>
      </Row>
            <button className="btn btn-primary mt-3" onClick={handleNextteam}>
                Next team
            </button>
            <a href='/mentordash'><button>Back to team</button></a>
    
            {/* {teams.map(team => (
                <div key={team.id}>
                    <h2 className='text-black'>{team.name}</h2>
                    <h4>{team.members[0]}</h4>
                    <h4>{team.members[1]}</h4>
                    <h4>{team.members[2]}</h4>
                    <p>{team.project}</p>
                    <label>
                        Rating:
                        <input 
                            type="number" 
                            value={team.rating} 
                            onChange={(e) => handleRatingChange(team.id, parseInt(e.target.value))} 
                            min="0" 
                            max="10" 
                        />
                    </label>
                </div>
            ))} */}
      </div>
    );
};

export default EvaluationPortal;