import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageRequests = ({ teamId }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await axios.get(`/api/teams/${teamId}/requests`);
      setRequests(response.data);
    };
    fetchRequests();
  }, [teamId]);

  const handleAction = async (userId, action) => {
    try {
      const response = await axios.put('/api/teams/handle-request', {
        teamId,
        userId,
        action,
      });
      alert(response.data.message);
      // Refresh requests
      const updatedRequests = await axios.get(`/api/teams/${teamId}/requests`);
      setRequests(updatedRequests.data);
    } catch (error) {
      alert(error.response.data.message || 'Error processing request');
    }
  };

  return (
    <div>
      <h2>Manage Requests</h2>
      {requests.map((req) => (
        <div key={req.user_id}>
          <span>{req.user_id}</span>
          <button onClick={() => handleAction(req.user_id, 'approved')}>Approve</button>
          <button onClick={() => handleAction(req.user_id, 'rejected')}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default ManageRequests;
