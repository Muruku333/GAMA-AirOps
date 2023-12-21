const express = require('express');
const aircraftController = require('../../controllers/masters/aircraft');
const router = express.Router();
const validation = require('../../middlewares/masters/aircraftValidator');

router
.route('/aircrafts')
.get(aircraftController.getAllAircraftsWithMappedData)
.post(validation.createAircraft, aircraftController.createAircraft);

router
.route('/aircrafts/:aircraft_id')
.get(aircraftController.getAircraftByIdWithMappedData)
.put(validation.updateAircraft, aircraftController.updateAircraftByAircraftId)
.patch(validation.updateLastArrival,aircraftController.updateAircraftLastArrivalByAircraftId)
.delete(aircraftController.deleteAircraftByAircraftId);

module.exports = router;