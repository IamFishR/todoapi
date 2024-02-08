const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    refId: {
        type: String,
        required: [true, 'Reference Id is required']
    },
    comments: {
        type: [{
            comment: {
                type: String,
                required: [true, 'Comment is required']
            },
            userInfo: {
                userId: {
                    type: String,
                    required: [true, 'User Id is required']
                },
                username: {
                    type: String,
                    required: [true, 'Username is required']
                }
            },
            createdAt: {
                type: Date,
                required: [true, 'Created At is required']
            },
            updatedAt: {
                type: Date,
                required: [true, 'Updated At is required']
            }
        }],
        required: [true, 'Comments are required']
    },
    otherInfo: {
        ispinned: {
            type: Boolean,
            required: false
        }
    }
})

const Comments = mongoose.model('Comments', commentsSchema);
module.exports = Comments;