const express = require('express');
const aircraftModelController = require('../../controllers/masters/aicraft_model');
const router = express.Router();

// // middleware that is specfic to this router
// router.use((req, res, next)=>{
//     console.log("Time :", Date.now());
//     next();
// });

// get method for Aircraft Models
router.get('/aircraft_models', aircraftModelController.getAllAircraftModels);
router.get('/aircraft_models/authors', aircraftModelController.getAllAircraftModelsWithAuthors);

router.get('/aircraft_models/:id', aircraftModelController.getAircraftModelById);
router.get('/aircraft_models/authors/:id', aircraftModelController.getAircraftModelByIdWithAuthors);

module.exports = router;