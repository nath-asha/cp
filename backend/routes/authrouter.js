const express = require("express");
const cors = require('cors');
const bodyparser = require('body-parser');
const { registerUser, loginUser, signedupUser,profileUser,signinUser,googlesignin,googlesignup } = require("../controllers/authcontroller");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser); //do not change to /logino 
// router.get("/verify/:token", verifyEmail); // Added route for email verification

router.post("/signedup", signedupUser);
//this is for sign up and later sign up with google

router.post("/profilesignup", profileUser);
router.post("/googlesignup", googlesignup);
router.post("/googlesignin", googlesignin);
router.post("/signinuser", signinUser);

const verifyToken = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.sendStatus(401);

    try {
        req.user = jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
        next();
    } catch {
        res.sendStatus(403);
    }
};

const requireRole = (role) => (req, res, next) => {
    if (req.user.role !== role) return res.sendStatus(403);
    next();
};

router.get("/admin", verifyToken, requireRole("admin"), (req, res) => {
    res.send("Admin in");
});

module.exports = router;

// const express = require("express");
// const { registerUser, loginUser } = require("../controllers/authcontroller");
// const { registerMentor, loginMentor } = require("../controllers/mentorController");
// const { registerAdmin, loginAdmin } = require("../controllers/adminController");

// const router = express.Router();

// // Users
// router.post("/register", registerUser);
// router.post("/login", loginUser);

// //Mentors
// router.post("/mentor/register", registerMentor);
// router.post("/mentor/login", loginMentor);

// // Admins
// router.post("/admin/register", registerAdmin);
// router.post("/admin/login", loginAdmin);

// module.exports = router;
