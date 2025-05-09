const mongoose = require('mongoose');

const notifySchema = new mongoose.Schema({
    message: String,
    read : Boolean,
    userid : Number,
    teamid : Number,
    eventId: String,
    "createdAt": Date,
});

module.exports = mongoose.model("notification", notifySchema);