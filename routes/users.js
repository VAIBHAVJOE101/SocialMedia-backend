const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

//update user
router.put('/:id', async (req, res) => {
      if (req.body.userId === req.params.id || req.body.isAdmin) {
            if (req.body.password) {
                  try {
                        const salt = await bcrypt.genSalt(10);
                        req.body.password = await bcrypt.hash(req.body.password, salt);
                  } catch (err) {
                        res.status(500).json(err);
                  }

            }
            try {

                  const user = await User.findByIdAndUpdate(req.body.userId,
                        {
                              $set: req.body
                        }
                  );

                  res.status(200).json("Account Updated");
            } catch (err) {
                  res.status(500).json(err);
            }
      } else {
            res.status(500).json("You can only change your account!");
      }
})

//delete users
router.delete('/:id', async (req, res) => {
      if (req.body.userId === req.params.id || req.body.isAdmin) {
            try {
                  const user = await User.findByIdAndDelete(req.body.userId);
                  res.status(200).json("Account delted");
            } catch (err) {
                  res.status(500).json(err);
            }
      } else {
            res.status(500).json("You can only delete your account!");
      }
})

//get a user
router.get('/:id', async (req, res) => {
      try {
            const user = await User.findById(req.params.id);
            const { password, updatedAt, ...others } = user._doc;
            res.status(200).json(others);
      } catch (err) {
            res.status(500).json(err);
      }
})

//follow a user 
router.put("/:id/follow", async (req, res) => {
      if (req.body.userId !== req.params.id) {
            try {
                  const user = await User.findById(req.params.id);
                  const currentUser = await User.findById(req.body.userId);
                  if (!user.followers.includes(req.body.userId)) {
                        await user.updateOne({ $push: { followers: currentUser.id } });
                        await currentUser.updateOne({ $push: { followings: user.id } });
                        res.status(200).json("User has been followed");
                  }
                  else{
                        res.status(403).json("You already follow this user");
                  }
            } catch(err) {
                  res.status(500).json(err);
            }
      }
      else {
            res.status(500).json("You cant follow yourself");
      }
})

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
      if (req.body.userId !== req.params.id) {
            try {
                  const user = await User.findById(req.params.id);
                  const currentUser = await User.findById(req.body.userId);
                  if (user.followers.includes(req.body.userId)) {
                        await user.updateOne({ $pull: { followers: currentUser.id } });
                        await currentUser.updateOne({ $pull: { followings: user.id } });
                        res.status(200).json("User has been unfollowed");
                  }
                  else{
                        res.status(403).json("You dont follow this user");
                  }
            } catch(err) {
                  res.status(500).json(err);
            }
      }
      else {
            res.status(500).json("You cant unfollow yourself");
      }
})


module.exports = router;