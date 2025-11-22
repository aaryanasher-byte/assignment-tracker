const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium'
    }
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
