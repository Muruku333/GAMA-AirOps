const express = require('express');
const CTDMController = require('../../controllers/masters/crew_training_document_master');
const router = express.Router();
const validation = require('../../middlewares/masters/crewTrainingDocumentMasterValidator');

    router
    .route('/crew_training_document_master')
    .get(CTDMController.getAllCTDMs)
    .post(validation.createCTDM, CTDMController.createCTDM);

    router
    .route('/crew_training_document_master/:ctdm_id')
    .get(CTDMController.getCTDMsByCTDMId)
    .put(validation.updateCTDM, CTDMController.updateCTDMByCTDMId)
    .delete(CTDMController.deleteCTDMByCTDMId);

module.exports = router;
