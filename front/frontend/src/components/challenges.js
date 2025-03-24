import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import RoleBasedComponent from './rolebasedbutton';

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
  //choosing the problem statement function yet to be added
  //mentors can be assigned randomly or with a preference of skills
  //long length descriptions for challenges
  return (
    // <div className="container">
      <div className="row">
        {challenges.map((challenge) => (
          <div className="col-md-4" key={challenge.track_id}>
            <div className="card mb-4">
              <div className="card-header">
                Track ID: {challenge.track_id}
              </div>
              <img src={challenge.imgurl} className="card-img-top" alt="problem statement image" />
              <div className="card-body">
                <h5 className="card-title">{challenge.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{challenge.description}</h6>
                <a href={`/displaychallenge/${challenge.track_id}`}><button>Know more</button></a>
                <RoleBasedComponent
                  role={"user"}
                  supportedRoles={["admin", "mentor", "user"]}
                  render={() => <button>Choose</button>}
                />
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => window.location.href = '/events'}>Back</button>
      </div>
    // </div>
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

