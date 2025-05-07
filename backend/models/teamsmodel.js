const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    "name": String,
    "team_id": Number,
    // "members": [String],
    members: {
        type: [
            {
                status: { type: String },
                user_id: { type: String },
            },
        ],
        default: [],
    },
    "project_id": Number,
    "project": String,
    "createdAt": Date,
    "mentor":{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    "frontScore": String,
    "backScore": String,
    "uiScore": String,
    "dbdesign": String,
    "feedback": String,
    "requests": [{
        "name": String,
        "approval": Boolean                                                                                                       
    }],
    "status" : String,
    "isFull" : Boolean,
    chosen_challenge: {type: String, default: "none"},
});
module.exports = mongoose.model("teams",teamSchema);

//     name: { type: String, required: true },
//     team_id: { type: Number, required: true },
//     members: {
//         type: [
//             {
//                 status: { type: String },
//                 user_id: { type: String },
//             },
//         ],
//         default: [],
//     },
//     project_id: { type: Number, required: true },
//     project: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     mentor: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//     },
//     frontScore: { type: String, default: "0" },
//     backScore: { type: String, default: "0" },
//     uiScore: { type: String, default: "0" },
//     dbdesign: { type: String, default: "0" },
//     feedback: { type: String, default: "" },
//     requests: [
//         {
//             name: { type: String },
//             approval: { type: Boolean, default: false },
//         },
//     ],
//     status: { type: String, default: "pending" },
//     isFull: { type: Boolean, default: false },
//     chosen_challenge: { type: String, default: "none" },
// });
// module.exports = mongoose.model("teams",teamSchema);