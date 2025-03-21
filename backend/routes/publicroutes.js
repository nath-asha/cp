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

module.exports = router;