const mongoose = require('mongoose');
const communitySchema = new mongoose.Schema({
    name: String,
    message: {
        type: String,
        required: true,
        "createdAt": Date,
    },
    eventId: String
});


module.exports = mongoose.model('community', communitySchema);
 