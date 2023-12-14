const express = require("express");
const aircraftModelController = require("../../controllers/masters/aicraft_model");
const router = express.Router();
const validation = require("../../middlewares/masters/aircraftModelValidator");

// // middleware that is specfic to this router
// router.use((req, res, next)=>{
//     console.log("Time :", Date.now());
//     next();
// });

router
  .route("/aircraft_models")
  .post(validation.createAircraftModel,aircraftModelController.createAircraftModel)
  .get(aircraftModelController.getAllAircraftModels);
router
  .route("/aircraft_models/:model_id")
  .get(aircraftModelController.getAircraftModelByModeleId)
  .put(validation.updateAircraftModel,aircraftModelController.updateAircraftModelByModeId)
  .delete(aircraftModelController.deleteAircraftModelByModelId);

router
  .route("/aircraft_models/authors")
  .get(aircraftModelController.getAllAircraftModelsWithAuthors);
router
  .route("/aircraft_models/authors/:model_id")
  .get(aircraftModelController.getAircraftModelByModelIdWithAuthors);

module.exports = router;
