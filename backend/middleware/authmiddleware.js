const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const authHeader = req.header("Authorization");

    // Check if Authorization header is missing
    if (!authHeader) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    try {
        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

const authorize = (roles = []) => (req, res, next) => {
    if (!req.user || !req.user.role) {
        return res.status(403).json({ message: "Access Forbidden. No role assigned." });
    }

    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access Forbidden. Insufficient permissions." });
    }

    next();
};

module.exports = { authenticate, authorize };
