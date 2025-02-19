const mongoose = require('mongoose');

const leaderSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    score: {
        type : Number,
        required : true
    },
    github_url: {
        type : String,
        required : true
    },
    // badge : {
    //     type : String,
    //     required : true
    // },
    rank : {
        type : Number,
        required : true
    }
});

const Leader = mongoose.model('Leader', leaderSchema);
module.exports = Leader;