const db = require("../../services/db_service");
const table_1 = "fdtl_masters_crew";
const table_2= "fdtl_masters_crew_applicable_aircraft_models";
const table_3 = "fdtl_masters_crew_applicable_critical_airports";

const crew ={
    createCrew: async (crewData) =>{
        const [rows] = await db.query(`INSERT INTO ${table_1} SET ?`, crewData);
        return rows;
    },
    createAircraftModels: async (modelData) =>{
        const [rows] = await db.query(`INSERT INTO ${table_2} (crew_id, model_id) VALUES ?`, [modelData]);
        return rows;
    },
    createCriticalAirports: async (airpotsData) =>{
        const [rows] = await db.query(`INSERT INTO ${table_3} (crew_id, airport_id) VALUES ?`, [airpotsData]);
        return rows;
    },
    getAllCrews: async ()=>{
        const [rows, fields] = await db.query(`SELECT * FROM ${table_1};`);
        return rows;
    },
    getCrewById: async (id)=>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table_1} WHERE id = ?`,
            [id]
          );
          return rows;
    },
    getCrewByCondition: async (cond)=>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table_1} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },
    getAircraftModelsByCondition: async(cond)=>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table_2} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },
    getCriticalAirportsByCondition: async (cond)=>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table_3} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },
    updateCrewById: async (id,update)=>{
        const [rows] = await db.query(
            `UPDATE ${table_1} SET ? WHERE id = ?`,[update,id]
          );
          return rows;
    },
    updateCrewByCondition: async (cond, update)=>{
        const [rows] = await db.query(
            `UPDATE ${table_1} SET ? WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`,[update]
          );
          return rows;
    },
    updateAicraftModelsByCondition: async(cond,update)=>{
        const [rows] = await db.query(
            `UPDATE ${table_2} SET ? WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`,[update]
          );
          return rows;
    },
    updateCriticalAirportsByCondition: async (cond, update)=>{
        const [rows] = await db.query(
            `UPDATE ${table_3} SET ? WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`,[update]
          );
          return rows;
    },
    deleteCrewById: async(id)=>{
        const [rows] = await db.query(
            `DELETE FROM ${table_1} WHERE id = ?`,
            [id]
          );
          return rows;
    },
    deleteCrewByCondition: async(cond)=>{
        const [rows] = await db.query(
            `DELETE FROM ${table_1} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },
    deleteAircraftModelsByCondition: async (cond)=>{
        const [rows] = await db.query(
            `DELETE FROM ${table_2} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },
    deleteCriticalAirportsByCondition: async (cond)=>{
        const [rows] = await db.query(
            `DELETE FROM ${table_3} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    }
};

module.exports = crew;