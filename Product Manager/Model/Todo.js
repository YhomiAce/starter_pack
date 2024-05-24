const mongoose = require('mongoose');

let TodoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    completeDate: {
        type: Date
    },
    progress: {
        type: String,
        enum: ["untouched", "in progress", "completed"],
        default: "untouched"
    }
});
module.exports = mongoose.model('Todo', TodoSchema);