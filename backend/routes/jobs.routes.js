const express = require("express");
const router = express.Router(); 
const { getJobs, postJob, putJob, deleteJob } = require('../controllers/job.controller');
const { protect } = require('../middleware/auth.middleware'); 


router.route('/').get(getJobs).post(protect, postJob); 
router.route('/:id').put(protect, putJob).delete(protect, deleteJob); 

module.exports = router; 