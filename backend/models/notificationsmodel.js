const mongoose = require('mongoose');

const notifySchema = new mongoose.Schema({
    message: String,
    read : Boolean,
    userid : Number,
    teamid : Number
});

module.exports = mongoose.model("notify", notifySchema);