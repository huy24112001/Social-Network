const mongoose = require("mongoose")
const { ObjectId } = mongoose.Types;

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: ObjectId,
        ref: "Conversation"
    },
    sender: {
        type: ObjectId,
        ref: "User"
    },
    text: {
        type: String
    },
    audio: {
        type: String
    }
}, {
    timestamps: true
}
) 

module.exports = mongoose.model("Message", MessageSchema)