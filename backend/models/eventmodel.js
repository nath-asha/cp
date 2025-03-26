const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventId: {type: String,required:  true},
    title: {type: String,required: true},
    desc : {type: String,required: true},
    imgUrl: {type: String,required: true}
})

module.exports = mongoose.model('event', eventSchema);