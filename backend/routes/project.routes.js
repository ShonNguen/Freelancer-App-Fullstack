const express = require("express");
const router = express.Router(); 

const { 
    postProject, 
    getProjects, 
    // deleteProject, 
} = require('../controllers/project.controller'); 
const { protect } = require('../middleware/auth.middleware');


router.route('/all').get(getProjects);
router.route('/').post(protect, postProject); 
// router.route('files/:id').delete(deleteProject);

module.exports = router; 