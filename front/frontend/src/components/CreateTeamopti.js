import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useParams } from 'react-router-dom';
import { getUserRole, getUserId } from './auth';

const TeamManager = () => {
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
    const { eventId } = useParams();
    const role = getUserRole();
    const userId = getUserId();
    const isRegisteredUser = true;
    const currentUserId = userId;
    const currentUser = users.find(user => user.id === currentUserId);
    const currentUserName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '';
    const isUserInTeam = teams.some(team => team.members && team.members.includes(currentUserId));

    // Fetch data (teams, users)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [teamsResponse, usersResponse] = await Promise.all([
                    fetch('http://localhost:5000/teams'), // Corrected endpoint
                    fetch('http://localhost:5000/users')
                ]);

                if (!teamsResponse.ok) throw new Error(`Teams fetch failed: ${teamsResponse.status}`);
                if (!usersResponse.ok) throw new Error(`Users fetch failed: ${usersResponse.status}`);

                const teamsData = await teamsResponse.json();
                const usersData = await usersResponse.json();

                setTeams(teamsData);
                setUsers(usersData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Update user's team status and team's full status
    useEffect(() => {
        if (currentUser) {
            const updatedUsers = users.map(user =>
                user.id === currentUserId ? { ...user, isTeam: isUserInTeam } : user
            );
            if (JSON.stringify(users) !== JSON.stringify(updatedUsers)) {
                setUsers(updatedUsers);
            }
        }

        const updatedTeams = teams.map(team =>
            team.members && team.members.length === 4 ? { ...team, isFull: true } : team
        );
        if (JSON.stringify(teams) !== JSON.stringify(updatedTeams)) {
            setTeams(updatedTeams);
        }
    }, [currentUser, isUserInTeam, teams, users, currentUserId]); // Added dependencies

    // Handle team creation
    const handleCreateTeam = async (teamData) => {
        try {
            const response = await fetch('http://localhost:5000/createteams', {  // Corrected endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(teamData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create team.');
            }

            const createdTeam = await response.json();
            alert(createdTeam.message);
            return createdTeam.team; // Return created team
        } catch (error) {
            console.error('Error creating team:', error);
            alert('Error creating team: ' + error.message); // Show error message
            throw error; // re-throw
        }
    };

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'create') {
            setRequestsSentToTeam([]);
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        setTeamName(e.target.value);
    };

    // Handle adding a participant.
    const handleAddParticipant = (user) => {
        if (selectedParticipants.length >= 4) {
            alert('Team size cannot exceed 4 participants.');
            return;
        }
        if (selectedParticipants.some(p => p.id === user.id)) return;

        setSelectedParticipants(prev => [...prev, user]);
    };

    // Handle removing a participant
    const handleRemoveParticipant = (userId) => {
        setSelectedParticipants(prev => prev.filter(p => p.id !== userId));
    };

    // Handle sending the create team request
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
            team_id: teams.length > 0 ? Math.max(...teams.map(team => team.team_id || 0)) + 1 : 1,
            members: [currentUserId, ...participantsToSend],
            eventId: eventId, // Include the eventId
        };

        try {
            const createdTeam = await handleCreateTeam(newTeam); // Await here
            setTeams(prevTeams => [...prevTeams, createdTeam]);

            // Send requests and await all of them.
            await Promise.all(
                participantsToSend.map(async (userId) => {
                    const user = users.find((u) => u.id === userId); // Find user
                    if (!user) return; // if user not found, skip.

                    await fetch(`http://localhost:5000/users/${userId}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            requests: [
                                ...(user.requests || []),
                                {
                                    teamId: createdTeam.team_id,
                                    from: currentUserId,
                                    message: `You have been invited to join team "${teamName}" by ${currentUserName}.`,
                                    status: 'pending',
                                },
                            ],
                        }),
                    });
                })
            );

            alert(`Team "${teamName}" created. Requests sent to participants.`);
            setTeamName('');
            setSelectedParticipants([]);
            setRequestsSentToTeam([]); // Reset
        } catch (error) {
            console.error("Error in handleSendRequestCreateTeam", error);
        }
    };

    // Handle sending join team request
    const handleSendJoinRequest = async (team) => {
        const request = {
            teamId: team.id,
            from: currentUserId,
            message: `${currentUserName} wants to join your team "${team.name}".`,
            status: 'pending',
        };

        try {
            // Send request to all members, excluding the current user.
            await Promise.all(
                team.members.filter(memberId => memberId !== currentUserId).map(async (memberId) => {
                    const user = users.find(u => u.id === memberId);
                    if (!user) return;
                    await fetch(`http://localhost:5000/users/${memberId}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            requests: [
                                ...(user.requests || []),
                                request
                            ],
                        }),
                    });
                })
            );
            alert(`Request sent to join team "${team.name}".`);
        } catch (error) {
            console.error('Error sending join request:', error);
            alert('Error sending join request.');
        }
    };

    const filteredParticipantsCreate = users.filter(participant =>
        participant.id !== currentUserId &&
        participant.firstName &&
        participant.firstName.toLowerCase().includes(participantSearchCreate.toLowerCase())
    );

    const joinableTeams = teams.filter(team => team.members && team.members.length < 4);

    const filteredTeamsJoin = joinableTeams.filter(team =>
        team.name && team.name.toLowerCase().includes(teamSearchJoin.toLowerCase())
    );

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
};

export default TeamManager;
