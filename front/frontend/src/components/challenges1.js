import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserRole, getUserId } from './auth'; // Assuming getUserId() gets the logged-in user's ID

function Challenges1() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [teamId, setTeamId] = useState(null);
  const [hasTeam, setHasTeam] = useState(false); // New state to track if the user has a team
  const [selectedEvent, setSelectedEvent] = useState(null);
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

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/events/${eventId}`);
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data) && data.length > 0) {
          setSelectedEvent(data[0]);

          // Check if the current user is registered for THIS SPECIFIC event
          setIsRegistered(false);

          if (userId && data[0].participants) {
            const participantIds = data[0].participants.map(id => String(id));
            const currentUserId = String(userId);

            if (participantIds.includes(currentUserId)) {
              setIsRegistered(true);
            }
          }
        } else {
          setSelectedEvent(null);
          setIsRegistered(false);
          console.warn("No event data found for this ID.");
        }
      } catch (err) {
        console.error('Error fetching event data:', err);
        setIsRegistered(false);
      }
    };

    fetchEventDetails();
  }, [eventId, userId]);

 
useEffect(() => {
 const checkUserTeam = async () => {
  if (isRegistered && userId) {
    try {
      const response = await fetch(`http://localhost:5000/teams/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setHasTeam(data.hasTeam);
        if (data.hasTeam && data.team) {
          setTeamId(data.team.team_id); // set teamId here
        }
      }
    } catch (err) {
      console.error('Error checking team status:', err);
      setHasTeam(false);
      setTeamId(null);
    }
  }
};
  checkUserTeam();
}, [isRegistered, userId]);

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
                ) : !isRegistered ? (
                  <p className="text-black mt-2">Please register for the event first.</p>
                ) : !hasTeam ? (
                  <p className="text-black mt-2">You must have a team to choose a challenge.</p>
                ) : null}
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

export default Challenges1;

// router.get('/teams/hasTeam/:userId', async (req, res) => {
//   const { userId } = req.params;
  
//   try {
//     const team = await Team.findOne({ "members.user_id": userId });
    
//     if (team) {
//       return res.json({ hasTeam: true });
//     } else {
//       return res.json({ hasTeam: false });
//     }
 
