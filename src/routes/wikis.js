const express = require('express');
const router = express.Router();
const validation = require('./validation');
const wikiController = require('../controllers/wikiController');
const helper = require('../auth/helpers');

router.get('/wikis/new', helper.ensureAuthenticated, wikiController.new);
router.get('/wikis/newPrivate', helper.ensureAuthenticated, wikiController.newPrivate);
router.post('/wikis/create', helper.ensureAuthenticated, validation.validateWikis, wikiController.create);
router.post('/wikis/createPrivate', helper.ensureAuthenticated, validation.validateWikis, wikiController.createPrivate);
router.get('/wikis/:id', wikiController.show);
router.get('/wikis', wikiController.all);
// policies: public wikis editable by all, private editable by owner/collaborator
router.post('/wikis/:id/destroy', wikiController.destroy);
router.get('/wikis/:id/edit', wikiController.edit);
router.post('/wikis/:id/update', wikiController.update);
router.post('/wikis/:id/makePublic', wikiController.makePublic);
router.post('/wikis/:id/makePrivate', wikiController.makePrivate);


module.exports = router;