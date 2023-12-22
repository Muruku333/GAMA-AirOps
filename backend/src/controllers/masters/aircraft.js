const AircraftModel = require('../../models/masters/aircraft');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');

const AircraftController = {

createAircraft: async (req, res) => {
        try {
            // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return status.ResponseStatus(res, 400, "Validation Failed", errors);
        }
        const { operatorId, regNo, modelId, minCabinCrew, minFlightCrew, noOfCaptain, noOfFo, noOfFe, cClsCapacity, yClsCapacity, seatingCapacity, timeFormat, blockOpeningHrs, timeInAirOpeningHrs, notInService, notInServiceFrom, freightCapacity, unit, lastArrival, createdBy } = req.body;
        const aircraft={
            operator_id: operatorId,
            reg_no: regNo,
            model_id: modelId,
            min_cabin_crew: minCabinCrew,
            min_flight_crew: minFlightCrew,
            no_of_captain: noOfCaptain,
            no_of_fo: noOfFo,
            no_of_fe: noOfFe,
            c_cls_capacity: cClsCapacity,
            y_cls_capacity: yClsCapacity,
            seating_capacity: seatingCapacity,
            time_format: timeFormat,
            local_time: timeFormat === 'Local Time',
            utc_time: timeFormat === 'UTC',
            block_opening_hrs: blockOpeningHrs,
            time_in_air_opening_hrs: timeInAirOpeningHrs,
            not_in_service: notInService,
            not_in_service_from: notInServiceFrom,
            freight_capacity: freightCapacity,
            unit,
            // last_arrival: lastArrival,
            created_by: createdBy,
            modified_by: createdBy,
        }
        const result = await AircraftModel.createAircraft(aircraft);
        if(result.insertId>0){
            return status.ResponseStatus(res, 201, `Aircraft created successfully`);
        }
        return status.ResponseStatus(res, 400, `Failed to create Aircraft`);
        } catch (error) {
        // console.log(error);
        return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
        }
},

getAllAircrafts: async (req, res)=>{
 try {
    const aircrafts = await AircraftModel.getAllAircrafts();
    if(aircrafts.length>0){
        return status.ResponseStatus(res, 200, "List of all Aircrafts", aircrafts);
    }
    return status.ResponseStatus(res,400,"No data found");
 } catch (error) {
    return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
 }
},

