const express = require('express');
const router = express.Router();
const validation = require('./validation');
const userController = require('../controllers/userController');

router.get('/users/signup', userController.signUp);
router.post('/user', userController.create);

module.exports = router;