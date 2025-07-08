import React, { useState, useEffect } from 'react';
import '../styles/leaderboard.css';
import Confetti from 'react-confetti';
import { Github } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Pass eventId, phase, and n as props or get from URL if needed
function PhaseLeaderboard({ eventId, phase, n = 3 }) {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [sortedLeaderboardData, setSortedLeaderboardData] = useState([]);
    const [toppers, setToppers] = useState([]);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setError(null);
    //         try {
    //             // Adjust API endpoint as per your backend
    //             let url = 'http://localhost:5000/leaderboard';
    //             const params = [];
    //             if (eventId) params.push(`eventId=${eventId}`);
    //             if (phase) params.push(`phase=${phase}`);
    //             if (n) params.push(`n=${n}`);
    //             if (params.length) url += '?' + params.join('&');

    //             const response = await fetch(url);
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! Status: ${response.status}`);
    //             }
    //             const data = await response.json();
    //             setLeaderboardData(data);
    //             sortLeaderboard(data);
    //         } catch (err) {
    //             console.error('Error fetching leaderboard data:', err);
    //             setError(err.message);
    //         }
    //     };

    //     fetchData();
    // }, [eventId, phase, n]);

    useEffect(() => {
    const fetchData = async () => {
        setError(null);
        try {
            let url = '';
            if (eventId && phase && n) {
                url = `/api/leaderboard/${eventId}/${phase}/${n}`;
            } else if (eventId && phase) {
                url = `/api/leaderboard/${eventId}/${phase}`;
            } else {
                setError('eventId and phase are required');
                return;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setLeaderboardData(data);
            sortLeaderboard(data);
        } catch (err) {
            console.error('Error fetching leaderboard data:', err);
            setError(err.message);
        }
    };

    fetchData();
}, [eventId, phase, n]);

    useEffect(() => {
        if (sortedLeaderboardData.length > 0) {
            setToppers(sortedLeaderboardData.slice(0, n));
        }
    }, [sortedLeaderboardData, n]);

    const sortLeaderboard = (data) => {
        // Use totalScore from Scoremodel
        const sortedData = [...data].sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));
        setSortedLeaderboardData(sortedData);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='container'>
            <div className="leaderboard-container">
                <Confetti />
                <h2>🏆 Top {n} Teams</h2>
                <div className="toppers-container">
                    {toppers.map((team, index) => (
                        <div key={team.teamId || team._id || index} className='topper-card'>
                            <h3>{team.teamName || team.name || `Team ${team.teamId}`}</h3>
                            <p>Score: {team.totalScore}</p>
                            {team.github_url && (
                                <a href={team.github_url} target="_blank" rel="noopener noreferrer">
                                    <Github className="github-logo" />
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Team Name</th>
                            <th>GithubLink</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedLeaderboardData.map((team, index) => (
                            <tr key={team.teamId || team._id || index}>
                                <td>{index + 1}</td>
                                <td>{team.teamName || team.name || `Team ${team.teamId}`}</td>
                                <td>
                                    {team.github_url ? (
                                        <a href={team.github_url} target="_blank" rel="noopener noreferrer">
                                            <Github className="github-logo" />
                                        </a>
                                    ) : "-"}
                                </td>
                                <td>{team.totalScore}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PhaseLeaderboard;
