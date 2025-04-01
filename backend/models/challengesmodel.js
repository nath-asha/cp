const mongoose = require("mongoose");

const challengesSchema = new mongoose.Schema({
    title: String,
    description: String,
    trackId: String,
    imgurl: String,
    eventId: String,
});

module.exports = mongoose.model("Challenge", challengesSchema);
