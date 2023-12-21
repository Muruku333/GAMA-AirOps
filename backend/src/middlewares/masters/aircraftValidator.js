const { check } = require("express-validator");

const aircraftValidation = {
  createAircraft: [
    check("operatorId")
      .exists()
      .withMessage("Operator Id is required")
      .notEmpty()
      .withMessage("Operator Id cannot be empty"),
    check("regNo")
      .exists()
      .withMessage("Reg. No. is required")
      .notEmpty()
      .withMessage("Reg. No. cannot be empty"),
    check("modelId")
      .exists()
      .withMessage("Model Id is required")
      .notEmpty()
      .withMessage("Model Id cannot be empty"),
    check("minCabinCrew")
      .optional()
      .isInt()
      .withMessage("Min. Cabin Crew must be an integer"),
    check("minFlightCrew")
      .exists()
      .withMessage("Min. Flight Crew is required")
      .isInt()
      .withMessage("Min. Flight must ba an integer"),
    check("noOfCaptain")
      .optional()
      .isInt()
      .withMessage("No.of Captain must be an integer"),
    check("noOfFo")
      .optional()
      .isInt()
      .withMessage("No.of Fo must be an integer"),
    check("noOfFe")
      .optional()
      .isInt()
      .withMessage("No.of Fe must be an integer"),
    check("cClsCapacity")
      .optional()
      .isInt()
      .withMessage("cCls Capacity must be an integer"),
    check("yClsCapacity")
      .optional()
      .isInt()
      .withMessage("yCls Capacity must be an integer"),
    check("seatingCapacity")
      .optional()
      .isInt()
      .withMessage("Seating Capacity must be an integer"),
    check("timeFormat")
      .exists()
      .withMessage("Time Format is required")
      .notEmpty()
      .withMessage("Time Format cannot be empty"),
    check("blockOpeningHrs").optional(),
    check("timeInAirOpeningHrs").optional(),
    check("notInService").optional(),
    check("notInServiceFrom").optional(),
    check("freightCapacity")
      .optional()
      .isFloat()
      .withMessage("Freight Capacity must be float"),
    check("unit").optional(),
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateAircraft: [
    check("operatorId")
      .exists()
      .withMessage("Operator Id is required")
      .notEmpty()
      .withMessage("Operator Id cannot be empty"),
    check("regNo")
      .exists()
      .withMessage("Reg. No. is required")
      .notEmpty()
      .withMessage("Reg. No. cannot be empty"),
    check("modelId")
      .exists()
      .withMessage("Model Id is required")
      .notEmpty()
      .withMessage("Model Id cannot be empty"),
    check("minCabinCrew")
      .optional()
      .isInt()
      .withMessage("Min. Cabin Crew must be an integer"),
    check("minFlightCrew")
      .exists()
      .withMessage("Min. Flight Crew is required")
      .isInt()
      .withMessage("Min. Flight must ba an integer"),
    check("noOfCaptain")
      .optional()
      .isInt()
      .withMessage("No.of Captain must be an integer"),
    check("noOfFo")
      .optional()
      .isInt()
      .withMessage("No.of Fo must be an integer"),
    check("noOfFe")
      .optional()
      .isInt()
      .withMessage("No.of Fe must be an integer"),
    check("cClsCapacity")
      .optional()
      .isInt()
      .withMessage("cCls Capacity must be an integer"),
    check("yClsCapacity")
      .optional()
      .isInt()
      .withMessage("yCls Capacity must be an integer"),
    check("seatingCapacity")
      .optional()
      .isInt()
      .withMessage("Seating Capacity must be an integer"),
    check("timeFormat")
      .exists()
      .withMessage("Time Format is required")
      .notEmpty()
      .withMessage("Time Format cannot be empty"),
    check("blockOpeningHrs").optional(),
    check("timeInAirOpeningHrs").optional(),
    check("notInService").optional(),
    check("notInServiceFrom").optional(),
    check("freightCapacity")
      .optional()
      .isFloat()
      .withMessage("Freight Capacity must be float"),
    check("unit").optional(),
    check("modifiedBy")
    .exists()
    .withMessage("Modified By is required")
    .notEmpty()
    .withMessage("Modified By cannot be empty"),
  ],
  updateLastArrival:[
    check("lastArrival")
    .exists()
    .withMessage("Last Arrival By is required")
    .notEmpty()
    .withMessage("Last Arrival By cannot be empty"),
    check("modifiedBy")
    .exists()
    .withMessage("Modified By is required")
    .notEmpty()
    .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = aircraftValidation;

// operatorId, regNo, modelId, minCabinCrew, minFlightCrew, noOfCabin, noOfFo, noOfFe, cClsCapacity,
// yClsCapacity, seatingCapacity, timeFormate, blockOpeningHrs, timeInAirOpeningHrs, notInService,
// notInServiceFrom, freightCapacity, unit, lastArrival, createdBy
