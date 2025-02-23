import { useState,useEffect } from 'react';
import './App.css';
import Navbar from './pages/navbar';
import Leaderboard from './pages/Leaderboard';
import Scoreboard from './pages/scoreboard';
import Dashboard from './pages/dash';
import Home from './pages/home';

function App() {
  const [LeaderboardData, setLeaderboardData] = useState([]);
  const [sortedLeaderboardData, setSortedLeaderboardData] =useState([]);
  const [toppers, setToppers] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {  
      // setLoading(true); 
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
        // setLoading(false); 
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
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
