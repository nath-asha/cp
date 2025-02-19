import React from 'react'
import '../App.css'
import '../styles/leaderboard.css'

function Leaderboard({ leaderboardData, toppers }) {
    return (
        <div className="leaderboard-container">
            <h2>Top 3 Participants</h2>
            <div className="toppers-container">
                {toppers.map((participant,index) => (
                    <div key={participant.name} className='topper-card'>
                        <h3>{participant.name}</h3>
                        <p>Score: {participant.score}</p>
                        <a href={participant.github_url} target="_blank" rel="noopener noreferrer"><img src='logo.png' alt="github logo" className="github-logo"></img></a>
                    </div>
                ))}
            </div>

            {/* <h2>Leaderboard</h2> */}
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
                    {leaderboardData.map((participant,index) => (
                    <tr key={participant.name}>
                        <td>{index + 1}</td>
                        <td>{participant.name}</td>
                        <td><a href={participant.github_url} target='_blank' rel="noopener noreferrer"></a>
                        </td>
                        <td>{participant.score}</td> 
                      </tr>
                     ))}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;
