const express = require("express");
const crewController = require("../../controllers/masters/crew");
const router = express.Router();
// const multer = require('multer');
const validation = require("../../middlewares/masters/crewValidator");

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

router
  .route("/crews")
  .get(crewController.getAllCrews)
  .post(crewController.createCrew);

router
  .route("/crews/:crew_id")
  .get(crewController.getCrewByCrewId)
  .put(crewController.updateCrewByCrewId)
  .delete(crewController.deleteCrewByCrewId);

module.exports = router;
