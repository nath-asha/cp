import React, { useState } from 'react';
import axios from 'axios';

const ApproveUserPage = () => {
    const [teamId, setTeamId] = useState('');
    const [userId, setUserId] = useState('');

    const approveMember = async (teamId, userId) => {
        try {
            const response = await axios.put(`http://localhost:5000/approve-member/${teamId}`, {
                user_id: userId
            });
            console.log('Response:', response.data);
            alert('Member approved successfully!');
        } catch (error) {
            console.error('Error approving member:', error);
            alert('Failed to approve member.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        approveMember(teamId, userId);
    };

    return (
        <div>
            <h1>Approve User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Team ID:</label>
                    <input
                        type="text"
                        value={teamId}
                        onChange={(e) => setTeamId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>User ID:</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Approve Member</button>
            </form>
        </div>
    );
};

export default ApproveUserPage;
