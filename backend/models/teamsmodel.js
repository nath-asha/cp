const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    "name": String,
    "team_id": Number,
    "members": [String],
    "project_id": Number,
    "project": String,
    "createdAt": Date,
    "mentor":{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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