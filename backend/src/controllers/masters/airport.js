const AirportModel = require("../../models/masters/airport");
const status = require("../../helpers/Response");
const { validationResult } = require("express-validator");

const AirportController = {
  createAirport: async (req, res) => {
    let result;
    let airport_id;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const {
        airportName,
        IATACode,
        IACOCode,
        cityId,
        latitude,
        longitude,
        remark,
        criticalAirport,
        alertableAirport,
        attachments,
        watchHrs,
        createdBy,
      } = req.body;
      const airport = {
        airport_name: airportName,
        iata_code: IATACode,
        iaco_code: IACOCode,
        city_id: cityId,
        latitude,
        longitude,
        remark,
        critical_airport: criticalAirport,
        alertable_airport: alertableAirport,
        created_by: createdBy,
        modified_by: createdBy,
      };
      result = await AirportModel.createAirport(airport);
      if (result.insertId > 0) {
        let watchHrsResult;
        let attachmentResult;
        const airport = await AirportModel.getAirportById(result.insertId);
        airport_id = airport[0].airport_id;
        if (attachments.length > 0) {
          const attachmentsData = await attachments.map((attachment) => [
            airport_id,
            attachment.fileName,
            attachment.fileData,
          ]);
          // console.log(attachmentsData);
          attachmentResult = await AirportModel.createAttachments(
            attachmentsData
          );
          //---
        }

        if (watchHrs.length > 0) {
          const watchHrsData = await watchHrs.map((watchHr) => [
            airport_id,
            watchHr.fromTime,
            watchHr.toTime,
            watchHr.monday,
            watchHr.tuesday,
            watchHr.wednesday,
            watchHr.thursday,
            watchHr.friday,
            watchHr.saturday,
            watchHr.sunday,
          ]);
          // console.log(watchHrsData);
          watchHrsResult = await AirportModel.createWatchHrs(watchHrsData);
          //---
        }
        if (
          (attachments.length > 0 && !attachmentResult.affectedRows > 0) ||
          (watchHrs.length > 0 && !watchHrsResult.affectedRows > 0)
        ) {
          await AirportModel.deleteAirportByCondition({ airport_id });
          return status.ResponseStatus(res, 400, `Failed to create Airport`);
        }
        return status.ResponseStatus(res, 201, `Airport created successfully`);
      }
      return status.ResponseStatus(res, 400, `Failed to create Airport`);
    } catch (error) {
      // console.log(error);
      // if(result.insertId>0){
      //     await AirportModel.deleteAirportById(result.insertId);
      // }
      return status.ResponseStatus(res, 500, "Internal server error", {
        error: error.message,
      });
    }
  },

  getAllAirports: async (req, res) => {
    try {
      const airports = await AirportModel.getAllAirports();
      if (airports.length > 0) {
        return status.ResponseStatus(
          res,
          200,
          "List of all Airports",
          airports
        );
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", {
        error: error.message,
      });
    }
  },

  getAllCriticalAirports: async (req, res)=>{
    try {
      const airports = await AirportModel.getAirportByCondition({critical_airport:1});
      if (airports.length > 0) {
        return status.ResponseStatus(
          res,
          200,
          "List of all Critical Airports",
          airports
        );
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", {
        error: error.message,
      });
    }
  },

  getAllAirportsWithMappedData: async (req,res)=>{
    try {
      const rows = await AirportModel.getAllAirportsWithMappedData();
      if(rows.length>0){
        let airports =[];
        rows.map((row)=>{
          const {
            id,
            airport_id,
            airport_name,
            iata_code,
            iaco_code,
            latitude,
            longitude,
            remark,
            critical_airport,
            alertable_airport,
            ct_id,
            city_id,
            city_name,
            zone_id,
            cu_id,
            country_id,
            country_name,
            created_by,
            modified_by,
            created_at,
            modified_at
          }= row;

          airports =[
            ...airports,
            {
              id,
              airport_id,
              airport_name,
              iata_code,
              iaco_code,
              city:{
                id: ct_id,
                city_id,
                city_name,
                zone_id,
              },
              country: {
                id: cu_id,
                country_id,
                country_name
              },
              latitude,
              longitude,
              remark,
              critical_airport,
              alertable_airport,
              created_by,
              modified_by,
              created_at,
              modified_at
            }
          ]
        });
        return status.ResponseStatus(res, 200, "List of all Airports", airports);
      }
      return status.ResponseStatus(res,400,"No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAirportByAirportId: async (req, res) => {
    try {
      const airport_id = req.params.airport_id;
      const airport = await AirportModel.getAirportByCondition({ airport_id });
      if (airport.length > 0) {
        const attachments = await AirportModel.getAttachmentsByCondition({
          airport_id,
        });
        const watch_hrs = await AirportModel.getWatchHrsByCondition({
          airport_id,
        });

        const airportData = [
          {
            ...airport[0],
            attachments,
            watch_hrs,
          },
        ];

        return status.ResponseStatus(
          res,
          200,
          `Details of Aircraft(${airport_id})`,
          airportData
        );
      }
      return status.ResponseStatus(res, 400, `No data found for ${airport_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", {
        error: error.message,
      });
    }
  },

  updateAirportByAiportId: async(req, res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return status.ResponseStatus(res, 400, "Validation Failed", errors);
        }
        const airport_id = req.params.airport_id;
        const {
            airportName,
            IATACode,
            IACOCode,
            cityId,
            latitude,
            longitude,
            remark,
            criticalAirport,
            alertableAirport,
            attachments,
            watchHrs,
            modifiedBy,
          } = req.body;
          let watchHrsResult;
          let attachmentResult;
        const initialResult = await AirportModel.getAirportByCondition({airport_id});
        // const attachResult = await AirportModel.getAttachmentsByCondition({airport_id});
        // const watchResult = await AirportModel.getWatchHrsByCondition({airport_id});

        if(initialResult.length<1){
            return status.ResponseStatus(res, 404, "Airport not found");
        }

        const airport = {
            airport_name: airportName,
            iata_code: IATACode,
            iaco_code: IACOCode,
            city_id: cityId,
            latitude,
            longitude,
            remark,
            critical_airport: criticalAirport,
            alertable_airport: alertableAirport,
            modified_by: modifiedBy,
          };
          const result = await AirportModel.updateAirportByCondition({airport_id},airport);

        if (result.affectedRows > 0) {

            await AirportModel.deleteAttachmentsByCondition({airport_id});
            await AirportModel.deleteWatchHrsByCondition({airport_id});

            if (attachments.length > 0) {
              const attachmentsData = await attachments.map((attachment) => [
                airport_id,
                attachment.fileName,
                attachment.fileData,
              ]);
              // console.log(attachmentsData);
              attachmentResult = await AirportModel.createAttachments(
                attachmentsData
              );
              //---
            }
            if (watchHrs.length > 0) {
                    const watchHrsData = await watchHrs.map((watchHr) => [
                      airport_id,
                      watchHr.fromTime,
                      watchHr.toTime,
                      watchHr.monday,
                      watchHr.tuesday,
                      watchHr.wednesday,
                      watchHr.thursday,
                      watchHr.friday,
                      watchHr.saturday,
                      watchHr.sunday,
                    ]);
                    // console.log(watchHrsData);
                    watchHrsResult = await AirportModel.createWatchHrs(watchHrsData);
                    //---
            }

            return status.ResponseStatus(res, 200, `Airport updated successfully`);
        }
        return status.ResponseStatus(res, 404, `Failed to update Airport`);

    } catch (error) {
        return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  deleteAirportByAirportId: async (req, res) => {
    try {
      const airport_id = req.params.airport_id;
      const result = await AirportModel.deleteAirportByCondition({airport_id});

      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, `Airport deleted successfully`);
      }
      return status.ResponseStatus(res, 404, `Failed to delete Airport`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", {
        error: error.message,
      });
    }
  },

};

module.exports = AirportController;
