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

const router = express.Router();

router.get("/challenges", async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.json(challenges);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

router.get("/scores", async (req, res) => {
    try {
        const scores = await Score.find();
        res.json(scores);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

router.get("/api/dashboard-data", async (req, res) => {
    res.send(dash);
});

router.get("/teams", async (req, res) => {
    try{
        const teams = await team.find();
        res.json(teams);
    }catch(err){
        res.status(500).send("Internal server error");
    }
});

router.get("/users", async (req, res) => {
    try {
        const users = await user.find();
        res.json(users);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

router.get("/events", async (req, res) => {
    try {
        const events = await event.find();
        res.json(events);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});


router.get("/community", async (req, res) => {
    try {
        const communities = await community.find();
        res.json(communities);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

router.get("/submissions", async (req, res) => {
    try {
        const submissions = await submission.find();
        res.json(submissions);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

router.post("/submissions", async (req, res) => {
    try {
        const newSubmission = new submission(req.body);
        await newSubmission.save();
        res.json(newSubmission);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

// router.get("/notifications", async (req,res) => {
//     try{
//         const notifications = await notify.find();
//         res.json(notifications); 
//     }catch(err){
//         res.status(500).send("Internal server error");
//     }
// })

module.exports = router;
