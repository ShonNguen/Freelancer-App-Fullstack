const express = require("express");
const router = express.Router(); 
const { getJobs, postJob, putJob, deleteJob } = require('../controllers/job.controller')


router.route('/').get(getJobs).post(postJob); 
router.route('/:id').put(putJob).delete(deleteJob); 

module.exports = router; 