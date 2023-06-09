const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    username:{
        type: String
    },
    status : {
        type : Boolean,
    },
    action: {
        type: String,
        require: true
    },
    userId2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    count: {
        type: Number,
        default: 0
    }

},{timestamps: true});

const  Notification = mongoose.model('Notification', Schema);

module.exports = Notification;