const express = require('express');
const partyController = require('../controllers/party');

const router = express.Router();

router.post('/newParty', partyController.create);

module.exports = router;