import React from 'react';

function Leaderboard({ leaderboardData }) {
    return (
        <div>
            <h2>Leaderboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>GithubLink</th>
                        <th>Score</th>
                        {/* <th>Badge</th> */}
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((participant, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{participant.name}</td>
                            <td>{participant.setgit}</td>
                            {/* <td>{participant.badge}</td> */}
                            <td>{participant.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;
