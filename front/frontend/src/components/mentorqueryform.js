import React, { useState } from 'react';

function MentorQueryForm({ onSubmit }) {
    const [query, setQuery] = useState('');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

   // inside MentorQueryForm.js
const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() && email.trim()) {
        try {
            const response = await fetch('http://localhost:5000/mentor-query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, query }),
            });
            if (response.ok) {
                setSubmitted(true);
                setQuery('');
                setEmail('');
            }
        } catch (err) {
            alert('Failed to send query.');
        }
    }
};

    return (
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
            <h2>Send a Query to Your Mentor</h2>
            {submitted && (
                <div style={{ color: 'green', marginBottom: 10 }}>
                    Query sent successfully!
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 10 }}>
                    <label>
                        Your Email:
                        <input
                            type="email"
                            value={email}
                            required
                            onChange={e => setEmail(e.target.value)}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                            placeholder="your@email.com"
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 10 }}>
                    <label>
                        Your Query:
                        <textarea
                            value={query}
                            required
                            onChange={e => setQuery(e.target.value)}
                            style={{ width: '100%', padding: 8, marginTop: 4, minHeight: 80 }}
                            placeholder="Type your question here..."
                        />
                    </label>
                </div>
                <button type="submit" style={{ padding: '8px 16px' }}>
                    Send Query
                </button>
            </form>
        </div>
    );
}

export default MentorQueryForm;