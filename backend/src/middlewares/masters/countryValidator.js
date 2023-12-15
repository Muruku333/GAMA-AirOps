const { check } = require("express-validator");

const validation ={
    createCountry: [
        check("countryName").exists().withMessage("Country Name is required").notEmpty().withMessage("Country Name should not be empty"),
        check("createdBy").exists().withMessage("Created By is required").notEmpty().withMessage("Created By should not be empty"),
    ],
    updateCountry : [
        check("countryName").exists().withMessage("Country Name is required").notEmpty().withMessage("Country Name should not be empty"),
        check("modifiedBy").exists().withMessage("Modified By is required").notEmpty().withMessage("Modified By should not be empty"),
    ],
};

module.exports = validation;