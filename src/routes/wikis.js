const express = require('express');
const router = express.Router();
const validation = require('./validation');
const wikiController = require('../controllers/wikiController');
const helper = require('../auth/helpers');

router.get('/wikis/new', wikiController.new);
// add helper.ensureAuthenticated, validation.validateWikis
router.post('/wikis/create', validation.validateWikis, wikiController.create);
//router.get('/users/:userId/wikis/:id', wikiController.show);


module.exports = router;