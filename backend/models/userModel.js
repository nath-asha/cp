const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "mentor", "admin"], default: "user" },
});

module.exports = mongoose.model("User", userSchema);

// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   phone: Number,
//   role: { type: String, default: "user" },
//   team: { type: String, default: "none" },
//   createdAt: { type: Date, default: Date.now },
//   address: String,
//   Organization:{type: String, required: true},
//   Affiliation:{type: String, required: true},
//   Description: String,
//   Experience : Number,
//   Skills : String,
//   Judge : { type: Boolean, default: false },
//   Score : Number,
//   github_url: String,
//   linkedin_url: String,
//   Twitter_url: String,
//   image: String,
//   resetPasswordToken: String,
//   resetPasswordExpire: Date,
//   emailConfirmToken: String
// });

// module.exports = mongoose.model("User", UserSchema);
