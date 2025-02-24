import { useState, useEffect } from 'react';
import { LeaderModel } from './leadermodel';

const useLeaderboard = (apiUrl) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [sortedLeaderboardData, setSortedLeaderboardData] = useState([]);
  const [toppers, setToppers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const formattedData = data.map(LeaderModel.fromJSON);
        setLeaderboardData(formattedData);
        sortLeaderboard(formattedData);
      } catch (err) {
        console.error('Error fetching leaderboard data:', err);
        setError(err.message);
      }
    };

    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    if (sortedLeaderboardData.length > 0) {
      setToppers(sortedLeaderboardData.slice(0, 3));
    }
  }, [sortedLeaderboardData]);

  const sortLeaderboard = (data) => {
    const sortedData = [...data].sort((a, b) => b.score - a.score);
    setSortedLeaderboardData(sortedData);
  };

  return { sortedLeaderboardData, toppers, error };
};

export default useLeaderboard;
