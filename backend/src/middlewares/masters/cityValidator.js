const { check } = require("express-validator");

const cityValidation = {
  createCity: [
    check("cityName")
      .exists()
      .withMessage("City Name is required")
      .notEmpty()
      .withMessage("City Name cannot be empty"),
    check("zoneId")
      .exists()
      .withMessage("Zone Id is required")
      .notEmpty()
      .withMessage("Zone Id cannot be empty"),
    check("countryId")
      .exists()
      .withMessage("Country Id is required")
      .notEmpty()
      .withMessage("Country Id cannot be empty"),
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateCity: [
    check("cityName")
      .exists()
      .withMessage("City Name is required")
      .notEmpty()
      .withMessage("City Name cannot be empty"),
    check("zoneId")
      .exists()
      .withMessage("Zone Id is required")
      .notEmpty()
      .withMessage("Zone Id cannot be empty"),
    check("countryId")
      .exists()
      .withMessage("Country Id is required")
      .notEmpty()
      .withMessage("Country Id cannot be empty"),
    check("modifiedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = cityValidation;
