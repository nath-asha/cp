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
    createdAt: Date,
    phone: Number,
    team: { type: String, default: "none" },
    teamId: {type:Number},
    // address: String,
    organization:{type: String},
    description: String,
    skills : String,
    github_url: String,
    linkedin_url: String,
    Twitter_url: String,
    requests: [],
    isTeam: Boolean,
    USN: String,
    mentee: {  type: [{
    teamname: { type: String },
    teamId: { type: String },
}],
required: true,
default: [] },
 eventreg: { type: String, default: "none"},
//   eventreg: [ // Changed to an array of objects
//     {
//       eventId: { type: String, required: true },
//       eventName: { type: String, required: true },
//       isActive: { type: Boolean, default: true }, // Assuming 'isActive' refers to the current registration status
//       registeredAt: { type: Date, default: Date.now },
//     },
//   ],
});

module.exports = mongoose.model('Signup', signupSchema);