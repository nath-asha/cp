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

       const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
      
          const handleNextteam = () => {
              setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % teams.length);
          };
    
    //SCORE STORE
    //this is for storing the marks of teams after evaluation in scores

      const [submitted, setSubmitted] = useState(false);
      const [valid, setValid] = useState(false);
      const [scores, setScores] = useState({
                name: "" ,
                team_id: "",
                members : [],
                project_id : "",
                project : "",
                createdAt : "",
                mentor : "",
                frontScore: "",
                backScore: "",
                uiScore: "",
                dbdesign: ""
     });

     const handleinputChange = (event) => {
      const {name, value} = event.target;
      setScores((scores) => ({
        ...scores,
        [name]: value
      }));
     };

     const handleSubmit = async (e) => {
      e.preventDefault();
      if(Object.values(scores).every(value => value)) {
        setValid(true);
        try {
          const response = await fetch('http://localhost:5000/teams', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(scores)
          });
          if (response.ok) {
            console.log('Scores submitted successfully');
          } else {
            console.error('Failed to submit scores');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
      setSubmitted(true);
    };


    // const handleRatingChange = (id, rating) => {
    //     setTeams(teams.map(team => 
    //         team.id === id ? { ...team, rating: rating } : team
    //     ));
    // };

    return (
        <div>
            <h1>Evaluation Portal</h1>
            {/* {teams.map((teams) => (
              <div className="col-md-4" key={teams.id}>
                <div className="card mb-4">
                  <div className="card-header">
                      Team: {teams.name}
                  </div>
                  <img src={teams.imgurl} className="card-img-top" alt="problem statement image" />
                  <div className="card-body">
                  <h5 className="card-title">{teams.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{teams.description}</h6>

                </div>
              </div>
          </div>
        ))} */}
        <div>
            {teams.length > 0 && (
                <div className="card mb-3">
                    <div className="card-header">
                        <h1>{teams[currentTeamIndex].name}</h1>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{teams[currentTeamIndex].project}</p>
                        <div className="mt-4">
                            <h2>Details:</h2>
                            <img src={teams[currentTeamIndex].imgurl} alt='p' height='50%' width='25%'/>
                            <p>{teams[currentTeamIndex].id}</p>
                        </div>
                    </div>
                </div>
            )}
            <button className="btn btn-primary mt-3" onClick={handleNextteam}>
                Next team
            </button>
            <a href='/mentordash'><button>Back to team</button></a>
        </div>
            {/* {teams.map(team => (
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
            ))} */}
      </div>
    );
};

export default EvaluationPortal;