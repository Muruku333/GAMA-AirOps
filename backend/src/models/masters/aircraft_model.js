const db = require("../../services/db_service");
const table = "fdtl_masters_aircraft_model";

const aircraftModel = {
  createAircraftModel: async (modelData = {}) => {
    const [rows] = await db.query(`INSERT INTO ${table} SET ?`, modelData);
    return rows;
  },
  getAllAircraftModels: async () => {
    const [rows, fields] = await db.query(`SELECT * FROM ${table};`);
    return rows;
  },
  getAircraftModelById: async (id) => {
    const [rows, fields] = await db.query(
      `SELECT * FROM ${table} WHERE id = ?`,
      [id]
    );
    return rows;
  },
  getAircraftModelByCondition: async (cond) => {
    const [rows, fields] = await db.query(
      `SELECT * FROM ${table} WHERE ${Object.keys(cond)
        .map((item) => `${item}= '${cond[item]}'`)
        .join(" AND ")}`
    );
    return rows;
  },
  getAllAircraftModelsWithAuthors: async () => {
    const [rows, fields] =
      await db.query(`SELECT mam.id, mam.model_id, mam.model_name,mam.single_engine,mam.wing_type, cu.user_id AS cu_id , cu.first_name AS cu_first_name, cu.last_name AS cu_last_name, cu.email AS cu_email,mam.created_at, mu.user_id AS mu_id , mu.first_name AS mu_first_name, mu.last_name AS mu_last_name, mu.email AS mu_email, mam.modified_at FROM ${table} AS mam
        INNER JOIN users AS cu ON mam.created_by=cu.user_id
        INNER JOIN users AS mu ON mam.modified_by=mu.user_id`);
    return rows;
  },
  getAircraftModelByModelIdWithAuthors: async (id) => {
    const [rows, fields] = await db.query(
      `SELECT mam.id, mam.model_id, mam.model_name,mam.single_engine,mam.wing_type, cu.user_id AS cu_id , cu.first_name AS cu_first_name, cu.last_name AS cu_last_name, cu.email AS cu_email,mam.created_at, mu.user_id AS mu_id , mu.first_name AS mu_first_name, mu.last_name AS mu_last_name, mu.email AS mu_email, mam.modified_at FROM ${table} AS mam
        INNER JOIN users AS cu ON mam.created_by=cu.user_id
        INNER JOIN users AS mu ON mam.modified_by=mu.user_id WHERE mam.model_id = ?`,
      [id]
    );
    return rows;
  },
  updateAircraftModelById: async (id, update) => {
    const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [
      update,
      id,
    ]);
    return rows;
  },
  updateAircraftModelByCondition: async (cond, update) => {
    const [rows] = await db.query(
      `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
        .map((item) => `${item} = '${cond[item]}'`)
        .join(" AND ")}`,
      [update]
    );
    return rows;
  },
  deleteAircraftModelById: async (id) => {
    const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
    return rows;
  },
  deleteAircraftModelByCondition: async(cond) =>{
    const [rows] = await db.query(
      `DELETE FROM ${table} WHERE ${Object.keys(cond)
        .map((item) => `${item} = '${cond[item]}'`)
        .join(" AND ")}`
    );
    return rows;
  },
};

module.exports = aircraftModel;
