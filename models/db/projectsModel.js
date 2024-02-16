const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    color: {
        type: String,
        required: [true, 'Color is required']
    },
    tags: {
        type: [String],
        required: [true, 'Tags are required']
    },
    categoryIds: {
        type: [String],
        required: [true, 'Category Ids are required'],
        ref: 'Catagories'
    },
    dueDate: {
        type: Date,
        required: [true, 'Due Date is required']
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: ['want to do', 'doing it', 'done', 'have done some part', 'doing it later', 'do not want to do', 'do or die']
    },
    priority: {
        type: String,
        required: [true, 'Priority is required'],
        enum: ['high', 'medium', 'low']
    }
}, {
    timestamps: true
});

const Projects = mongoose.model('Projects', projectsSchema);
module.exports = Projects;