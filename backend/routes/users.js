const router = require("express").Router();
const User=require("../models/User")
const bcrypt = require('bcrypt');
const saltRounds = 10;

//register
router.post("/register",async(req,res)=>{
    try {
        //generate a new password 
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);

        //create new user 
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })
        //save user and send res
        const user=await newUser.save();
        res.status(200).json(user._id);
    } catch (error) {
        res.status(500).json(error);
    }
})


//login 
router.post("/login", async (req, res) => {
    try {
      //find user
      const user = await User.findOne({ username: req.body.username });
      // If user doesn't exist, send an error response and return from the function
      if (!user) {
        return res.status(400).json("Wrong username or password");
      }
  
      //validate password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      // If password is invalid, send an error response and return from the function
      if (!validPassword) {
        return res.status(400).json("Wrong username or password");
      }
  
      //send response
      res.status(200).json({ _id: user._id, username: user.username });
    } catch (err) {
      // Handle any errors
      res.status(500).json(err);
    }
})


module.exports=router;