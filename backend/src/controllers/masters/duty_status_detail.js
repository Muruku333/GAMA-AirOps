const DutyStatusDetailModel = require('../../models/masters/duty_status_detail');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');

const DutyStatusDetailController = {

    createDutyStatusDetail: async (req, res)=>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return status.ResponseStatus(res, 400, "Validation Failed", errors);
            }
            const {dutyStatus, dutyName, description, timeFormat, fromTime, toTime, totalTime, onDutyAs, prevDay, nextDay, createdBy}= req.body;
            const dutyStatusDetail ={
                duty_status: dutyStatus,
                duty_name: dutyName,
                description,
                time_format: timeFormat,
                local_time: timeFormat === 'Local',
                utc_time: timeFormat === 'UTC',
                from_time: fromTime,
                to_time: toTime,
                total_time: totalTime,
                on_duty_as: onDutyAs,
                prev_day: prevDay,
                next_day: nextDay,
                created_by: createdBy,
                modified_by: createdBy
            }
            const result = await DutyStatusDetailModel.createDutyStatusDetail(dutyStatusDetail);
            if(result.insertId>0){
                return status.ResponseStatus(res, 201, `Duty Status Detail created successfully`);
            }
            return status.ResponseStatus(res, 400, `Failed to create Duty Status Detail`);
        } catch (error) {
            return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
        }
    },

    getAllDutyStatusDetails: async (req, res) =>{
        try {
            const dutyStatusDetails = await DutyStatusDetailModel.getAllDutyStatusDetails();
            if(dutyStatusDetails.length>0){
                return status.ResponseStatus(res, 200, "List of all Duty Status Details", dutyStatusDetails);
            }
            return status.ResponseStatus(res,400,"No data found");
        } catch (error) {
            return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
        }
    },

    getDutyStatusDetailByDutyId: async (req, res)=>{
        try {
            const duty_id = req.params.duty_id;
            const rows = await DutyStatusDetailModel.getDutyStatusDetailByCondition({duty_id});
            if(rows.length>0){
                const dutyStatusDetail = [
                    {
                        ...rows[0],
                    }
                ]
                return status.ResponseStatus(res, 200, `Details of Duty Status Detail(${duty_id})`, dutyStatusDetail);

            }
            return status.ResponseStatus(res,400,`No data found for ${duty_id}`);
        } catch (error) {
            return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
        }
    },

    updateDutyStatusDetailByDutyId: async (req, res)=>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return status.ResponseStatus(res, 400, "Validation Failed", errors);
            }
            const duty_id = req.params.duty_id;
            const {dutyStatus, dutyName, description, timeFormat, fromTime, toTime, totalTime, onDutyAs, prevDay, nextDay, modifiedBy}= req.body;
            const dutyStatusDetail ={
                duty_status: dutyStatus,
                duty_name: dutyName,
                description,
                time_format: timeFormat,
                local_time: timeFormat === 'Local',
                utc_time: timeFormat === 'UTC',
                from_time: fromTime,
                to_time: toTime,
                total_time: totalTime,
                on_duty_as: onDutyAs,
                prev_day: prevDay,
                next_day: nextDay,
                modified_by: modifiedBy
            }
            const result = await DutyStatusDetailModel.updateDutyStatusDetailByCondition({duty_id},dutyStatusDetail);
            if (result.affectedRows > 0) {
                return status.ResponseStatus(res, 200, `Duty Status Detail updated successfully`);
            }
            return status.ResponseStatus(res, 404, `Failed to update Duty Status Detail`);
            } catch (error) {
            return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
            }
    },

    deleteDutyStatusDetail: async (req, res)=>{
        try {
            const duty_id = req.params.duty_id;
            const result = await DutyStatusDetailModel.deleteDutyStatusDetailByCondition({duty_id});
            if(result.affectedRows>0){
                return status.ResponseStatus(res, 200, 'Duty Status Detail deleted successfully');
            }
            return status.ResponseStatus(res, 404, `Failed to delete Duty Status Detail`);

        } catch (error) {
        return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
        }
    }
};

module.exports = DutyStatusDetailController;
