import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

//by default team is set to none so only those users where team=none will displayed after the search
//send request will only be visible to registered users
//all the teams which did not exceed member limit will be displayed
//member.size() >= 4 teams will be blocked automatically post deadline, incomplete teams will be sent notifcations to complete teams
//the mentors/organisers will be able to add members to incomplete teams at random
//choosing the problem statement function yet to be added
      //mentors can be assigned randomly or with a preference of skills
      //long length descriptions for challenges
function Teammanager() {
    const [teams, setTeams] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [participantSearch, setParticipantSearch] = useState('');
    const [teamSearch, setTeamSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const filteredParticipants = participants.filter(participant =>
        participant.firstName && participant.firstName.toLowerCase().includes(participantSearch.toLowerCase())
    );

    const filteredTeams = teams.filter(team =>
        team.name && team.name.toLowerCase().includes(teamSearch.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <div className='row'>
                <h2>Participants</h2>
                <input
                    type="text"
                    placeholder="Search Participants..."
                    value={participantSearch}
                    onChange={(e) => setParticipantSearch(e.target.value)}
                    className="search-input"
                />
                {filteredParticipants.map((participant) => (
                    <div className="col-md-4" key={participant.id}>
                        <div className="card mb-4">
                            <div className="card-header">
                                User ID: {participant.id}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{participant.firstName}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{participant.email}</h6>
                                <button>send request</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row">
                <h2>Teams</h2>
                <input
                    type="text"
                    placeholder="Search Teams..."
                    value={teamSearch}
                    onChange={(e) => setTeamSearch(e.target.value)}
                    className="search-input"
                />
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

export default Teammanager;