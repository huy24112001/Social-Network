const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },  
    likes: {
        type: Array,
        default: []
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },

},{timestamps: true});



// const Comment = mongoose.model('Comment', Schema);

module.exports = mongoose.model("Comment", CommentSchema);