const express = require("express");
const getLeaderboard = require('../controllers/leaderboardController.js');
const router = express.Router();

router.get('/', getLeaderboard); 

export default router;


// const API_URL = 'http://localhost:5000/';

// export default API_URL;
