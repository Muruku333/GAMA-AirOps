const db = require("../../services/db_service");

const aircraftModel = {
  getAllAircraftModels: async () => {
    const [rows,fields ]= await db.query("SELECT * FROM fdtl_masters_aircraft_model;");
    return rows;
  },
  getAircraftModelById: async (id) => {
    const [rows,fields ] = await db.query("SELECT * FROM fdtl_masters_aircraft_model WHERE id = ?",[id]);
    return rows;
  },
  getAllAircraftModelsWithAuthors: async () => {
    const [rows,fields ] =
      await db.query(`SELECT mam.id, mam.name,mam.single_engine,mam.wing_type, cu.user_id AS cu_id , cu.first_name AS cu_first_name, cu.last_name AS cu_last_name, cu.email AS cu_email,mam.created_at, mu.user_id AS mu_id , mu.first_name AS mu_first_name, mu.last_name AS mu_last_name, mu.email AS mu_email, mam.modified_at FROM fdtl_masters_aircraft_model AS mam
        INNER JOIN users AS cu ON mam.created_by=cu.user_id
        INNER JOIN users AS mu ON mam.modified_by=mu.user_id`);
    return rows;
  },
  getAircraftModelByIdWithAuthors: async (id) => {
    const [rows,fields ] = await db.query(`SELECT mam.id, mam.name,mam.single_engine,mam.wing_type, cu.user_id AS cu_id , cu.first_name AS cu_first_name, cu.last_name AS cu_last_name, cu.email AS cu_email,mam.created_at, mu.user_id AS mu_id , mu.first_name AS mu_first_name, mu.last_name AS mu_last_name, mu.email AS mu_email, mam.modified_at FROM fdtl_masters_aircraft_model AS mam
        INNER JOIN users AS cu ON mam.created_by=cu.user_id
        INNER JOIN users AS mu ON mam.modified_by=mu.user_id WHERE mam.id = ?`,[id]);
    return rows;
  },
};

module.exports = aircraftModel;
