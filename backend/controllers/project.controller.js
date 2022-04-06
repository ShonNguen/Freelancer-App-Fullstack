const asyncHandler = require('express-async-handler');

const Project = require('../models/projectModel');
const User = require('../models/userModel');

const postProject = asyncHandler(async (req, res) => {
    const { title, description, images } = req.body;

    if (!title || !description) {
        res.status(400);
        throw new Error('Please add all fields!');
    }

    if(images.length < 1) {
        res.status(400);
        throw new Error('You must select at least 1 file!');
    }

    const project = await Project.create({
        title, 
        description,
        images, 
        user: req.user.id
    })

    res.status(201).json(job); 

})

module.exports = {
    postProject
}