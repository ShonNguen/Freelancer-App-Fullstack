const asyncHandler = require('express-async-handler');

const Job = require('../models/jobsModel');
const User = require('../models/userModel');


const getJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find({ user: req.user.id });
    res.status(200).json(jobs);
})

const postJob = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }

    const job = await Job.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(job);
})

const putJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        res.status(400);
        throw new Error('Job not found');
    }

    if (!req.user) {
        res.status(401);
        throw new Error('User not found!');
    }

    if (job.user.toString() !== req.user.id) {
        res.status(400);
        throw new Error('User not authorized!');
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
        throw new Error('Job not found');
    }

    if (!req.user) {
        res.status(401);
        throw new Error('User not found!');
    }

    if (job.user.toString() !== req.user.id) {
        res.status(400);
        throw new Error('User not authorized!');
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