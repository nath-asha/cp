import React,{ useState,useEffect } from "react";

export default function Community() {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/community');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setMessage(data.message);
                setUser(data.user);
                console.log(data);
            } catch (err) {
                console.error('Error fetching community data:', err);
            }
        };

        fetchData();

    })

    const [newMessage, setNewMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/community', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: newMessage, user }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setMessage(data.message);
            setNewMessage('');
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    return(
        <div>
            <h1>Community Page</h1>
            <p>{message}</p>
            <p>User: {user}</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Enter your message" 
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );

};