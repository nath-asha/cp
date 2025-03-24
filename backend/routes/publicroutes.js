const express = require("express");
const Challenge = require("../models/challengesmodel");
const Score = require("../models/Scoremodel");
const team = require("../models/teamsmodel");
const notify = require("../models/notificationsmodel");
const dash = require('../../front/frontend/public/dashboarddata.json');
const submission = require("../models/submissionmodel");
const user = require("../models/userModel");
const event = require("../models/eventmodel");
const community = require("../models/communitymodel");
const bodyParser = require('body-parser');
const cors = require('cors');


const router = express.Router();

router.use(bodyParser.json());
router.use(cors());

// User Routes
router.get('/participants', async (req,res) => {
    try {
        const users = await user.find().where(role='user');
        res.json(users);
    } catch (err) {
        console.error("Error fetching users", err);
        res.status(500).send("Internal Server Error");
    }
})

// Community Routes
router.get('/community', async (req, res) => {
    try {
        const messages = await community.find(); 
        res.json(messages);
    } catch (err) {
        console.error("Error fetching community messages:", err);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/community', async (req, res) => {
    try {
        const newMessage = new community(req.body);
        await newMessage.save();
        res.json(newMessage);
    } catch (err) {
        console.error("Error posting community message:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Challenges Routes
router.get("/challenges", async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.json(challenges);
    } catch (err) {
        console.error("Error fetching challenges:", err);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/challenges/:trackId', async (req, res) => {
    try {
        const trackId = req.params.trackId;
        const challenges = await Challenge.find({ track_id: trackId });
        res.json(challenges);
    } catch (err) {
        console.error('Error fetching challenges:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Scores Routes
router.get("/scores", async (req, res) => {
    try {
        const scores = await Score.find();
        res.json(scores);
    } catch (err) {
        console.error("Error fetching scores:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Dashboard Data Route
router.get("/api/dashboard-data", async (req, res) => {
    res.send(dash);
});

// Teams Routes
router.get("/teams", async (req, res) => {
    try {
        const teams = await team.find();
        res.json(teams);
    } catch (err) {
        console.error("Error fetching teams:", err);
        res.status(500).send("Internal server error");
    }
});

// Users Routes
router.get("/users", async (req, res) => {
    try {
        const users = await user.find();
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Events Routes
router.get("/events", async (req, res) => {
    try {
        const events = await event.find();
        res.json(events);
    } catch (err) {
        console.error("Error fetching events:", err);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/events/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const seeevents = await event.find({ event_id: eventId });
        res.json(seeevents);
    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/events', async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log the request body
        const newEvent = new event(req.body);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error saving event:", error); // Log the full error
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete('/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        console.log("Deleting event with ID:", eventId);
        const deletedEvent = await event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        console.log("Updating event with ID:", eventId);
        console.log("Request body:", req.body);
        const updatedEvent = await event.findByIdAndUpdate(eventId, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(updatedEvent);
    } catch (error) {
        console.error("Error updating event:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Submissions Routes
router.get("/submissions", async (req, res) => {
    try {
        const submissions = await submission.find();
        res.json(submissions);
    } catch (err) {
        console.error("Error fetching submissions:", err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/submissions", async (req, res) => {
    try {
        const newSubmission = new submission(req.body);
        await newSubmission.save();
        res.json(newSubmission);
    } catch (err) {
        console.error("Error adding submission:", err);
        res.status(500).send("Internal Server Error");
    }
});

//yet to created 
router.get("/api/stats", async (req, res) => {
    try {
        const participants = await user.distinct('email').countDocuments();
        const problems = await Challenge.distinct('track_id').countDocuments();
        const submissions = await submission.distinct('ps').countDocuments();
        const eventcount = await event.distinct('event_id').countDocuments();
        res.json({ participants, problems, submissions, eventcount });
    } catch (err) {
        console.error('Error fetching stats:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;