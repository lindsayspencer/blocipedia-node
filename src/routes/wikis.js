const express = require('express');
const router = express.Router();
const validation = require('./validation');
const wikiController = require('../controllers/wikiController');
const helper = require('../auth/helpers');

router.get('/wikis/new', helper.ensureAuthenticated, wikiController.new);
// add helper.ensureAuthenticated, validation.validateWikis
router.post('/wikis/create', helper.ensureAuthenticated, validation.validateWikis, wikiController.create);
router.get('/wikis/:id', wikiController.show);


module.exports = router;