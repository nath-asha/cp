// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../App.css';

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
//     const [requestMessage, setRequestMessage] = useState('');

//     // Dummy user ID for the current user (replace with actual user authentication)
//     const currentUserId = 'user123';

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const teamsResponse = await fetch('http://localhost:5000/teams');
//                 if (!teamsResponse.ok) {
//                     throw new Error(`HTTP error! Status: ${teamsResponse.status}`);
//                 }
//                 const teamsData = await teamsResponse.json();
//                 setTeams(teamsData);

//                 const usersResponse = await fetch('http://localhost:5000/users');
//                 if (!usersResponse.ok) {
//                     throw new Error(`HTTP error! Status: ${usersResponse.status}`);
//                 }
//                 const usersData = await usersResponse.json();
//                 setUsers(usersData);
//             } catch (err) {
//                 console.error('Error fetching data:', err);
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const currentUser = users.find(user => user.id === currentUserId);
//     const currentUserName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '';

//     const filteredParticipantsCreate = users.filter(participant =>
//         participant.id !== currentUserId && // Don't include the current user in the list
//         participant.firstName &&
//         participant.firstName.toLowerCase().includes(participantSearchCreate.toLowerCase())
//     );

//     const filteredTeamsJoin = teams.filter(team =>
//         team.members && team.members.length < 4 &&
//         team.name && team.name.toLowerCase().includes(teamSearchJoin.toLowerCase())
//     );

//     const handleTabChange = (tab) => {
//         setActiveTab(tab);
//     };

//     const handleInputChange = (e) => {
//         setTeamName(e.target.value);
//     };

//     const handleAddParticipant = (user) => {
//         if (selectedParticipants.length < 4 && !selectedParticipants.some(p => p.id === user.id)) {
//             setSelectedParticipants([...selectedParticipants, user]);
//         } else if (selectedParticipants.length >= 4) {
//             alert('Team size cannot exceed 4 participants.');
//         }
//     };

//     const handleRemoveParticipant = (userId) => {
//         setSelectedParticipants(selectedParticipants.filter(p => p.id !== userId));
//     };

//     const handleSendRequestCreateTeam = async () => {
//         if (!teamName.trim()) {
//             alert('Please enter a team name.');
//             return;
//         }

//         if (selectedParticipants.length === 0) {
//             alert('Please add at least one participant to the team.');
//             return;
//         }

//         const participantsToSend = selectedParticipants.map(p => p.id);

//         // Include the current user as a member initially
//         const newTeam = {
//             name: teamName,
//             members: [currentUserId, ...participantsToSend],
//             requests: participantsToSend.map(userId => ({
//                 userId: userId,
//                 status: 'pending',
//                 message: `You have been invited to join team "${teamName}" by ${currentUserName}.`,
//                 teamId: null // Will be updated after team creation
//             }))
//         };

//         try {
//             const response = await fetch('http://localhost:5000/teams', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(newTeam),
//             });

//             if (response.ok) {
//                 const createdTeam = await response.json();
//                 setTeams([...teams, createdTeam]);

//                 // Update user requests
//                 participantsToSend.forEach(async (userId) => {
//                     await fetch(`http://localhost:5000/users/${userId}`, {
//                         method: 'PATCH',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({
//                             requests: [
//                                 ...(users.find(u => u.id === userId)?.requests || []),
//                                 {
//                                     teamId: createdTeam.id,
//                                     from: currentUserId,
//                                     message: `You have been invited to join team "${teamName}" by ${currentUserName}.`,
//                                     status: 'pending'
//                                 }
//                             ]
//                         }),
//                     });
//                 });

//                 alert(`Team "${teamName}" created. Requests sent to participants.`);
//                 setTeamName('');
//                 setSelectedParticipants([]);
//             } else {
//                 console.error('Failed to create team');
//                 alert('Failed to create team.');
//             }
//         } catch (error) {
//             console.error('Error creating team:', error);
//             alert('Error creating team.');
//         }
//     };

//     const handleSendJoinRequest = async (team) => {
//         const request = {
//             teamId: team.id,
//             from: currentUserId,
//             message: `${currentUserName} wants to join your team "${team.name}".`,
//             status: 'pending'
//         };

