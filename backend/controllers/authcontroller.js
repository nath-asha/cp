const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, role, team, address, organization, description, skills, github_url, linkedin_url, twitter_url, USN } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword, 
            phone,
            role,
            team,
            address,
            organization,
            description,
            skills,
            github_url,
            linkedin_url,
            twitter_url,
            USN
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).json({ message: "Error registering user" });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing credentials" });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ success: true, message: "Login successful", token, user });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
// const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.registerUser = async (req, res) => {
//     try {
//         const { firstName, lastName, email, password, phone,role,team,address,organization,description,skills,github_url,linkedin_url,twitter_url,USN } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({ firstName, lastName, email, password, phone,role,team,address,organization,description,skills,github_url,linkedin_url,twitter_url,USN });
//         await newUser.save();

//         res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//         res.status(400).json({ message: "Error registering user" });
//     }
// };

// exports.loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
        
//         if (!email || !password) {
//             return res.status(400).json({ success: false, message: "Missing credentials" });
//         }
        
//         // Example user authentication logic
//         const user = await User.findOne({ email });
//         if (!user || user.password !== password) {
//             return res.status(401).json({ success: false, message: "Invalid credentials" });
//         }

//         res.json({ success: true, message: "Login successful", user });
//     } catch (error) {
//         console.error("Login error:", error);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };
// // exports.loginUser1 = async (req, res) => {
// //     const { email, password } = req.body;
// //     const user = await User.findOne({ email });

// //     if (!user || !(await bcrypt.compare(password, user.password))) {
// //         return res.status(400).json({ message: "Invalid credentials" });
// //     }

// //     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
// //     res.json({ token, role: user.role });
// // };
