import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function CreateTeam() {
    const [teams, setTeams] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [participantSearch, setParticipantSearch] = useState('');
    const [teamSearch, setTeamSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newTeam, setNewTeam] = useState({ name: '', members: [] });
    const [requests, setRequests] = useState([]);
    const [approvedParticipants, setApprovedParticipants] = useState([]);
    const [selectedParticipants, setSelectedParticipants] = useState([]);

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
                setParticipants(usersData);
                const allRequests = usersData.flatMap(user => user.requests || []);
                setRequests(allRequests);

                // Filter approved participants
                const approved = usersData.filter(user => user.isTeam);
                setApprovedParticipants(approved);

            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSendRequest = async (participantId) => {
        try {
            const response = await fetch('http://localhost:5000/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ participantId, status: 'pending' }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const newRequest = await response.json();
            setRequests([...requests, newRequest]);

            // Add participant to selected participants
            const participant = participants.find(p => p.id === participantId);
            if (participant) {
                setSelectedParticipants([...selectedParticipants, participant]);
            }

            alert('Request sent successfully!');
        } catch (err) {
            console.error('Error sending request:', err);
            alert('Failed to send request.');
        }
    };

    const handleRemoveParticipant = (participantId) => {
        setSelectedParticipants(selectedParticipants.filter(p => p.id !== participantId));
    };

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/teams', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTeam),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const createdTeam = await response.json();
            setTeams([...teams, createdTeam]);
            setNewTeam({ name: '', members: [] });
            setSelectedParticipants([]);
            alert('Team created successfully!');
        } catch (err) {
            console.error('Error creating team:', err);
            alert('Failed to create team.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const filteredParticipants = participants.filter(participant =>
        participant.firstName && participant.firstName.toLowerCase().includes(participantSearch.toLowerCase())
    );

    const filteredTeams = teams.filter(team =>
        team.name && team.name.toLowerCase().includes(teamSearch.toLowerCase())
    );

    return (
        <div>
            <div className='row'>
                <div className='col-md-6 p-4'>
                    <input
                        type="text"
                        placeholder="Search Participants by name..."
                        value={participantSearch}
                        onChange={(e) => setParticipantSearch(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className='col-md-6 p-4'>
                    <input
                        type="text"
                        placeholder="Search Teams..."
                        value={teamSearch}
                        onChange={(e) => setTeamSearch(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            <form onSubmit={handleCreateTeam}>
                <h3>Create a New Team</h3>
                <div>
                    <input
                        type="text"
                        placeholder="Team Name"
                        value={newTeam.name}
                        onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                        required
                    />
                </div>
                {newTeam.name && <p>Add participants</p>}
                <div>
                    <h3>Select Members</h3>
                    {selectedParticipants.map(participant => (
                        <div key={participant.id}>
                            <span>{participant.firstName}</span>
                            <button type="button" onClick={() => handleRemoveParticipant(participant.id)}>Remove</button>
                        </div>
                    ))}
                </div>
                <button type="submit">Create Team</button>
            </form>

            <div className='row'>
                <h2 className='text-black'>Participants</h2>
                {filteredParticipants.map((participant) => (
                    <div className="col-md-4" key={participant.id}>
                        <div className="card mb-4">
                            <div className="card-header">
                                User ID: {participant.USN}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{participant.firstName}</h5>
                                <button onClick={() => handleSendRequest(participant.id)}>Send Request</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row">
                <h2 className='text-black'>Teams</h2>
                {filteredTeams.map((team) => (
                    <div className="col-md-4" key={team.id}>
                        <div className="card mb-4">
                            <div className="card-header">
                                Team ID: {team.id}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{team.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{team.project}</h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row">
                <h2 className='text-black'>Requests</h2>
                {requests.map((request) => (
                    <div className="col-md-4" key={request.id}>
                        <div className="card mb-4">
                            <div className="card-header">
                                Request ID: {request.id}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Participant ID: {request.participantId}</h5>
                                <p>Status: {request.status}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CreateTeam;
