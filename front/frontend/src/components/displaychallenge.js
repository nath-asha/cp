import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, Link } from 'react-router-dom'; // Import useParams and Link

const DisplayChallenge = () => {
  const { trackId } = useParams(); // Get trackId from URL parameters
  const [challenges, setChallenges] = useState([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/challenges/${trackId}`); // Fetch based on trackId
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
  }, [trackId]); // Run effect when trackId changes

  const handleNextChallenge = () => {
    setCurrentChallengeIndex((prevIndex) => (prevIndex + 1) % challenges.length);
  };

  return (
    <div className="container mt-4">
      {challenges.length > 0 ? (
        <div className="card mb-3">
          <div className="card-header">
            <h1>{challenges[currentChallengeIndex].title}</h1>
          </div>
          <div className="card-body">
            <p className="card-text">{challenges[currentChallengeIndex].description}</p>
            <div className="mt-4">
              <h2>Details:</h2>
              <img
                src={challenges[currentChallengeIndex].imgurl}
                alt="challenge"
                className="img-fluid mb-3" // Added Bootstrap class for responsive images
                style={{ maxWidth: '250px' }} // Optional: Limit image width
              />
              <p>Track ID: {challenges[currentChallengeIndex].track_id}</p>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <button className="btn btn-primary" onClick={handleNextChallenge}>
              Next Challenge
            </button>
            <Link to="/challenges" className="btn btn-secondary">
              Back to Challenges
            </Link>
          </div>
        </div>
      ) : (
        <p>No challenges found for this track.</p>
      )}
    </div>
  );
};

export default DisplayChallenge;
//description page for each problem statment is not displayed 
//from url but can be navigated from next button count starts at 1
// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState,useEffect } from 'react';

// const DisplayChallenge = ({ title, description, details }) => {
//      const [challenges, setChallenges] = useState([]);
    
//       useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await fetch('http://localhost:5000/challenges'); // Updated API route
//             if (!response.ok) {
//               throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const data = await response.json();
//             setChallenges(data);
//             console.log(data);
//           } catch (err) {
//             console.error('Error fetching problem statement data:', err);
//           }
//         };
    
//         fetchData();
//       }, []);
//     const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

//     const handleNextChallenge = () => {
//         setCurrentChallengeIndex((prevIndex) => (prevIndex + 1) % challenges.length);
//     };

//     return (
//         <div>
//             {challenges.length > 0 && (
//                 <div className="card mb-3">
//                     <div className="card-header">
//                         <h1>{challenges[currentChallengeIndex].title}</h1>
//                     </div>
//                     <div className="card-body">
//                         <p className="card-text">{challenges[currentChallengeIndex].description}</p>
//                         <div className="mt-4">
//                             <h2>Details:</h2>
//                             <img src={challenges[currentChallengeIndex].imgurl} alt='p' height='50%' width='25%'/>
//                             <p>Track ID: {challenges[currentChallengeIndex].track_id}</p>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             <button className="btn btn-primary mt-3" onClick={handleNextChallenge}>
//                 Next Challenge
//             </button>
//             <a href='/challenges'><button>Back to challenges</button></a>
//         </div>
//     );
// };

// export default DisplayChallenge;

// // design a page to show the description title and details of challenges in a way of beautified layout in theme of treasure