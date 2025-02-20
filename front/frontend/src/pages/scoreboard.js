import { useState,useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../App.css';
import Navbar from './navbar';
import Leaderboard from './Leaderboard';

function scoreboard() {
  const [LeaderboardData, setLeaderboardData] = useState([]);
  const [sortedLeaderboardData, setSortedLeaderboardData] =useState([]);
  const [toppers, setToppers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {  
      setError(null); 

      try {
        const response = await fetch('http://localhost:5000/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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
    <BrowserRouter>  
      <div className="App">
        <Navbar/>
        <h1>Leaderboard</h1>
        <Leaderboard leaderboardData={sortedLeaderboardData} toppers={toppers} />
      </div>
    </BrowserRouter>
  );
}

export default scoreboard;