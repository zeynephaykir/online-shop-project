const mongoose = require('mongoose');

//---Creates a schema for inserting into mongodb document---
const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    isApproved: {
        type: Boolean,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
});

//---Model, shows which document will the data inserted. And shows which schema will be used---
const Comment = mongoose.model('comments-ratings', commentSchema);

module.exports = Comment;
