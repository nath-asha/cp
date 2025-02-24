import React from 'react';

const Leaderboard = ({ leaderboardData, toppers }) => {
  return (
    <div>
      <h2>🏆 Top 3 Players</h2>
      <ul>
        {toppers.map((player, index) => (
          <li key={index}>
            <a href={player.github_url} target="_blank" rel="noopener noreferrer">
              {player.name} - {player.score} 🔗
            </a>
          </li>
        ))}
      </ul>

      <h2>📋 Full Leaderboard</h2>
      <ul>
        {leaderboardData.map((player, index) => (
          <li key={index}>
            <a href={player.github_url} target="_blank" rel="noopener noreferrer">
              {player.name} - {player.score} 🔗
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;

// import React from 'react'
// import '../App.css'
// import '../styles/leaderboard.css'

// function Leaderboard({ leaderboardData, toppers }) {
//     return (
//         <div className="leaderboard-container">
//             <h2>Top 3 Participants</h2>
//             <div className="toppers-container">
//                 {toppers.map((participant,index) => (
//                     <div key={participant.name} className='topper-card'>
//                         <h3>{participant.name}</h3>
//                         <p>Score: {participant.score}</p>
//                         <a href={participant.github_url} target="_blank" rel="noopener noreferrer"><img src='logo.png' alt="github logo" className="github-logo"></img></a>
//                     </div>
//                 ))}
//             </div>

//             {/* <h2>Leaderboard</h2> */}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Rank</th>
//                         <th>Name</th>
//                         <th>GithubLink</th>
//                         <th>Score</th>
//                         {/* <th>Badge</th> */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {leaderboardData.map((participant,index) => (
//                     <tr key={participant.name}>
//                         <td>{index + 1}</td>
//                         <td>{participant.name}</td>
//                         <td><a href={participant.github_url} target="_blank" rel="noopener noreferrer"><img src='logo.png' alt="github logo" className="github-logo"></img></a>
//                         </td>
//                         <td>{participant.score}</td> 
//                       </tr>
//                      ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default Leaderboard;
