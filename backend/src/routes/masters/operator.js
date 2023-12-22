const express = require("express");
const operatorController = require("../../controllers/masters/operator");
// const validation = require("../../middlewares/masters/countryValidator");
const router = express.Router();

router.route("/operators").get(operatorController.getAllOperators);

module.exports = router;