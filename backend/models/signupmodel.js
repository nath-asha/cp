const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    name: { type: String, required : true    },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default : "user"},
});

module.exports = mongoose.model('Signup', signupSchema);