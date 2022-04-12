const express = require('express');
const ownerController = require('../controllers/owner');

const router = express.Router();

router.post('/signupOwner', ownerController.signup);

module.exports = router;