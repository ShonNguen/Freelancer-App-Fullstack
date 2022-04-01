const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

// Sign up user
// POST api/users/
// public
const signupUser = asyncHandler(async (req, res) => {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username) {
        res.status(400);
        throw new Error('Please add all fields!');
    }

    const doesUserExists = await User.findOne({ email });
    if (doesUserExists || (await User.findOne({ username }))) {
        res.status(400);
        throw new Error('User already exists');
    }

    const newUser = await User.create({
        name,
        email,
        password,
        username
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
    if (user && password === user.password) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
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
    const { _id, name, username, email } = await User.findById(req.user.id); 

    res.status(200).json({
        id: _id, 
        name,
        email,
        username
    })
});

//generate JWT 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

module.exports = {
    signupUser,
    loginUser,
    getUser
};