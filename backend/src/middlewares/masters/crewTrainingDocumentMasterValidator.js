const { check } = require("express-validator");

const CTDMValidation = {
  createCTDM: [
    check("type")
      .notEmpty()
      .withMessage("Type cannot be empty")
      .exists()
      .withMessage("Type is required"),
    check("ctdmName")
      .notEmpty()
      .withMessage("CTDM Name cannot be empty")
      .exists()
      .withMessage("CTDM Name is required"),
    // check("groupCode")
    //   .notEmpty()
    //   .withMessage("Group Code cannot be empty")
    //   .exists()
    //   .withMessage("Group Code is required"),
    check("warningDays")
      .optional()
      .isInt()
      .withMessage("Warning Days must be an integer"),
    // check("frequency_unit")
    //   .notEmpty()
    //   .withMessage("Frequency Unit cannot be empty")
    //   .exists()
    //   .withMessage("Frequency Unit is required"),
    check("frequency")
      .optional()
      .isInt()
      .withMessage("Frequency must be an integer"),
    check("renewalPeriod")
      .notEmpty()
      .withMessage("Renewal Period cannot be empty")
      .exists()
      .withMessage("Renewal Period is required"),
      check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateCTDM: [
    check("type")
      .notEmpty()
      .withMessage("Type cannot be empty")
      .exists()
      .withMessage("Type is required"),
    check("ctdmName")
      .notEmpty()
      .withMessage("CTDM Name cannot be empty")
      .exists()
      .withMessage("CTDM Name is required"),
    check("warningDays")
      .optional()
      .isInt()
      .withMessage("Warning Days must be an integer"),
    check("frequency")
      .optional()
      .isInt()
      .withMessage("Frequency must be an integer"),
    check("renewalPeriod")
      .notEmpty()
      .withMessage("Renewal Period cannot be empty")
      .exists()
      .withMessage("Renewal Period is required"),
      check("modifiedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = CTDMValidation;
