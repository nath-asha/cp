import React,{useState,useEffect} from "react";

const NotificationList = () => {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    axios.get("/api/users/notifications", {
      headers: { Authorization: `Bearer ${yourToken}` }
    }).then(res => setNotifs(res.data));
  }, []);

  return (
    <ul>
      {notifs.map((n, i) => (
        <li key={i}>{n.message} — {new Date(n.createdAt).toLocaleString()}</li>
      ))}
    </ul>
  );
};

export default NotificationList;