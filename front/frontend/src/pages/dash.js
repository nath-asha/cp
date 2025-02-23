import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/dash.css'; 

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
                const response = await axios.get('/api/dashboard-data');
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
                <p>Name: {data.profile.name}</p>
                <p>Email: {data.profile.email}</p>
            </section>
            <section className="mentor">
                <h2>Mentor</h2>
                <p>Name: {data.mentor.name}</p>
                <p>Email: {data.mentor.email}</p>
            </section>
            <section className="submissions">
                <h2>Submissions</h2>
                <ul>
                    {data.submissions.map((submission, index) => (
                        <li key={index}>{submission.title}</li>
                    ))}
                </ul>
            </section>
            <section className="team-requests">
                <h2>Team Requests</h2>
                <ul>
                    {data.teamRequests.map((request, index) => (
                        <li key={index}>{request.title}</li>
                    ))}
                </ul>
            </section>
            <section className="scores">
                <h2>Scores</h2>
                <ul>
                    {data.scores.map((score, index) => (
                        <li key={index}>{score.title}: {score.value}</li>
                    ))}
                </ul>
            </section>
            <section className="leaderboard">
                <h2>Leaderboard</h2>
                <ul>
                    {data.leaderboard.map((entry, index) => (
                        <li key={index}>{entry.name}: {entry.score}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Dashboard;