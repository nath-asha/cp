const express = require("express");
const { authenticate, authorize } = require("../middleware/authmiddleware");

const router = express.Router();

// Public Route (No Authentication Needed)
router.get("/public", (req, res) => {
    res.json({ message: "Public Route - No Authentication Required" });
});

// Protected Route (Authentication Required)
router.get("/protected", authenticate, (req, res) => {
    res.json({ message: "Protected Route - Authenticated User", user: req.user });
});

// Admin-Only Route (Authentication + Authorization Required)
router.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
    res.json({ message: "Admin-Only Route - Authorized User", user: req.user });
});

module.exports = router;
