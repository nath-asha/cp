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
              <div className="card-body">
                <h5 className="card-title">{challenge.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{challenge.description}</h6>
                <p className="card-text">Track ID: {challenge.track_id}</p>
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