getAllAircraftsWithMappedData: async (req, res) => {
    try {
    const rows = await AircraftModel.getAllAircraftsWithMappedData();
    if(rows.length>0){
    let aircrafts =[];
    rows.map((row)=>{
        const {
            id,
            aircraft_id,
            reg_no,
            min_cabin_crew,
            min_flight_crew,
            no_of_captain,
            no_of_fo,
            no_of_fe,
            c_cls_capacity,
            y_cls_capacity,
            seating_capacity,
            time_format,
            local_time,
            utc_time,
            block_opening_hrs,
            time_in_air_opening_hrs,
            not_in_service,
            not_in_service_from,
            freight_capacity,
            unit,
            last_arrival,
            op_id,
            operator_id,
            operator_name,
            am_id,
            model_id,
            model_name,
            single_engine,
            wing_type,
        }= row;

        aircrafts =[
            ...aircrafts,
            {
                id,
                aircraft_id,
                reg_no,
                min_cabin_crew, 
                min_flight_crew, 
                no_of_captain, 
                no_of_fo, 
                no_of_fe, 
                c_cls_capacity, 
                y_cls_capacity, 
                seating_capacity, 
                time_format, 
                local_time,
                utc_time,
                block_opening_hrs, 
                time_in_air_opening_hrs, 
                not_in_service, 
                not_in_service_from, 
                freight_capacity, 
                unit, 
                last_arrival,
                operator:{
                    id: op_id,
                    operator_id,
                    operator_name,
                }, 
                aircraft_model:{
                    id: am_id,
                    model_id,
                    model_name,
                    single_engine,
                    wing_type,
                }
            }
        ];
    });
    return status.ResponseStatus(res, 200, "List of all Aircrafts", aircrafts);
}
return status.ResponseStatus(res,400,"No data found");
    } catch (error) {
    return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
},

getAircraftByIdWithMappedData: async (req, res) => {
    try {
        const aircraft_id = req.params.aircraft_id;

    const rows = await AircraftModel.getAircraftByAircraftIdWithMappedData(aircraft_id);
    if(rows.length>0){
                const {
                    id,
                    // aircraft_id,
                    reg_no,
                    min_cabin_crew,
                    min_flight_crew,
                    no_of_captain,
                    no_of_fo,
                    no_of_fe,
                    c_cls_capacity,
                    y_cls_capacity,
                    seating_capacity,
                    time_format,
                    local_time,
                    utc_time,
                    block_opening_hrs,
                    time_in_air_opening_hrs,
                    not_in_service,
                    not_in_service_from,
                    freight_capacity,
                    unit,
                    last_arrival,
                    op_id,
                    operator_id,
                    operator_name,
                    am_id,
                    model_id,
                    model_name,
                    single_engine,
                    wing_type,
                }= rows[0];
        
               const aircraft =[
                    {
                        id,
                        aircraft_id,
                        reg_no,
                        min_cabin_crew, 
                        min_flight_crew, 
                        no_of_captain, 
                        no_of_fo, 
                        no_of_fe, 
                        c_cls_capacity, 
                        y_cls_capacity, 
                        seating_capacity, 
                        time_format, 
                        local_time,
                        utc_time,
                        block_opening_hrs, 
                        time_in_air_opening_hrs, 
                        not_in_service, 
                        not_in_service_from, 
                        freight_capacity, 
                        unit, 
                        last_arrival,
                        operator:{
                            id: op_id,
                            operator_id,
                            operator_name,
                        }, 
                        aircraft_model:{
                            id: am_id,
                            model_id,
                            model_name,
                            single_engine,
                            wing_type,
                        }
                    }
                ];
      
            return status.ResponseStatus(res, 200, `Details of Aircraft(${aircraft_id})`, aircraft);
        }
        return status.ResponseStatus(res,400,`No data found for ${aircraft_id}`);
    } catch (error) {
    return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
},

updateAircraftByAircraftId: async (req, res) => {
    try {
       console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
    }
    const aircraft_id = req.params.aircraft_id;
    const { operatorId, regNo, modelId, minCabinCrew, minFlightCrew, noOfCaptain, noOfFo, noOfFe, cClsCapacity, yClsCapacity, seatingCapacity, timeFormat, blockOpeningHrs, timeInAirOpeningHrs, notInService, notInServiceFrom, freightCapacity, unit, lastArrival, modifiedBy } = req.body;
    const aircraft = {
        operator_id: operatorId,
            reg_no: regNo,
            model_id: modelId,
            min_cabin_crew: minCabinCrew,
            min_flight_crew: minFlightCrew,
            no_of_captain: noOfCaptain,
            no_of_fo: noOfFo,
            no_of_fe: noOfFe,
            c_cls_capacity: cClsCapacity,
            y_cls_capacity: yClsCapacity,
            seating_capacity: seatingCapacity,
            time_format: timeFormat,
            local_time: timeFormat === 'Local Time',
            utc_time: timeFormat === 'UTC',
            block_opening_hrs: blockOpeningHrs,
            time_in_air_opening_hrs: timeInAirOpeningHrs,
            not_in_service: notInService,
            not_in_service_from: notInServiceFrom,
            freight_capacity: freightCapacity,
            unit,
            // last_arrival: lastArrival,
            modified_by: modifiedBy,
    }
    const result = await AircraftModel.updateAircraftByCondition({aircraft_id}, aircraft);
    if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, `Aircraft updated successfully`);
    }
    return status.ResponseStatus(res, 404, `Failed to update Aircraft`);
    } catch (error) {
        console.log(error);
    return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
},

updateAircraftLastArrivalByAircraftId: async (req, res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return status.ResponseStatus(res, 400, "Validation Failed", errors);
        }
        const aircraft_id = req.params.aircraft_id;
        const {lastArrival,modifiedBy}=req.body;
        const aircraft={
            last_arrival: lastArrival,
            modified_by: modifiedBy
        }
        const result = await AircraftModel.updateAircraftByCondition({aircraft_id}, aircraft);
        if (result.affectedRows > 0) {
            return status.ResponseStatus(res, 200, `Aircraft last arrival updated successfully`);
        }
        return status.ResponseStatus(res, 404, `Failed to update Aircraft last arrival`);
        } catch (error) {
        return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
        }
},

deleteAircraftByAircraftId: async (req, res) => {
    try {
    const aircraft_id = req.params.aircraft_id;
    const result = await AircraftModel.deleteAircraftByCondition({aircraft_id});
    if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, `Aircraft deleted successfully`);
    }
    return status.ResponseStatus(res, 404, `Failed to delete Aircraft`);

    } catch (error) {
    return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
},

};

module.exports = AircraftController;
