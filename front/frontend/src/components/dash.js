import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/dash.css'; 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

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
            <section className="profile">
                <h2>Profile</h2>
                <img src='Favicon.png' height='80px' width='80px'></img>
                <p>Name: {data.profile.username}</p>
                <p>Email: {data.profile.email}</p>
                <p>Team: {data.profile.team}</p>
            </section>
            <section className="mentor">
                <h2>Mentor</h2>
                <img src='Favicon.png' height='80px' width='80px'></img>
                <p>Name: {data.mentor.name}</p>
                <p>Email: {data.mentor.email}</p>
            </section>

            <section className="submissions">
                <h2>Submissions</h2>
                <Card style={{ width: '18rem' }} cl>
                    {data.submissions.map((submission, index) => (
                        <Card.Body>
                        <Card.Text>
                        <p key={index}>{submission.title}</p>
                        </Card.Text>
                        </Card.Body>
                    ))}
                </Card>
            </section>


            <section className="team-requests">
                <h2>Team Requests</h2>
                <Card class='cardcontainer'>
                    {data.teamRequests.map((request, index) => (
                        <Card.Body  class='teamm'> 
                            <Card.Title> 
                            <p key={index}> Requested by : {request.requestedBy} </p>
                            </Card.Title>
                        <Card.Text>
                        <p key={index}>{request.teamName}     {request.status}   </p>
                        </Card.Text>
                        <Button variant="primary">Accept</Button>
                        </Card.Body>
                    ))}
                </Card>
            </section>

            <section className="scores">
                <h2>Scores</h2>
                <table>
                    <tr>
                        <td>
                    {data.scores.map((scores, index) => (
                        <p key={index}>{scores.team}: {scores.score}</p>
                    ))}
                    </td>
                    </tr>
                </table>
            </section>

            <section className="leaderboard">
                <h2>Leaderboard</h2>
                <table>
                    <tr>
                        <td>
                    {data.leaderboard.map((entry, index) => (
                        <p key={index}>{entry.team}: {entry.score}</p>
                    ))}
               </td>
                    </tr>
                </table>
            </section>
        </div>
    );
};

export default Dashboard;