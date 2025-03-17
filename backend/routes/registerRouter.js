// const express = require('express');
// const bcrypt = require('bcrypt'); 
// const User = require('../models/userModel'); 

// const router = express.Router();

// router.post('/register', async (req, res) => {

//   const { email, password } = req.body;

//   const hashedPassword = await bcrypt.hash(password, 10); 
//   const newUser = new User({ email, password: hashedPassword });

//   await newUser.save();

//   res.status(201).json({ message: 'User registered successfully' });
// });



// module.exports = router;
