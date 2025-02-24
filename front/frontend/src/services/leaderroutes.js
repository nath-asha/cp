const express = require("express");
const getLeaderboard = require('../controllers/leaderboardController.js');
const router = express.Router();

router.get('/', getLeaderboard); 

export default router;