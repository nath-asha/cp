const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
"name": String,
"members" : Array (3),
"project_id" : Number,
"project" : String,
"createdAt" : Date,
"mentor" : String,
"frontScore": String,
"backScore": String,
"uiScore": String,
"dbdesign": String
});

module.exports = mongoose.model("teams",teamSchema);