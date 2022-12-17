const router = require("express").Router();
const Comment = require("../models/Comment")
const Post = require("../models/Post")
const auth = require("../middleware/auth")

// create comment
router.post('/create', auth, async(req, res) => {
    
    try {
        const post = await Post.findById(req.body.postId)
        if(post) {
            const comment = new Comment({
                ...req.body, 
                userId: req.user._id
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

module.exports = router