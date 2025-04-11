import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserRole, getUserId } from './auth'; // Assuming getUserId() gets the logged-in user's ID
//users must be only allowed to choose challenges after registering for the event
function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventId } = useParams(); // Get eventId from URL parameters
  const navigate = useNavigate();
  const role = getUserRole();
  const userId = getUserId(); // Fetch logged-in user ID
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/displaychallenge/${eventId}`); // Corrected API route
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setChallenges(data);
      } catch (err) {
        console.error('Error fetching challenge data:', err);
        setError('Failed to load challenges. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  const handleChoose = async (trackId) => {
    try {
      const response = await fetch('http://localhost:5000/choose-challenge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          track_id: trackId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error choosing challenge: ${response.statusText}`);
      }

      alert('Challenge successfully chosen!');
    } catch (error) {
      console.error('Error submitting choice:', error);
      alert('Failed to choose challenge. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading challenges...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container">
      <div className="row">
        {challenges.map((challenge) => (
          <div className="col-md-4" key={challenge.track_id}>
            <div className="card mb-4">
              <div className="card-header">
                Track ID: {challenge.track_id}
              </div>
              <img
                src={challenge.imgurl}
                className="card-img-top"
                alt="problem statement"
              />
              <div className="card-body">
                <h5 className="card-title">{challenge.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {challenge.description}
                </h6>
                <a href={`/displaychallenge/${challenge.track_id}`}>
                  <button className="btn btn-primary btn-sm">Know more</button>
                </a>
                {role === 'user' ? (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleChoose(challenge.track_id)}
                  >
                    Choose
                  </button>
                ) : (
                  <p className="text-black mt-2">
                    Please register for the event first.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="btn btn-secondary mt-4"
        onClick={() => navigate('/events')}
      >
        Back
      </button>
    </div>
  );
}

export default Challenges;

// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../App.css';
// import RoleBasedComponent from './rolebasedbutton';
// import { useParams } from 'react-router-dom'; // Import useParams
// import { getUserRole } from './auth';


// function Challenges() {
//   const [challenges, setChallenges] = useState([]);
//   const { eventId } = useParams(); // Get eventId from URL parameters
//     const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  
//     //for role based access on choose component
//     const role = getUserRole();
    
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/challenges`); // Corrected API route
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setChallenges(data);
//         // console.log(data);
//       } catch (err) {
//         console.error('Error fetching problem statement data:', err);
//       }
//     };

//     fetchData();
//   }, [eventId]); // Add eventId as a dependency

//   return (
//     <div className="row">
//       {challenges.map((challenge) => (
//         <div className="col-md-4" key={challenge.track_id}>
//           <div className="card mb-4">
//             <div className="card-header">
//               Track ID: {challenge.track_id}
//             </div>
//             <img src={challenge.imgurl} className="card-img-top" alt="problem statement image" />
//             <div className="card-body">
//               <h5 className="card-title">{challenge.title}</h5>
//               <h6 className="card-subtitle mb-2 text-muted">{challenge.description}</h6>
//               <a href={`/displaychallenge/${challenge.track_id}`}><button>Know more</button></a>
//               {/* <RoleBasedComponent
//                 role={"user"}
//                 supportedRoles={["admin", "mentor", "user"]}
//                 render={() => <button>Choose</button>}
//               /> */}
//               {role === 'user' && <button>Choose</button>}
//               {role !== 'user' && <p>Please register as Participant first</p>}

//             </div>
//           </div>
//         </div>
//       ))}
//       <button  onClick={() => window.location.href = '/events'}>Back</button>
//     </div>
//   );
// }

// export default Challenges;
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

