const express = require('express');
const router = express.Router();
const validation = require('./validation');
const wikiController = require('../controllers/wikiController');
const helper = require('../auth/helpers');

router.get('/wikis/new', helper.ensureAuthenticated, wikiController.new);
router.post('/wikis/create', helper.ensureAuthenticated, validation.validateWikis, wikiController.create);
router.get('/wikis/:id', wikiController.show);
router.get('/wikis', wikiController.all);
// policies: public wikis editable by all, private editable by owner/collaborator
router.post('/wikis/:id/destroy', wikiController.destroy);
router.get('/wikis/:id/edit', wikiController.edit);
router.post('/wikis/:id/update', wikiController.update);


module.exports = router;