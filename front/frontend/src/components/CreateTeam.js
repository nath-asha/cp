import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function TeamManager() {
    const [activeTab, setActiveTab] = useState('create');
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [participantSearchCreate, setParticipantSearchCreate] = useState('');
    const [teamSearchJoin, setTeamSearchJoin] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [requestMessage, setRequestMessage] = useState('');

    // Dummy user ID for the current user (replace with actual user authentication)
    const currentUserId = 'user123';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const teamsResponse = await fetch('http://localhost:5000/teams');
                if (!teamsResponse.ok) {
                    throw new Error(`HTTP error! Status: ${teamsResponse.status}`);
                }
                const teamsData = await teamsResponse.json();
                setTeams(teamsData);

                const usersResponse = await fetch('http://localhost:5000/users');
                if (!usersResponse.ok) {
                    throw new Error(`HTTP error! Status: ${usersResponse.status}`);
                }
                const usersData = await usersResponse.json();
                setUsers(usersData);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const currentUser = users.find(user => user.id === currentUserId);
    const currentUserName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '';

    const filteredParticipantsCreate = users.filter(participant =>
        participant.id !== currentUserId && // Don't include the current user in the list
        participant.firstName &&
        participant.firstName.toLowerCase().includes(participantSearchCreate.toLowerCase())
    );

    const filteredTeamsJoin = teams.filter(team =>
        team.members && team.members.length < 4 &&
        team.name && team.name.toLowerCase().includes(teamSearchJoin.toLowerCase())
    );

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleInputChange = (e) => {
        setTeamName(e.target.value);
    };

    const handleAddParticipant = (user) => {
        if (selectedParticipants.length < 4 && !selectedParticipants.some(p => p.id === user.id)) {
            setSelectedParticipants([...selectedParticipants, user]);
        } else if (selectedParticipants.length >= 4) {
            alert('Team size cannot exceed 4 participants.');
        }
    };

    const handleRemoveParticipant = (userId) => {
        setSelectedParticipants(selectedParticipants.filter(p => p.id !== userId));
    };

    const handleSendRequestCreateTeam = async () => {
        if (!teamName.trim()) {
            alert('Please enter a team name.');
            return;
        }

        if (selectedParticipants.length === 0) {
            alert('Please add at least one participant to the team.');
            return;
        }

        const participantsToSend = selectedParticipants.map(p => p.id);

        // Include the current user as a member initially
        const newTeam = {
            name: teamName,
            members: [currentUserId, ...participantsToSend],
            requests: participantsToSend.map(userId => ({
                userId: userId,
                status: 'pending',
                message: `You have been invited to join team "${teamName}" by ${currentUserName}.`,
                team_id: null // Will be updated after team creation
            }))
        };

        try {
            const response = await fetch('http://localhost:5000/createteams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTeam),
            });

            if (response.ok) {
                const createdTeam = await response.json();
                setTeams([...teams, createdTeam]);

                // Update user requests
                participantsToSend.forEach(async (userId) => {
                    await fetch(`http://localhost:5000/users/${userId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            requests: [
                                ...(users.find(u => u.id === userId)?.requests || []),
                                {
                                    teamd: createdTeam.id,
                                    from: currentUserId,
                                    message: `You have been invited to join team "${teamName}" by ${currentUserName}.`,
                                    status: 'pending'
                                }
                            ]
                        }),
                    });
                });

                alert(`Team "${teamName}" created. Requests sent to participants.`);
                setTeamName('');
                setSelectedParticipants([]);
            } else {
                console.error('Failed to create team');
                alert('Failed to create team.');
            }
        } catch (error) {
            console.error('Error creating team:', error);
            alert('Error creating team.');
        }
    };

    const handleSendJoinRequest = async (team) => {
        const request = {
            teamId: team.id,
            from: currentUserId,
            message: `${currentUserName} wants to join your team "${team.name}".`,
            status: 'pending'
        };

        try {
            // Send request to all members of the team
            team.members.forEach(async (memberId) => {
                if (memberId !== currentUserId) {
                    await fetch(`http://localhost:5000/users/${memberId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            requests: [
                                ...(users.find(u => u.id === memberId)?.requests || []),
                                request
                            ]
                        }),
                    });
                }
            });
            alert(`Request sent to join team "${team.name}".`);
        } catch (error) {
            console.error('Error sending join request:', error);
            alert('Error sending join request.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Team Management</h2>
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'create' ? 'active' : ''}`}
                        onClick={() => handleTabChange('create')}
                    >
                        Create Team
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'join' ? 'active' : ''}`}
                        onClick={() => handleTabChange('join')}
                    >
                        Join Team
                    </button>
                </li>
            </ul>

            {activeTab === 'create' && (
                <div className="card p-4">
                    <h3>Create a New Team</h3>
                    <div className="mb-3">
                        <label htmlFor="teamName" className="form-label">Team Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="teamName"
                            value={teamName}
                            onChange={handleInputChange}
                            placeholder="Enter team name"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="participantSearchCreate" className="form-label">Add Participants:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="participantSearchCreate"
                            placeholder="Search participants by name..."
                            value={participantSearchCreate}
                            onChange={(e) => setParticipantSearchCreate(e.target.value)}
                        />
                        <ul className="list-group mt-2">
                            {filteredParticipantsCreate.map(participant => (
                                <li
                                    key={participant.id}
                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                >
                                    {`${participant.firstName} ${participant.lastName} (${participant.USN})`}
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => handleAddParticipant(participant)}
                                        disabled={selectedParticipants.length >= 4}
                                    >
                                        Add
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {selectedParticipants.length > 0 && (
                        <div className="mb-3">
                            <h5>Selected Participants ({selectedParticipants.length}/4):</h5>
                            <ul className="list-group">
                                {selectedParticipants.map(participant => (
                                    <li
                                        key={participant.id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        {`${participant.firstName} ${participant.lastName}`}
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleRemoveParticipant(participant.id)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button
                        className="btn btn-primary"
                        onClick={handleSendRequestCreateTeam}
                        disabled={selectedParticipants.length === 0 || selectedParticipants.length > 3 || !teamName.trim()}
                    >
                        Send Request
                    </button>
                </div>
            )}

            {activeTab === 'join' && (
                <div className="card p-4">
                    <h3>Join a Team</h3>
                    <div className="mb-3">
                        <label htmlFor="teamSearchJoin" className="form-label">Search Teams:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="teamSearchJoin"
                            placeholder="Search teams by name..."
                            value={teamSearchJoin}
                            onChange={(e) => setTeamSearchJoin(e.target.value)}
                        />
                    </div>
                    {filteredTeamsJoin.length > 0 ? (
                        <ul className="list-group">
                            {filteredTeamsJoin.map(team => (
                                <li
                                    key={team.id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <h5>{team.name}</h5>
                                        {team.members && <small className="text-muted">Members: {team.members.length}/4</small>}
                                    </div>
                                    <button
                                        className="btn btn-sm btn-outline-success"
                                        onClick={() => handleSendJoinRequest(team)}
                                    >
                                        Join Team
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No teams available to join currently.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default TeamManager;

// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../App.css'; // Assuming you have App.css for custom styles
// import { useParams } from 'react-router-dom';
// import { getUserRole, getUserId } from './auth'; // Assuming auth.js is in the same directory

// function TeamManager() {
//     const [activeTab, setActiveTab] = useState('create');
//     const [teams, setTeams] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [teamName, setTeamName] = useState('');
//     const [selectedParticipants, setSelectedParticipants] = useState([]);
//     const [participantSearchCreate, setParticipantSearchCreate] = useState('');
//     const [teamSearchJoin, setTeamSearchJoin] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [requestsSentToTeam, setRequestsSentToTeam] = useState([]); // For showing requests status after creation
//     const { eventId } = useParams(); // To get eventId from url

//     const role = getUserRole();
//     const userId = getUserId();
//     const isRegisteredUser = !!userId; // Check if user is logged in

//     const MAX_TEAM_MEMBERS = 4; // Maximum team size

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 // Fetching users
//                 const usersResponse = await fetch('http://localhost:5000/users');
//                 if (!usersResponse.ok) {
//                     throw new Error(`HTTP error! Status: ${usersResponse.status} while fetching users`);
//                 }
//                 const usersData = await usersResponse.json();
//                 setUsers(usersData);

//                 // Fetching teams
//                 const teamsResponse = await fetch('http://localhost:5000/teams');
//                 if (!teamsResponse.ok) {
//                     throw new Error(`HTTP error! Status: ${teamsResponse.status} while fetching teams`);
//                 }
//                 const teamsData = await teamsResponse.json();
//                 setTeams(teamsData);

//             } catch (err) {
//                 console.error('Error fetching data:', err);
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         if (userId) { // Only fetch data if user is logged in
//             fetchData();
//         } else {
//             setLoading(false); // Not loading if no user
//         }
//     }, [userId]); // Re-fetch if userId changes (e.g., login/logout)

//     const currentUserId = userId;
//     const currentUser = users.find(user => user.id === currentUserId);
//     const currentUserName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Logged-in User';

//     // Check if current user is already in any team
//     const isUserInTeam = teams.some(team => team.members && team.members.map(member => member.id || member).includes(currentUserId));

//     const filteredParticipantsCreate = users.filter(participant =>
//         participant.id !== currentUserId && // Exclude current user from selectable list
//         participant.firstName &&
//         participant.firstName.toLowerCase().includes(participantSearchCreate.toLowerCase()) &&
//         !teams.some(team => team.members && team.members.map(member => member.id || member).includes(participant.id)) // Exclude users already in a team
//     );

//     const joinableTeams = teams.filter(team => team.members && team.members.length < 4 && !team.isFull);
//     const filteredTeamsJoin = joinableTeams.filter(team =>
//         team.name && team.name.toLowerCase().includes(teamSearchJoin.toLowerCase())
//     );

//     const handleTabChange = (tab) => {
//         setActiveTab(tab);
//         if (tab === 'create') {
//             setRequestsSentToTeam([]); // Clear previous requests when switching to create tab
//         }
//     };

//     const handleInputChange = (e) => {
//         setTeamName(e.target.value);
//     };

//     const handleAddParticipant = (participant) => {
//         setSelectedParticipants(prev => {
//             // Check if the participant is already selected or if we've reached the max limit
//             if (prev.some(p => p.id === participant.id)) {
//                 alert('This participant is already added.');
//                 return prev;
//             }

//             if (prev.length < MAX_TEAM_MEMBERS - 1) {
//                 // Add the participant to the list if not already added and not exceeding the max
//                 return [...prev, participant];
//             } else {
//                 alert(`A team can have a maximum of ${MAX_TEAM_MEMBERS} participants (including yourself). You cannot add more members.`);
//                 return prev;
//             }
//         });
//     };

//     const handleRemoveParticipant = (id) => {
//         setSelectedParticipants(prev => prev.filter(p => p.id !== id));
//     };

//     const handleSendRequestCreateTeam = async () => {
//         if (!teamName.trim()) {
//             alert('Please enter a team name.');
//             return;
//         }
//         // A team can be created by a single leader, or with invited members.
//         // The prompt implies adding others. If a leader can create a team alone, this check might change.
//         // For now, let's keep the original logic: must invite at least one other.
//         if (selectedParticipants.length === 0) {
//             alert('Please add at least one other participant to the team to send requests.');
//             return;
//         }

//         // This check is redundant if UI disables button correctly, but good for safety.
//         if (selectedParticipants.length > MAX_TEAM_MEMBERS - 1) {
//             alert(`You can only select up to ${MAX_TEAM_MEMBERS - 1} additional participants.`);
//             return;
//         }

//         const participantsToSendIds = selectedParticipants.map(p => p.id);
//         const newTeamData = {
//             name: teamName,
//             leader_id: currentUserId,
//             members: [currentUserId, ...participantsToSendIds], // Storing IDs
//             eventId: eventId,
//         };

//         try {
//             const response = await fetch('http://localhost:5000/send-invitation', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(newTeamData),
//             });

//             if (response.ok) {
//                 const result = await response.json(); // Assuming backend returns the created team object

//                 setTeams(prevTeams => [...prevTeams, result.team]); // Add new team to local state

//                 alert(result.message || `Team "${teamName}" created and invites sent successfully!`);
//                 setTeamName('');
//                 setSelectedParticipants([]);
//                 setActiveTab(''); // Optionally switch tab or show a success message
//             } else {
//                 const errorData = await response.json();
//                 alert(errorData.message || 'Failed to create team. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error creating team:', error);
//             alert('An error occurred while creating the team.');
//         }
//     };

//     const handleSendJoinRequest = async (teamToJoin) => {
//         if (!currentUser) {
//             alert("User data not loaded. Cannot send join request.");
//             return;
//         }

//         const request = {
//             teamId: teamToJoin.id,
//             fromUserId: currentUserId,
//             fromUserName: currentUserName,
//             message: `${currentUserName} wants to join your team "${teamToJoin.name}".`,
//             status: 'pending'
//         };

//         try {
//             const response = await fetch(`http://localhost:5000/request-join/${teamToJoin.id}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(request),
//             });

//             if (response.ok) {
//                 const result = await response.json();
//                 alert(result.message || `Request sent to join team "${teamToJoin.name}".`);
//             } else {
//                 const errorData = await response.json();
//                 alert(errorData.message || 'Failed to send join request.');
//             }
//         } catch (error) {
//             console.error('Error sending join request:', error);
//             alert('Error sending join request.');
//         }
//     };

//     if (loading) return <div className="container mt-5"><p>Loading team data...</p></div>;
//     if (error) return <div className="container mt-5 alert alert-danger">Error: {error.message}</div>;
//     if (!isRegisteredUser) {
//         return (
//             <div className="container mt-5">
//                 <div className="alert alert-warning" role="alert">
//                     You must be logged in to manage teams.
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="container mt-5">
//             <h2 className="mb-4">Team Management</h2>

//             {isUserInTeam ? (
//                 <div className="alert alert-info" role="alert">
//                     You are already part of a team. Manage your team or view details elsewhere.
//                 </div>
//             ) : (
//                 <>
//                     <ul className="nav nav-tabs mb-3">
//                         <li className="nav-item">
//                             <button
//                                 className={`nav-link ${activeTab === 'create' ? 'active' : ''}`}
//                                 onClick={() => handleTabChange('create')}
//                             >
//                                 Create Team
//                             </button>
//                         </li>
//                         <li className="nav-item">
//                             <button
//                                 className={`nav-link ${activeTab === 'join' ? 'active' : ''}`}
//                                 onClick={() => handleTabChange('join')}
//                             >
//                                 Join Team
//                             </button>
//                         </li>
//                     </ul>

//                     {activeTab === 'create' && (
//                         <div className="card p-4 shadow-sm">
//                             <h3>Create a New Team</h3>
//                             <div className="mb-3">
//                                 <label htmlFor="teamName" className="form-label">Team Name:</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id="teamName"
//                                     value={teamName}
//                                     onChange={handleInputChange}
//                                     placeholder="Enter team name"
//                                 />
//                             </div>

//                             <div className="mb-3">
//                                 <label htmlFor="participantSearchCreate" className="form-label">
//                                     Add Participants (up to {MAX_TEAM_MEMBERS - 1} more):
//                                 </label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id="participantSearchCreate"
//                                     placeholder="Search participants by name..."
//                                     value={participantSearchCreate}
//                                     onChange={(e) => setParticipantSearchCreate(e.target.value)}
//                                     disabled={selectedParticipants.length >= MAX_TEAM_MEMBERS - 1}
//                                 />
//                                 <ul className="list-group mt-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
//                                     {filteredParticipantsCreate.map(participant => (
//                                         <li key={participant.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
//                                             <span className="text-black">
//                                                 {`${participant.firstName} ${participant.lastName}`}
//                                             </span>
//                                             <button
//                                                 className="btn btn-sm btn-outline-primary"
//                                                 onClick={() => handleAddParticipant(participant)}
//                                                 disabled={selectedParticipants.some(p => p.id === participant.id) || selectedParticipants.length >= MAX_TEAM_MEMBERS - 1}
//                                             >
//                                                 Add
//                                             </button>
//                                             {selectedParticipants.some(p => p.id === participant.id) && (
//                                                 <span className="text-success">✔</span>
//                                             )}
//                                         </li>
//                                     ))}
//                                     {participantSearchCreate && filteredParticipantsCreate.length === 0 && (
//                                         <li className="list-group-item">No matching participants found or available.</li>
//                                     )}
//                                 </ul>
//                             </div>

//                             <div className="mb-3">
//                                 <h5>Selected Team Members ({selectedParticipants.length + 1}/{MAX_TEAM_MEMBERS}):</h5>
//                                 <ul className="list-group">
//                                     <li className="list-group-item d-flex justify-content-between align-items-center active">
//                                         {`${currentUserName} (Team Leader)`}
//                                         <span>👑</span>
//                                     </li>
//                                     {selectedParticipants.map(participant => (
//                                         <li key={participant.id} className="list-group-item d-flex justify-content-between align-items-center">
//                                             {`${participant.firstName} ${participant.lastName}`}
//                                             <button
//                                                 className="btn btn-sm btn-outline-danger"
//                                                 onClick={() => handleRemoveParticipant(participant.id)}
//                                             >
//                                                 Remove
//                                             </button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>

//                             <button
//                                 className="btn btn-primary w-100"
//                                 onClick={handleSendRequestCreateTeam}
//                                 disabled={!teamName.trim() || selectedParticipants.length === 0 || selectedParticipants.length > MAX_TEAM_MEMBERS - 1 }
//                             >
//                                 Create Team & Send Invites
//                             </button>
//                         </div>
//                     )}

//                     {activeTab === 'join' && (
//                         <div className="card p-4 shadow-sm">
//                             <h3>Join an Existing Team</h3>
//                             <div className="mb-3">
//                                 <label htmlFor="teamSearchJoin" className="form-label">Search Available Teams:</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id="teamSearchJoin"
//                                     placeholder="Search teams by name..."
//                                     value={teamSearchJoin}
//                                     onChange={(e) => setTeamSearchJoin(e.target.value)}
//                                 />
//                             </div>
//                             {filteredTeamsJoin.length > 0 ? (
//                                 <ul className="list-group">
//                                     {filteredTeamsJoin.map(team => (
//                                         <li key={team.id} className="list-group-item d-flex justify-content-between align-items-center">
//                                             {team.name}
//                                             <button
//                                                 className="btn btn-sm btn-outline-primary"
//                                                 onClick={() => handleSendJoinRequest(team)}
//                                             >
//                                                 Request to Join
//                                             </button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <p>No available teams to join</p>
//                             )}
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// }

// export default TeamManager;
