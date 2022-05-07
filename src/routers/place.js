const express = require('express');
const placeController = require('../controllers/place');

const router = express.Router();

router.post('/newPlace', placeController.create);
router.get('/places/:ownerid', placeController.getAll)
router.get('/allPlaces/:city', placeController.getAllByCity);
router.delete('/deletePlace/:id', placeController.deletePlace);

module.exports = router;