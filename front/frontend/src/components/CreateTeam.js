import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Createteam() {
    const [teams, setTeams] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [participantSearch, setParticipantSearch] = useState('');
    const [teamSearch, setTeamSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newTeam, setNewTeam] = useState({ name: '', project: '', members: [] });
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

            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
            setNewTeam({ name: '', project: '', members: [] });
            alert('Team created successfully!');
        } catch (err) {
            console.error('Error creating team:', err);
            alert('Failed to create team.');
        }
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
        // card view
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
                                {/* <h6 className="card-subtitle mb-2 text-muted">{participant.email}</h6> */}
                                <button>send request</button>
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
        </div>
    );
}
}
export default Createteam;
