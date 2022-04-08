const upload = require("../middleware/project.middleware");
const MongoClient = require("mongodb").MongoClient;
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const mongoClient = new MongoClient(process.env.MONGO_URI);


const postProject = async (req, res) => {
    try {
        await upload(req, res);
        console.log(req.files);

        if (req.files.length <= 0) {
            return res
                .status(400)
                .send({ message: "You must select at least 1 file." });
        }

        return res.status(200).send({
            message: "Files have been uploaded.",
        });

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