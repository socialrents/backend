const express = require('express');
const locationController = require('../controllers/location');

const router = express.Router();

router.get('/allCities', locationController.getAllCities);
router.get('/allDistricts/:city', locationController.getAllDistricts);

module.exports = router;