const express = require('express');
const cityController = require('../../controllers/masters/city');
const router = express.Router();
const validation = require('../../middlewares/masters/cityValidator');

router.route('/city_list').get(cityController.getAllCities);

router.route('/zone_list').get(cityController.getAllZones);

router
.route('/cities')
.get(cityController.getAllCitiesWithMappedData)
.post(validation.createCity, cityController.createCity);

router
.route('/cities/:city_id')
.get(cityController.getCityByCityIdWithMappedData)
.put(validation.updateCity, cityController.updateCityByCityId)
.delete(cityController.deleteCityByCityId);

module.exports = router;

