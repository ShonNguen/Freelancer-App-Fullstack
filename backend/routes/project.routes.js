const express = require("express");
const router = express.Router(); 

const { 
    postProject, 
    // getProjects, 
    // deleteProject, 
} = require('../controllers/project.controller'); 
const { protect } = require('../middleware/auth.middleware');


router.route('/').post(postProject); 
// router.route('/all').get(getProjects);
// router.route('files/:id').delete(deleteProject);

module.exports = router; 