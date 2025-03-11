import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Teammanager() {
    const [teams, setteams] = useState([]);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/teams'); // Updated API route
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setteams(data);
            console.log(data);
          } catch (err) {
            console.error('Error fetching problem statement data:', err);
          }
        };
    
        fetchData();
      }, []);
      //choosing the problem statement function yet to be added
      //mentors can be assigned randomly or with a preference of skills
      //long length descriptions for challenges
      return (
        <div className="container">
          <div className="row">
            {teams.map((teams) => (
              <div className="col-md-4" key={teams.id}>
                <div className="card mb-4">
                  <div className="card-header">
                    Team ID: {teams.id}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{teams.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{teams.project}</h6>
                    {/* <button onClick={() => window.location.href = `/displaychallenge/${challenge.track_id}`}>Choose</button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}

export default Teammanager;