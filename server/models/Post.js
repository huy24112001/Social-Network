const mongoose = require("mongoose")
const { ObjectId } = mongoose.Types;

const PostSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    desc: {
        type: String,
        max: 500
    },
    img: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
    comments: [{
        type: ObjectId,
        ref: 'Comment'
    }],
}, {
    timestamps: true
}
) 

module.exports = mongoose.model("Post", PostSchema)