import { useState } from 'react';
import { Container, Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import { getEmail, getUserId } from './auth';

function MentorQueryForm({ mentorName: initialMentorName = '' }) {
    const emailObj = getEmail();
    const email = (emailObj && emailObj.email) ? emailObj.email : '';
    const userId = getUserId();
    const [query, setQuery] = useState('');
    const [mentorName, setMentorName] = useState(initialMentorName);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        try {
            const response = await fetch('http://localhost:5000/mentor-query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
                },
                body: JSON.stringify({ query, email, userId }),
            });
console.log(emailObj);
            const data = await response.json();
            if (response.ok) {
                setSubmitted(true);
                setQuery('');
                if (data.mentorName) setMentorName(data.mentorName);
            } else {
                setErrorMsg(data.message || 'Submission failed.');
            }
        } catch (err) {
            setErrorMsg('Error sending query.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Card style={{ width: '100%', maxWidth: '500px' }} className="shadow">
                <Card.Body>
                    <Card.Title className="text-center mb-4">📬 Ask Your Mentor</Card.Title>

                    <div className="mb-3 text-center">
                        <div><strong>Your Email:</strong> {email}</div>
                        {mentorName && <div><strong>Mentor:</strong> {mentorName}</div>}
                    </div>

                    {submitted && (
                        <Alert variant="success" dismissible onClose={() => setSubmitted(false)}>
                            ✅ Query submitted successfully!
                        </Alert>
                    )}

                    {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formQuery" className="mb-4">
                            <Form.Label>Your Query</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Type your question here..."
                                value={query}
                                required
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </Form.Group>

                        <div className="d-grid">
                            <Button variant="primary" type="submit" size="lg" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : '🚀 Send Query'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default MentorQueryForm;
// import React, { useState } from 'react';
// import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
// import { getEmail } from './auth';

// function MentorQueryForm({ onSubmit, mentorName }) {
//     const [query, setQuery] = useState('');
//     const [email, setEmail] = useState(getEmail().email || '');
//     const [submitted, setSubmitted] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (query.trim() && email.trim()) {
//             try {
//                 const response = await fetch('http://localhost:5000/mentor-query', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ email, query }),
//                 });
//                 if (response.ok) {
//                     setSubmitted(true);
//                     setQuery('');
//                 }
//             } catch (err) {
//                 alert('Failed to send query.');
//             }
//         }
//     };

//     return (
//         <Container className="d-flex justify-content-center align-items-center mt-5">
//             <Card style={{ width: '100%', maxWidth: '500px' }} className="shadow">
//                 <Card.Body>
//                     <Card.Title className="text-center mb-4">📬 Ask Your Mentor</Card.Title>
//                     <div className="mb-3 text-center">
//                         <div><strong>Your Email:</strong> {email}</div>
//                         <div><strong>Mentor:</strong> {mentorName}</div>
//                     </div>
//                     {submitted && (
//                         <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
//                             ✅ Your query has been sent successfully!
//                         </Alert>
//                     )}
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group controlId="formEmail" className="mb-3">
//                             <Form.Label>Your Email</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 placeholder="your@email.com"
//                                 value={email}
//                                 required
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         </Form.Group>

//                         <Form.Group controlId="formQuery" className="mb-4">
//                             <Form.Label>Your Query</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={4}
//                                 placeholder="Type your question here..."
//                                 value={query}
//                                 required
//                                 onChange={(e) => setQuery(e.target.value)}
//                             />
//                         </Form.Group>

//                         <div className="d-grid">
//                             <Button variant="primary" type="submit" size="lg">
//                                 🚀 Send Query
//                             </Button>
//                         </div>
//                     </Form>
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// }

// export default MentorQueryForm;
