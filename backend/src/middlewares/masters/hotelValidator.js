const { check } = require("express-validator");

const hotelValidation = {
  createHotel: [
    check("hotelName")
      .exists()
      .withMessage("Hotel Name is required")
      .notEmpty()
      .withMessage("Hotel Name cannot be empty"),
    check("address")
      .exists()
      .withMessage("Address is required")
      .notEmpty()
      .withMessage("Address cannot be empty"),
    check("cityId")
      .exists()
      .withMessage("City Id is required")
      .notEmpty()
      .withMessage("City Id cannot be empty"),
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateHotelById: [
    check("hotelName")
      .exists()
      .withMessage("Hotel Name is required")
      .notEmpty()
      .withMessage("Hotel Name cannot be empty"),
    check("address")
      .exists()
      .withMessage("Address is required")
      .notEmpty()
      .withMessage("Address cannot be empty"),
    check("cityId")
      .exists()
      .withMessage("City Id is required")
      .notEmpty()
      .withMessage("City Id cannot be empty"),
    check("modifiedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = hotelValidation;
