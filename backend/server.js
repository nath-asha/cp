require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const helmet = require("helmet");

const checkRole = require("./middleware/roleMiddleware")

connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.post('./create', checkRole('admin', 'create'), (req, res) => {
    // Handle the create action
    res.status(200).json({ message: "Create action allowed" });
});

app.delete('./delete', checkRole('admin', 'delete'), (req, res) => {
    res.send('Content deleted');
});
// Routes
app.use("/api/auth", require("./routes/authrouter"));
app.use("/api", require("./routes/userroutes"));
app.use("/", require("./routes/publicroutes"));
app.use("/api/protected", require("./routes/protectroutes"));
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require('body-parser');
// const cors = require("cors");
// const dotenv = require("dotenv");
// // const data = require('../front/frontend/public/scores.json');
// // const challenges = require('../front/frontend/public/challenges.json');
// const dash = require('../front/frontend/public/dashboarddata.json');
// const teams = require('../front/frontend/public/teams.json');
// // const users = require('../front/frontend/public/users.json');
// const connectDB = require("./config/db");
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });


// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());

// const PORT = process.env.PORT || 5000;

// // const connectDB = async () => {
// //     try {
// //         await mongoose.connect(process.env.MONGO_URI, {
// //             useNewUrlParser: true,
// //             useUnifiedTopology: true,
// //         });
// //         console.log("MongoDB connected");
// //     } catch (err) {
// //         console.error(err.message);
// //         process.exit(1);
// //     }
// // };


// // const db = mongoose.connection;
// //   db.on('error', console.error.bind(console, 'connection error:'));
// //   db.once('open', () => {
// //     console.log('Connected to MongoDB');
// //   });


// connectDB();


// const scoresSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     score: {
//         type: Number,
//         required: true,
//     },
//     github_url: {
//         type: String,
//         required: true,
//     },
// });

// const challengesSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     trackId: {
//         type: String,
//         required: true,
//     },
//     imgurl: {
//         type: String,
//         required: true
//     }
// });

// const userSchema = new mongoose.Schema({
//     firstName: String,
//     lastName: String,
//     email: String,
//     password: String,
//     phone: String,
//     role: String,
//     team: String,
//     address: String,
//     organization: String,
//     description: String,
//     skills: String,
//     github_url: String,
//     linkedin_url: String,
//     twitter_url: String,
//     USN: String
//   });

// const subSchema = new mongoose.Schema({
//     title: String,
//     gitrepo: String,
//     projectdesc: String,
//     ps: String,
//     ppt: String,
//     thumbnail: String,
//     preport: String,
//     doc: String,
//     vid: String
// })

// const scores = mongoose.model("scores", scoresSchema,"scores");
// const chall = mongoose.model("challenges", challengesSchema,"challenges");
// const User = mongoose.model('User', userSchema,"users");
// const submissions = mongoose.model("sub",subSchema,"submissions")


// // app.get("/", async (req, res) => {
// //     try {
// //         const data = await scores.find();
// //         res.json(data);
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).send("Internal Server Error");
// //     }
// // });
// // app.get("/", (req, res) => {
// //     // res.send("API is running");
// //     res.send(data);
// // });
// // app.get("/challenges", async (req, res) => {
// //     // res.send("API is running");
// //     res.send(challenges);
// // });
// app.get("/api/dashboard-data", async (req, res) => {
//     res.send(dash);
// });
// app.get("/teams", async (req,res) => {
//     res.send(teams);
// });
// // app.get("/users", async (req,res) =>{
// //     res.send(users);
// // })


// app.get("/users", async (req,res) =>{
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Internal Server Error");
//     }
// })
// app.post('/api/users', async (req, res) => {
//     const user = new User(req.body);
//     // const savedUser = await user.save();
//     try {
//      await user.save();
//      res.status(201).send('User registered successfully');
//     } catch (error) {
//      res.status(400).send('Failed to register user');
//     }
//   });
//   app.post('/api/users/mentor', async (req, res) => {
//     const user = new User(req.body);
//     // const savedUser = await user.save();
//     try {
//      await user.save();
//      res.status(201).send('User registered successfully');
//     } catch (error) {
//      res.status(400).send('Failed to register user');
//     }
//   });
// //   app.post('/api/submissions', async (req, res) => {
// //     try {
// //         const submission = new submissions(req.body);
// //         const savedSubmission = await submission.save(); // Save once
// //         res.status(201).json(savedSubmission); // Send the full saved object
// //     } catch (error) {
// //         console.error(error);
// //         res.status(400).json({ error: 'Failed to submit' });
// //     }
// // });

// app.post('/api/submissions', upload.single('preport'), async (req, res) => {
//     try {
//         const submissionData = {
//             title: req.body.title,
//             gitrepo: req.body.gitrepo,
//             projectdesc: req.body.projectdesc,
//             ps: req.body.ps,
//             ppt: req.body.ppt,
//             thumbnail: req.body.thumbnail,
//             // preport: req.file ? req.file.path : null, // Save file path
//             preport: req.body.preport,
//             doc: req.body.doc,
//             vid: req.body.vid,
//         };

//         const submission = new submissions(submissionData);
//         const savedSubmission = await submission.save();
//         res.status(201).json(savedSubmission);
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ error: 'Failed to submit' });
//     }
// });

// app.get("/challenges", async (req, res) => {
//     try {
//         const ps = await chall.find();
//         res.json(ps);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Internal Server Error");
//     }
// });

// app.get("/", async (req,res) => {
//     try {
//         const data = await scores.find();
//         res.json(data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Internal Server Error");
//     }
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
