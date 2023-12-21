const CTDMModel = require("../../models/masters/crew_training_document_master");
const status = require("../../helpers/Response");
const { validationResult } = require('express-validator');

const CTDMController = {
  createCTDM: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const {
        type,
        ctdmName,
        groupCode,
        warningDays,
        frequencyUnit,
        frequency,
        renewalPeriod,
        createdBy,
      } = req.body;
      const CTDM = {
        type,
        ctdm_name: ctdmName,
        group_code: groupCode,
        warning_days: warningDays,
        frequency_unit: frequencyUnit,
        frequency,
        renewal_period: renewalPeriod,
        created_by: createdBy,
        modified_by: createdBy,
      };
      const result = await CTDMModel.createCTDM(CTDM);
      if (result.insertId > 0) {
        return status.ResponseStatus(
          res,
          201,
          `Crew Training/Document Master created successfully`
        );
      }
      return status.ResponseStatus(
        res,
        400,
        `Failed to create rew Training/Document Master`
      );
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", {
        error: error.message,
      });
    }
  },

  getAllCTDMs: async (req, res) => {
    try {
      const CTDMs = await CTDMModel.getAllCTDM();
      if (CTDMs.length > 0) {
        return status.ResponseStatus(
          res,
          200,
          "List of all Crew Training/Document Masters",
          CTDMs
        );
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", {
        error: error.message,
      });
    }
  },

  getCTDMsByCTDMId: async (req, res) => {
    try {
      const ctdm_id = req.params.ctdm_id;
      const CTDM = await CTDMModel.getCTDMByCondition({ ctdm_id });
      if (CTDM.length > 0) {
        return status.ResponseStatus(
          res,
          200,
          `Details of Crew Training/Document Master(${ctdm_id})`,
          CTDM
        );
      }
      return status.ResponseStatus(res, 400, `No data found for ${ctdm_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", {
        error: error.message,
      });
    }
  },

  updateCTDMByCTDMId: async (req, res) => {
    const doc_id = req.params.id;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const {
        type,
        ctdmName,
        groupCode,
        warningDays,
        frequencyUnit,
        frequency,
        renewalPeriod,
        modifiedBy,
      } = req.body;
      const CTDM = {
        type,
        ctdm_name: ctdmName,
        group_code: groupCode,
        warning_days: warningDays,
        frequency_unit: frequencyUnit,
        frequency,
        renewal_period: renewalPeriod,
        modified_by: modifiedBy,
      };
      const ctdm_id = req.params.ctdm_id;
      const result = await CTDMModel.updateCTDMByCondition({ ctdm_id }, CTDM);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res,200,`Crew Training Document Master updated successfully`);
      }
      return status.ResponseStatus(res,404,`Failed to update Crew Training Document Master`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", {
        error: error.message,
      });
    }
  },

  deleteCTDMByCTDMId: async (req, res) => {
    try {
        const ctdm_id = req.params.ctdm_id;
        const result = await CTDMModel.deleteCTDMByCondition({ctdm_id});
        if (result.affectedRows > 0) {
            return status.ResponseStatus(res, 200, `Crew Training Document Master deleted successfully`);
        }
        return status.ResponseStatus(res, 404, `Failed to delete Crew Training Document Master`);
    
        } catch (error) {
        return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
        }
  },
};

module.exports = CTDMController;
