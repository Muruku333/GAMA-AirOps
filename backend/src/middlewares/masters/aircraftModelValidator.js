const { check } = require("express-validator");

const validation = {
  createAircraftModel: [
    check("modelName").exists().withMessage("Model Name is required").notEmpty().withMessage("Model Name should not be empty"),
    check("singleEngine")
      .exists()
      .withMessage("Engine Type is required")
      .isBoolean()
      .withMessage("Must be a boolean type"),
    check("wingType")
      .optional()
      .isIn(["Fixed Wing", "Rotary Wing"])
      .withMessage("Invalid Wing Type"),
    check("createdBy").exists().withMessage("Created by is required"),
  ],
  updateAircraftModel:[
    check("modelName").exists().withMessage("Model Name is required").notEmpty().withMessage("Model Name should not be empty"),
    check("singleEngine")
      .exists()
      .withMessage("Engine Type is required")
      .isBoolean()
      .withMessage("Must be a boolean type"),
    check("wingType")
      .optional()
      .isIn(["Fixed Wing", "Rotary Wing"])
      .withMessage("Invalid Wing Type"),
    check("modifiedBy").exists().withMessage("Modified by is required"),
  ],
};

module.exports = validation;
