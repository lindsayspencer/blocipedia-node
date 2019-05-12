const express = require('express');
const router = express.Router();
const validation = require('./validation');
const collaboratorController = require('../controllers/collaboratorController');

router.get('/wikis/:wikiId/collaborators', collaboratorController.show);
//router.get('wikis/:wikiId/collaborators/edit', collaboratorController.edit);
router.post('/wikis/:wikiId/collaborators/add', collaboratorController.add);
router.post('/wikis/:wikiId/collaborators/:id/destroy', collaboratorController.test);

module.exports = router;