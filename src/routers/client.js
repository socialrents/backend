const express = require('express');
const clientController = require('../controllers/client');

const router = express.Router();

router.post('/signupClient', clientController.signup);

module.exports = router;