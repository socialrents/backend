const express = require('express');
const partyController = require('../controllers/party');

const router = express.Router();

router.post('/newParty', partyController.create);
router.get('/parties/:clientID', partyController.getAll);
router.get('/lastPartyId', partyController.getLastId);
router.delete('/deleteParty/:id', partyController.deleteParty);
router.put('/acceptParty', partyController.accept);
router.put('/denyParty/:id_notif/:id_party', partyController.deny);

module.exports = router;