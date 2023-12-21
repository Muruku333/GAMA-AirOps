const db = require("../../services/db_service");
const table = "fdtl_masters_aircraft";

const aircraft = {
    createAircraft: async (aircraftData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`, aircraftData);
        return rows;
    },
    getAllAircrafts: async () =>{
        const [rows, fields] = await db.query(`SELECT * FROM ${table};`);
        return rows;
    },
    getAircraftById: async (id) =>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table} WHERE id = ?`,
            [id]
          );
          return rows;
    },
    getAllAircraftsWithMappedData: async()=>{
        const [rows, fields] = await db.query(`SELECT ac.id, ac.aircraft_id, ac.reg_no, ac.min_cabin_crew, ac.min_flight_crew, ac.no_of_captain, ac.no_of_fo, ac.no_of_fe, ac.c_cls_capacity, ac.y_cls_capacity, ac.seating_capacity, ac.time_format, ac.local_time, ac.utc_time, ac.block_opening_hrs, ac.time_in_air_opening_hrs, ac.not_in_service, ac.not_in_service_from, ac.freight_capacity, ac.unit, ac.last_arrival, op.id AS op_id, op.operator_id, op.operator_name, am.id AS am_id, am.model_id, am.model_name, am.single_engine, am.wing_type FROM ${table} AS ac
        INNER JOIN gama_db.fdtl_masters_operator AS op ON ac.operator_id = op.operator_id
        INNER JOIN gama_db.fdtl_masters_aircraft_model AS am ON ac.model_id = am.model_id;`);
        return rows;
    },
    getAircraftByAircraftIdWithMappedData: async(id)=>{
        const [rows, fields] = await db.query(`SELECT ac.id, ac.aircraft_id, ac.reg_no, ac.min_cabin_crew, ac.min_flight_crew, ac.no_of_captain, ac.no_of_fo, ac.no_of_fe, ac.c_cls_capacity, ac.y_cls_capacity, ac.seating_capacity, ac.time_format, ac.local_time, ac.utc_time, ac.block_opening_hrs, ac.time_in_air_opening_hrs, ac.not_in_service, ac.not_in_service_from, ac.freight_capacity, ac.unit, ac.last_arrival, op.id AS op_id, op.operator_id, op.operator_name, am.id AS am_id, am.model_id, am.model_name, am.single_engine, am.wing_type FROM ${table} AS ac
        INNER JOIN gama_db.fdtl_masters_operator AS op ON ac.operator_id = op.operator_id
        INNER JOIN gama_db.fdtl_masters_aircraft_model AS am ON ac.model_id = am.model_id WHERE ac.aircraft_id = ?;`,[id]);
        return rows;
    },
    getAircraftByCondition: async (cond)=>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },
    updateAircraftById: async(id, update)=>{
        const [rows] = await db.query(
            `UPDATE ${table} SET ? WHERE id = ?`,[update,id]
          );
          return rows;
    },
    updateAircraftByCondition: async(cond, update)=>{
        const [rows] = await db.query(
            `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`,[update]
          );
          return rows;
    },
    deleteAircraftById: async (id)=>{
        const [rows] = await db.query(
            `DELETE FROM ${table} WHERE id = ?`,
            [id]
          );
          return rows;
    },
    deleteAircraftByCondition: async (cond)=>{
        const [rows] = await db.query(
            `DELETE FROM ${table} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    }
};

module.exports = aircraft;