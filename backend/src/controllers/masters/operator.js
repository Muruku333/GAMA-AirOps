const OperatorModel = require('../../models/masters/operator');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');

const operatorController ={
    getAllOperators: async (req,res)=>{
        try{
            const operators = await OperatorModel.getAllOperators();
            if(operators.length>0){
              return status.ResponseStatus(res,200,"List of all operators",operators);
            }
            return status.ResponseStatus(res,400,"No data found");
        } catch (error) {
          return status.ResponseStatus(res,500,"Internal server error",{error:error.message});
        }
    },
}

module.exports = operatorController;