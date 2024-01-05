const CrewModel = require("../../models/masters/crew");
const status = require("../../helpers/Response");
const { validationResult } = require("express-validator");

const CrewController = {

    createCrew: async (req, res) =>{
        let result;
        let crew_id;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return status.ResponseStatus(res, 400, "Validation Failed", errors);
            }

            const {operatorId, photo, name, gender, code, nationality, city, designation, onDutyAs, countryCode, mobileNo, dateOfBirth, dateOfJoining, email, passportNo, notInService, notInServiceFrom, models, criticalAirports, createdBy}=req.body;
            // console.log(photo);
            const crew ={
                operator_id: operatorId,
                photo,
                name,
                gender,
                code,
                nationality,
                city,
                designation,
                on_duty_as: onDutyAs,
                country_code: countryCode,
                mobile_no: mobileNo,
                date_of_birth: dateOfBirth,
                date_of_joining: dateOfJoining,
                email,
                passport_no: passportNo,
                not_in_service: notInService,
                not_in_service_from: notInServiceFrom,
                created_by: createdBy,
                modified_by: createdBy
            }
            result = await CrewModel.createCrew(crew);
            if(result.insertId > 0){
                let modelsResult;
                let airportsResult;

                const crew = await CrewModel.getCrewById(result.insertId);
                crew_id= crew[0].crew_id;

                if(models.length > 0){
                    const modelsData = await models.map((model)=> [
                        crew_id,
                        model.model_id,
                    ]);

                    modelsResult = await CrewModel.createAircraftModels(modelsData);
                }

                if(criticalAirports.length > 0){
                    const airportsData = await criticalAirports.map((airport)=>[
                        crew_id,
                        airport.airport_id,
                    ])

                    airportsResult = await CrewModel.createCriticalAirports(airportsData);
                }

                if((models.length > 0 && !modelsResult.affectedRows>0)||(criticalAirports.length > 0 && !airportsResult.affectedRows>0)){
                    await CrewModel.deleteCrewByCondition({crew_id});
                    return status.ResponseStatus(res, 400, `Failed to create Crew`);
                }
                return status.ResponseStatus(res, 201, `Crew created successfully`);
            }
            return status.ResponseStatus(res, 400, `Failed to create Crew`);
        } catch (error) {
            console.log(error);
            return status.ResponseStatus(res, 500, "Internal server error", {
                error: error.message,
              });
        }
    },

    getAllCrews: async (req, res) =>{
        try {
            const crews = await CrewModel.getAllCrews();
            if(crews.length>0){
                const crewList=crews.map((crew)=>{
                    if(crew.photo){
                        const base64data = Buffer.from(crew.photo, 'binary').toString();
                        return {
                            ...crew,
                            photo:base64data,
                        }
                    }
                    return crew;
                })
                return status.ResponseStatus(
                    res,
                    200,
                    "List of all Crews",
                    crewList
                  );
            }
            return status.ResponseStatus(res, 400, "No data found");
        } catch (error) {
            return status.ResponseStatus(res, 500, "Internal server error", {
                error: error.message,
              });
        }
    },

    getCrewByCrewId: async (req, res) =>{
        try {
            const crew_id = req.params.crew_id;
            const crew = await CrewModel.getCrewByCondition({crew_id});
            if(crew.length>0){
                const applicable_models = await CrewModel.getAircraftModelsByCondition({crew_id});
                const critical_airports = await CrewModel.getCriticalAirportsByCondition({crew_id});

                let crewData =[
                    {
                        ...crew[0],
                        applicable_models,
                        critical_airports,
                    }
                ];

                if(crew[0].photo){
                    const base64data = Buffer.from(crew[0].photo, 'binary').toString();
                    crewData=[
                        {
                            ...crew[0],
                            applicable_models,
                            critical_airports,
                            photo:base64data,
                        }
                    ]
                }
                
                return status.ResponseStatus(
                    res,
                    200,
                    `Details of Crew(${crew_id})`,
                    crewData
                  );
            }
            return status.ResponseStatus(res, 400, `No data found for ${crew_id}`);
        } catch (error) {
            return status.ResponseStatus(res, 500, "Internal server error", {
                error: error.message,
              });
        }
    },

    updateCrewByCrewId: async (req, res)=>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return status.ResponseStatus(res, 400, "Validation Failed", errors);
            }
            const crew_id = req.params.crew_id;
            const {operatorId, photo, name, gender, code, nationality, city, designation, onDutyAs, countryCode, mobileNo, dateOfBirth, dateOfJoining, email, passportNo, notInService, notInServiceFrom, models, criticalAirports, modifiedBy}=req.body;
            let modelsResult;
            let airportsResult;
            console.log(req.body);
            const initialResult = await CrewModel.getCrewByCondition({crew_id});
            if(initialResult.length<1){
                return status.ResponseStatus(res, 404, "Crew not found");
            }
            const crew ={
                operator_id: operatorId,
                photo,
                name,
                gender,
                code,
                nationality,
                city,
                designation,
                on_duty_as: onDutyAs,
                country_code: countryCode,
                mobile_no: mobileNo,
                date_of_birth: dateOfBirth,
                date_of_joining: dateOfJoining,
                email,
                passport_no: passportNo,
                not_in_service: notInService,
                not_in_service_from: notInServiceFrom,
                modified_by: modifiedBy
            };

            const result = await CrewModel.updateCrewByCondition({crew_id},crew);

            if(result.affectedRows >0){
                await CrewModel.deleteAircraftModelsByCondition({crew_id});
                await CrewModel.deleteCriticalAirportsByCondition({crew_id});

                if(models.length>0){
                    const modelsData = await models.map((model)=>[
                        crew_id,
                        model.model_id,
                    ]);

                    modelsResult = await CrewModel.createAircraftModels(modelsData);
                }

                if(criticalAirports.length>0){
                    const airportsData = await criticalAirports.map((airport)=>[
                        crew_id,
                        airport.airport_id,
                    ]);

                    airportsResult = await CrewModel.createCriticalAirports(airportsData);
                }
                return status.ResponseStatus(res, 200, `Crew updated successfully`);
            }
            return status.ResponseStatus(res, 404, `Failed to update Crew`);
        } catch (error) {
            console.log(error);
            return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
        }
    },

    deleteCrewByCrewId: async (req, res)=>{
        try {
            const crew_id = req.params.crew_id;
            const result = await CrewModel.deleteCrewByCondition({crew_id});
      
            if (result.affectedRows > 0) {
              return status.ResponseStatus(res, 200, `Crew deleted successfully`);
            }
            return status.ResponseStatus(res, 404, `Failed to delete Crew`);
          } catch (error) {
            return status.ResponseStatus(res, 500, "Internal server error", {
              error: error.message,
            });
          }
    }
};

module.exports = CrewController;