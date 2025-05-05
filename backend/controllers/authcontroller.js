const User = require("../models/userModel");
const signeduser = require("../models/signupmodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {OAuth2Client} = require('google-auth-library');
const bodyParser = require('body-parser');
// const cors = require('cors');
// const bodyparser = require('body-parser');
const client = new OAuth2Client(process.env.CLIENT_ID);

// exports.googleAuth = async (req, res) => {
//     const { credential } = req.body;

//     try {
//         // Verify the ID token using Google's OAuth2Client
//         const ticket = await client.verifyIdToken({
//             idToken: credential,
//             audience: process.env.CLIENT_ID, // Replace with your Google Client ID
//         });

//         // Extract user information from the verified token
//         const payload = ticket.getPayload();
//         const { email, name, picture } = payload;

//         // Check if the user exists in the database
//         let user = await User.findOne({ email });

//         if (!user) {
//             // If the user doesn't exist, create a new user
//             user = new User({
//                 email,
//                 name,
//                 picture,
//                 role: 'user', // Default role
//             });
//             await user.save();
//         }

//         // Generate a JWT for the application
//         const token = jwt.sign(
//             { id: user._id, email: user.email, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: "1d" }
//         );

//         // Send the token and user information back to the client
//         res.json({ success: true, token, user });
//     } catch (error) {
//         console.error("Error during Google authentication:", error);
//         res.status(400).json({ success: false, message: "Invalid Google ID token" });
//     }
// };
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
    // try {
    //     const { email, password } = req.body;
        
    //     if (!email || !password) {
    //         return res.status(400).json({ success: false, message: "Missing credentials" });
    //     }
        
    //     const user = await User.findOne({ email });
    //     if (!user) {
    //         return res.status(401).json({ success: false, message: "Invalid credentials" });
    //     }

    //     const isMatch = await bcrypt.compare(password, user.password);
    //     if (!isMatch) {
    //         return res.status(401).json({ success: false, message: "Invalid credentials" });
    //     }

    //     const token = jwt.sign({ id: user._id, email: user.email, role:user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    //     res.json({ success: true, message: "Login successful", token, user });
    // } catch (error) {
    //     console.error("Login error:", error);
    //     res.status(500).json({ success: false, message: "Server error" });
    // }
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                picture: user.picture,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("Login Error:", err);
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
// exports.googlesignin = async (req,res) => {
//     try {
//         const {cred} =req.body;
//         if(!cred){
//             return res.status(400).json({success: false,message: "Missing credentials"});
//         }
//         const user = await this.googlesignin.findOne({cred});
//         if(!user){
//             return res.status(401).json({success: false, message:"Invalid user"});
//         }
//         const isMatch =await bcrypt.compare(password,user.password);
//         if(!isMatch) {
//             return res.status(401).json({success: false,message:"invalid"});
//         }
//         const token = jwt.sign({id: user._id, email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn:"1d"});
//         res.json({success: true, message: "Signin successful",token,user});
//     } catch (error) {
//         console.error("Sign in error");
//         res.status(500).json({success: false, message: "Server error"});
//     }
// }


exports.googlesignin = async (req, res) => {
    const { name, email,id } = req.body;
//this id is received from cred res through google
    try {
        let user = await signeduser.findOne({ email });

        if (!user) {
            // user = await signeduser.create({ name, email, picture, role: "user" });
            // return res.send("user not found please signup first")
            return res.status(404).json({ success: false, message: "User not found. Please sign up first." });
        }

        const token = jwt.sign({ id: user.id, role: user.role, email :user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({
            success: true,
            token,
            user: { name: user.name, email: user.email, role: user.role,id: user.id },
        });
    } catch (err) {
        console.error("Google signup error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.gsigninlatest = async (req, res) => {
//     const { name, email,id } = req.body;
// //this id is received from cred res through google
//     try {
//         let user = await signeduser.findOne({ email });

//         if (!user) {
//             // user = await signeduser.create({ name, email, picture, role: "user" });
//             // return res.send("user not found please signup first")
//             return res.status(404).json({ success: false, message: "New User sign up first." });
//             const newGsign = new signeduser({ name, email, role: "user" });
//             await newGsign.save();
//         }
//         res.status(201).json({ message: "Google sign-up successful" });

//         const token = jwt.sign({ id: user.id, role: user.role, email :user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

//         res.json({
//             success: true,
//             token,
//             user: { name: user.name, email: user.email, role: user.role,id: user.id },
//         });
//     } catch (err) {
//         console.error("Google signup error:", err);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
const { credential } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        let user = await User.findOne({ email });

        if (!user) {
            // Create a new user if not found
            user = await User.create({
                email,
                name,
                picture,
                role: "user", // Default role
            });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                picture: user.picture,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("Google Sign-In Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

//latest on 29 april
// exports.googlesignin = async (req,res) => {
//     const { credential } = req.body;

//     try {
//         const ticket = await client.verifyIdToken({
//             idToken: credential,
//             audience: process.env.CLIENT_ID,
//         });

//         const payload = ticket.getPayload();
//         const { email, name, picture } = payload;

//         const user = { email, name, picture }; 
//         console.log(user)
//         res.json({ success: true, user, token: 'example-jwt-token' });
//     } catch (err) {
//         console.error('Error verifying Google ID token:', err);
//         res.status(400).json({ success: false, message: 'Invalid Google ID token' });
//     }

// }
exports.googlesignup = async (req, res) => {
    try {
        const { name, email } = req.body;

        const existingUser = await signeduser.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const newGsign = new signeduser({ name, email, role: "user" });
        await newGsign.save();

        res.status(201).json({ message: "Google sign-up successful" });
    } catch (error) {
        console.error("Error signing up", error);
        res.status(400).json({ message: "Error signing up user" });
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
            //email,
            // role,
            // team,
            organization,
            description,
            skills,
            github_url,
            linkedin_url,
            twitter_url,
            USN
        });

        await signeduser.updateOne({ email: req.body.email }, { $set: { ...req.body } });
        // await newUser.save();
        res.status(201).json({ message: "Profile completed successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).json({ message: "Error completing profile" });
    }
};

// exports.jwtverify = async (req, res) => {
//     try {
//         const { client_id, jwtToken } = req.body;

//         if (!client_id || !jwtToken) {
//             return res.status(400).json({ success: false, message: "Missing client_id or jwtToken" });
//         }

//         const client = new OAuth2Client(client_id);

//         // Verify and decode the JWT token
//         const ticket = await client.verifyIdToken({
//             idToken: jwtToken,
//             audience: client_id,
//         });

//         // Extract the payload containing user information
//         const payload = ticket.getPayload();

//         // Return the payload as a response
//         res.status(200).json({ success: true, payload });
//     } catch (error) {
//         console.error("JWT verification error:", error);
//         res.status(500).json({ success: false, message: "Error verifying JWT token" });
//     }
// };

// async function verify() {
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.CLIENT_ID,
//     });
//     const payload = ticket.getPayload();
//     const userid = payload['sub'];
//     // If the request specified a Google Workspace domain:
//     // const domain = payload['hd'];
//   }
//   verify().catch(console.error);



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
