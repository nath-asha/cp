import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JoinTeam = ({ userId }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await axios.get('/api/teams/available');
      setTeams(response.data);
    };
    fetchTeams();
  }, []);

  const handleRequest = async () => {
    try {
      const response = await axios.post('/api/teams/request', {
        userId,
        teamId: selectedTeamId,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message || 'Error sending request');
    }
  };

  return (
    <div>
      <h2>Join Team</h2>
      <select value={selectedTeamId} onChange={(e) => setSelectedTeamId(e.target.value)}>
        <option value="">Select a team</option>
        {teams.map((team) => (
          <option key={team.team_id} value={team.team_id}>
            {team.name}
          </option>
        ))}
      </select>
      <button onClick={handleRequest}>Send Request</button>
    </div>
  );
};

export default JoinTeam;
