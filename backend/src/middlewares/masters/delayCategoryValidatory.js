const { check } = require("express-validator");

const delayCategoryValidation = {
  createDelayCategory: [
    check("categoryName")
      .exists()
      .withMessage("Category Name is required")
      .notEmpty()
      .withMessage("Category Name cannot be empty"),
    check("delayType")
      .exists()
      .withMessage("Delay type is required")
      .notEmpty()
      .withMessage("Delay type cannot be empty"),
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateDelayCategory: [
    check("categoryName")
      .exists()
      .withMessage("Category Name is required")
      .notEmpty()
      .withMessage("Category Name cannot be empty"),
    check("delayType")
      .exists()
      .withMessage("Delay type is required")
      .notEmpty()
      .withMessage("Delay type cannot be empty"),
      check("modifiedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = delayCategoryValidation;
