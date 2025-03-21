const mongoose = require('mongoose');
const communitySchema = new mongoose.Schema({
    name: String,
    message: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('community', communitySchema);
 