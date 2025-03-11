const express = require("express");
const Challenge = require("../models/challengesmodel");
const Score = require("../models/Scoremodel");
const dash = require('../../front/frontend/public/dashboarddata.json');

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
    res.send(teamm);
})
module.exports = router;
