// Import necessary modules
const DelayCategoryModel = require('../../models/masters/delay_category');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');

// Define the controller for delay category list operations
const delayCategoryController = {

    createDelayCategory: async (req, res) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
              return status.ResponseStatus(res,400,"Validation Failed",errors);
            };
            const {categoryName,delayType,createdBy}=req.body;
            const delayCategory={
                category_name: categoryName,
                delay_type: delayType,
                created_by: createdBy,
                modified_by: createdBy,
            }
            const result = await DelayCategoryModel.createDelayCategory(delayCategory);
            if(result.insertId>0){
                return status.ResponseStatus(res, 201, `Delay Category created successfully`);
            }
            return status.ResponseStatus(res,400,"Failed to create Delay Category");
        } catch (error) {
            return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
        }
    },

    getAllDelayCategories: async (req, res) => {
        try {
            const delayCategories = await DelayCategoryModel.getAllDelayCategories();
            if(delayCategories.length>0){
                return status.ResponseStatus(res, 200, "List of all Delay Categories", delayCategories);
            }
            return status.ResponseStatus(res,400,"No data found");
        } catch (error) {
            return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
        }
    },

    getDelayCategoryByCategoryId: async (req, res) => {
        const category_id = req.params.category_id;
        try {
            const delayCategory = await DelayCategoryModel.getDelayCategoryByCondition({category_id});
            if(delayCategory.length>0){
            return status.ResponseStatus(res, 200, `Details of Delay Category(${category_id})`, delayCategory);
            }
            return status.ResponseStatus(res,400,`No data found for ${category_id}`);
        } catch (error) {
            return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
        }
    },

    updateDelayCategoryByCategoryId: async (req, res) => {
        
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
              return status.ResponseStatus(res,400,"Validation Failed",errors);
            };
            const category_id = req.params.category_id;
            const {categoryName,delayType,modifiedBy}=req.body;
            const delayCategory={
                category_name: categoryName,
                delay_type: delayType,
                modified_by: modifiedBy,
            }
            const result = await DelayCategoryModel.updateDelayCategoryByCondition({category_id}, delayCategory);
            if (result.affectedRows>0) {
                return status.ResponseStatus(res, 200, `Delay Category updated successfully`);
            }
            return status.ResponseStatus(res, 404, `Failed to update Delay Category`);
        } catch (error) {
            return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
        }
    },

    deleteDelayCategoryByCategoryId: async (req, res) => {
        try {
            const category_id = req.params.category_id;
            const result = await DelayCategoryModel.deleteDelayCategoryByCondition({category_id});
            if (result.affectedRows>0) {
                return status.ResponseStatus(res, 200, `Delay Category deleted successfully`);
            }
            return status.ResponseStatus(res, 404, `Failed to delete Delay Category`);
        } catch (error) {
            if(error.errno === 1451){
                return status.ResponseStatus(res, 500, "Deletion failed. The selected delay category is associated with existing explanations.",{error:error})
            }
            return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
        }
    },
};

// Export the controller
module.exports = delayCategoryController;
