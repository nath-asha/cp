const express = require("express");
const Challenge = require("../models/challengesmodel");
const Score = require("../models/Scoremodel");
const team = require("../models/teamsmodel");
const notify = require("../models/notificationsmodel");
const dash = require('../../front/frontend/public/dashboarddata.json');
const submission = require("../models/submissionmodel");
const user = require("../models/userModel");
const event = require("../models/eventmodel");
const signuser = require("../models/signupmodel");
const community = require("../models/communitymodel");
const teamController = require('../controllers/teamController');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Contact = require('../models/contactmodel');
const Query = require('../models/mentorquery');

const router = express.Router();

router.use(bodyParser.json());
router.use(cors());

// Teams Routes
router.get("/teams", async (req, res) => {
    try {
        const teams = await team.find();
        res.json(teams);
    } catch (err) {
        console.error("Error fetching teams:", err);
        res.status(500).send("Internal server error");
    }
});
// router.get('/teams', async (req, res) => {
//   try {
//     const teams = await Team.find()
//       .populate('mentor', 'firstName lastName') // Populate mentor with specific fields
//       .exec();
//     res.json(teams);
//   } catch (error) {
//     res.status(500).send({ error: 'Error fetching teams' });
//   }
// });

////////////////////////////////////////////////////
router.get('/teams/:teamId', async (req, res) => {
    try {
        const teamId = req.params.teamId;
        if (isNaN(parseInt(teamId))) {
            return res.status(400).json({ error: 'Invalid teamId' });
        }
        const seeteams = await team.find({ team_id: teamId });
        res.json(seeteams);
    } catch (err) {
        console.error('Error fetching submissions:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get("/submissions/:teamId", async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const submissions = await submission.find({ team_id: teamId });
        res.json(submissions);
    } catch (err) {
        console.error('Error fetching submissions:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get("/api/stats", async (req, res) => {
    try {
        const participants = await user.distinct('email').countDocuments();
        const problems = await Challenge.distinct('track_id').countDocuments();
        const submissions = await submission.distinct('ps').countDocuments();
        const eventcount = await event.distinct('event_id').countDocuments();
        const mentors = await user.distinct('email').countDocuments({ role: 'Mentor' });
        res.json({ participants, problems, submissions, eventcount,mentors });
    } catch (err) {
        console.error('Error fetching stats:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/teams/:teamId', async (req, res) => {
    try {
        const teamId = parseInt(req.params.teamId); // Parse teamId to number
        console.log("Updating scores of team with ID:", teamId);
        console.log("Request body:", req.body);

        const updatedTeam = await team.findOneAndUpdate({ team_id: teamId }, req.body, { new: true }); // use team_id

        if (!updatedTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.json(updatedTeam);
    } catch (error) {
        console.error("Error updating score:", error);
        console.error("Error Details: ", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation Error', errors: error.errors });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/notifications', async (req,res) => {
    try {
        const notifications = await notify.find();
        return res.json(notifications);
    } catch (err) {
        res.status(500).send("Internal server error");
        console.error("error fetching notifications ",err)
    }
})

router.get('/notifications/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const notifications = await notify.find({ user_id: userId });
        res.json(notifications);
    } catch (err) {
        console.error('Error fetching notifications:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/notifications', async (req, res) => {
    try {
        const newNotification = new notify(req.body);
        await newNotification.save();
        res.json(newNotification);
    }catch (err) {
        console.error("Error posting notification:", err);
        res.status(500).send("Internal Server Error");
    }
});


 router.put('/teams/:teamId', async (req, res) => {
  const { teamId } = req.params;
  const { mentor } = req.body;

  try {
    // Update the team's mentor field
    const Team = await team.findByIdAndUpdate(
      teamId,
      { mentor: mentor || null }, // Allow unassigning by sending null
      { new: true } // Return the updated document
    );

    if (!Team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Fetch the mentor details if a mentor is assigned
    let mentorDetails = null;
    if (mentor) {
      mentorDetails = await user.findById(mentor); // Assuming `user` is the model containing mentor details
      if (!mentorDetails) {
        return res.status(404).json({ message: "Mentor not found" });
      }
    }

    // Respond with the updated team and mentor name (if available)
    res.status(200).json({
      message: "Team mentor updated successfully",
      Team,
      mentorName: mentorDetails ? mentorDetails.firstName : null // Include mentor name if found
    });
  } catch (error) {
    console.error("Error updating team mentor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


  // GET route to fetch all teams
  router.get('/teams', async (req, res) => {
    try {
      const teams = await team.find().populate('mentor', 'firstName lastName'); // Populate mentor details
      res.status(200).json(teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

// // GET a specific team with its mentors
// router.get('/teams/:teamId', async (req, res) => {
//     try {
//       const team = await team.findById(req.params.teamId).populate('mentors', 'name email'); // Populate mentor details
//       if (!team) {
//         return res.status(404).json({ message: 'Team not found' });
//       }
//       res.json(team);
//     } catch (err) {
//       console.error("Error fetching team", err);
//       res.status(500).send("Internal Server Error");
//     }
//   });

router.post('/api/send-request', async (req, res) => {
    try {
        const { recipient, message } = req.body;

        if (!recipient || !message) {
            return res.status(400).json({ error: 'Recipient and message are required' });
        }

        const newRequest = new notify({ recipient, message });
        await newRequest.save();

        res.status(201).json({ message: 'Request sent successfully', request: newRequest });
    } catch (err) {
        console.error('Error sending request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Logistics Routes might change later logistics is string now in event
router.get('/logistics', async (req, res) => {
    try {
        const logistics = await event.find({}, 'logistics'); // Fetch only the logistics field from the event model
        res.json(logistics);
    } catch (err) {
        console.error("Error fetching logistics:", err);
        res.status(500).send("Internal Server Error");
    }
});


// Event registration endpoint this is working adds event to user
// router.post('/events/:eventId/register', async (req, res) => {
//     const { eventId } = req.params;
//     const { userId } = req.body;

//     if (!userId) {
//         return res.status(400).json({ message: 'User ID is required' });
//     }

//     try {
//         // const Event = await event.findById(eventId);
//         const Event = await event.findOne({ eventId }); // Query by eventId (custom string field)
//         if (!Event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }

//         if (Event.participants.includes(userId)) {
//             return res.status(400).json({ message: 'User is already registered for this event' });
//         }

//         Event.participants.push(userId);
//         await Event.save();

//         res.status(200).json({ message: 'Successfully registered for the event' });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
    
// });
//this works but this logic has to be transfered to create teams/anything later for getting team name team id
//else can be dangerous
router.post('/events/:eventId/register', async (req, res) => {
    const { eventId } = req.params;
    const { userId, teamName, teamId } = req.body; // Accept teamName and teamId

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // Find event by custom eventId field
        const Event = await event.findOne({ eventId });
        if (!Event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (Event.participants.includes(userId)) {
            return res.status(400).json({ message: 'User is already registered for this event' });
        }

        Event.participants.push(userId);
        await Event.save();

        // Update teamName and teamId in signuser model for the user
        await signuser.findByIdAndUpdate(
            userId,
            {
                $set: {
                    team: teamName || '', // Set to empty string if not provided
                    teamId: teamId || ''
                }
            }
        );

        res.status(200).json({ message: 'Successfully registered for the event' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}); 

router.post('/createteams', async (req, res) => {
    const { name, team_id, members } = req.body; // Expecting team name, team_id, and members array in the request body
    try {
        const existingTeam = await team.findOne({ $or: [{ name }, { team_id }] });
        if (existingTeam) {
            return res.status(400).json({ message: 'Team with the same name or ID already exists' });
        }

        const newTeam = new team({
            name,
            team_id,
            members: members.map(memberId => ({ user_id: memberId, status: 'waiting' }))
        });

        await newTeam.save();
        res.status(201).json({ message: 'Team created successfully, members are in waiting state', team: newTeam });
    } catch (err) {
        console.error('Error creating new team:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/approve-member/:teamId', async (req, res) => {
    const { teamId } = req.params;
    const { user_id } = req.body; // Expecting user_id to approve

    try {
        // Find the team and update the member's status to "approved"
        const updatedTeam = await team.findOneAndUpdate(
            { _id: teamId, 'members.user_id': user_id },
            { $set: { 'members.$.status': 'approved' } },
            { new: true }
        );

        if (!updatedTeam) {
            return res.status(404).json({ message: 'Team or member not found' });
        }

        res.status(200).json({ message: 'Member approved successfully', team: updatedTeam });
    } catch (err) {
        console.error('Error approving member:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// router.post('/createteams', async (req, res) => {
//     const { name, members } = req.body; // team name, team_id, and members array
//     try {
//         const existingTeam = await team.findOne({ $or: [{ name }, { team_id }] });
//         if (existingTeam) {
//             return res.status(400).json({ message: 'Team with the same name or ID already exists' });
//         }

//         const newTeam = new team({
//             name,
//             members
//         });

//         await newTeam.save();
//         res.status(201).json({ message: 'Team created successfully', team: newTeam });
//     } catch (err) {
//         console.error('Error creating new team:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

////////TRIAL 1 SAMPLE 1
router.post('/createteams', async (req, res) => {
    const { name, team_id, members } = req.body; // Expecting team name, team_id, and members array
    try {
        // Check if a team with the same name or ID already exists
        const existingTeam = await team.findOne({ $or: [{ name }, { team_id }] });
        if (existingTeam) {
            return res.status(400).json({ message: 'Team with the same name or ID already exists' });
        }

        // Create a new team
        const newTeam = new team({
            name,
            team_id,
            members: members.map(member => ({ user_id: member, status: 'waiting' })), // Map members to include status
        });

        await newTeam.save();
        res.status(201).json({ message: 'Team created successfully', team: newTeam });
    } catch (err) {
        console.error('Error creating new team:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/users/:memberId', async (req, res) => {
    const { teamId } = req.params;
    const { currentUserId, request } = req.body;

    try {
        const teamdata = await team.findById(teamId);
        if (!teamdata) {
            return res.status(404).json({ message: 'Team not found' });
        }

        const users = await user.find({ _id: { $in: teamdata.members } });

        for (const member of teamdata.members) {
            if (member.toString() !== currentUserId) {
                const userToUpdate = users.find(u => u._id.toString() === member.toString());
                const updatedRequests = [
                    ...(userToUpdate?.requests || []),
                    request
                ];

                await user.findByIdAndUpdate(member, { requests: updatedRequests });
            }
        }

        res.status(200).json({ message: `Request sent to all members of team "${teamdata.name}".` });
    } catch (error) {
        console.error('Error sending join request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'email-email', // email
        pass: 'password-password'  //email password or app password
    }
});

router.post('/signup', async (req, res) => {
    try {
        const newUser = new signuser(req.body);
        await newUser.save();

        // Send email after successful signup
        const mailOptions = {
            from: 'email-email', // Replace with your email
            to: newUser.email,
            subject: 'Registration Successful',
            text: `Hello ${newUser.name},\n\nThank you for registering! Please complete your profile to get started.\n\nBest regards,\nYour Team`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
/////////// TRIAL 2 SAMPLE 2
router.post('/create', async (req, res) => {
    const { teamName, eventId } = req.body;

    try {
        // Create the new team
        const newTeam = new team({
            name: teamName,
            team_id: Math.floor(Math.random() * 10000), // Random team ID or you can have an auto-increment logic
            eventId: eventId,
            createdAt: new Date(),
        });

        // Add the team leader (logged-in user)
        newTeam.members.push({
            status: 'leader', 
            user_id: req.user._id
        });

        // Save the new team
        await newTeam.save();

        // Update the user's signup document with the team details
        await signuser.findByIdAndUpdate(req.user._id, {
            team: teamName,
            teamId: newTeam.team_id,
            isTeam: true
        });

        res.status(201).json({ message: 'Team created successfully', team: newTeam });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create team', error });
    }
});

router.post('/join/:teamId', async (req, res) => {
    const { teamId } = req.params;

    try {
        // Find the team by ID
        const Team = await team.findOne({ team_id: teamId });

        if (!Team || Team.isFull) {
            return res.status(400).json({ message: 'Team is either full or does not exist' });
        }

        // Check if the team already has 4 members
        if (Team.members.length >= 4) {
            return res.status(400).json({ message: 'Team is full' });
        }

        // Add user to team requests
        team.requests.push({
            user_id: req.user._id,
            status: 'pending',
        });

        // Save the updated team
        await Team.save();

        // Update the user's signup document with pending request
        const user = await signuser.findById(req.user._id);
        user.requests.push({
            teamId: Team.team_id,
            teamName: Team.name,
            status: 'pending'
        });
        await signuser.save();

        res.status(200).json({ message: 'Request to join the team sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error while sending request', error });
    }
});

router.post('/request/:teamId/:userId', async (req, res) => {
    const { teamId, userId } = req.params;
    const { action } = req.body; // "accept" or "reject"

    try {
        // Find the team by ID
        const Team = await team.findOne({ team_id: teamId });

        if (!Team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        // Check if the logged-in user is the team leader
        if (Team.members[0].user_id.toString() !== req.signuser._id.toString()) {
            return res.status(403).json({ message: 'Only the team leader can approve/reject requests' });
        }

        // Find the request to accept/reject
        const requestIndex = Team.requests.findIndex(request => request.user_id.toString() === userId);

        if (requestIndex === -1) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Accept or reject the request
        if (action === 'accept') {
            team.members.push({
                status: 'member',
                user_id: userId
            });
            Team.requests[requestIndex].status = 'approved';
        } else if (action === 'reject') {
            Team.requests[requestIndex].status = 'rejected';
        }

        // Save the updated team
        await team.save();

        // Update the user's signup document
        const user = await signuser.findById(userId);
        if (action === 'accept') {
            user.Team = team.name;
            user.TeamId = team.team_id;
            user.isTeam = true;
        }
        await user.save();

        res.status(200).json({ message: `Request ${action}ed successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error while processing request', error });
    }
});

router.post('/finalize-score', async (req, res) => {
  const { submissionId, score } = req.body;

  try {
    const submission = await submission.findById(submissionId);
    if (!submission) {
      return res.status(404).send("Submission not found");
    }

    // Add score to the submission (or handle as needed)
    submission.score = score;

    await submission.save();
    res.status(200).send("Score finalized");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.get('/teams/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Find the user in the Signup model to check their team ID
    const user = await signuser.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If user has a team ID, check the team in the Team model
    if (user.teamId) {
      const teams = await team.findOne({ team_id: user.teamId });

      if (teams) {
        return res.status(200).json({ hasTeam: true, team });
      }
    }

    // If user doesn't have a team ID
    res.status(200).json({ hasTeam: false });
  } catch (err) {
    console.error('Error fetching team data:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//////////// TRIAL 3 SAMPLE 3
//latestteamformation api
router.post('/api/team/create', async (req, res) => {
    const { userId, teamName, eventId } = req.body;
    const users = await user.findById(userId);
    if (!users) return res.status(404).send("User not found");

    const teamCount = await team.countDocuments();
    const Team = new team({
        name: teamName,
        team_id: teamCount + 1,
        eventId,
        members: [{ user_id: user._id, status: "approved" }],
    });

    await Team.save();
    user.Team = teamName;
    user.TeamId = team.team_id;
    user.isTeam = true;
    await user.save();

    res.status(200).json(Team);
});

//latestteamformation request api
router.post('/api/team/request/:teamId', async (req, res) => {
    const { userId } = req.body;
    const Team = await team.findOne({ team_id: req.params.teamId });
    if (!Team) return res.status(404).send("Team not found");

    team.requests.push({ user_id: userId });
    await Team.save();
    res.send("Request sent");
});

//latestteamformation api
router.get('/api/team/requests/:teamId', async (req, res) => {
    const Team = await team.findOne({ team_id: req.params.teamId }).populate('requests.user_id');
    res.json(Team.requests);
});

//latestteamformation api accept reject request
router.post('/api/team/request/handle', async (req, res) => {
    const { teamId, requestId, decision } = req.body; // decision: 'approved' or 'rejected'
    const Team = await team.findOne({ team_id: teamId });
    if (!Team) return res.status(404).send("Team not found");

    const reqIndex = Team.requests.findIndex(r => r._id.toString() === requestId);
    const request = Team.requests[reqIndex];

    if (decision === 'approved') {
        Team.members.push({ user_id: request.user_id, status: "approved" });
        await Signup.findByIdAndUpdate(request.user_id, {
            team: Team.name,
            teamId: Team.team_id,
            isTeam: true,
        });
    }

    Team.requests[reqIndex].status = decision;
    await team.save();
    res.send("Request handled");
});

//assign events to mentors

module.exports = router;
