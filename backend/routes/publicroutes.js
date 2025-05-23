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
const RubricTemplate = require("../models/rubricTemplateSchema");
const RubricScore = require("../models/rubricScoreSchema");
const mongoose = require('mongoose');

const router = express.Router();

router.use(bodyParser.json());
router.use(cors());

// User Routes
router.get('/participants', async (req, res) => {
    try {
      const users = await user.find({ role: 'Participant' }); // Directly specify the filter object
      res.json(users);
    } catch (err) {
      console.error("Error fetching participants", err);
      res.status(500).send("Internal Server Error");
    }
  });

//   router.get('/participants', async (req, res) => {
//     try {
//       const users = await user.find().where('role').equals('Participant');
//       res.json(users);
//     } catch (err) {
//       console.error("Error fetching participants", err);
//       res.status(500).send("Internal Server Error");
//     }
//   });

// Community Routes
router.get('/community', async (req, res) => {
    try {
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
        console.error("Error fetching challenges:", err);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/challenges/:trackId', async (req, res) => {
    try {
        const trackId = req.params.trackId;
        const challenges = await Challenge.find({ track_id: trackId });
        res.json(challenges);
    } catch (err) {
        console.error('Error fetching challenges:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Scores Routes
router.get("/scores", async (req, res) => {
    try {
        const scores = await Score.find();
        res.json(scores);
    } catch (err) {
        console.error("Error fetching scores:", err);
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
        const { teamId } = req.params;
        const submissions = await submission.find({ team_id: teamId});
        res.json(submissions);
    } catch (err) {
        console.error('Error fetching submissions:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//router.post('/teams/:teamId, async (req,res) => {
    // try{
    // }})

// Users Routes
router.get("/users", async (req, res) => {
    try {
        const users = await user.find();
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/signups", async (req,res) => {
    try{
        const signup = await signuser.find();
        res.json(signup);
    } catch (err) {
        console.error("Error fetching signups",err);
        res.status(500).send("Internal Server Error");
    }
})

// Events Routes
router.get("/events", async (req, res) => {
    try {
        const events = await event.find();
        res.json(events);
    } catch (err) {
        console.error("Error fetching events:", err);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/events/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const seeevents = await event.find({ eventId: eventId });
        res.json(seeevents);
    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
 
// router.post('/events', async (req, res) => {
//     try {
//         console.log("Request Body:", req.body); // Log the request body
//         const newEvent = new event(req.body);
//         await newEvent.save();
//         res.status(201).json(newEvent);
//     } catch (error) {
//         console.error("Error saving event:", error); // Log the full error
//         if (error.name === 'ValidationError') {
//             return res.status(400).json({ error: error.message });
//         }
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// });

router.post('/events', async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const lastEvent = await event.findOne().sort({ eventId: -1 }); // Use lowercase 'event'
    let nextSequenceNumber = 1;

    if (lastEvent && lastEvent.eventId) {
      const lastIdNumber = parseInt(lastEvent.eventId.substring(1), 10);
      if (!isNaN(lastIdNumber)) {
        nextSequenceNumber = lastIdNumber + 1;
      }
    }

    const nextEventId = `E${nextSequenceNumber.toString().padStart(3, '0')}`;

    const newEvent = new event({ ...req.body, eventId: nextEventId }); // Use lowercase 'event'

    await newEvent.save();
    res.status(201).json(newEvent);

  } catch (error) {
    console.error("Error saving event:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    } else if (error.code === 11000 && error.keyPattern && error.keyPattern.eventId) {
      return res.status(409).json({ error: 'Event ID already exists. Please try again.' });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete('/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        console.log("Deleting event with ID:", eventId);
        const deletedEvent = await event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        console.log("Updating event with ID:", eventId);
        console.log("Request body:", req.body);
        const updatedEvent = await event.findByIdAndUpdate(eventId, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(updatedEvent);
    } catch (error) {
        console.error("Error updating event:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Submissions Routes
router.get("/submissions", async (req, res) => {
    try {
        const submissions = await submission.find();
        res.json(submissions);
    } catch (err) {
        console.error("Error fetching submissions:", err);
        res.status(500).send("Internal Server Error");
    }
});


//this workssssssssssssssss fineeeeeeeeeeeeeeeeeee but needed more specific phase based submissions
router.post("/submissions", async (req, res) => {
    try {
        const newSubmission = new submission(req.body);
        await newSubmission.save();
        res.json(newSubmission);
    } catch (err) {
        console.error("Error adding submission:", err);
        res.status(500).send("Internal Server Error");
    }
});

//this is for first phase 
router.post("/submissions", async (req, res) => {
    try {
        const { eventId } = req.body;

        if (!eventId) return res.status(400).send("Event ID is required");

        const events = await event.findOne({ eventId });
        if (!events) return res.status(404).send("Event not found");

        const now = new Date();

        // Find the current active phase
        const activePhase = events.submissionPhases.find(phase => {
            const start = new Date(phase.startDate);
            const end = new Date(phase.endDate);
            return now >= start && now <= end;
        });

        if (!activePhase) {
            return res.status(400).send("No active submission phase at this time.");
        }

        const submissionData = {
            ...req.body,
            phase: activePhase
        };

        const newSubmission = new submission(submissionData);
        await newSubmission.save();

        res.status(201).json(newSubmission);
    } catch (err) {
        console.error("Error adding submission:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Example: Secure submission endpoint with token authentication and saving to DB
router.post('/submissions', async (req, res) => {
    const { title, projectdesc, ps, thumbnail, team_id, gitrepo } = req.body;
    if (!title || !projectdesc || !ps || !gitrepo) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const newSubmission = new submission({
            title,
            projectdesc,
            ps,
            thumbnail,
            team_id,
            gitrepo
        });
        await newSubmission.save();
        res.status(201).json({ message: 'Submission received', submission: newSubmission });
    } catch (err) {
        console.error('Error saving submission:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//yet to created 
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

//notifications
router.get('/notifications', async (req,res) => {
    try {
        const notifications = await notify.find();
        return res.json(notifications);
    } catch (err) {
        res.status(500).send("Internal server error");
        console.error("error fetching notifications ",err)
    }
})

router.get('/users/:emailid', async (req, res) => {
  try {
    const emailid = req.params.emailid;
    const User = await user.findOne({ email: emailid });

    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(User);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// router.get('/challenges/:eventId', async (req, res) => {
//     try {
//         const eventId = req.params.eventId;
//         console.log("Fetching challenges for eventId:", eventId); // Log the eventId

//         const challenges = await Challenge.find({ eventId: eventId });
//         console.log("Challenges found:", challenges); // Log the result

//         if (!challenges || challenges.length === 0) {
//             console.log("Challenges not found for eventId:", eventId);
//             return res.status(404).json({ message: 'Challenges not found' });
//         }
//         res.json(challenges);
//     } catch (err) {
//         console.error('Error fetching challenges:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

router.get('/challenges/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const challenges = await Challenge.find({ eventId: eventId });
        res.json(challenges);
    } catch (err) {
        console.error('Error fetching challenges:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// router.post('/choose-challenge', async (req, res) => {
//     const { user_id, track_id } = req.body;

//     try {
//         // Find the user and update their chosen challenge
//         const updatedUser = await user.findOneAndUpdate(
//             { _id: user_id },
//             { $set: { chosen_challenge: track_id } },
//             { new: true }
//         );

//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({ message: 'Challenge chosen successfully', user: updatedUser });
//     } catch (err) {
//         console.error('Error saving challenge choice:', err);
//         res.status(500).json({ error: 'Failed to choose challenge' });
//     }
// });
//this worksssssssssssssss above one
router.post('/choose-challenge', async (req, res) => {
    const { team_id, track_id } = req.body;

    try {
        // Find the team using the custom team_id (not _id) and update their chosen challenge
        const updatedTeam = await team.findOneAndUpdate(
            { team_id: team_id },
            { $set: { chosen_challenge: track_id } },
            { new: true }
        );

        if (!updatedTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.status(200).json({ message: 'Challenge chosen successfully', team: updatedTeam });
    } catch (err) {
        console.error('Error saving challenge choice:', err);
        res.status(500).json({ error: 'Failed to choose challenge' });
    }
});

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

router.get('/displaychallenge/:eventId', async (req,res) => {
    try {
        const eventId = req.params.eventId;
        const challenges = await Challenge.find({ eventId: eventId });
        res.json(challenges);
    } catch (err) {
        console.error('Error fetching challenges:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/challenges/:trackId', async (req,res) => {
    try{
    const {trackId} = req.params.trackId;
const seechallenges = await Challenge.find({trackId: trackId});
    res.json(seechallenges);
}catch(err){
    console.error(err);
    res.status(500).json({error: 'Internal server error'});
}
})

router.get('/mentors', async (req, res) => {
    try {
      const users = await user.find({ role: 'Mentor' });
      res.json(users);
    } catch (err) {
      console.error("Error fetching mentors", err);
      res.status(500).send("Internal Server Error");
    }
  });

  // POST route for bulk assigning a mentor to multiple teams this worksssssssssssss
router.post('/assign-mentor', async (req, res) => {
    try {
      const { mentorId, teamIds } = req.body; // expecting mentorId and array of teamIds
  
      if (!mentorId || !Array.isArray(teamIds)) {
        return res.status(400).json({ message: "mentorId and teamIds (array) are required" });
      }
  
      // Check if mentor exists
      const mentor = await user.findById(mentorId);
      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }
  
      // Update each team to assign the mentor
      const updateTeams = await team.updateMany(
        { _id: { $in: teamIds } },
        { mentor: mentorId }
      );
  
      res.status(200).json({
        message: "Mentor assigned to teams successfully",
        modifiedCount: updateTeams.modifiedCount
      });
  
    } catch (error) {
      console.error("Error assigning mentor (bulk):", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // PUT route for assigning a mentor to a single team this workssssssssssssssssssssssssssssss
//   router.put('/teams/:teamId', async (req, res) => {
//     const { teamId } = req.params;
//     const { mentor } = req.body;
  
//     try {
//       const team = await team.findByIdAndUpdate(
//         teamId,
//         { mentor: mentor || null }, // Allow unassigning by sending null
//         { new: true } // Return the updated document
//       );
  
//       if (!team) {
//         return res.status(404).json({ message: "Team not found" });
//       }
  
//       res.status(200).json({ message: "Team mentor updated successfully", team });
  
//     } catch (error) {
//       console.error("Error updating team mentor:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   });
//this worksssssssssssssssssss
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


  // GET route to fetch all mentors
  router.get('/mentors', async (req, res) => {
    try {
      const mentors = await user.find({ role: 'mentor' }); // Assuming you have a 'role' field
      res.status(200).json(mentors);
    } catch (error) {
      console.error("Error fetching mentors:", error);
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

router.delete('/submissions/:id', async (req, res) => {
    try {
        const submissionId = req.params.id;
        const deletedSubmission = await submission.findByIdAndDelete(submissionId);

        if (!deletedSubmission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        res.status(200).json({ message: 'Submission deleted successfully' });
    } catch (err) {
        console.error('Error deleting submission:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// // PUT endpoint to assign a mentor to a team
// router.put('/teams/:teamId/assign-mentor', async (req, res) => {
//     const { mentorId } = req.body;
//     const { teamId } = req.params;

//     if (!mentorId) {
//         return res.status(400).json({ message: 'mentorId is required in the request body.' });
//     }

//     try {
//         // Validate mentor exists and has role 'mentor'
//         const mentor = await User.findById(mentorId);
//         if (!mentor || mentor.role.toLowerCase() !== 'mentor') {
//             return res.status(404).json({ message: 'Mentor not found or invalid mentor role.' });
//         }

//         // Update the team
//         const updatedTeam = await Team.findByIdAndUpdate(
//             teamId,
//             { mentor: mentor._id },
//             { new: true }
//         ).populate('mentor', 'firstName lastName email');

//         if (!updatedTeam) {
//             return res.status(404).json({ message: 'Team not found.' });
//         }

//         res.status(200).json(updatedTeam);
//     } catch (error) {
//         console.error('Error assigning mentor to team:', error);
//         res.status(500).json({ message: 'Internal Server Error while assigning mentor.' });
//     }
// });
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
  
//   // PUT endpoint to assign mentors to a team
//   router.put('/teams/:teamId/assign-mentors', async (req, res) => {
//     const { mentorIds } = req.body; // Expect an array of mentor ObjectIds
  
//     try {
//       const team = await team.findByIdAndUpdate(
//         req.params.teamId,
//         { mentors: mentorIds },
//         { new: true } // Return the updated document
//       ).populate('mentors', 'name email');
  
//       if (!team) {
//         return res.status(404).json({ message: 'Team not found' });
//       }
  
//       res.json(team);
//     } catch (err) {
//       console.error("Error assigning mentors", err);
//       res.status(500).send("Internal Server Error");
//     }
//   });

// router.post('/assign-mentor', async (req, res) => {
//     try {
//       const { mentorId, teamIds } = req.body; // expecting mentorId and array of teamIds
  
//       if (!mentorId || !Array.isArray(teamIds)) {
//         return res.status(400).json({ message: "mentorId and teamIds (array) are required" });
//       }
  
//       // Check if mentor exists
//       const mentor = await User.findById(mentorId);
//       if (!mentor) {
//         return res.status(404).json({ message: "Mentor not found" });
//       }
  
//       // Update each team to assign the mentor
//       const updateTeams = await Team.updateMany(
//         { _id: { $in: teamIds } }, 
//         { mentor: mentorId }
//       );
  
//       res.status(200).json({
//         message: "Mentor assigned to teams successfully",
//         modifiedCount: updateTeams.modifiedCount
//       });
  
//     } catch (error) {
//       console.error("Error assigning mentor:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   });
  
//   // API 2: Get all teams without a mentor (optional)
//   // GET /unassigned-teams
//   router.get('/unassigned-teams', async (req, res) => {
//     try {
//       const teams = await Team.find({ mentor: { $exists: false } });
//       res.status(200).json(teams);
//     } catch (error) {
//       console.error("Error fetching unassigned teams:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   });
  
//   // API 3: Get all teams assigned to a particular mentor
//   // GET /mentor-teams/:mentorId
//   router.get('/mentor-teams/:mentorId', async (req, res) => {
//     try {
//       const { mentorId } = req.params;
//       const teams = await Team.find({ mentor: mentorId });
//       res.status(200).json(teams);
//     } catch (error) {
//       console.error("Error fetching mentor's teams:", error);
//       res.status(500).json({ message: "Internal Server Error" });
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

router.post('/choose-challenge', async (req, res) => {
    const { user_id, track_id } = req.body;

    try {
        const updatedUser = await signuser.findOneAndUpdate(
            { _id: user_id },
            { $set: { chosen_challenge: track_id } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Challenge chosen successfully', user: updatedUser });
    } catch (err) {
        console.error('Error choosing challenge:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.delete('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await user.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/participants/:id', async (req, res) => {
    try {
        const participantId = req.params.id;
        const deletedParticipant = await user.findByIdAndDelete(participantId);

        if (!deletedParticipant) {
            return res.status(404).json({ message: 'Participant not found' });
        }

        res.status(200).json({ message: 'Participant deleted successfully' });
    } catch (err) {
        console.error('Error deleting participant:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/challenges/:id', async (req, res) => {
    try {
        const challengeId = req.params.id;
        const deletedChallenge = await Challenge.findByIdAndDelete(challengeId);

        if (!deletedChallenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }

        res.status(200).json({ message: 'Challenge deleted successfully' });
    } catch (err) {
        console.error('Error deleting challenge:', err);
        res.status(500).json({ error: 'Internal Server Error' });
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
router.put('/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        console.log("Updating event with ID:", eventId);
        console.log("Request body:", req.body);
        const updatedEvent = await event.findByIdAndUpdate(eventId, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(updatedEvent);
    } catch (error) {
        console.error("Error updating event:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/signups/:userId', async (req, res) => {
    try {
        const { userId } = req.params; // Fixed destructuring
        const user = await signuser.findById(userId).lean(); // Use .lean() to return a plain object

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user); // Now safe to serialize
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: 'Server error' });
    }
});


// router.get('/signups/:emailid', async (req, res) => {
//     try {
//       const emailid = req.params.emailid;
//       const User = await signuser.findOne({ email: emailid });
  
//       if (!User) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.json(User);
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });

router.post('/choose-challenge/:teamId', async (req, res) => {
    const { team_id, track_id } = req.body;

    try {
        const updatedTeam = await team.findOneAndUpdate(
            { _id: team_id },
            { $set: { chosen_challenge: track_id } },
            { new: true }
        );

        // if (!updatedTeam) {
        //     return res.status(404).json({ message: 'Team not found' });
        // }

        res.status(200).json({ message: 'Challenge chosen successfully', user: updatedTeam });
    } catch (err) {
        console.error('Error choosing challenge:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//// TRIAL 1 SAMPLE 1 
//    "members": "67c7d9dce8d68663b9a2855d"
//    "error": "Internal Server Error"

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

//    "members": "6651e61e52a7e674c2c60abc"
//    "error": "Internal Server Error"
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
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!=================================---------%%%%%%%%%%%%%%%%%%%%%%%%%%
//// TRIAL 2 SAMPLE 2
//{"name": "buga","members": ["6651e61e52a7e674c2c60abc","680f4fd37670c38b40286d5e","681463d86181f6028b5bca0c"],"teamId": "25"}
//    "message": "Team with the same name or ID already exists"
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

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
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

router.post('/api/challenges', async (req, res) => {
  try {
    const { title, description, trackId, imgurl, eventId } = req.body;

    const newChallenge = new Challenge({
      title,
      description,
      trackId,
      imgurl,
      eventId,
    });

    const savedChallenge = await newChallenge.save();

    res.status(201).json({ message: 'Challenge added successfully!', challenge: savedChallenge });
  } catch (error) {
    console.error('Error adding challenge:', error);
    res.status(500).json({ message: 'Failed to add challenge', error: error.message });
  }
});

// router.post('/create-team', teamController.createTeam);
router.post('/send-invitation/:teamId', teamController.sendInvitation);
router.post('/accept-invitation/:teamId', teamController.acceptInvitation);
router.post('/reject-invitation/:teamId', teamController.rejectInvitation);
router.post('/leave-team/:teamId', teamController.leaveTeam);
router.post('/remove-member/:teamId/:userId', teamController.removeMemberFromTeam);

// Send a join request to a team this workssssssssssssss
router.post('/request-join', teamController.sendJoinRequest);

// Get all join requests for a team (only accessible to admins)
router.get('/join-requests/:teamId', teamController.getJoinRequests);

// Approve a join request (only accessible to admins)
router.put('/approve-request/:teamId/:requestId', teamController.approveJoinRequest);

// Reject a join request (only accessible to admins)
router.put('/reject-request/:teamId/:requestId', teamController.rejectJoinRequest);


//// TRIAL 3 SAMPLE 3 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
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
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//need to change body parameters
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
        Team.requests.push({
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
//{"action": "accept"}
//{ "message": "Error while processing request", "error": {}}
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
            Team.members.push({
                status: 'member',
                user_id: userId
            });
            Team.requests[requestIndex].status = 'approved';
        } else if (action === 'reject') {
            Team.requests[requestIndex].status = 'rejected';
        }

        // Save the updated team
        await Team.save();

        // Update the user's signup document
        const users = await signuser.findById(userId);
        if (action === 'accept') {
            users.team = Team.name;
            users.teamId = Team.team_id;
            users.isTeam = true;
        }
        await users.save();

        res.status(200).json({ message: `Request ${action}ed successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error while processing request', error });
    }
});

router.post('/finalize-score', async (req, res) => {
  const { submissionId, score } = req.body;

  try {
    const Submission = await submission.findById(submissionId);
    if (!Submission) {
      return res.status(404).send("Submission not found");
    }

    // Add score to the submission (or handle as needed)
    Submission.score = score;

    await Submission.save();
    res.status(200).send("Score finalized");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//this shows internal server error
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
//this workssssssssss
router.post('/contact', async (req, res) => {
    try {
        const { firstName, lastName, email, message } = req.body;
        if (!firstName || !lastName || !email || !message) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const contact = new Contact({ firstName, lastName, email, message });
        await contact.save();
        res.status(201).json({ message: 'Message received!' });
    } catch (err) {
        console.error('Error saving contact message:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%5
//latestteamformation api
//thissssssssssssss worksssssssssssssssssssssssssssss
//{"teamName": "The Debuggers","userIds": [  "6779d8312b29c161beddc4","67d9dce8d68663b9a28564","67b4387b4207eddf8d1cba"],"loggedInUserId": "6779d8312b29c161beddc4"}
// Accept multiple members for team creation
// router.post('/api/team/create/:eventId', async (req, res) => {
//     const { userIds, teamName, loggedInUserId } = req.body; // loggedInUserId must be provided
//     const { eventId } = req.params;

//     if (!Array.isArray(userIds) || userIds.length === 0) {
//         return res.status(400).json({ message: "userIds must be a non-empty array" });
//     }
//     if (!loggedInUserId || userIds[0] !== loggedInUserId) {
//         return res.status(400).json({ message: "First user in userIds must be the logged-in user" });
//     }

//     // Fetch all users to be added as members
//     const usersList = await user.find({userIds });
//     if (usersList.length !== userIds.length) {
//         return res.status(404).json({ message: "One or more users not found" });
//     }

//     const teamCount = await team.countDocuments();
//     const newTeamId = teamCount + 1;

//     // First user is the creator/leader, rest are members
//     const members = userIds.map((uid, idx) => ({
//         user_id: uid,
//         status: idx === 0 ? "approved" : "waiting"
//     }));

//     const teams = new team({
//         name: teamName,
//         team_id: newTeamId,
//         eventId,
//         members
//     });

//     await teams.save();

//     // Update each user's team info
//     for (let i = 0; i < usersList.length; i++) {
//         usersList[i].team = teamName;
//         usersList[i].teamId = newTeamId;
//         usersList[i].isTeam = true;
//         await usersList[i].save();
//     }

//     res.status(200).json(teams);
// });
router.post('/api/team/create/:eventId', async (req, res) => {
    const { userIds, teamName, loggedInUserId } = req.body;
    const { eventId } = req.params;

    if (!teamName || !Array.isArray(userIds) || userIds.length === 0) {
        return res.status(400).json({ message: "Invalid input: teamName and userIds are required" });
    }

    if (!loggedInUserId || userIds[0] !== loggedInUserId) {
        return res.status(400).json({ message: "First user in userIds must be the logged-in user" });
    }

    // Validate userIds
    const isValidIds = userIds.every(id => mongoose.Types.ObjectId.isValid(id));
    if (!isValidIds) {
        return res.status(400).json({ message: "One or more userIds are invalid" });
    }

    const usersList = await user.find({ _id: { $in: userIds } });
    if (usersList.length !== userIds.length) {
        return res.status(404).json({ message: "One or more users not found" });
    }

    // Get unique team ID
    const counter = await Counter.findOneAndUpdate(
        { name: 'teamId' },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
    );
    const newTeamId = counter.value;

    const members = userIds.map((uid, idx) => ({
        user_id: uid,
        status: idx === 0 ? "approved" : "waiting"
    }));

    const teams = new team({
        name: teamName,
        team_id: newTeamId,
        eventId,
        members
    });

    await teams.save();

    // Bulk update users
    const bulkOps = usersList.map(u => ({
        updateOne: {
            filter: { _id: u._id },
            update: {
                $set: {
                    team: teamName,
                    teamId: newTeamId,
                    isTeam: true
                }
            }
        }
    }));

    await user.bulkWrite(bulkOps);

    res.status(200).json(teams);
});

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//latestteamformation request api
//this worksssssssssssssssssssssssssssss
router.post('/api/team/request/:teamId', async (req, res) => {
    const { userId } = req.body;
    const teams = await team.findOne({ team_id: req.params.teamId });
    if (!teams) return res.status(404).send("Team not found");

    teams.requests.push({ user_id: userId });
    await teams.save();
    res.send("Request sent");
});

//latestteamformation api
//crash
router.get('/api/team/requests/:teamId', async (req, res) => {
    const teams = await team.findOne({ team_id: req.params.teamId }).populate('requests.user_id');
    res.json(teams.requests);
});

//latestteamformation api accept reject request
//severe mistake
router.post('/api/team/request/handle', async (req, res) => {
  const { teamId, requestId, status } = req.body;

  try {
    const teams = await team.findOne({ team_id: teamId });
    if (!teams) return res.status(404).send("Team not found");

    const reqIndex = teams.requests.findIndex(r => r._id.toString() === requestId);
    if (reqIndex === -1) return res.status(404).send("Request not found");

    const request = teams.requests[reqIndex];

    if (status === 'approved') {
      const alreadyMember = teams.members.some(m => m.user_id === request.user_id);
      if (!alreadyMember) {
        teams.members.push({ user_id: request.user_id, status: "approved" });

        await user.findByIdAndUpdate(request.user_id, {
          team: teams.name,
          teamId: teams.team_id,
          isTeam: true,
        });
      }
    }

    teams.requests[reqIndex].status = decision;
    await teams.save();

    res.send("Request handled");
  } catch (error) {
    console.error("Error handling team request:", error);
    res.status(500).send("Server error");
  }
});

//mentorqueryform

// router.post('/mentor-query', async (req, res) => {
//     try {
//         const { email, mentorName, query } = req.body;
//         if (!email || !mentorName || !query) {
//             return res.status(400).json({ message: 'Email, mentor name, and query are required.' });
//         }
//         const newQuery = new Query({ email, mentorName, query });
//         await newQuery.save();
//         res.status(201).json({ message: 'Query submitted successfully.' });
//     } catch (err) {
//         console.error('Error saving mentor query:', err);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

router.post('/mentor-query', async (req, res) => {
    try {
        const { query } = req.body;
        const userId = req.user._id;

        if (!query) {
            return res.status(400).json({ message: 'Query is required.' });
        }

        // Find team where this user is a member
        const teams = await team.findOne({ 'members.user_id': userId }).populate('mentor');
        if (!teams) {
            return res.status(403).json({ message: 'User is not part of any team.' });
        }

        if (!teams.mentor) {
            return res.status(400).json({ message: 'Team does not have an assigned mentor.' });
        }

        const mentorName = teams.mentor.name || 'Unknown';
        // const mentorEmail = teams.mentor.email || 'N/A'; // Assuming email exists in User schema
        const userEmail = req.user.email;

        const newQuery = new Query({
            email: userEmail,
            mentorName,
            query,
        });

        await newQuery.save();
        res.status(201).json({ message: 'Query submitted successfully.', mentorName });
    } catch (err) {
        console.error('Error saving mentor query:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/challenges', async (req, res) => {
    try {
        const { title, description, trackId, imgurl, eventId } = req.body;
        if (!title || !description || !eventId) {
            return res.status(400).json({ message: 'Title, description, and eventId are required.' });
        }
        const newChallenge = new Challenge({ title, description, trackId, imgurl, eventId });
        await newChallenge.save();
        res.status(201).json({ message: 'Challenge added successfully!', challenge: newChallenge });
    } catch (err) {
        console.error('Error adding challenge:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
//assign events to mentors
router.put('/challenges/:id', async (req, res) => {
    try {
        const challengeId = req.params.id;
        const updatedChallenge = await Challenge.findByIdAndUpdate(
            challengeId,
            req.body,
            { new: true }
        );
        if (!updatedChallenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.status(200).json({ message: 'Challenge updated successfully', challenge: updatedChallenge });
    } catch (err) {
        console.error('Error updating challenge:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// PATCH /users/:userId - Update a user's requests array
router.patch('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const { requests } = req.body;

    if (!Array.isArray(requests)) {
        return res.status(400).json({ message: 'Requests must be an array.' });
    }

    try {
        const updatedUser = await user.findByIdAndUpdate(
            userId,
            { requests }, // Replace the requests array with the new one
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User requests updated successfully.', user: updatedUser });
    } catch (error) {
        console.error('Error updating user requests:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//    "message": "Team not found"
//{"requests": [{  "team": "yunet","teamId": "8",  "status": "pending", "message": "You've been invited to join CodeForce by Jane Doe."}]}
router.patch('/users/:memberId', async (req, res) => {
    const { memberId } = req.params;
    const { requests } = req.body;

    if (!Array.isArray(requests)) {
        return res.status(400).json({ message: 'Requests must be an array.' });
    }

    try {
        const updatedUser = await user.findByIdAndUpdate(
            memberId,
            { requests },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User requests updated successfully.', user: updatedUser });
    } catch (error) {
        console.error('Error updating user requests:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
////////////////////////////////////////////////////THIS IS LATEST MAY 22
// POST /api/teams/create
//{"message": "Failed to create team","error": {}}
//{"name": "The Debuggers","userId": "6651e61e52a7e674c2c60abc","eventId": "hack2025"}

router.post("/create", async (req, res) => {
  try {
    const { name, userId, eventId } = req.body;
    const users = await user.findById(userId);

    if (!users) return res.status(404).json({ message: "User not found" });

    const teamId = Math.floor(Math.random() * 100000); // generate unique team ID
    const newTeam = new team({
      name,
      team_id: teamId,
      members: [{ status: "approved", user_id: userId }],
      eventId,
       requests: [{
  userId: userId,
  status: "pending",
  message: `You have been invited to join team "${name}" by ${users.firstName} ${users.lastName}.`,
  team_id: teamId
}],

    });

    await newTeam.save();

    users.team = name;
    users.teamId = teamId;
    users.isTeam = true;
    await users.save();

    res.status(201).json(newTeam);
  } catch (err) {
  console.error("Error creating team:", err); // Log full error to console
  res.status(500).json({
    message: "Failed to create team",
    error: err.message || err
  });
}
});

// POST /api/teams/request
//    "error": "Cannot read properties of undefined (reading 'toString')"
//{ "teamId": "2","userId" : "67efac620454ecb50f96c6c5"}
router.post("/request", async (req, res) => {
  const { userId, teamId } = req.body;
  try {
    const teams = await team.findOne({ team_id: teamId });
    if (!teams) return res.status(404).json({ message: "Team not found" });

    // Check if user already requested
    const alreadyRequested = teams.requests.some(
      (r) => r.user_id === userId
    );
    if (alreadyRequested) {
      return res.status(400).json({ message: "Already requested" });
    }

    teams.requests.push({ user_id: userId, status: "pending" });
    await teams.save();

    res.json({ message: "Request sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/teams/list thisss workssssssssssssssss
router.get("/list", async (req, res) => {
  try {
    const teams = await team.find({});
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/teams/handle-request
//    "error": "Cannot read properties of undefined (reading 'toString')"
//{ "teamId": "2","userId" : "67efac620454ecb50f96c6c5","approve" : "accept"}
router.put("/handle-request", async (req, res) => {
  const { teamId, userId, action } = req.body; // action = "approve" or "reject"

  try {
    const teams = await team.findOne({ team_id: teamId });
    if (!teams) return res.status(404).json({ message: "Team not found" });

    const request = teams.requests.find(
      (r) => r.user_id.toString() === userId
    );
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = action;

    if (action === "approve") {
      teams.members.push({ user_id: userId, status: "approved" });

      // Also update the user schema
      const users = await user.findById(userId);
      if (users) {
        users.team = teams.name;
        users.teamId = teams.team_id;
        users.isTeam = true;
        await users.save();
      }
    }

    await teams.save();
    res.json({ message: `User ${action}ed` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/teams/:teamId/requests thisssssssss workssssssssssss
router.get("/:teamId/requests", async (req, res) => {
  const { teamId } = req.params;
  try {
    const teams = await team.findOne({ team_id: teamId }).populate("requests.user_id", "firstName lastName email");
    if (!teams) return res.status(404).json({ message: "Team not found" });

    res.json(teams.requests.filter(req => req.status === "pending"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//////////thisssssssssssssss issssssssssss for RUBRICS DO NOT MIX
/////// RUBRIC
// Create a rubric template for an event
// this workssssssssssssssssssssssss
router.post("/api/rubric-template/:eventId", async (req, res) => {
  try {
    const { criteria } = req.body;
    const {eventId} = req.params;
    const existing = await RubricTemplate.findOne({ eventId });
    if (existing) {
      return res.status(400).json({ message: "Rubric already exists for this event." });
    }

    const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
    if (totalWeight !== 1) {
      return res.status(400).json({ message: "Total weight of all criteria must be exactly 1." });
    }

    const template = await RubricTemplate.create({ eventId, criteria });
    res.status(201).json(template);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update rubric template
// this workssssssssssssssssssssss
router.put("/api/rubric-template/:eventId", async (req, res) => {
  try {
    const { criteria } = req.body;
    const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
    if (totalWeight !== 1) {
      return res.status(400).json({ message: "Total weight must be exactly 1." });
    }

    const updated = await RubricTemplate.findOneAndUpdate(
      { eventId: req.params.eventId },
      { criteria },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Rubric not found." });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete rubric template
router.delete("/api/rubric-template/:eventId", async (req, res) => {
  try {
    const deleted = await RubricTemplate.findOneAndDelete({ eventId: req.params.eventId });
    if (!deleted) return res.status(404).json({ message: "Rubric not found." });
    res.json({ message: "Rubric deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete rubric score
router.delete("/api/rubric-score/:id", async (req, res) => {
  try {
    const deleted = await RubricScore.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Score not found." });
    res.json({ message: "Score deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Other routes 
// Create a rubric template for an event
// router.post("/api/rubric-template", async (req, res) => {
//   try {
//     const { eventId, criteria } = req.body;

//     const existing = await RubricTemplate.findOne({ eventId });
//     if (existing) {
//       return res.status(400).json({ message: "Rubric already exists for this event." });
//     }

//     const template = await RubricTemplate.create({ eventId, criteria });
//     res.status(201).json(template);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Get rubric template by event ID
// router.get("/api/rubric-template/:eventId", async (req, res) => {
//   try {
//     const template = await RubricTemplate.findOne({ eventId: req.params.eventId });
//     if (!template) return res.status(404).json({ message: "Rubric not found" });
//     res.json(template);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Submit rubric scores for a team
router.post("/api/rubric-score/:eventId/team/:teamId", async (req, res) => {
  try {
    const { scores, evaluatorName, comments } = req.body;
    const { eventId, teamId } = req.params;

    const template = await RubricTemplate.findOne({ eventId });
    if (!template) return res.status(404).json({ message: "Rubric template not found" });

    let totalScore = 0;
    for (const s of scores) {
      const crit = template.criteria.find(c => c.name === s.criterion);
      if (!crit) return res.status(400).json({ message: `Invalid criterion: ${s.criterion}` });
      totalScore += s.score * crit.weight;
    }

    const result = await RubricScore.create({
      eventId,
      teamId,
      scores,
      evaluatorName,
      comments,
      totalScore
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all scores for an event
router.get("/api/rubric-score/event/:eventId", async (req, res) => {
  try {
    const scores = await RubricScore.find({ eventId: req.params.eventId });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all scores for a team in an event
router.get("/api/rubric-score/event/:eventId/team/:teamId", async (req, res) => {
  try {
    const scores = await RubricScore.find({
      eventId: req.params.eventId,
      teamId: req.params.teamId,
    });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

//changes in events model led to this
// router.post('/events', async (req, res) => {
//     try {
//         console.log("Request Body:", req.body);
//         const newEvent = new event(req.body);
//         await newEvent.save();
//         res.status(201).json(newEvent);
//     } catch (error) {
//         console.error("Error saving event:", error);
//         if (error.name === 'ValidationError') {
//             return res.status(400).json({ error: error.message });
//         }
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// router.delete('/events/:id', async (req, res) => {
//     try {
//         const eventId = req.params.id;
//         console.log("Deleting event with ID:", eventId);
//         const deletedEvent = await event.findByIdAndDelete(eventId);
//         if (!deletedEvent) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.json({ message: 'Event deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting event:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// router.put('/events/:id', async (req, res) => {
//     try {
//         const eventId = req.params.id;
//         console.log("Updating event with ID:", eventId);
//         console.log("Request body:", req.body);
//         const updatedEvent = await event.findByIdAndUpdate(eventId, req.body, { new: true });
//         if (!updatedEvent) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.json(updatedEvent);
//     } catch (error) {
//         console.error("Error updating event:", error);
//         if (error.name === 'ValidationError') {
//             return res.status(400).json({ error: error.message });
//         }
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// router.get('/events', async (req, res) => {
//     try {
//         const events = await event.find();
//         res.json(events);
//     } catch (error) {
//         console.error("Error fetching events:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// router.get('/events/:id', async (req, res) => {
//     try {
//         const eventId = req.params.id;
//         const foundEvent = await event.findById(eventId);
//         if (!foundEvent) {
//             return res.status(404).json({ message: "Event not found" });
//         }
//         res.json(foundEvent);
//     } catch (error) {
//         console.error("Error fetching event:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// module.exports = router;