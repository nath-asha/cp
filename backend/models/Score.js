const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
        "name": String,
        "score": Number,
        // "submission_id": ObjectId,
        // "judge_id": ObjectId,
        // "team_id": ObjectId,
        // "criteria": {
        //     "innovation": 10,
        //     "feasibility": 9,
        //     "presentation": 8
        // },
        // "comments": "Good execution and well-structured approach.",
        "github_url": String
});

const Score = mongoose.model("Score", ScoreSchema);

async function getScores() {
    try {
        const scores = await Score.find({});
        return scores;
    } catch (error) {
        console.error("Error fetching scores:", error);
        throw error;
    }
}

module.exports = {
    Score,
    getScores
};