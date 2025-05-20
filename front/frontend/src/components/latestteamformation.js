import React, { useState, useEffect } from "react";

function TeamFormation({ userId, teamId }) {
    const [teamName, setTeamName] = useState("");

    const [teams, setTeams] = useState([]);

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetch("/api/team/list")
            .then(res => res.json())
            .then(setTeams);
    }, []);

    useEffect(() => {
        if (teamId) {
            fetch(`/api/team/requests/${teamId}`)
                .then(res => res.json())
                .then(setRequests);
        }
    }, [teamId]);


    const handleCreate = async () => {
        const res = await fetch("/api/team/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, teamName }),
        });
        await res.json();
        alert("Team Created!");
    };


    const handleJoin = async (joinTeamId) => {
        await fetch(`/api/team/request/${joinTeamId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });
        alert("Request sent");
    };

    const handleDecision = async (requestId, decision) => {
        await fetch("/api/team/request/handle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ teamId, requestId, decision }),
        });
        alert("Updated");
        if (teamId) {
            fetch(`/api/team/requests/${teamId}`)
                .then(res => res.json())
                .then(setRequests);
        }
    };

    return (
        <div>
            <div>
                <input
                    placeholder="Team Name"
                    value={teamName}
                    onChange={e => setTeamName(e.target.value)}
                />
                <button onClick={handleCreate}>Create Team</button>
            </div>

            {/* Join Team */}
            <ul>
                {teams.map(team => (
                    <li key={team.team_id}>
                        {team.name}
                        <button onClick={() => handleJoin(team.team_id)}>Request to Join</button>
                    </li>
                ))}
            </ul>

            {teamId && (
                <div>
                    <h3>Join Requests</h3>
                    {requests.map(r => (
                        <div key={r._id}>
                            {r.user_id.name}
                            <button onClick={() => handleDecision(r._id, "approved")}>Accept</button>
                            <button onClick={() => handleDecision(r._id, "rejected")}>Reject</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TeamFormation;
