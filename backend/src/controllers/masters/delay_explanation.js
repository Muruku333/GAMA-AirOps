const DelayExplanationModel = require('../../models/masters/delay_explanation');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');

const delayExplanationController = {

createDelayExplanation: async (req, res) => {
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return status.ResponseStatus(res, 400, "Validation Failed", errors);
        }
        const {explanationName, delayCategoryId, createdBy} = req.body;
        const delayExplanation={
            explanation_name: explanationName,
            delay_category_id: delayCategoryId,
            created_by: createdBy,
            modified_by: createdBy,
        }
        const result = await DelayExplanationModel.createDelayExplanation(delayExplanation);
        if(result.insertId>0){
            return status.ResponseStatus(res, 201, `Delay Explanation created successfully`);

        }
        return status.ResponseStatus(res, 400, `Failed to create Delay Explanation`);
        } catch (error) {
        return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
        }
},

getAllDelayExplanationsWithCategory: async (req, res) => {
    try {
    const rows = await DelayExplanationModel.getAllDelayExplanationsWithCategory();
    if(rows.length>0){
    let delayExplanations =[];
    rows.map((row)=>{
        const {
            de_id,
            explanation_id,
            explanation_name,
            dc_id,
            category_id,
            category_name,
            delay_type,
        }= row;

        delayExplanations =[
            ...delayExplanations,
            {
                id: de_id,
                explanation_id,
                explanation_name,
                delay_category:{
                    id: dc_id,
                    category_id,
                    category_name,
                    delay_type
                }
            }
        ];
    });
    return status.ResponseStatus(res, 200, "List of all Delay Explanations", delayExplanations);
}
return status.ResponseStatus(res,400,"No data found");
    } catch (error) {
    return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
},

getDelayExplanationByExplanationIdWithCategory: async (req, res) => {
    try {
        const explanation_id = req.params.explanation_id;

    const rows = await DelayExplanationModel.getDelayExplanationByExplanationIdWithCategory(explanation_id);
    if(rows.length>0){
                const {
                    de_id,
                    explanation_name,
                    dc_id,
                    category_id,
                    category_name,
                    delay_type,
                }= rows[0];
        
               const delayExplanation =[
                    {
                        id: de_id,
                        explanation_id:explanation_id,
                        explanation_name,
                        delay_category:{
                            id: dc_id,
                            category_id,
                            category_name,
                            delay_type
                        }
                    }
                ];
      
            return status.ResponseStatus(res, 200, `Details of Delay Explanation(${explanation_id})`, delayExplanation);
        }
        return status.ResponseStatus(res,400,`No data found for ${explanation_id}`);
    } catch (error) {
    return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
},

updateDelayExplanationByExplanationId: async (req, res) => {
    
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
    }
    const explanation_id = req.params.explanation_id;
    const {explanationName, delayCategoryId, modifiedBy } = req.body;
    const delayExplanation = {
        explanation_name: explanationName,
        delay_category_id: delayCategoryId,
        modified_by: modifiedBy
    }
    const result = await DelayExplanationModel.updateDelayExplanationByCondition({explanation_id}, delayExplanation);
    if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, `Delay Explanation updated successfully`);
    }
    return status.ResponseStatus(res, 404, `Failed to update Delay Explanation`);
    } catch (error) {
    return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
},

deleteDelayExplanationByExplanationId: async (req, res) => {
    try {
    const explanation_id = req.params.explanation_id;
    const result = await DelayExplanationModel.deleteDelayExplanationByCondition({explanation_id});
    if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, `Delay Explanation deleted successfully`);
    }
    return status.ResponseStatus(res, 404, `Failed to delete Delay Explanation`);

    } catch (error) {
    return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
},

};

module.exports = delayExplanationController;
