const User = require("../models/userModel");
const signeduser = require("../models/signupmodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const {Oauth2Client} = require("google-auth-library");


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

        const token = jwt.sign({ id: user._id, email: user.email, role:user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ success: true, message: "Login successful", token, user });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing credentials" });
        }
        
        const user = await signeduser.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, email: user.email, role:user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ success: true, message: "Login successful", token, user });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.googlesignin = async (req,res) => {
    try {
        const {cred} =req.body;
        if(!cred){
            return res.status(400).json({success: false,message: "Missing credentials"});
        }
        const user = await this.googlesignin.findOne({cred});
        if(!user){
            return res.status(401).json({success: false, message:"Invalid user"});
        }
        const isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch) {
            return res.status(401).json({success: false,message:"invalid"});
        }
        const token = jwt.sign({id: user._id, email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn:"1d"});
        res.json({success: true, message: "Signin successful",token,user});
    } catch (error) {
        console.error("Sign in error");
        res.status(500).json({success: false, message: "Server error"});
    }
}
exports.googlesignup = async (req,res) => {
    try {
        const {name,email} = req.body;
    
        const newGsign = new signeduser({
            name,
            email,
            
            role: 'user',
        });
        await newGsign.save();
        res.status(201).json({message:"Google sign up successful"});
        } catch (error) {
            console.error("error signing up")
    }
};
exports.signedupUser = async (req,res) => {
    try {
        const {name,email,role,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new signeduser({
            name,
            email,
            password: hashedPassword,
            role,
        });
        await newUser.save();
        res.status(201).json({message: "User signed up successfully"});
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).json({message: "Error signing up user"});
    }
};


exports.profileUser = async (req, res) => {
    try {
        const { firstName, lastName, phone, role, team, organization, description, skills, github_url, linkedin_url, twitter_url, USN } = req.body;
        const newUser = new signeduser({
            firstName,
            lastName,
            phone,
            role,
            team,
            organization,
            description,
            skills,
            github_url,
            linkedin_url,
            twitter_url,
            USN
        });

        await newUser.save();
        res.status(201).json({ message: "Profile completed successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).json({ message: "Error completing profile" });
    }
};



// const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// require("dotenv").config(); 
// // Register a new user
// exports.registerUser = async (req, res) => {
//   const {
//     firstName,
//     lastName,
//     email,
//     password,
//     phone,
//     role,
//     team,
//     address,
//     organization,
//     description,
//     skills,
//     github_url,
//     linkedin_url,
//     twitter_url,
//     USN,
//   } = req.body;

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Generate a unique token for email verification
//     const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

//     // Create a new user
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       phone,
//       role,
//       team,
//       address,
//       organization,
//       description,
//       skills,
//       github_url,
//       linkedin_url,
//       twitter_url,
//       USN,
//       verified: false, // Initially set verified to false
//       verificationToken,
//     });

//     await newUser.save();

//     // Configure the email transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL, // Use email from .env
//         pass: process.env.EMAIL_PASSWORD, // Use password from .env
//       },
//     });

//     // Email content
//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: email,
//       subject: "Verify your email",
//       text: `Click this link to verify your email: http://localhost:5000/api/auth/verify/${verificationToken}`,
//     };

//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error("Error sending email:", error);
//         return res.status(500).json({ message: "Failed to send verification email" });
//       } else {
//         console.log("Email sent: " + info.response);
//         res.status(201).json({ message: "User registered successfully. Please verify your email." });
//       }
//     });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Verify email
// exports.verifyEmail = async (req, res) => {
//   const { token } = req.params;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ email: decoded.email });

//     if (!user) {
//       return res.status(404).json({ message: "Invalid or expired token" });
//     }

//     user.verified = true;
//     user.verificationToken = null; // Clear the token after verification
//     await user.save();

//     res.status(200).json({ message: "Email verified successfully" });
//   } catch (error) {
//     console.error("Error verifying email:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // Login user
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     if (!user.verified) {
//       return res.status(403).json({ message: "Please verify your email before logging in" });
//     }

//     const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

//     res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Error logging in user:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };



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
