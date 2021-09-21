const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

//register
router.post('/register' , async (req,res) => {
      try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password , salt);

            const newUser = new User({
                  username: req.body.username ,
                  password: hashedPassword,
                  email: req.body.email,
            }) ;

            const user = await newUser.save();
            res.status(200).json(user);

      }catch(err){
            res.status(500).json(err);
      }
})

//login
router.post('/login' , async (req,res) => {
      try{
           const user = await User.findOne({email: req.body.email});
           !user && res.status(500).json("User not found");

           const validPassword = await bcrypt.compare(req.body.password , user.password);
           !validPassword && res.status(500).json("Wrong Password");

           res.status(200).json(user);

      }catch(err){
            res.status(500).json(err);
      }
})

module.exports = router;