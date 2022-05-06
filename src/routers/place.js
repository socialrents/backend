const express = require('express');
const placeController = require('../controllers/place');

const router = express.Router();

router.post('/newPlace', placeController.create);
router.get('/allPlaces/:city', placeController.getAll);

module.exports = router;