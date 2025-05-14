const Team = require("../models/teamsmodel");
const Signup = require("../models/signupmodel");

// Send invite
exports.sendInvitation = async (req, res) => {
    const { teamId } = req.params;
    const { email } = req.body;

    try {
        const userToInvite = await Signup.findOne({ email });
        if (!userToInvite) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ status: "failed", message: "Team not found" });
        }

        const memberExist = team.members.some((member) => member.user_id.toString() === userToInvite.id.toString());
        if (memberExist) {
            return res.status(400).json({ status: "failed", message: "User is already a member of this team" });
        }

        if (userToInvite.invitations.includes(team.id)) {
            return res.status(400).json({ status: "failed", message: "Invitation already sent" });
        }

        userToInvite.invitations.push(team.id);
        await userToInvite.save();

        return res.status(200).json({ status: "success", message: `Invitation sent to ${email}` });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message });
    }
};

// Accept invite
exports.acceptInvitation = async (req, res) => {
    const { teamId } = req.params;

    try {
        const user = await Signup.findById(req.user.id);
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ status: "failed", message: "Team not found" });
        }

        const isMember = team.members.some((member) => member.user_id.toString() === user.id.toString());
        if (isMember) {
            return res.status(400).json({ status: "failed", message: "You are already a member of this team" });
        }

        if (!user.invitations.includes(teamId)) {
            return res.status(400).json({ status: "failed", message: "No invitation found for this team" });
        }

        team.members.push({ user_id: user.id, status: "member" });
        user.invitations = user.invitations.filter((invitation) => invitation.toString() !== teamId.toString());
        user.teams.push(team.id);

        await team.save();
        await user.save();

        return res.status(200).json({ status: "success", message: `You have successfully joined ${team.name}` });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message });
    }
};

// Reject invite
exports.rejectInvitation = async (req, res) => {
    const { teamId } = req.params;

    try {
        const user = await Signup.findById(req.user.id);

        if (!user.invitations.includes(teamId)) {
            return res.status(400).json({ status: "failed", message: "No invitation found for this team" });
        }

        user.invitations = user.invitations.filter((invitation) => invitation.toString() !== teamId.toString());
        await user.save();

        return res.status(200).json({ status: "success", message: "Invitation rejected" });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message });
    }
};

// Leave team
exports.leaveTeam = async (req, res) => {
    const { teamId } = req.params;

    try {
        const user = await Signup.findById(req.user.id);
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ status: "failed", message: "Team not found" });
        }

        const member = team.members.find((member) => member.user_id.toString() === user.id.toString());
        if (!member) {
            return res.status(400).json({ status: "failed", message: "You are not a member of this team" });
        }

        team.members = team.members.filter((member) => member.user_id.toString() !== user.id.toString());
        user.teams = user.teams.filter((teamId) => teamId.toString() !== team.id.toString());

        await team.save();
        await user.save();

        return res.status(200).json({ status: "success", message: `You have successfully left the team ${team.name}` });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message });
    }
};

// Remove member from team (Admin Only)
exports.removeMemberFromTeam = async (req, res) => {
    const { teamId, userId } = req.params;

    try {
        const user = await Signup.findById(userId);
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ status: "failed", message: "Team not found" });
        }

        const member = team.members.find((member) => member.user_id.toString() === user.id.toString());
        if (!member) {
            return res.status(400).json({ status: "failed", message: "User is not a member of this team" });
        }

        const admin = team.members.find((member) => member.status === "admin" && member.user_id.toString() === req.user.id.toString());
        if (!admin) {
            return res.status(403).json({ status: "failed", message: "Only an admin can remove members" });
        }

        team.members = team.members.filter((member) => member.user_id.toString() !== user.id.toString());
        user.teams = user.teams.filter((teamId) => teamId.toString() !== team.id.toString());

        await team.save();
        await user.save();

        return res.status(200).json({ status: "success", message: `Successfully removed ${user.name} from the team` });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message });
    }
};

// Send a join request to a team
exports.sendJoinRequest = async (req, res) => {
    const { teamId } = req.params;
    const userId = req.user.id;

    try {
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ status: "failed", message: "Team not found" });
        }

        if (team.members.length >= 4) {
            return res.status(400).json({ status: "failed", message: "Team is already full" });
        }

        const isAlreadyMember = team.members.some((member) => member.user_id.toString() === userId);
        if (isAlreadyMember) {
            return res.status(400).json({ status: "failed", message: "You are already a member of this team" });
        }

        const existingRequest = team.requests.find((req) => req.user_id.toString() === userId);
        if (existingRequest) {
            return res.status(400).json({ status: "failed", message: "Join request already sent" });
        }

        team.requests.push({ user_id: userId, status: "pending" });
        await team.save();

        return res.status(200).json({ status: "success", message: "Join request sent successfully" });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message });
    }
};

// Get all join requests for a team
exports.getJoinRequests = async (req, res) => {
    const { teamId } = req.params;

    try {
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ status: "failed", message: "Team not found" });
        }

        const isAdmin = team.members.some((member) => member.user_id.toString() === req.user.id && member.status === "admin");
        if (!isAdmin) {
            return res.status(403).json({ status: "failed", message: "You are not authorized to view join requests" });
        }

        return res.status(200).json({ status: "success", data: team.requests });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message });
    }
};

// Approve a join request
exports.approveJoinRequest = async (req, res) => {
    const { teamId, requestId } = req.params;

    try {
        const team = await Team.findById(teamId);
        const request = team.requests.id(requestId);

        if (!team || !request) {
            return res.status(404).json({ status: "failed", message: "Team or request not found" });
        }

        const isAdmin = team.members.some((member) => member.user_id.toString() === req.user.id && member.status === "admin");
        if (!isAdmin) {
            return res.status(403).json({ status: "failed", message: "You are not authorized to approve join requests" });
        }

        const user = await Signup.findById(request.user_id);
        team.members.push({ user_id: user.id, status: "member" });

        request.status = "approved";
        await team.save();

        user.teams.push(team.id);
        await user.save();

        return res.status(200).json({ status: "success", message: "Join request approved and user added to the team" });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message });
    }
};

// Reject a join request
exports.rejectJoinRequest = async (req, res) => {
    const { teamId, requestId } = req.params;

    try {
        const team = await Team.findById(teamId);
        const request = team.requests.id(requestId);

        if (!team || !request) {
            return res.status(404).json({ status: "failed", message: "Team or request not found" });
        }

        const isAdmin = team.members.some((member) => member.user_id.toString() === req.user.id && member.status === "admin");
        if (!isAdmin) {
            return res.status(403).json({ status: "failed", message: "You are not authorized to reject join requests" });
        }

        request.status = "rejected";
        await team.save();

        return res.status(200).json({ status: "success", message: "Join request rejected" });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message });
    }
};
