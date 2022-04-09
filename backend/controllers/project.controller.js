const upload = require("../middleware/project.middleware");
const MongoClient = require("mongodb").MongoClient;
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const mongoClient = new MongoClient(process.env.MONGO_URI);

const Project = require('../models/projectModel'); 
const User = require('../models/userModel');


// POST, route - '/'
const postProject = async (req, res) => {
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
};

let gfs;
const conn = mongoose.createConnection(process.env.MONGO_URI);
conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('projects');
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

module.exports = {
    postProject,
    getProjects,
    deleteProject
};