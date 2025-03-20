const express = require("express");
const Challenge = require("../models/challengesmodel");
const Score = require("../models/Scoremodel");
const team = require("../models/teamsmodel");
const notify = require("../models/notificationsmodel");
const dash = require('../../front/frontend/public/dashboarddata.json');
const submission = require("../models/submissionmodel");
const user = require("../models/userModel");
const event = require("../models/eventmodel");
const community = require("../models/communitymodel");
const bodyParser = require('body-parser');
const cors = require('cors');

const router = express.Router();

router.use(bodyParser.json());
router.use(cors());

// Community Routes
router.get('/community', async (req, res) => {
    try {
        // const messages = await community.find().sort({ createdAt: 1 }); // Sort by createdAt
        const messages = await community.find(); 
        res.json(messages);
    } catch (err) {
        console.error("Error fetching community messages:", err);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/community', async (req, res) => {
    try {
        const newMessage = new community(req.body);
        await newMessage.save();
        res.json(newMessage);
    } catch (err) {
        console.error("Error posting community message:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Challenges Routes
router.get("/challenges", async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.json(challenges);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

// Scores Routes
router.get("/scores", async (req, res) => {
    try {
        const scores = await Score.find();
        res.json(scores);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

// Dashboard Data Route
router.get("/api/dashboard-data", async (req, res) => {
    res.send(dash);
});

// Teams Routes
router.get("/teams", async (req, res) => {
    try {
        const teams = await team.find();
        res.json(teams);
    } catch (err) {
        res.status(500).send("Internal server error");
    }
});

// Users Routes
router.get("/users", async (req, res) => {
    try {
        const users = await user.find();
        res.json(users);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

// Events Routes
router.get("/events", async (req, res) => {
    try {
        const events = await event.find();
        res.json(events);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

// Submissions Routes
router.get("/submissions", async (req, res) => {
    try {
        const submissions = await submission.find();
        res.json(submissions);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

router.post("/submissions", async (req, res) => {
    try {
        const newSubmission = new submission(req.body);
        await newSubmission.save();
        res.json(newSubmission);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

// Notifications Route (Commented out)
// router.get("/notifications", async (req,res) => {
//     try{
//         const notifications = await notify.find();
//         res.json(notifications);
//     }catch(err){
//         res.status(500).send("Internal server error");
//     }
// })

module.exports = router;
// const express = require("express");
// const Challenge = require("../models/challengesmodel");
// const Score = require("../models/Scoremodel");
// const team = require("../models/teamsmodel");
// const notify = require("../models/notificationsmodel");
// const dash = require('../../front/frontend/public/dashboarddata.json');
// const submission = require("../models/submissionmodel");
// const user = require("../models/userModel");
// const event = require("../models/eventmodel");
// const community = require("../models/communitymodel");
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// let messages = [];

// const router = express.Router();

// router.get('/community', (req, res) => {
//     res.json(messages);
// });

// router.post('/community', (req, res) => {
//     const newMessage = req.body;
//     messages.push(newMessage);
//     res.json(newMessage);
// });

// // router.get("/community", async (req, res) => {
// //     try {
// //         const communities = await community.find();
// //         res.json(communities);
// //     } catch (err) {
// //         res.status(500).send("Internal Server Error");
// //     }
// // });

// router.get("/challenges", async (req, res) => {
//     try {
//         const challenges = await Challenge.find();
//         res.json(challenges);
//     } catch (err) {
//         res.status(500).send("Internal Server Error");
//     }
// });

// router.get("/scores", async (req, res) => {
//     try {
//         const scores = await Score.find();
//         res.json(scores);
//     } catch (err) {
//         res.status(500).send("Internal Server Error");
//     }
// });

// router.get("/api/dashboard-data", async (req, res) => {
//     res.send(dash);
// });

// router.get("/teams", async (req, res) => {
//     try{
//         const teams = await team.find();
//         res.json(teams);
//     }catch(err){
//         res.status(500).send("Internal server error");
//     }
// });

// router.get("/users", async (req, res) => {
//     try {
//         const users = await user.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).send("Internal Server Error");
//     }
// });

// router.get("/events", async (req, res) => {
//     try {
//         const events = await event.find();
//         res.json(events);
//     } catch (err) {
//         res.status(500).send("Internal Server Error");
//     }
// });


// router.get("/submissions", async (req, res) => {
//     try {
//         const submissions = await submission.find();
//         res.json(submissions);
//     } catch (err) {
//         res.status(500).send("Internal Server Error");
//     }
// });

// router.post("/submissions", async (req, res) => {
//     try {
//         const newSubmission = new submission(req.body);
//         await newSubmission.save();
//         res.json(newSubmission);
//     } catch (err) {
//         res.status(500).send("Internal Server Error");
//     }
// });

// // router.get("/notifications", async (req,res) => {
// //     try{
// //         const notifications = await notify.find();
// //         res.json(notifications); 
// //     }catch(err){
// //         res.status(500).send("Internal server error");
// //     }
// // })

// module.exports = router;
