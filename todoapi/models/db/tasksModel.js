const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: false
    },
    dueDate: {
        type: Date,
        required: false
    },
    priority: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: ['want to do', 'doing it', 'done', 'have done some part', 'doing it later', 'do not want to do', 'do or die', 'do not know', 'do not care', 'do not want to do', 'do not want to do'],
        default: 'want to do'
    },
    relate: {
        projectId: {
            type: [String],
            required: false,
            ref: 'Projects'
        }
    },
    tags: {
        type: [String],
        required: [true, 'Tags are required'],
        default: ['untagged']
    },
    userId: {
        type: String,
        required: [true, 'User Id is required'],
        ref: 'User'
    }
}, {
    timestamps: true
});

const Tasks = mongoose.model('Tasks', tasksSchema);
module.exports = Tasks;