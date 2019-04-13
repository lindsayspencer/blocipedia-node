const express = require('express');
const router = express.Router();
const validation = require('./validation');
const wikiController = require('../controllers/wikiController');
const helper = require('../auth/helpers');

router.get('/wikis/new', helper.ensureAuthenticated, wikiController.new);
router.post('/wikis/create', helper.ensureAuthenticated, validation.validateWikis, wikiController.create);
router.get('/wikis/:id', wikiController.show);
// make sure to add policies so only the wiki owner can destroy/edit, although collaborators will late be able to edit
router.post('/wikis/:id/destroy', wikiController.destroy);
//router.get('wikis/:id/edit', wikiController.updateForm);
//router.post('wikis/:id/update', wikiController.update);


module.exports = router;