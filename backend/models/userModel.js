const mongoose = require("mongoose");
// const userSchema = new mongoose.Schema({
//     firstName: String,
//     lastName: String,
//     email: { type: String, unique: true, required: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ["user", "mentor", "admin"], default: "user" },
// });




// const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  phone: Number,
  picture: { type: String },
  createdAt: Date,
  role: { type: String, default: "user" },
  team: { type: String, default: "none" },
  // address: String,
  organization:{type: String, required: true},
  description: String,
  skills : String,
  github_url: String,
  linkedin_url: String,
  Twitter_url: String,
  USN: String,
  mentee: {  type: [{
    teamname: { type: String, required: true },
    teamId: { type: String, required: true },
}],
required: true,
default: [] },
 eventreg: { type: String, default: "none"},
 chosen_challenge: {type: String, default: "none"},
 venue: String,
//pic: String,
cred : String, 

});

// module.exports = mongoose.model("User", UserSchema);
module.exports = mongoose.model("User", userSchema);

// name: String,
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