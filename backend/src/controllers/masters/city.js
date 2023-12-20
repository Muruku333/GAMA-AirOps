const CityModel = require('../../models/masters/city');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');

const cityController = {

createCity: async (req, res) => {
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return status.ResponseStatus(res, 400, "Validation Failed", errors);
        }
        const {cityName, zoneId, countryId, createdBy} = req.body;
        const city={
            city_name: cityName,
            zone_id: zoneId,
            country_id: countryId,
            created_by: createdBy,
            modified_by: createdBy,
        }
        const result = await CityModel.createCity(city);
        if(result.insertId>0){
            return status.ResponseStatus(res, 201, `City created successfully`);

        }
        return status.ResponseStatus(res, 400, `Failed to create City`);
        } catch (error) {
        return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
        }
},

getAllZones : async (req, res) =>{
    try {
        const zones = await CityModel.getAllZones();
        if(zones.length>0){
            return status.ResponseStatus(res, 200, "List of all Zone", zones);
        }
        return status.ResponseStatus(res,400,"No data found");
            } catch (error) {
            return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
            }
},

getAllCities: async (rea, res) =>{
    try {
        const cities = await CityModel.getAllCities();
        if(cities.length>0){
            return status.ResponseStatus(res, 200, "List of all City", cities);
        }
        return status.ResponseStatus(res,400,"No data found");
            } catch (error) {
            return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
            }
},

getAllCitiesWithMappedData: async (req, res) => {
    try {
    const rows = await CityModel.getAllCitiesWithMappedData();
    if(rows.length>0){
    let cities =[];
    rows.map((row)=>{
        const {
            id,
            city_id,
            city_name,
            zone_id,
            zone,
            gmt,
            country_id,
            country_name,
        }= row;

        cities =[
            ...cities,
            {
             id,
             city_id,
             city_name,
             zone:{
                id:zone_id,
                zone,
                gmt,
             },
             country: {
                country_id,
                country_name
             }
            }
        ];
    });
    return status.ResponseStatus(res, 200, "List of all Cities", cities);
}
return status.ResponseStatus(res,400,"No data found");
    } catch (error) {
    return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
},

getCityByCityIdWithMappedData: async (req, res) => {
    try {
        const city_id = req.params.city_id;

    const rows = await CityModel.getCityByCityIdWithMappedData(city_id);
    if(rows.length>0){
                const {
                    id,
                    city_name,
                    zone_id,
                    zone,
                    gmt,
                    country_id,
                    country_name
                }= rows[0];
        
               const city =[
                {
                    id,
                    city_id,
                    city_name,
                    zone:{
                       id:zone_id,
                       zone,
                       gmt,
                    },
                    country: {
                       country_id,
                       country_name
                    }
                   }
                ];
      
            return status.ResponseStatus(res, 200, `Details of City(${city_id})`, city);
        }
        return status.ResponseStatus(res,400,`No data found for ${city_id}`);
    } catch (error) {
    return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
},

updateCityByCityId: async (req, res) => {
    
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
    }
    const city_id = req.params.city_id;
    const {cityName, zoneId, countryId, modifiedBy } = req.body;
    const city={
        city_name: cityName,
        zone_id: zoneId,
        country_id: countryId,
        modified_by: modifiedBy,
    }
    const result = await CityModel.updateCityByCondition({city_id}, city);
    if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, `City updated successfully`);
    }
    return status.ResponseStatus(res, 404, `Failed to update City`);
    } catch (error) {
    return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
},

deleteCityByCityId: async (req, res) => {
    try {
    const city_id = req.params.city_id;
    const result = await CityModel.deleteCityByCondition({city_id});
    if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, `City deleted successfully`);
    }
    return status.ResponseStatus(res, 404, `Failed to delete City`);

    } catch (error) {
    return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
},

};

module.exports = cityController;
