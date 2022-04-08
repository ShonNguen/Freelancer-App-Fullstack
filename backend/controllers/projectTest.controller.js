const asyncHandler = require('express-async-handler');
const fs = require('fs'); 

const Project = require('../models/projectModel');
const User = require('../models/userModel');

const postProject = asyncHandler(async (req, res) => {
    const { title, description, location } = req.body;

    if (!title || !description) {
        res.status(400);
        throw new Error('Please add all fields!');
    }

    if(images.length < 1) {
        res.status(400);
        throw new Error('You must select at least 1 file!');
    }

    let arrImageStr = []; 
    images.foreach(image => {
        let buff = fs.readFileSync(image);
        let base64data = buff.toString('base64');
        arrImageStr.push(base64data); 
    })

    const project = await Project.create({
        title, 
        description,
        location,
        arrImageStr, 
        user: req.user.id
    })

    res.status(201).json(job); 

})

module.exports = {
    postProject
}