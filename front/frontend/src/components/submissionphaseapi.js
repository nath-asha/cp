// server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = 'your_jwt_secret';

// Mock data for challenges
const challenges = [
    { track_id: '1', title: 'Build a Weather App' },
    { track_id: '2', title: 'Create a Chatbot' },
];

// Middleware to check JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// GET /challenges
app.get('/challenges', authenticateToken, (req, res) => {
    res.json(challenges);
});

// POST /submissions
app.post('/submissions', authenticateToken, (req, res) => {
    const { title, projectdesc, ps, thumbnail, team_id, gitrepo } = req.body;
    if (!title || !projectdesc || !ps || !gitrepo) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    // Here you would save to DB
    res.status(201).json({ message: 'Submission received' });
});

// For testing: generate a token (remove in production)
app.get('/token', (req, res) => {
    const token = jwt.sign({ username: 'testuser' }, SECRET, { expiresIn: '1h' });
    res.json({ token });
});

app.listen(5000, () => console.log('API running on http://localhost:5000'));
