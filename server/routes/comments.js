const router = require("express").Router();
const Comment = require("../models/Comment")
const Post = require("../models/Post")
const auth = require("../middleware/auth")

// create comment
router.post('/create', auth, async(req, res) => {
    
    try {
        const post = await Post.findById(req.body.post)
        if(post) {
            const comment = new Comment({
                ...req.body, 
                user: req.user._id
            })

            await comment.save()
            post.comments.push(comment)
            await post.save()
            
            res.status(201).send({
                comment,
                username:req.user.username,
                avatarurl: req.user.avatarurl
            })
        } else {
            throw new Error()
        }
    } catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

// like a comment
router.put("/:postId/like/:commentId", auth ,async (req, res) => {
    try {
        const postId = req.params.postId
        const commentId = req.params.id
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

module.exports = router