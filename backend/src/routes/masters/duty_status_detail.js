const express = require("express");
const dutyStatusDetailController = require("../../controllers/masters/duty_status_detail");
const router = express.Router();
const validation = require("../../middlewares/masters/dutyStatusDetailValidator");

router
  .route("/duty_status_details")
  .get(dutyStatusDetailController.getAllDutyStatusDetails)
  .post(dutyStatusDetailController.createDutyStatusDetail);

router
  .route("/duty_status_details/:duty_id")
  .get(dutyStatusDetailController.getDutyStatusDetailByDutyId)
  .put(dutyStatusDetailController.updateDutyStatusDetailByDutyId)
  .delete(dutyStatusDetailController.deleteDutyStatusDetail);

module.exports = router;
