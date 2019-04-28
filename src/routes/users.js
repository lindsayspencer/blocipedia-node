const express = require('express');
const router = express.Router();
const validation = require('./validation');
const userController = require('../controllers/userController');

router.get('/users/signup', userController.signUp);
router.post('/user', validation.validateUsers, userController.create);
router.get('/users/signin', userController.signInForm);
router.post('/users/signin', validation.validateUsers, userController.signIn);
router.get('/users/signout', userController.signOut);
router.get('/users/:id', userController.show);
router.get('/users/:id/upgradeForm', userController.upgradeForm);
router.get('/users/:id/downgradeForm', userController.downgradeForm);
router.post('/users/:id/upgrade', userController.upgrade);
router.post('/users/:id/downgrade', userController.downgrade);

module.exports = router;