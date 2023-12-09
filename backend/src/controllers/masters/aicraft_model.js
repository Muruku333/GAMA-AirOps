const AircraftModel = require('../../models/masters/aircraft_model');
const status = require('../../helpers/Response');

const aircraftModelController = {
  getAllAircraftModels: async (req, res) =>{
    try{
        const aircraftModels = await AircraftModel.getAllAircraftModels();
        res.status(200).json(aircraftModels);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getAircraftModelById: async (req, res) =>{
    const model_id = req.params.id;
    try{
        const aircraftModel = await AircraftModel.getAircraftModelById(model_id);
        res.status(200).json(aircraftModel);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getAllAircraftModelsWithAuthors: async (req, res) => {
    try {
      const rows = await AircraftModel.getAllAircraftModelsWithAuthors();
      let aircraftModels = [];
      rows.map((row) => {
        const {
          id,
          name,
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
            name: name,
            single_engine: single_engine,
            wing_type: wing_type,
            created_by: {
              id: cu_id,
              first_name: cu_first_name,
              last_name: cu_last_name,
              email: cu_email,
              created_at: created_at,
            },
            modified_by: {
              id: mu_id,
              first_name: mu_first_name,
              last_name: mu_last_name,
              email: mu_email,
              modified_at: modified_at,
            },
          },
        ];
      });
      res.status(200).json(aircraftModels);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getAircraftModelByIdWithAuthors: async (req, res) => {
    const model_id = req.params.id;

    try {
      const rows = await AircraftModel.getAircraftModelByIdWithAuthors(model_id);
      const {
        id,
        name,
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
          id: id,
          name: name,
          single_engine: single_engine,
          wing_type: wing_type,
          created_by: {
            id: cu_id,
            first_name: cu_first_name,
            last_name: cu_last_name,
            email: cu_email,
            created_at: created_at,
          },
          modified_by: {
            id: mu_id,
            first_name: mu_first_name,
            last_name: mu_last_name,
            email: mu_email,
            modified_at: modified_at,
          },
        },
      ];

      res.status(200).json(aircraftModel);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

};

module.exports = aircraftModelController;
