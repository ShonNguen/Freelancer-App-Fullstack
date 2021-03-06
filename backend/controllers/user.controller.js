const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find(); 

    res.status(200).json(users);
});

// Sign up user
// POST api/users/
// public
const signupUser = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        username,
        password,
        userGender,
        userRole
    } = req.body;

    if (!email || !password || !username) {
        res.status(400);
        throw new Error('Please add all fields!');
    }

    const doesUserExists = await User.findOne({ email });
    if (doesUserExists || (await User.findOne({ username }))) {
        res.status(400);
        throw new Error('User already exists');
    }

    const newUser = await User.create({
        firstName,
        lastName,
        email,
        username,
        password,
        userGender,
        userRole
    });

    if (newUser) {
        res.status(201).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            username: newUser.username,
            token: generateToken(newUser.id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data!')
    }
});

// Sign up user
// POST api/users/login
// public
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (user && user.password === password) {
        res.json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            userRole: user.userRole,
            token: generateToken(user.id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid credential!');
    }
});

// Get user data
// GET api/users/login/me
// private
const getUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

//generate JWT 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

module.exports = {
    getAllUsers,
    signupUser,
    loginUser,
    getUser
};