const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User=require('../models/User');
const authenticate = require('../middleware/authenticate');
router.post('/register', async (req, res) => {
    // Extract user registration data from the request body
    let { name, email, password } = req.body;

    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(201).json({ msg: "User already Exists" });
    }
    let salt = await bcrypt.genSalt(10); // salt is actually encrypted password
    password = await bcrypt.hash(password, salt); //password=salt
    const newUser=new User({
      name:name,
      email:email,
      password:password
    })
    await newUser.save();

    // Validate the user registration data
    // Perform necessary checks, such as checking for existing users, password strength, etc.
    
    // If the registration data is valid, proceed with user creation
    // Create a new user record in the database
    
    // Send a success response
    res.status(200).json({ message: 'User registered successfully!' });
  });

  router.post('/login', async (req, res) => {
    // Extract user login data from the request body
    
    
    const { email, password } = req.body;
    let user= await User.findOne({email: email});
        if(!user)return res.status(201).json({msg: "User Doesn't exist"});
        let match=await bcrypt.compare(password, user.password);
        if(!match)return res.status(201).json({msg: " Invalid Credentials "});
        let payload={
          user:
          {
          id:user.id,
          name:user.name
      }
      }
      jwt.sign(payload, process.env.JWSToken, (err, token)=>{
          if(err)throw err;
          res.status(200).json({msg:"Login is success", token:token});
      });
    // Validate the user login data
    // Perform necessary checks, such as verifying the email and password against the database
    
    // If the login data is valid, generate a JWT (JSON Web Token)
    // Sign the token with a secret key and include relevant user information
    
    // Send the JWT as a response
    // res.status(200).json({ token: 'your_generated_jwt_token' });
  });

  router.get('/me', authenticate, async(req, res)=>{
    try {
      let user=await User.findById(req.user.id).select("-password");
      console.log(user)
      return res.status(200).json({user});
  } catch (err) {
      console.log(err);
      res.status(500).json({err: err});
  }
  })


  module.exports = router;