import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/dash.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    const [data, setData] = useState({
        submissions: [],
        teamRequests: [],
        scores: [],
        leaderboard: [],
        profile: {},
        mentor: {}
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dashboard-data');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard">
            <h1>Student Dashboard</h1>
            <div className="container">
                <div className="grid-container">
                    <div className="grid-item profile-section">
                        <section className="profile">
                            <h2>Profile</h2>
                            <img src='Favicon.png' height='80px' width='80px' alt="Profile"></img>
                            <p>Name: {data.profile.username}</p>
                            <p>Email: {data.profile.email}</p>
                            <p>Team: {data.profile.team}</p>
                        </section>
                    </div>

                    <div className="grid-item mentor-section">
                        <section className="mentor">
                            <h2>Mentor</h2>
                            <img src='Favicon.png' height='80px' width='80px' alt="Mentor"></img>
                            <p>Name: {data.mentor.name}</p>
                            <p>Email: {data.mentor.email}</p>
                        </section>
                    </div>

                    <div className="grid-item progress-section">
                        <section className='progress-indicator'>
                            <h2>Your Progress Metric</h2>
                            <div className="progress" role="progressbar" aria-label="Default striped example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar progress-bar-striped" style={{ width: "10%" }}></div>
                            </div>
                            <div className="progress" role="progressbar" aria-label="Success striped example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar progress-bar-striped bg-success" style={{ width: "25%" }}></div>
                            </div>
                            <div className="progress" role="progressbar" aria-label="Info striped example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar progress-bar-striped bg-info" style={{ width: "50%" }}></div>
                            </div>
                            <div className="progress" role="progressbar" aria-label="Warning striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar progress-bar-striped bg-warning" style={{ width: "75%" }}></div>
                            </div>
                            <div className="progress" role="progressbar" aria-label="Danger striped example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar progress-bar-striped bg-danger" style={{ width: "100%" }}></div>
                            </div>
                        </section>
                    </div>

                    <div className="grid-item submissions-section">
                        <section className="submissions">
                            <h2>Submissions</h2>
                            <Card style={{ width: '18rem' }}>
                                {data.submissions.map((submission, index) => (
                                    <Card.Body key={index}>
                                        <Card.Text>
                                            <p>{submission.title}</p>
                                        </Card.Text>
                                    </Card.Body>
                                ))}
                            </Card>
                        </section>
                    </div>

                    <div className="grid-item team-requests-section">
                        <section className="team-requests">
                            <h2>Team Requests</h2>
                            <Card className='cardcontainer'>
                                {data.teamRequests.map((request, index) => (
                                    <Card.Body className='teamm' key={index}>
                                        <Card.Title>
                                            <p> Requested by : {request.requestedBy} </p>
                                        </Card.Title>
                                        <Card.Text>
                                            <p>{request.teamName} {request.status} </p>
                                        </Card.Text>
                                        <Button variant="primary">Accept</Button>
                                    </Card.Body>
                                ))}
                            </Card>
                        </section>
                    </div>

                    <div className="grid-item scores-section">
                        <section className="scores">
                            <h2>Scores</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            {data.scores.map((score, index) => (
                                                <p key={index}>{score.team}: {score.score}</p>
                                            ))}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>

                    <div className="grid-item leaderboard-section">
                        <section className="leaderboard">
                            <h2>Leaderboard</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            {data.leaderboard.map((entry, index) => (
                                                <p key={index}>{entry.team}: {entry.score}</p>
                                            ))}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

//structure is not fixed yet needs alignment
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../styles/dash.css'; 
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import Stack from 'react-bootstrap/Stack';

// const Dashboard = () => {
//     const [data, setData] = useState({
//         submissions: [],
//         teamRequests: [],
//         scores: [],
//         leaderboard: [],
//         profile: {},
//         mentor: {}
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/dashboard-data');
//                 setData(response.data);
//             } catch (error) {
//                 console.error('Error fetching dashboard data', error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div className="dashboard">
//             <h1>Student Dashboard</h1>
//             <div className="container">
//                 <div className='Row'>
//                     <div className='col'></div>
//                 </div>
//             </div>
//             <section className="profile">
//                 <h2>Profile</h2>
//                 <img src='Favicon.png' height='80px' width='80px'></img>
//                 <p>Name: {data.profile.username}</p>
//                 <p>Email: {data.profile.email}</p>
//                 <p>Team: {data.profile.team}</p>
//             </section>
//             <section className="mentor">
//                 <h2>Mentor</h2>
//                 <img src='Favicon.png' height='80px' width='80px'></img>
//                 <p>Name: {data.mentor.name}</p>
//                 <p>Email: {data.mentor.email}</p>
//             </section>

//             <section className='progress-indicator'>
//                 <h2>Your Progress Metric</h2>
//                     <div class="progress" role="progressbar" aria-label="Default striped example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
//                     <div class="progress-bar progress-bar-striped" style={{width: "10%"}}></div>
//                     </div>
//                     <div class="progress" role="progressbar" aria-label="Success striped example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
//                     <div class="progress-bar progress-bar-striped bg-success" style={{width: "25%"}}></div>
//                     </div>
//                     <div class="progress" role="progressbar" aria-label="Info striped example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
//                     <div class="progress-bar progress-bar-striped bg-info" style={{width: "50%"}}></div>
//                     </div>
//                     <div class="progress" role="progressbar" aria-label="Warning striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
//                     <div class="progress-bar progress-bar-striped bg-warning" style={{width: "75%"}}></div>
//                     </div>
//                     <div class="progress" role="progressbar" aria-label="Danger striped example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
//                     <div class="progress-bar progress-bar-striped bg-danger" style={{width: "100%"}}></div>
//                     </div>
//             </section>

//             <section className="submissions">
//                 <h2>Submissions</h2>
//                 <Card style={{ width: '18rem' }} cl>
//                     {data.submissions.map((submission, index) => (
//                         <Card.Body>
//                         <Card.Text>
//                         <p key={index}>{submission.title}</p>
//                         </Card.Text>
//                         </Card.Body>
//                     ))}
//                 </Card>
//             </section>


//             <section className="team-requests">
//                 <h2>Team Requests</h2>
//                 <Card class='cardcontainer'>
//                     {data.teamRequests.map((request, index) => (
//                         <Card.Body  class='teamm'> 
//                             <Card.Title> 
//                             <p key={index}> Requested by : {request.requestedBy} </p>
//                             </Card.Title>
//                         <Card.Text>
//                         <p key={index}>{request.teamName}     {request.status}   </p>
//                         </Card.Text>
//                         <Button variant="primary">Accept</Button>
//                         </Card.Body>
//                     ))}
//                 </Card>
//             </section>

//             <section className="scores">
//                 <h2>Scores</h2>
//                 <table>
//                     <tr>
//                         <td>
//                     {data.scores.map((scores, index) => (
//                         <p key={index}>{scores.team}: {scores.score}</p>
//                     ))}
//                     </td>
//                     </tr>
//                 </table>
//             </section>

//             <section className="leaderboard">
//                 <h2>Leaderboard</h2>
//                 <table>
//                     <tr>
//                         <td>
//                     {data.leaderboard.map((entry, index) => (
//                         <p key={index}>{entry.team}: {entry.score}</p>
//                     ))}
//                </td>
//                     </tr>
//                 </table>
//             </section>
//         </div>
//     );
// };

// export default Dashboard;