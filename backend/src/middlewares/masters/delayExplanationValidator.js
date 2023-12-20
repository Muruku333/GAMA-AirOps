const { check } = require("express-validator");

const delayExplanationValidation = {
  createDelayExplanation: [
    check("explanationName")
      .exists()
      .withMessage("Explanation Name is required")
      .notEmpty()
      .withMessage("Explanation Name cannot be empty"),
    check("delayCategoryId")
      .exists()
      .withMessage("Delay category id is required")
      .notEmpty()
      .withMessage("Delay category id cannot be empty"),
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateDelayExplanation: [
    check("explanationName")
      .notEmpty()
      .withMessage("Explanation Name cannot be empty")
      .exists()
      .withMessage("Explanation Name is required"),
    check("delayCategoryId")
      .notEmpty()
      .withMessage("Delay category cannot be empty")
      .exists()
      .withMessage("Delay category is required"),
    check("modifiedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = delayExplanationValidation;
