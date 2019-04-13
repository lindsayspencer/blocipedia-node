const express = require('express');
const router = express.Router();
const validation = require('./validation');
const userController = require('../controllers/userController');

router.get('/users/signup', userController.signUp);
router.post('/user', validation.validateCreateUser, userController.create);
router.get('/users/signin', userController.signInForm);
router.post('/users/signin', userController.signIn);
router.get('/users/signout', userController.signOut);

module.exports = router;