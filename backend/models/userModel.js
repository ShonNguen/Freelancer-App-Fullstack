const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String, 
        required: [true, 'Please add a name']
    },
    lastName: {
        type: String, 
        required: [true, 'Please add a name']
    },
    email: {
        type: String, 
        required: [true, 'Please add an email'],
        unique: true
    },
    username: {
        type: String, 
        required: [true, 'Please add a username'],
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'Please add a password']
    },
    userGender: {
        type: String, 
        required: [true]
    },
    userRole: {
        type: String, 
        required: [true]
    },

}, {
    timestamps: true, 
})

module.exports = mongoose.model('User', userSchema);