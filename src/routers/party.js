const express = require('express');
const partyController = require('../controllers/party');

const router = express.Router();

router.post('/newParty', partyController.create);
router.get('/parties/:clientID', partyController.getAll);
router.delete('/deleteParty/:id', partyController.deleteParty);

module.exports = router;