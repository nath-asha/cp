// import React from 'react';
// import '../styles/leaderboard.css';
// const Leaderboard = ({ leaderboardData, toppers }) => {
//   return (
//     <div class='leaderboard-container'>
//       <h2>🏆 Top 3 Players</h2>
//       <ul>
//         {toppers.map((player, index) => (
//           <li key={index}>
//             <a href={player.github_url} target="_blank" rel="noopener noreferrer">
//               {player.name} - {player.score} 🔗
//             </a>
//           </li>
//         ))}
//       </ul>

//       <h2>📋 Full Leaderboard</h2>
//       <ul>
//         {leaderboardData.map((player, index) => (
//           <li key={index}>
//             <a href={player.github_url} target="_blank" rel="noopener noreferrer">
//               {player.name} - {player.score} 🔗
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Leaderboard;

import React from 'react'
import { useState,useEffect } from 'react';
// import '../App.css'
import '../styles/leaderboard.css'
import Confetti from 'react-confetti';
import 'bootstrap/dist/css/bootstrap.min.css';


function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [sortedLeaderboardData, setSortedLeaderboardData] = useState([]);
    const [toppers, setToppers] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setError(null);
  
        try {
          const response = await fetch('http://localhost:5000/scores'); // Updated API route
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
    }, []);
  
    useEffect(() => {
      if (sortedLeaderboardData.length > 0) {
        setToppers(sortedLeaderboardData.slice(0, 3));
      }
    }, [sortedLeaderboardData]);
  
    const sortLeaderboard = (data) => {
      const sortedData = [...data].sort((a, b) => b.score - a.score);
      setSortedLeaderboardData(sortedData);
    };
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div className='container'>
        <div className="leaderboard-container">
        <Confetti />
            <h2>🏆 Top 3 Participants</h2>
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
                        <td><a href={participant.github_url} target="_blank" rel="noopener noreferrer"><img src='logo.png' alt="github logo" className="github-logo"></img></a>
                        </td>
                        <td>{participant.score}</td> 
                      </tr>
                     ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default Leaderboard;
