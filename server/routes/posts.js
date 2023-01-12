const router = require("express").Router();
const auth = require("../middleware/auth")
const Post = require("../models/Post")
const User = require("../models/User")

const mongoose = require('mongoose');


// create a post
router.post('/', auth, async (req, res) => {
    // console.log(req.user)
    try {
        const newPost = new Post(req.body)
        const savedPost = await newPost.save()
        console.log(savedPost)
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// update a post
router.put("/:id", async(req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)
        if (post.userId == req.body.userId) {
            await post.updateOne({
                $set: req.body
            })
            res.status(200).json("The post has been updated.")
        } else{
            return res.status(403).json("you can update your post only.")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete a post
router.delete("/:id", async(req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("The post has been deleted.")
        } else{
            return res.status(403).json("you can delete your post only.")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// like a post
router.put("/:id/like", async (req, res) => {
    try {
        const postId = req.params.id
        const likerId = req.body.userId
        const post = await Post.findById(postId)
        if(!post.likes.includes(likerId)) {
            await post.updateOne({
                $push: {likes: likerId}
            })
            res.status(200).json("The post has been liked")
        } else {
            await post.updateOne({
                $pull: {likes: likerId}
            })
            res.status(200).json("The post has been disliked")
        }
    } catch (error) {
        res.status(500).json(err)

    }
})


// get a post
router.get("/:id", async(req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})
// get timeline posts
router.get("/timeline/all", async (req,res) => {
    const userId = req.body.userId
    try {
        const currentUser = await User.findById(userId)
        // console.log(currentUser)
        const userPosts = await Post.find({userId: currentUser._id})
        console.log(userPosts)
        // const userPosts = await Post.find({userId: userId})
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({userId: friendId})
            })
        )
        console.log(friendPosts)
        res.json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.status(500).json(error)
    }
})

//get user's all posts
router.get("/profile/:userId", async (req, res) => {
    try {
      const user = await User.findOne({ userId: req.params.userId });
      const posts = await Post.find({ userId: user._id }).populate('userId').populate('comments');
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/', (req, res) => {
    console.log("post page")
    res.send("Post page")
})

module.exports = router
