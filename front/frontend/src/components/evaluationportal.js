import React, { useState,useEffect } from 'react';

const EvaluationPortal = () => {
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/teams'); // Updated API route
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const team = await response.json();
            setTeams(team);
            console.log(team);
          } catch (err) {
            console.error('Error fetching problem statement data:', err);
          }
        };
    
        fetchData();
      }, []);

    const handleRatingChange = (id, rating) => {
        setTeams(teams.map(team => 
            team.id === id ? { ...team, rating: rating } : team
        ));
    };

    return (
        <div>
            <h1>Evaluation Portal</h1>
            {teams.map(team => (
                <div key={team.id}>
                    <h2 className='text-black'>{team.name}</h2>
                    <h4>{team.members[0]}</h4>
                    <h4>{team.members[1]}</h4>
                    <h4>{team.members[2]}</h4>
                    <p>{team.project}</p>
                    <label>
                        Rating:
                        <input 
                            type="number" 
                            value={team.rating} 
                            onChange={(e) => handleRatingChange(team.id, parseInt(e.target.value))} 
                            min="0" 
                            max="10" 
                        />
                    </label>
                </div>
            ))}
        </div>
    );
};

export default EvaluationPortal;