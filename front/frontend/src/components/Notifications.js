import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await axios.get(`/api/users/notifications/${userId}`);
      setNotifications(response.data);
    };
    fetchNotifications();
  }, [userId]);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map((notif, index) => (
        <div key={index}>
          <p>{notif.message}</p>
          <small>{new Date(notif.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
