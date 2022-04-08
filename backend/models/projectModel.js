const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'
    },
    title: {
        type: String, 
        required: [true, 'Please add a title value']
    },
    description: {
        type: String, 
        required: [true, 'Please add a description']
    },
    location: {
        type: String, 
        required: [true, 'Please add a location']
    },
    images: {
        type: [String], 
        required: [true, 'Please add a images count']
    },
}, {
    timestamps: true, 
})

module.exports = mongoose.model('Project', projectSchema); 