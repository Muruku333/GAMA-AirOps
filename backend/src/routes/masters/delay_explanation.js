const express = require('express');
const delayExplanationController = require('../../controllers/masters/delay_explanation');
const router = express.Router();
const validation = require('../../middlewares/masters/delayExplanationValidator');

router
.route('/delay_explanations')
.get(delayExplanationController.getAllDelayExplanationsWithCategory)
.post(validation.createDelayExplanation, delayExplanationController.createDelayExplanation);

router
.route('/delay_explanations/:explanation_id')
.get(delayExplanationController.getDelayExplanationByExplanationIdWithCategory)
.put(validation.updateDelayExplanation, delayExplanationController.updateDelayExplanationByExplanationId)
.delete(delayExplanationController.deleteDelayExplanationByExplanationId);

module.exports = router;

