const upload = require("../middleware/project.middleware");
const MongoClient = require("mongodb").MongoClient;
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const mongoClient = new MongoClient(process.env.MONGO_URI);

const Project = require('../models/projectModel');
const User = require('../models/userModel');

const asyncHandler = require('express-async-handler');
const { json } = require("body-parser");



// POST, route - '/'
const postProject = asyncHandler(async (req, res) => {
    try {
        await upload(req, res); 


        if (req.files.length <= 0) {
            return res
                .status(400)
                .send({ message: "You must select at least 1 file." });
        }

        // make a new project object; 
        const { title, description, location } = req.body;
        const images = []
        req.files.map(file => {
            images.push(file.filename);
        })
        console.log(images)

        const project = await Project.create({
            title,
            description,
            location,
            images,
            user: req.user.id
        })

        return res.status(200).send(project);

    } catch (error) {
        console.log(error);

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).send({
                message: "Too many files to upload.",
            });
        }
        return res.status(500).send({
            message: `Error when trying upload many files: ${error}`,
        });
    }
});

let gfs;
let gridfsBucket; 
const conn = mongoose.createConnection(process.env.MONGO_URI);
conn.once('open', () => {
    // Init stream
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'projects'
    })
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('projects');
});

//get all projects as json 
const getAllProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find();
    res.status(200).json(projects);
});

const getProjects = async (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            })
        }

        return res.json(files);
    });
};


const deleteProject = async (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'projects' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        }
    });
}

const getImage = asyncHandler(async (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        // File exists
        const readStream = gridfsBucket.openDownloadStream(file.id)
        // const readStream = gridfsBucket.createReadStream(file.filename); 
        readStream.pipe(res); 

    });
}); 

module.exports = {
    postProject,
    getAllProjects,
    getProjects,
    deleteProject,
    getImage
};