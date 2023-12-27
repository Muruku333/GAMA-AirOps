const express = require("express");
const airportController = require("../../controllers/masters/airport");
const router = express.Router();
const validation = require("../../middlewares/masters/airportValidator");

router
  .route("/airports")
  .get(airportController.getAllAirportsWithMappedData)
  .post(airportController.createAirport);

router
  .route("/airports/:airport_id")
  .get(airportController.getAirportByAirportId)
  .put(airportController.updateAirportByAiportId)
  .delete(airportController.deleteAirportByAirportId);

module.exports = router;
