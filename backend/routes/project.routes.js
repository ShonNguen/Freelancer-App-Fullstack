const express = require("express");
const router = express.Router(); 

const { 
    postProject, 
    getAllProjects, 
    postBaseProject,
    // deleteProject, 

    getImage,
} = require('../controllers/project.controller'); 
const { protect } = require('../middleware/auth.middleware');


router.route('/all').get(getAllProjects);
router.route('/').post(protect, postProject); 
// router.route('files/:id').delete(deleteProject);

router.route('/file/:filename').get(getImage);

module.exports = router; 