const express = require('express');

const notificationController = require('../controllers/notification');

const router = express.Router();

router.get('/notifications/:ownerid', notificationController.getAll);
router.post('/newNotification', notificationController.create);


module.exports = router;