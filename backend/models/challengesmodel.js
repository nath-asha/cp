const mongoose = require("mongoose");

const challengesSchema = new mongoose.Schema({
    title: String,
    description: String,
    trackId: String,
    imgurl: String,
});

module.exports = mongoose.model("Challenge", challengesSchema);
