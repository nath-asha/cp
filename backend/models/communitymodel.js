const mongoose = require('mongoose');
const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('community', communitySchema);
 