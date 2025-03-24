import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardImg, CardLink, CardText, CardTitle, Col, Row } from 'react-bootstrap';
import { Github,File,Video} from 'lucide-react';
import { useParams } from 'react-router-dom';
import Feedback from 'react-bootstrap/esm/Feedback';

//need not have extra fields for the score let the first round of judges seect the team and then the next round of judges can evaluate the team
//remove the score fields from the teams model and add a new model for scores in the end the judges will evaluate the teams and give score and feedback
const EvaluationPortal = () => {
    const [teams, setTeams] = useState([]);
    const {teamId} = useParams();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/teams/${teamId}'); // Updated API route
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
      }, [teamId]);

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
                dbdesign: "",
                feedback: ""
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
          const response = await fetch('http://localhost:5000/submissions/${teamId}');
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
    },[teamId]);

    const [currentSubIndex, setCurrentSubIndex] = useState(0);
      
          const handleNextsub = () => {
              setCurrentSubIndex((prevIndex) => (prevIndex + 1) % submissions.length);
          };

    return (
  <div>
            <h1>Evaluation Portal</h1>
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
              {/* {teams[currentTeamIndex].members.map((member, index) => (
                <h5 key={index}>{member}</h5>  */}
                {teams[currentTeamIndex].members.map((member) => (
                                        <h5 key={member}>{member}</h5>
                        ))}
               </CardBody>
              </Card>
            </Col>
          </>
        )}
      </Row>
  {/* ============================================================================================= 
      <h4>trual</h4>
      <div class="container">
  <div class="row">
  {teams.length > 0 && submissions.length > 0 && (
    submissions
      .filter(submission => submission.team_id === teams[currentTeamIndex]._id) // Filter submissions
      .map((submission) => (
        <div key={submission._id}>
    <div class="col-sm">
      <img src={submission.thumbnail} height='250px' width='250px' alt="thumbnail" />
      <a href={submission.vid}>Demo Video: {submission.vid}</a>
    </div>
    <div class="col-sm">
      One of three columns
      <h3>Title: {submission.title}</h3>
                <h4>Github Link: <a href={submission.gitrepo}>{submission.gitrepo}</a></h4>
                <h4>PS id: {submission.ps}</h4>
    </div>
    <div class="col-sm">
      One of three columns
      <a href={submission.ppt}>Presentation Link: {submission.ppt}</a>
                <br />
                <a href={submission.preport}>Project Report: {submission.preport}</a>
                <br />
                <a href={submission.doc}>Documentation: {submission.doc}</a>
    </div>
    <div className='col-sm'>
    <a href={submission.ppt}>Presentation Link: {submission.ppt}</a>
                <br />
                <a href={submission.preport}>Project Report: {submission.preport}</a>
                <br />
                <a href={submission.doc}>Documentation: {submission.doc}</a>
      </div>
      <div className='col-sm'>
      <span className="text-black">Description: <br />{submission.projectdesc}</span>
        </div>
  </div>
   ))
  )}
  {/* ==================================================================================================== */}
      <Row>
        <h4>Submissions</h4>
      </Row>
      {/* <Row>
      {submissions.map((submission) => (
        <div key={submission._id}>
          <Card>
            <CardImg src={submission.thumbnail} alt="thumbnail" />
            <CardText><a href={submission.vid}>Demo Video :{submission.vid}</a></CardText>
          </Card>
          <Col> 
          <Card>
            <CardBody>
            <h3>Title :{submission.title}</h3>
            <h4>Github Link:<a href={submission.gitrepo}>{submission.gitrepo}</a></h4>
            <h4>PS id :{submission.ps}</h4>
            </CardBody>
          </Card>
          </Col>
          <Col>
          <Card>
            <CardBody>
              <a href={submission.ppt}>Presentation Link: {submission.ppt}</a>
              <br></br>
              <a href={submission.preport}>Project Report: {submission.preport}</a>
              <br></br>
              <a href={submission.doc}>Documentation : {submission.doc}</a>
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
      </Row> */}
      <Row>
  {teams.length > 0 && submissions.length > 0 && (
    submissions
      .filter(submission => submission.team_id === teams[currentTeamIndex]._id) // Filter submissions
      .map((submission) => (
        <div key={submission._id}>
           <Col>
            <Card>
              <CardBody>
                <h3>Title: {submission.title}</h3>
                <h4>Github Link: <a href={submission.gitrepo}><Github /></a></h4>
                <h4>PS id: {submission.ps}</h4>
              </CardBody>
            </Card>
          </Col>
          <Card>
            <CardImg src={submission.thumbnail} height='250px' width='250px' alt="thumbnail" />
            <CardText><a href={submission.vid}><Video /></a></CardText>
          </Card>
          <Col>
            <Card>
              <CardBody>
                <a href={submission.ppt}>Presentation Link</a>
                <br />
                <a href={submission.preport}>Project Report</a>
                <br />
                <a href={submission.doc}><File /></a>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <span className="text-black">Description: <br />{submission.projectdesc}</span>
            </Card>
          </Col>
        </div>
      ))
  )}
  {/* <Row>
  <form onSubmit={handleSubmit}>
    {submitted && valid && (
      <div className="success-message">
        <h4>Scores submitted successfully!</h4>
      </div>
    )}
    <h2>Scores</h2>
    <Col>
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
    </Col>
    <Col>
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
    </Col>
    <Col>
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
    </Col>
    <Col>
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
    </Col>
    <button className="form-field" type="submit">
      Submit
    </button>
  </form>
</Row> */}
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

            <input
              className="form-field"
              type="text"
              placeholder="feedback"
              name="Feedback"
              value={scores.feedback}
              onChange={handleinputChange}
            />
            {submitted && !scores.feedback && (
              <span id="error">Please enter a number</span>
            )}
          
          

          <button className="form-field" type="submit">
            Submit
          </button>
        </form>


        {/* <table>
            <tr>
              <th>Evaluation Criteria</th>
              <th>Score</th>
            </tr>
            <tr>
              <th>
                Frontend :
              </th>
              <th>
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
            </th>
            </tr>

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

            <input
              className="form-field"
              type="text"
              placeholder="feedback"
              name="Feedback"
              value={scores.feedback}
              onChange={handleinputChange}
            />
            {submitted && !scores.feedback && (
              <span id="error">Please enter a number</span>
            )}
          </table> */}
      </Row>
      
            <button className="btn btn-primary mt-3" onClick={handleNextteam}>
                Next team
            </button>
            <a href='/mentordash'><button>Back to team</button></a>
      </div>
     
    );
};

export default EvaluationPortal;