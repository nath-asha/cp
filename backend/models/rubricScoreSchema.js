const mongoose = require("mongoose");

const rubricScoreSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  teamId: { type: Number, required: true },
  scores: [
    {
      criterion: { type: String, required: true },
      score: { type: Number, required: true },
    },
  ],
  evaluatorName: String,
  comments: String,
  totalScore: Number,
  submittedAt: { type: Date, default: Date.now },
  eventId: String,
});

module.exports = mongoose.model("RubricScore", rubricScoreSchema);
