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
const bodyParser = require('body-parser');
const cors = require('cors');


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
 
router.post('/events', async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log the request body
        const newEvent = new event(req.body);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error saving event:", error); // Log the full error
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
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




//yet to created 
router.get("/api/stats", async (req, res) => {
    try {
        const participants = await user.distinct('email').countDocuments();
        const problems = await Challenge.distinct('track_id').countDocuments();
        const submissions = await submission.distinct('ps').countDocuments();
        const eventcount = await event.distinct('event_id').countDocuments();
        res.json({ participants, problems, submissions, eventcount });
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

router.post('/choose-challenge', async (req, res) => {
    const { user_id, track_id } = req.body;

    try {
        // Find the user and update their chosen challenge
        const updatedUser = await user.findOneAndUpdate(
            { _id: user_id },
            { $set: { chosen_challenge: track_id } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Challenge chosen successfully', user: updatedUser });
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

  // POST route for bulk assigning a mentor to multiple teams
router.post('/assign-mentor', async (req, res) => {
    try {
      const { mentorId, teamIds } = req.body; // expecting mentorId and array of teamIds
  
      if (!mentorId || !Array.isArray(teamIds)) {
        return res.status(400).json({ message: "mentorId and teamIds (array) are required" });
      }
  
      // Check if mentor exists
      const mentor = await User.findById(mentorId);
      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }
  
      // Update each team to assign the mentor
      const updateTeams = await Team.updateMany(
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
  
  // PUT route for assigning a mentor to a single team
  router.put('/teams/:teamId', async (req, res) => {
    const { teamId } = req.params;
    const { mentor } = req.body;
  
    try {
      const team = await Team.findByIdAndUpdate(
        teamId,
        { mentor: mentor || null }, // Allow unassigning by sending null
        { new: true } // Return the updated document
      );
  
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }
  
      res.status(200).json({ message: "Team mentor updated successfully", team });
  
    } catch (error) {
      console.error("Error updating team mentor:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // GET route to fetch all mentors
  router.get('/mentors', async (req, res) => {
    try {
      const mentors = await User.find({ role: 'mentor' }); // Assuming you have a 'role' field
      res.status(200).json(mentors);
    } catch (error) {
      console.error("Error fetching mentors:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // GET route to fetch all teams
  router.get('/teams', async (req, res) => {
    try {
      const teams = await Team.find().populate('mentor', 'firstName lastName'); // Populate mentor details
      res.status(200).json(teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
      res.status(500).json({ message: "Internal Server Error" });
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
        const updatedUser = await user.findOneAndUpdate(
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

// Event registration endpoint this is working adds event to user
router.post('/events/:eventId/register', async (req, res) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.body;

        // Validate input
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find the event by eventId
        const eventToRegister = await event.findOne({ eventId });
        if (!eventToRegister) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if user exists
        const user = await signuser.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user is already registered
        if (eventToRegister.participants && eventToRegister.participants.includes(userId)) {
            return res.status(400).json({ message: 'User is already registered for this event' });
        }

        // Add user to the event's participants
        eventToRegister.participants = eventToRegister.participants || [];
        eventToRegister.participants.push(userId);
        await eventToRegister.save();

        // Update user's event registration field
        user.eventreg = eventId;
        await user.save();

        res.status(200).json({ message: 'User registered successfully', event: eventToRegister });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
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