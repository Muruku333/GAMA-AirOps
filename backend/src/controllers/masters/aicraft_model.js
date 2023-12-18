const AircraftModelModel = require('../../models/masters/aircraft_model');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');

const aircraftModelController = {
  createAircraftModel: async (req, res) =>{
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return status.ResponseStatus(res,400,"Validation Failed",errors);
      };
      const {modelName,singleEngine,wingType,createdBy}=req.body;
      const aircraftModel ={
        model_name: modelName,
        single_engine: singleEngine,
        wing_type: wingType,
        created_by: createdBy,
        modified_by: createdBy,
      }
     const result = await AircraftModelModel.createAircraftModel(aircraftModel);
     
     if (result.insertId>0){
      return status.ResponseStatus(res,201,"Aircraft Model created successfully");
     }
      return status.ResponseStatus(res,400,"Failed to create Aircraft Model");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res,500,'Internal server error', { error: error.message});
    }
  },
  getAllAircraftModels: async (req, res) =>{
    try{
        const aircraftModels = await AircraftModelModel.getAllAircraftModels();
        if(aircraftModels.length>0){
          return status.ResponseStatus(res,200,"List of all Aircraft Models",aircraftModels);
        }
        return status.ResponseStatus(res,400,"No data found");
    } catch (error) {
      return status.ResponseStatus(res,500,"Internal server error",{error:error.message});
    }
  },
  getAircraftModelByModeleId: async (req, res) =>{
    const model_id = req.params.model_id;
    try{
        const aircraftModel = await AircraftModelModel.getAircraftModelByCondition({model_id});
        if(aircraftModel.length>0){
          return status.ResponseStatus(res,200,`Details of Aircraft Model(${model_id})`,aircraftModel);
        }
        return status.ResponseStatus(res,400,`No data found for ${model_id}`);
    } catch (error) {
      return status.ResponseStatus(res,500,"Internal server error",{error:error.message});
    }
  },
  getAllAircraftModelsWithAuthors: async (req, res) => {
    try {
      const rows = await AircraftModelModel.getAllAircraftModelsWithAuthors();
      let aircraftModels = [];
      rows.map((row) => {
        const {
          id,
          model_id,
          model_name,
          single_engine,
          wing_type,
          cu_id,
          cu_first_name,
          cu_last_name,
          cu_email,
          created_at,
          mu_id,
          mu_first_name,
          mu_last_name,
          mu_email,
          modified_at,
        } = row;

        aircraftModels = [
          ...aircraftModels,
          {
            id: id,
            model_id: model_id,
            model_name: model_name,
            single_engine: single_engine,
            wing_type: wing_type,
            created_by: {
              user_id: cu_id,
              first_name: cu_first_name,
              last_name: cu_last_name,
              email: cu_email,
              created_at: created_at,
            },
            modified_by: {
              user_id: mu_id,
              first_name: mu_first_name,
              last_name: mu_last_name,
              email: mu_email,
              modified_at: modified_at,
            },
          },
        ];
      });
      if(rows.length>0){
      return status.ResponseStatus(res,200,"List of all Aircraft Models with Authors",aircraftModels);
      }
      return status.ResponseStatus(res,400,"No data found");
    } catch (error) {
      return status.ResponseStatus(res,500,"Internal server error",{error:error.message});
    }
  },
  getAircraftModelByModelIdWithAuthors: async (req, res) => {
    const model_id = req.params.model_id;

    try {
      const rows = await AircraftModelModel.getAircraftModelByModelIdWithAuthors(model_id);
      const {
        id,
        model_name,
        single_engine,
        wing_type,
        cu_id,
        cu_first_name,
        cu_last_name,
        cu_email,
        created_at,
        mu_id,
        mu_first_name,
        mu_last_name,
        mu_email,
        modified_at,
      } = rows[0];

      const aircraftModel = [
        {
          id:id,
          model_id: model_id,
          model_name: model_name,
          single_engine: single_engine,
          wing_type: wing_type,
          created_by: {
            user_id: cu_id,
            first_name: cu_first_name,
            last_name: cu_last_name,
            email: cu_email,
            created_at: created_at,
          },
          modified_by: {
            user_id: mu_id,
            first_name: mu_first_name,
            last_name: mu_last_name,
            email: mu_email,
            modified_at: modified_at,
          },
        },
      ];
      if(rows){
        return status.ResponseStatus(res,200,`Details of Aircraft Model(${model_id}) with Authors`,aircraftModel);
      }
      return status.ResponseStatus(res,400,`No data found for ${model_id}`);
    } catch (error) {
      return status.ResponseStatus(res,500,"Internal server error",{error:error.message});
    }
  },
  updateAircraftModelByModeId: async (req,res)=>{
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return status.ResponseStatus(res,400,"Validation Failed",errors);
      };
      const model_id = req.params.model_id;
      const {modelName,singleEngine,wingType,modifiedBy}=req.body;
      const aircraftModel ={
        model_name: modelName,
        single_engine: singleEngine,
        wing_type: wingType,
        modified_by: modifiedBy,
      }
      const result= await AircraftModelModel.updateAircraftModelByCondition({model_id},aircraftModel);
      if(result.affectedRows>0){
        return status.ResponseStatus(res,200,"Aircraft Model updated successfully");
      }
      return status.ResponseStatus(res,400,`Failed to update Aircraft Model`);
    } catch (error) {
      return status.ResponseStatus(res,500,"Internal server error",{error:error.message});
    }
  },
  deleteAircraftModelByModelId: async (req, res)=>{
    try {
      const model_id = req.params.model_id;
      const result = await AircraftModelModel.deleteAircraftModelByCondition({model_id});
      if(result.affectedRows>0){
        return status.ResponseStatus(res,200,"Aircraft Model deleted successfully");
      }
      return status.ResponseStatus(res,400,'Failed to delete Aircraft Model');
    } catch (error) {
      return status.ResponseStatus(res,500,"Internal server error",{error:error.message});
    }
  },
};

module.exports = aircraftModelController;
