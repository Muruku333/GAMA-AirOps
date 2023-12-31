const CountryModel = require('../../models/masters/country');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');

const countryController ={
    createCountry: async(req,res)=>{
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
              return status.ResponseStatus(res,400,"Validation Failed",errors);
            };
            const {countryName, createdBy}=req.body;
            const country ={
              country_name: countryName,
              created_by: createdBy,
              modified_by: createdBy,
            }
           const result = await CountryModel.createCountry(country);
           
           if (result.insertId>0){
            return status.ResponseStatus(res,201,"Country created successfully");
           }
            return status.ResponseStatus(res,400,"Failed to country");
          } catch (error) {
            console.log(error);
            return status.ResponseStatus(res,500,'Internal server error', { error: error.message});
          }
    },
    getAllCountries: async (req, res)=>{
        try{
            const countries = await CountryModel.getAllCountries();
            if(countries.length>0){
              return status.ResponseStatus(res,200,"List of all Countries",countries);
            }
            return status.ResponseStatus(res,400,"No data found");
        } catch (error) {
          return status.ResponseStatus(res,500,"Internal server error",{error:error.message});
        }
    },
    getCountryByCountryId: async(req, res)=>{
        try{
            const country_id = req.params.country_id;
            const country = await CountryModel.getCountryByCondition({country_id});
            if(country.length>0){
              return status.ResponseStatus(res,200,`Details of Country(${country_id})`,country);
            }
            return status.ResponseStatus(res,400,`No data found for ${country_id}`);
        } catch (error) {
          return status.ResponseStatus(res,500,"Internal server error",{error:error.message});
        }
    },
    updateCountryByCountryId: async (req, res)=>{
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
              return status.ResponseStatus(res,400,"Validation Failed",errors);
            };
            const country_id = req.params.country_id;
            const {countryName,modifiedBy}=req.body;
            const country ={
              country_name: countryName,
              modified_by: modifiedBy,
            }
            const result= await CountryModel.updateCountryByCondition({country_id},country);
            if(result.affectedRows>0){
              return status.ResponseStatus(res,200,"Country updated successfully");
            }
            return status.ResponseStatus(res,400,`Failed to update Country`);
          } catch (error) {
            return status.ResponseStatus(res,500,"Internal server error",{error:error.message});
          }
    },
    deleteCountryByCountryId: async (req, res)=>{
        try {
            const country_id = req.params.country_id;
            const result = await CountryModel.deleteCountryByCondition({country_id});
            if(result.affectedRows>0){
              return status.ResponseStatus(res,200,"Country deleted successfully");
            }
            return status.ResponseStatus(res,400,'Failed to delete Country');
          } catch (error) {
            if(error.errno === 1451){
              return status.ResponseStatus(res, 500, "Deletion failed. The selected country is associated with existing data.",{error:error})
          }
            return status.ResponseStatus(res,500,"Internal server error",{error:error.message});
          }
    }
};

module.exports = countryController;