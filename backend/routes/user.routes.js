const express = require("express");
const router = express.Router();
const { getAllUsers, signupUser, loginUser, getUser } = require('../controllers/user.controller'); 
const {protect} = require('../middleware/auth.middleware'); 

router.get('/getAll', getAllUsers); 
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUser);

module.exports = router; 