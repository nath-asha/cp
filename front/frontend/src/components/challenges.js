import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Challenges() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/challenges'); // Updated API route
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setChallenges(data);
        console.log(data);
      } catch (err) {
        console.error('Error fetching problem statement data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {challenges.map((challenge) => (
          <div className="col-md-4" key={challenge.track_id}>
            <div className="card mb-4">
            <div class="card-header">
            Track ID: {challenge.track_id}</div>
            <img src="https://img.freepik.com/free-vector/hackathon-doodle-hand-drawing-team-programmers-web-developers-managers-graphic-designers-deve_88138-1348.jpg?t=st=1741146510~exp=1741150110~hmac=aa36e1836d63a2fa40cf74e6d2efca9fe0c2bb91bbfb7d1a27f71d9d91a5486a&w=1380" class="card-img-top" alt="problem statement image"/>
              <div className="card-body">
                <h5 className="card-title">{challenge.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{challenge.description}</h6>
                <button>Choose</button>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Challenges;
// const challenges = [
//     { id: 1, title: 'Challenge 1', description: 'Description' , trackId: 'Track 1' },
//     { id: 2, title: 'Challenge 2', description: 'Description ', trackId: 'Track 2' },
//     { id: 3, title: 'Challenge 3', description: 'Description for challenge 3', trackId: 'Track 3' },
// ];

// const Challenges = () => {
//     return (
//         <div>
//             {challenges.map((challenge) => (
//                 <Card key={challenge.id} style={{ margin: '20px' }}>
//                     <CardContent>
//                         <Typography variant="h5" component="h2">
//                             {challenge.title}
//                         </Typography>
//                         <Typography color="textSecondary">
//                             {challenge.description}
//                         </Typography>
//                         <Typography variant="body2" component="p">
//                             Track ID: {challenge.trackId}
//                         </Typography>
//                     </CardContent>
//                 </Card>
//             ))}
//         </div>
//     );
// };

