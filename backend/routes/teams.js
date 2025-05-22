const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const User = require('../models/user');

// Create a new team
router.post('/create', async (req, res) => {
  try {
    const { name, project, userId, eventId } = req.body;

    // Check if team name already exists
    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
      return res.status(400).json({ message: 'Team name already exists' });
    }

    // Create new team
    const newTeam = new Team({
      name,
      team_id: Math.floor(Math.random() * 100000),
      project,
      members: [{ status: 'approved', user_id: userId }],
      eventId,
      mentor: userId,
    });

    await newTeam.save();

    // Update user
    await User.findByIdAndUpdate(userId, {
      team: name,
      teamId: newTeam.team_id,
      isTeam: true,
    });

    res.status(201).json({ message: 'Team created successfully', team: newTeam });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Send request to join a team
router.post('/request', async (req, res) => {
  try {
    const { userId, teamId } = req.body;

    const team = await Team.findOne({ team_id: teamId });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if user already requested
    const existingRequest = team.requests.find((req) => req.user_id.toString() === userId);
    if (existingRequest) {
      return res.status(400).json({ message: 'Request already sent' });
    }

    // Add request
    team.requests.push({ user_id: userId, status: 'pending' });
    await team.save();

    res.status(200).json({ message: 'Request sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get available teams with less than 4 members
router.get('/available', async (req, res) => {
  try {
    const teams = await Team.find({ 'members.3': { $exists: false } }); // Teams with less than 4 members
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Handle request approval/rejection
router.put('/handle-request', async (req, res) => {
  try {
    const { teamId, userId, action } = req.body;

    const team = await Team.findOne({ team_id: teamId });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const request = team.requests.find((req) => req.user_id.toString() === userId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = action;

    if (action === 'approved') {
      team.members.push({ user_id: userId, status: 'approved' });

      // Update user
      await User.findByIdAndUpdate(userId, {
        team: team.name,
        teamId: team.team_id,
        isTeam: true,
      });
    }

    await team.save();

    res.status(200).json({ message: `Request ${action}` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
