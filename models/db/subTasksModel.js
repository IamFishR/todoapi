const mongoose = require('mongoose');

const subTasksSchema = new mongoose.Schema({
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
    todoId: {
        type: String,
        required: [true, 'Todo Id is required']
    }
}, {
    timestamps: true
});

const SubTasks = mongoose.model('SubTasks', subTasksSchema);
module.exports = SubTasks;