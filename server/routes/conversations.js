const router = require("express").Router();
const Conversation = require("../models/Conversation")
const auth = require("../middleware/auth");

// new conversation
router.post('/', auth, async (req, res) => {
    const sender = req.user
    const newConversation = new Conversation({
        members: [sender._id, req.body.receiverId]
    })
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/active/:conversationId', async (req, res) => {
    try {
        const conversationId = req.params.conversationId
        const update = {isActive: true}
        const conversation = await Conversation.findOneAndUpdate({_id: conversationId}, update, {new: true})
        // res.status(200).json("The post has been updated.")
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get conversation
router.get('/:conversationId', async (req, res) => {
    try {
        const conversationId = req.params.conversationId
        const conversation = await Conversation.findById(conversationId).populate({path:'members', select: ['username', 'profilePicture']})
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get conversations from a user
router.get("/user/:userId", async(req, res) => {
    try {
        const conversations = await Conversation.find({
            members:{
                $in: [req.params.userId]
            }
        }).populate({path:'members', select: ['username', 'profilePicture']})
        res.status(200).json(conversations)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get conversation from 2 users
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: {
                $all: [req.params.firstUserId, req.params.secondUserId]
            }
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router