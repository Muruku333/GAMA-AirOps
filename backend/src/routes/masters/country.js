const express = require("express");
const countryController = require("../../controllers/masters/country");
const validation = require("../../middlewares/masters/countryValidator");
const router = express.Router();

router
  .route("/countries")
  .get(countryController.getAllCountries)
  .post(validation.createCountry, countryController.createCountry);

router
  .route("/countries/:country_id")
  .get(countryController.getCountryByCountryId)
  .put(validation.updateCountry, countryController.updateCountryByCountryId)
  .delete(countryController.deleteCountryByCountryId);

module.exports = router;
