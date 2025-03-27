const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    "name": String,
    "team_id": Number,
    "members": [String],
    "project_id": Number,
    "project": String,
    "createdAt": Date,
    "mentor": String,
    "frontScore": String,
    "backScore": String,
    "uiScore": String,
    "dbdesign": String,
    "feedback": String,
    "requests": [{
        "name": String,
        "approval": Boolean                                                                                                       
    }],
    "status" : String
});

module.exports = mongoose.model("teams",teamSchema);