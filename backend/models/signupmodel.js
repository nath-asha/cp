const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    name: { type: String, required : true    },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default : "user"},
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    "createdAt": Date,
    phone: Number,
    team: { type: String, default: "none" },
    // address: String,
    organization:{type: String},
    description: String,
    skills : String,
    github_url: String,
    linkedin_url: String,
    Twitter_url: String,
    USN: String,
    mentee: {  type: [{
    teamname: { type: String },
    teamId: { type: String },
}],
required: true,
default: [] },
 eventreg: { type: String, default: "none"},
});

module.exports = mongoose.model('Signup', signupSchema);