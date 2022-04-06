const express = require("express");
const router = express.Router(); 
const { 
    postProject 
} = require('../controllers/project.controller'); 

router.route('/').post(postProject); 

module.exports = router; 