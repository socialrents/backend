const express = require('express');
const placeController = require('../controllers/place');

const router = express.Router();

router.post('/newPlace', placeController.create);
router.get('/places/:ownerid', placeController.getAllByOwner)
router.get('/allPlaces/:city', placeController.getAll);
router.get('/allPlaces/:city/:district', placeController.getAllFromDistrict)
router.delete('/deletePlace/:id', placeController.deletePlace);

module.exports = router;