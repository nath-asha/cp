const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require("dotenv");
// const data = require('../front/frontend/public/scores.json');
// const challenges = require('../front/frontend/public/challenges.json');
const dash = require('../front/frontend/public/dashboarddata.json');
const teams = require('../front/frontend/public/teams.json');
// const users = require('../front/frontend/public/users.json');
const connectDB = require("./config/db");


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("MongoDB connected");
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// };


// const db = mongoose.connection;
//   db.on('error', console.error.bind(console, 'connection error:'));
//   db.once('open', () => {
//     console.log('Connected to MongoDB');
//   });


connectDB();


const scoresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    github_url: {
        type: String,
        required: true,
    },
});

const challengesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    trackId: {
        type: String,
        required: true,
    },
});

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: String,
    role: String,
    team: String,
    address: String,
    organization: String,
    description: String,
    skills: String,
    github_url: String,
    linkedin_url: String,
    twitter_url: String,
    USN: String
  });

const scores = mongoose.model("scores", scoresSchema,"scores");
const chall = mongoose.model("challenges", challengesSchema,"challenges");
const User = mongoose.model('User', userSchema,"users");


// app.get("/", async (req, res) => {
//     try {
//         const data = await scores.find();
//         res.json(data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Internal Server Error");
//     }
// });
// app.get("/", (req, res) => {
//     // res.send("API is running");
//     res.send(data);
// });
// app.get("/challenges", async (req, res) => {
//     // res.send("API is running");
//     res.send(challenges);
// });
app.get("/api/dashboard-data", async (req, res) => {
    res.send(dash);
});
app.get("/teams", async (req,res) => {
    res.send(teams);
});
// app.get("/users", async (req,res) =>{
//     res.send(users);
// })


app.get("/users", async (req,res) =>{
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})
app.post('/api/users', async (req, res) => {
    const user = new User(req.body);
    // const savedUser = await user.save();
    try {
     await user.save();
     res.status(201).send('User registered successfully');
    } catch (error) {
     res.status(400).send('Failed to register user');
    }
  });

app.get("/challenges", async (req, res) => {
    try {
        const ps = await chall.find();
        res.json(ps);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/", async (req,res) => {
    try {
        const data = await scores.find();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");

// // const leaderboardRoutes = require("./routes/leaderboardRoutes");
// dotenv.config();
// // const bodyParser = require("body-parser");
// // const Leader = require("./models/leaderModel");
// const data = require('../front/frontend/public/scores.json');
// const ps = require('../front/frontend/public/challenges.json');

// // const { default: Challenges } = require("../front/frontend/src/components/challenges");

// const app = express();
// const router = express.Router();
// app.use(router);

// // app.use(bodyParser.json());
// app.use(express.json());
// app.use(cors());

// app.get("/", (req, res) => {
//     // res.send("API is running");
//     res.send(data);
// });

// // app.use('/api/leaderboard', leaderboardRoutes); 
// // router.get("/", async (req, res) => {
// //     let results = await Leader.find();
// //     res.send(results).status(200);
// //   });
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("MongoDB connected");
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// };

// connectDB();
// // mongoose.connect(process.env.MONGO_URI, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// // }).then(() => console.log("MongoDB connected"))
// //   .catch(err => console.log(err));

// const scoresSchema = new mongoose.Schema({
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
//     }
// });

// const challSchema = new mongoose.Schema({
//     title: {
//         type : String,
//         required : true
//     },
//     description: {
//         type : String,
//         required : true
//     },
//     trackId: {
//         type : String,
//         required : true
//     }
// });

// const scores = mongoose.model("scores", scoresSchema);
// const chall = mongoose.model("chall", challSchema);

// app.get('/', async (req, res) => {
//     try {
//         const data = await scores.find();
//         res.json(data);
//         // console.log(data);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Internal Server Error");
//     }
// });

// app.get('/challenges', async (req, res) => {
//     try {
//         const ps = await chall.find()
//         res.json(ps);
//         // console.log(data);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Internal Server Error");
//     }
// });
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
