const express = require("express");
const { authenticate, authorize } = require("../middleware/authmiddleware");

const router = express.Router();

router.get("/user-dashboard", authenticate, authorize(["user", "mentor", "admin"]), (req, res) => {
    res.json({ message: "Welcome to the user dashboard" });
});

router.get("/mentor-dashboard", authenticate, authorize(["mentor", "admin"]), (req, res) => {
    res.json({ message: "Welcome to the mentor dashboard" });
});

router.get("/admin-dashboard", authenticate, authorize(["admin"]), (req, res) => {
    res.json({ message: "Welcome to the admin dashboard" });
});

module.exports = router;
