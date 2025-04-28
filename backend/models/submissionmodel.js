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
    "createdAt": Date,
    team_id: String
});

module.exports = mongoose.model("Submission", subSchema);
