const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    event_id: {type: String,required:  true},
    title: {type: String,required: true},
    description : {type: String,required: true},
    imgurl: {type: String,required: true}
})

module.exports = mongoose.model('event', eventSchema);