const { check } = require("express-validator");

const hotelValidation = {
  createHotel: [
    check("name")
      .exists()
      .withMessage("Name is required")
      .notEmpty()
      .withMessage("Name cannot be empty"),
    check("address")
      .exists()
      .withMessage("Address is required")
      .notEmpty()
      .withMessage("Address cannot be empty"),
    check("city")
      .exists()
      .withMessage("City is required")
      .notEmpty()
      .withMessage("City cannot be empty"),
  ],
  updateHotelById: [
    check("name")
      .exists()
      .withMessage("Name is required")
      .notEmpty()
      .withMessage("Name cannot be empty"),
    check("address")
      .exists()
      .withMessage("Address is required")
      .notEmpty()
      .withMessage("Address cannot be empty"),
    check("city")
      .exists()
      .withMessage("City is required")
      .notEmpty()
      .withMessage("City cannot be empty"),
  ],
};

module.exports = hotelValidation;
