const asyncHandler = require('express-async-handler');


const getJobs = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get jobs' });
})

const postJob = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400); 
        throw new Error('Please add a text field'); 
    }
    res.status(200).json({ message: 'Create jobs' });
})

const putJob = asyncHandler(async (req, res) => {
    res.status(200).json({ message:  `Update job ${req.params.id}`});
})

const deleteJob = asyncHandler(async (req, res) => {
    res.status(200).json({ message:  `Delete job ${req.params.id}`});
})

module.exports = {
    getJobs,
    postJob, 
    putJob, 
    deleteJob
}