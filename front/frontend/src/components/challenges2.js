import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserRole, getUserId } from './auth'; // Assuming getUserId() gets the logged-in user's ID

function Challenges2() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);
  const [teamId, setTeamId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState(null);
  const { eventId } = useParams(); // Get eventId from URL parameters
  const navigate = useNavigate();
  const role = getUserRole();
  const userId = getUserId(); // Fetch logged-in user ID

  // Fetch challenges for the event
 useEffect(() => {
  const fetchEventDetails = async () => {
    try {
      const eventResponse = await fetch(`http://localhost:5000/events/${eventId}`);
      const eventData = await eventResponse.json();
      
      if (Array.isArray(eventData) && eventData.length > 0) {
        setSelectedEvent(eventData[0]);
        setIsRegistered(eventData[0].participants.includes(userId));

        // Check if user is part of a team
        const teamResponse = await fetch(`http://localhost:5000/user/team/${userId}`);
        if (teamResponse.ok) {
          const teamData = await teamResponse.json();
          setHasTeam(true);
          if (teamData.team && teamData.team.team_id) {
            setTeamId(teamData.team.team_id);
          }
        } else {
          setHasTeam(false);
          setTeamId(null);
        }
      } else {
        setSelectedEvent(null);
        setIsRegistered(false);
        setHasTeam(false);
        setTeamId(null);
      }
    } catch (err) {
      console.error('Error fetching event or team details:', err);
      setIsRegistered(false);
      setHasTeam(false);
      setTeamId(null);
    }
  };

  fetchEventDetails();
}, [eventId, userId]);


  // Check if user is registered and if they have a team
  // useEffect(() => {
  //   const fetchEventDetails = async () => {
  //     try {
  //       const eventResponse = await fetch(`http://localhost:5000/events/${eventId}`);
  //       const eventData = await eventResponse.json();
  //       if (Array.isArray(eventData) && eventData.length > 0) {
  //         setSelectedEvent(eventData[0]);
  //         setIsRegistered(eventData[0].participants.includes(userId));

  //         // Check if user is part of a team
  //        const teamResponse = await fetch(`http://localhost:5000/user/team/${userId}`);
  //         if (teamResponse.ok) {
  //           const teamData = await teamResponse.json();
  //           setHasTeam(true);
  //           if (teamData.team && teamData.team.team_id) {
  //             setTeamId(teamData.team.team_id);
  //           }
  //         } else {
  //           setHasTeam(false);
  //           setTeamId(null);
  //         }
  //   fetchEventDetails();
  // }, [eventId, userId]);

 const handleChoose = async (trackId) => {
  if (!teamId) {
    alert('No team ID found. Please ensure you are in a team.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/choose-challenge/${teamId}`, {
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
                {role === 'user' && isRegistered && hasTeam ? (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleChoose(challenge.track_id)}
                  >
                    Choose
                  </button>
                ) : (
                  <p className="text-black mt-2">
                    Please register for the event and join a team first.
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

export default Challenges2;

// router.get('/user/team/:userId', async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const Team = await team.findOne({
//       "members.user_id": userId,  // Check if userId exists in the team
//     });

//     if (!Team) {
//       return res.status(404).json({ message: 'User does not have a team.' });
//     }

//     // Return team details (optional)
//     res.status(200).json(Team);
//   } catch (error) {
//     console.error('Error checking team for user:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
