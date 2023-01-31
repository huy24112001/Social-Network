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
        // console.log(savedPost)
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// update a post
router.put("/:id", auth, async(req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)
        if (post.userId._id.equals(req.user._id)) {
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
router.delete("/:id", auth, async(req, res) => {
    try {
        // console.log(req.user._id)
        const postId = req.params.id
        const post = await Post.findById(postId)
        // console.log(post.userId.equals(req.user._id))
        if (post.userId.equals(req.user._id)) {
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
router.put("/:id/like", auth ,async (req, res) => {
    try {
        const postId = req.params.id
        const likerId = req.user._id
        // console.log(likerId)
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
router.get("/timeline/:userId", async (req,res) => {
    const userId = req.params.userId
    try {
        const currentUser = await User.findById(userId)
        // console.log(currentUser)
        const userPosts = await Post.find({userId: currentUser._id}).populate('userId').populate({path:'comments', populate: {
            path: 'user',
            select: ['username', 'profilePicture']
          } })
        // console.log(userPosts)
        // const userPosts = await Post.find({userId: userId})
        const friendPosts = await Promise.all(
            currentUser.friends.map((friendId) => {
                return Post.find({userId: friendId}).populate('userId').populate({path:'comments', populate: {
                    path: 'user',
                    select: ['username', 'profilePicture']
                  } })
            })
        )
        // console.log(friendPosts.length)
        // console.log(userPosts.length)

        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.status(500).json(error)
    }
})

//get user's all posts
router.get("/profile/:userId", async (req, res) => {
    // console.log(req.query.userId)
    try {
        const user = await User.findOne({ _id: req.params.userId });
        // console.log(user)
        const posts = await Post.find({ userId: user._id }).populate('userId').populate({path:'comments', populate: {
            path: 'user',
            select: ['username', 'profilePicture']
        } })
    //   const posts = await Post.find({ userId: user._id }).populate('userId').populate('comments').exec((err, comments) => {
    //     comments.map((comment) => console.log(comment))
    //   });
    //   posts.map((post) => {
    //     const comments = post.comments
    //     comments.map((comment) => {

    //     })
    //   })
        console.log(posts[1].comments)
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
