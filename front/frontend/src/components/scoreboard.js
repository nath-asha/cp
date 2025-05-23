import React from 'react'
import { useState,useEffect } from 'react';
import '../App.css'
import '../styles/scoreboard.css'

import Confetti from 'react-confetti';

function Scoreboard() {
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

  // the score will be decided after all the mentorrs evaluate the teams and mark teams for next round
  //this score will be stored and sorted and marks 'finalized' or freezed
    return (
        <div className="leaderboard-container">
          <Confetti />
            <h2>🏆 Winners</h2>
            <div className="toppers-container">
                {toppers.map((participant) => {
                  return (
                    <div key={participant.name} className='topper-card'>
                      <h3>{participant.name}</h3>
                      <p>Score: {participant.score}</p>
                      <a href={participant.github_url} target="_blank" rel="noopener noreferrer"><img src='logo.png' alt="github logo" className="github-logo"></img></a>
                    </div>
                  );
                })}
            </div>
        </div>
    );
}

export default Scoreboard;



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






// import { useState,useEffect } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import '../App.css';
// import Navbar from './Navbar';
// import Leaderboard from './Leaderboard';

// function scoreboard() {
//   const [LeaderboardData, setLeaderboardData] = useState([]);
//   const [sortedLeaderboardData, setSortedLeaderboardData] =useState([]);
//   const [toppers, setToppers] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {  
//       setError(null); 

//       try {
//         const response = await fetch('http://localhost:5000/');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setLeaderboardData(data);
//         sortLeaderboard(data);
//       } catch (err) {
//         console.error('Error fetching leaderboard data:', err);
//         setError(err.message); 
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (sortedLeaderboardData.length > 0) {
//       setToppers(sortedLeaderboardData.slice(0, 3));
//     }
//   }, [sortedLeaderboardData]);

//   const sortLeaderboard = (data) => {
//     const sortedData = [...data].sort((a, b) => b.score - a.score);
//     setSortedLeaderboardData(sortedData);
//   };


//   if (error) {
//     return <div>Error: {error}</div>; 
//   }

//   return (
//     <BrowserRouter>  
//       <div className="App">
//         <Navbar/>
//         <h1>Leaderboard</h1>
//         <Leaderboard leaderboardData={sortedLeaderboardData} toppers={toppers} />
//       </div>
//     </BrowserRouter>
//   );
// }

// export default scoreboard;