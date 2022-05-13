const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/login', userController.login);
router.put('/editProfile', userController.updateProfile);

module.exports = router;
