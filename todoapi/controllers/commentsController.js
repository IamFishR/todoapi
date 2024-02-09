const Comments = require('../models/db/commentsModel');

class CommentsController {
    constructor() {

    }

    async getComments(req, res) {
        try {
            const comments = await Comments.find({ refId: req.params.id });
            res.status(200).json({
                status: 'success',
                data: {
                    comments
                }
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail',
                message: error
            });
        }
    }

    async createComment(req, res) {
        try {
            const comment = await Comments.create(req.body);
            res.status(201).json({
                status: 'success',
                data: {
                    comment
                }
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail',
                message: error
            });
        }
    }

    async updateComment(req, res) {
        try {
            const newComment = {
                comment: req.body.comment,
                userInfo: req.body.userInfo,
                updatedAt: new Date()
            }
            const comment = await Comments.findByIdAndUpdate(req.params.id, newComment, { new: true });
            res.status(200).json({
                status: 'success',
                data: {
                    comment
                }
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail',
                message: error
            });
        }
    }

    async deleteComment(req, res) {
        try {
            await Comments.findByIdAndDelete(req.params.id);
            res.status(204).json({
                status: 'success',
                data: null
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail',
                message: error
            });
        }
    }
}

module.exports = new CommentsController();