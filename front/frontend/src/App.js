import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Leaderboard from './components/Leaderboard';
import scoreboard from './components/scoreboard';
import Dashboard from './components/dash';
import Home from './components/home';
import Challenges from './components/challenges';
import RegistrationForm from './components/register';





function App() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [sortedLeaderboardData, setSortedLeaderboardData] = useState([]);
  const [toppers, setToppers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {  
      setError(null);

      try {
        const response = await fetch('http://localhost:5000/'); // Updated API route
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
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard leaderboardData={sortedLeaderboardData} toppers={toppers} />} /> 
        <Route path="/scoreboard" element={<scoreboard />} /> 
        <Route path="/challenges" element={<Challenges />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/register" element={<RegistrationForm/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// import { useState,useEffect } from 'react';
// import './App.css';
// import Navbar from './components/Navbar';
// import Leaderboard from './components/Leaderboard';
// import Scoreboard from './components/scoreboard';
// import Dashboard from './components/dash';
// import Home from './components/home';

// function App() {
//   const [LeaderboardData, setLeaderboardData] = useState([]);
//   const [sortedLeaderboardData, setSortedLeaderboardData] =useState([]);
//   const [toppers, setToppers] = useState([]);
//   // const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {  
//       // setLoading(true); 
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
//         // setLoading(false); 
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
//     <div className="App">
//       <Home/>
//     </div>
//   );
// }

// export default App;
