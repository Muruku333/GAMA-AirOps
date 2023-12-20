const express = require('express');
const delayCategoryController = require('../../controllers/masters/delay_category');
const router = express.Router();
const validation = require('../../middlewares/masters/delayCategoryValidator');

    router
    .route('/delay_categories')
    .get(delayCategoryController.getAllDelayCategories)
    .post(validation.createDelayCategory, delayCategoryController.createDelayCategory);

    router
    .route('/delay_categories/:category_id')
    .get(delayCategoryController.getDelayCategoryByCategoryId)
    .put(validation.updateDelayCategory, delayCategoryController.updateDelayCategoryByCategoryId)
    .delete(delayCategoryController.deleteDelayCategoryByCategoryId);

module.exports = router;
