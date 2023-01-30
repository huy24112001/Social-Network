const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")


router.put("/update-profile", async(req,res) => {
    console.log(req.body)
    const newProfile = req.body.params
        try {
            const user = await User.findByIdAndUpdate(newProfile.idProfile, {
                $set: newProfile.update_Profile
            })
            // console.log('huy he huoc')
            console.log(user)
            res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(error)
        }

})







// update user
router.put("/:id", async(req,res) => {
    const id = req.params.id
    if (req.body.userId === id || req.body.isAdmin) {
        if (req.body.password){
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)

            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            res.status(200).json("Account has been updated")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        res.status(403).json("you can only update your account.")
    }

})
// delete user
router.delete("/:id", async(req,res) => {
    const id = req.params.id
    if (req.body.userId === id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(id)
            res.status(200).json("Account has been deleted")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        res.status(403).json("you can only delete your account.")
    }

})
// get a user
router.get("/:id", async(req,res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        const {password, updatedAt, ...other} = user._doc
        res.status(200).json(other)
    } catch (error) {
        return res.status(500).json(error)
    }


})

//get friends
router.get("/friends/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.friends.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
});

// follow a user
router.put("/:id/follow", async (req, res) => {
    const userId = req.params.id
    const followId = req.body.userId
    if (req.body.userId !== userId) {
        try {
            const user = await User.findById(userId)
            const currentUser = await User.findById(followId)
            if (!user.followers.includes(followId)){
                await user.updateOne({
                    $push: {followers: followId}
                })
                await currentUser.updateOne({
                    $push: {followings: userId}
                })
                res.status(200).json("User has been followed")
            } else {
                res.status(403).json("You already followed this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("you can't follow yourself")
    }
})

// unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    const userId = req.params.id
    const followId = req.body.userId
    if (req.body.userId !== userId) {
        try {
            const user = await User.findById(userId)
            const currentUser = await User.findById(followId)
            if (user.followers.includes(followId)){
                await user.updateOne({
                    $pull: {followers: followId}
                })
                await currentUser.updateOne({
                    $pull: {followings: userId}
                })
                res.status(200).json("User has been unfollowed")
            } else {
                res.status(403).json("You haven't followed this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("you can't unfollow yourself")
    }
})

router.get("/", (req, res) => {
    res.send("Homepage")
})

module.exports = router
