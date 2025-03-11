const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
"name": String,
"members" : Array (3),
"project_id" : Number,
"createdAt" : Date,
"mentor" : String
});

module.exports = mongoose.model("teams",teamSchema,teams);