//         try {
//             // Send request to all members of the team
//             team.members.forEach(async (memberId) => {
//                 if (memberId !== currentUserId) {
//                     await fetch(`http://localhost:5000/users/${memberId}`, {
//                         method: 'PATCH',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({
//                             requests: [
//                                 ...(users.find(u => u.id === memberId)?.requests || []),
//                                 request
//                             ]
//                         }),
//                     });
//                 }
//             });
//             alert(`Request sent to join team "${team.name}".`);
//         } catch (error) {
//             console.error('Error sending join request:', error);
//             alert('Error sending join request.');
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     return (
//         <div className="container mt-5">
//             <h2 className="mb-4">Team Management</h2>
//             <ul className="nav nav-tabs mb-3">
//                 <li className="nav-item">
//                     <button
//                         className={`nav-link ${activeTab === 'create' ? 'active' : ''}`}
//                         onClick={() => handleTabChange('create')}
//                     >
//                         Create Team
//                     </button>
//                 </li>
//                 <li className="nav-item">
//                     <button
//                         className={`nav-link ${activeTab === 'join' ? 'active' : ''}`}
//                         onClick={() => handleTabChange('join')}
//                     >
//                         Join Team
//                     </button>
//                 </li>
//             </ul>

//             {activeTab === 'create' && (
//                 <div className="card p-4">
//                     <h3>Create a New Team</h3>
//                     <div className="mb-3">
//                         <label htmlFor="teamName" className="form-label">Team Name:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="teamName"
//                             value={teamName}
//                             onChange={handleInputChange}
//                             placeholder="Enter team name"
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="participantSearchCreate" className="form-label">Add Participants:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="participantSearchCreate"
//                             placeholder="Search participants by name..."
//                             value={participantSearchCreate}
//                             onChange={(e) => setParticipantSearchCreate(e.target.value)}
//                         />
//                         <ul className="list-group mt-2">
//                             {filteredParticipantsCreate.map(participant => (
//                                 <li
//                                     key={participant.id}
//                                     className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
//                                 >
//                                     {`${participant.firstName} ${participant.lastName} (${participant.USN})`}
//                                     <button
//                                         className="btn btn-sm btn-outline-primary"
//                                         onClick={() => handleAddParticipant(participant)}
//                                         disabled={selectedParticipants.length >= 4}
//                                     >
//                                         Add
//                                     </button>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {selectedParticipants.length > 0 && (
//                         <div className="mb-3">
//                             <h5>Selected Participants ({selectedParticipants.length}/4):</h5>
//                             <ul className="list-group">
//                                 {selectedParticipants.map(participant => (
//                                     <li
//                                         key={participant.id}
//                                         className="list-group-item d-flex justify-content-between align-items-center"
//                                     >
//                                         {`${participant.firstName} ${participant.lastName}`}
//                                         <button
//                                             className="btn btn-sm btn-outline-danger"
//                                             onClick={() => handleRemoveParticipant(participant.id)}
//                                         >
//                                             Remove
//                                         </button>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}

//                     <button
//                         className="btn btn-primary"
//                         onClick={handleSendRequestCreateTeam}
//                         disabled={selectedParticipants.length === 0 || selectedParticipants.length > 3 || !teamName.trim()}
//                     >
//                         Send Request
//                     </button>
//                 </div>
//             )}

//             {activeTab === 'join' && (
//                 <div className="card p-4">
//                     <h3>Join a Team</h3>
//                     <div className="mb-3">
//                         <label htmlFor="teamSearchJoin" className="form-label">Search Teams:</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="teamSearchJoin"
//                             placeholder="Search teams by name..."
//                             value={teamSearchJoin}
//                             onChange={(e) => setTeamSearchJoin(e.target.value)}
//                         />
//                     </div>
//                     {filteredTeamsJoin.length > 0 ? (
//                         <ul className="list-group">
//                             {filteredTeamsJoin.map(team => (
//                                 <li
//                                     key={team.id}
//                                     className="list-group-item d-flex justify-content-between align-items-center"
//                                 >
//                                     <div>
//                                         <h5>{team.name}</h5>
//                                         {team.members && <small className="text-muted">Members: {team.members.length}/4</small>}
//                                     </div>
//                                     <button
//                                         className="btn btn-sm btn-outline-success"
//                                         onClick={() => handleSendJoinRequest(team)}
//                                     >
//                                         Join Team
//                                     </button>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p>No teams available to join currently.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default TeamManager;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useParams } from 'react-router-dom';
import { getUserRole, getUserId } from './auth';

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
    const [requestsSentToTeam, setRequestsSentToTeam] = useState([]);
    const {eventId} = useParams(); //to get eventId from url and that event id must be updated to teams collection

    const role = getUserRole();    
    const userId =  getUserId();
    const isRegisteredUser = true; 

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            //this is for creating teams
            try {
                const response = await fetch('http://localhost:5000/createteams', { // Changed '/teams' to '/createteams'
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // body: JSON.stringify(newTeam),
                });      

                //for getting teams
                const teamsResponse = await fetch('http://localhost:5000/teams');
                if (!teamsResponse.ok) {
                    throw new Error(`HTTP error! Status: ${teamsResponse.status}`);
                }
                const teamsData = await teamsResponse.json();
                setTeams(teamsData);
                console.log(teamsData);

                //for getting users
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

    const handleCreateTeam = async (teamData) => {
        try {
            const response = await fetch('http://localhost:5000/createteams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teamData),
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                return result.team;
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Failed to create team.');
            }
        } catch (error) {
            console.error('Error creating team:', error);
            alert('Error creating team.');
        }
    };
    const currentUserId = userId; 
    const currentUser = users.find(user => user.id === currentUserId);
    const currentUserName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '';
    const isUserInTeam = teams.some(team => team.members && team.members.includes(currentUserId));

    const filteredParticipantsCreate = users.filter(participant =>
        participant.id !== currentUserId &&
        participant.firstName &&
        participant.firstName.toLowerCase().includes(participantSearchCreate.toLowerCase())
    );

    const joinableTeams = teams.filter(team => team.members && team.members.length < 4);

    const filteredTeamsJoin = joinableTeams.filter(team =>
        team.name && team.name.toLowerCase().includes(teamSearchJoin.toLowerCase())
    );

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'create') {
            setRequestsSentToTeam([]);
        }
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

    const newTeam = {
        name: teamName,
        team_id: teams.length > 0 ? Math.max(...teams.map(team => team.team_id || 0)) + 1 : 1, // Auto-increment team_id
        members: [currentUserId, ...participantsToSend],
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
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        requests: [
                            ...(users.find(u => u.id === userId)?.requests || []),
                            {
                                teamId: createdTeam.team_id,
                                from: currentUserId,
                                message: `You have been invited to join team "${teamName}" by ${currentUserName}.`,
                                status: 'pending',
                            },
                        ],
                    }),
                });
            });

            alert(`Team "${teamName}" created. Requests sent to participants.`);
            setTeamName('');
            setSelectedParticipants([]);
            setRequestsSentToTeam(createdTeam.requests); // Show requests sent for the new team
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
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            requests: [
                                ...(users.find(u => u.id === memberId)?.requests || []),
                                request
                            ]
                        }),
                        // body: JSON.stringify({
                        //     requests: [
                        //         ...(users.find(u => u.id === memberId)?.requests || []),
                        //     {
                        //         memberId: users.id,
                        //     }
                        // ]
                        // }),
                    });
                }
            });
            alert(`Request sent to join team "${team.name}".`);
        } catch (error) {
            console.error('Error sending join request:', error);
            alert('Error sending join request.');
        }
    };

    useEffect(() => {
        // Automatically set isTeam to true if the current user is in any team
        if (currentUser) {
            const updatedUsers = users.map(user =>
                user.id === currentUserId ? { ...user, isTeam: isUserInTeam } : user
            );
            if (JSON.stringify(users) !== JSON.stringify(updatedUsers)) {
                setUsers(updatedUsers);
            }
        }
    
        // Automatically set isFull to true for teams with 4 members
        const updatedTeams = teams.map(team =>
            team.members && team.members.length === 4 ? { ...team, isFull: true } : team
        );
        if (JSON.stringify(teams) !== JSON.stringify(updatedTeams)) {
            setTeams(updatedTeams);
        }
    
        // Logic for post-deadline team blocking and notifications would go here
        // checking a deadline and team member counts
        // and then making API calls to update the team status and send notifications.
        // well-defined deadline and notification system.
    }, [currentUser, isUserInTeam]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Team Management</h2>

            {isRegisteredUser ? (
                <>
                    {isUserInTeam ? (
                        <div className="alert alert-info" role="alert">
                            You are already part of a team.
                        </div>
                    ) : (
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
                    )}

                    {activeTab === 'create' && !isUserInTeam && (
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

                            {requestsSentToTeam.length > 0 && (
                                <div className="mt-3">
                                    <h5>Requests Sent:</h5>
                                    <ul className="list-group">
                                        {requestsSentToTeam.map((request, index) => {
                                            const user = users.find(u => u.id === request.userId);
                                            return (
                                                <li key={index} className="list-group-item">
                                                    {user ? `${user.firstName} ${user.lastName}` : 'Unknown User'} - Status: {request.status}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'join' && !isUserInTeam && (
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
                                                {/* <small className='text-muted'>Members: {team.members[0]}</small> */}
                                                {team.isFull && <span className="badge bg-danger ms-2">Full</span>}
                                            </div>
                                            <button
                                                className="btn btn-sm btn-outline-success"
                                                onClick={() => handleSendJoinRequest(team)}
                                                disabled={team.isFull}
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
                </>
            ) : (
                <div className="alert alert-warning" role="alert">
                    You must be a registered user to create or join a team.
                </div>
            )}
        </div>
    );
}

export default TeamManager;