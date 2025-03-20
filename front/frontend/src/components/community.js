import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Community() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [user, setUser] = useState('Anonymous'); // implement user authentication later

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('http://localhost:5000/community');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setMessages(data);
            } catch (err) {
                console.error('Error fetching community data:', err);
            }
        };

        fetchMessages();
    }, []);

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
            setMessages(prevMessages => [...prevMessages, data]); // Add new message to the list
            setNewMessage('');
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Community Forum</h1>
            <div className="mb-3">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Enter your message"
                        />
                        <button type="submit" className="btn btn-primary">Send</button>
                    </div>
                </form>
            </div>

            <div className="list-group">
                {messages.map((msg, index) => (
                    <div key={index} className="list-group-item">
                        <strong>{msg.user}:</strong> {msg.message}
                    </div>
                ))}
            </div>
        </div>
    );
}