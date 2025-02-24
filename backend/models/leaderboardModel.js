// backend/models/leaderboardModel.js
export const leaderboardData = [
    {
      "score": 95,
      "name": "Alice Johnson",
      "github_url": "https://github.com/alicejohnson"
    },
    {
      "score": 88,
      "name": "Bob Williams",
      "github_url": "https://github.com/bobwilliams"
    },
    {
      "score": 76,
      "name": "Charlie Davis",
      "github_url": "https://github.com/charliedavis"
    },
    {
      "score": 92,
      "name": "David Garcia",
      "github_url": "https://github.com/davidgarcia"
    },
    {
      "score": 81,
      "name": "Eve Rodriguez",
      "github_url": "https://github.com/everodriguez"
    }
  ];
  

// const mongoose = require('mongoose');

// const leaderSchema = new mongoose.Schema({
//     name: {
//         type : String,
//         required : true
//     },
//     score: {
//         type : Number,
//         required : true
//     },
//     github_url: {
//         type : String,
//         required : true
//     },
//     // badge : {
//     //     type : String,
//     //     required : true
//     // },
//     rank : {
//         type : Number,
//         required : true
//     }
// });

// const Leader = mongoose.model('Leader', leaderSchema);
// module.exports = Leader;