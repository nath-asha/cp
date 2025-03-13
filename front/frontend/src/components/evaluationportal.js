import React, { useState } from 'react';

const EvaluationPortal = () => {
    const [teams, setTeams] = useState([
        { id: 1, name: 'Team A', submission: 'Submission A', rating: 0 },
        { id: 2, name: 'Team B', submission: 'Submission B', rating: 0 },
        { id: 3, name: 'Team C', submission: 'Submission C', rating: 0 },
    ]);

    const handleRatingChange = (id, rating) => {
        setTeams(teams.map(team => 
            team.id === id ? { ...team, rating: rating } : team
        ));
    };

    return (
        <div>
            <h1>Evaluation Portal</h1>
            {teams.map(team => (
                <div key={team.id} style={{ marginBottom: '20px' }}>
                    <h2>{team.name}</h2>
                    <p>{team.submission}</p>
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