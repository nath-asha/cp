const express = require("express");
const { registerUser, loginUser } = require("../controllers/authcontroller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

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
