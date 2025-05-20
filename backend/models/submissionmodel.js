const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
    title: String,
    gitrepo: String,
    projectdesc: String,
    ps: String,
    ppt: String,
    thumbnail: String,
    preport: String,
    doc: String,
    vid: String,
    eventId: String,
    createdAt: { type: Date, default: Date.now },
    team_id: String,
    // submissionPhases
    phase: {
        name: String,
        startDate: Date,
        endDate: Date,
        description: String
    }
});

module.exports = mongoose.model("Submission", subSchema);
