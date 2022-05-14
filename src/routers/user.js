const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/login', userController.login);
router.put('/editProfile', userController.updateProfile);
router.put('/editProfileAndPass', userController.updateProfileAndPass);

module.exports = router;
