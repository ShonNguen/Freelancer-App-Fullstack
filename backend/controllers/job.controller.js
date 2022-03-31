const asyncHandler = require('express-async-handler');

const Job = require('../models/jobsModel');


const getJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find();
    res.status(200).json(jobs);
})

const postJob = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }

    const job = await Job.create({
        text: req.body.text
    })

    res.status(200).json(job);
})

const putJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        res.status(400);
        throw new Error('Goal not found');
    }

    const updatedJob = await Job.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    );

    res.status(200).json(updatedJob);
})

const deleteJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        res.status(400);
        throw new Error('Goal not found');
    }

    await job.remove();

    res.status(200).json({ id: req.params.id });
})

module.exports = {
    getJobs,
    postJob,
    putJob,
    deleteJob
}