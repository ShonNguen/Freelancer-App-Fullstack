const express = require("express");
const router = express.Router();
const {
    getJobs, getAllJobs, postJob, putJob, deleteJob
} = require('../controllers/job.controller');
const { protect } = require('../middleware/auth.middleware');


router.route('/getAll').get(getAllJobs);
router.route('/').get(protect, getJobs).post(protect, postJob);
router.route('/:id').put(protect, putJob).delete(protect, deleteJob);

module.exports = router; 