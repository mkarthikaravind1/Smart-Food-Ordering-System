const express = require('express');
const router = express.Router();
const {getUsers,signupUser,loginUser} = require('../controllers/usersController');

router.get('/',getUsers);
router.post('/signup',signupUser);
router.post('/login',loginUser);

module.exports = router;