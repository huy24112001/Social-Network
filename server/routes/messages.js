const router = require("express").Router();
const auth = require("../middleware/auth");
const Message = require("../models/Message");

// add
router.post("/", auth, async (req, res) => {
    const newMessage = new Message(req.body)
    newMessage.sender = req.user._id
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error)
    }
})


//get
router.get("/:conversationId", async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        }).populate({path: 'sender', select: '_id'});
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;