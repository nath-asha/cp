const mongoose = require('mongoose');
const communitySchema = new mongoose.Schema({
    name: String,
    message: {
        type: String,
        required: true,
        "createdAt": Date,
    }
});


module.exports = mongoose.model('community', communitySchema);
 