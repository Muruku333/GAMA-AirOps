const db = require("../../services/db_service");
const table_1 = "fdtl_masters_airport";
const table_2= "fdtl_masters_airport_attachments";
const table_3 = "fdtl_masters_airport_watch_hrs";

const airport ={
    createAirport: async (airportData)=>{
        const [rows] = await db.query(`INSERT INTO ${table_1} SET ?`, airportData);
        return rows;
    },
    createAttachments: async (attachmentsData) =>{
        const [rows] = await db.query(`INSERT INTO ${table_2} (airport_id, file_name, file_data) VALUES ?`, [attachmentsData]);
        return rows;
    },
    createWatchHrs: async (watchHrsData) =>{
        const [rows] = await db.query(`INSERT INTO ${table_3} (airport_id, from_time, to_time, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ?`, [watchHrsData]);
        return rows;
    },
    getAllAirports: async () =>{
        const [rows, fields] = await db.query(`SELECT * FROM ${table_1};`);
        return rows;
    },
    getAirportById: async (id)=>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table_1} WHERE id = ?`,
            [id]
          );
          return rows;
    },
    getAirportByCondition: async (cond) =>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table_1} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },
    getAttachmentsByCondition: async (cond)=>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table_2} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },
    getWatchHrsByCondition: async (cond)=>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table_3} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },
    updateAirportById: async(id, update)=>{
        const [rows] = await db.query(
            `UPDATE ${table_1} SET ? WHERE id = ?`,[update,id]
          );
          return rows;
    },
    updateAirportByCondition: async (cond,update)=>{
        const [rows] = await db.query(
            `UPDATE ${table_1} SET ? WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`,[update]
          );
          return rows;
    },
    updateAttachmentsByCondition: async (cond, update)=>{
        const [rows] = await db.query(
            `UPDATE ${table_2} SET ? WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`,[update]
          );
          return rows;
    },
    updateWatchHrsByCondition: async (cond, update)=>{
        const [rows] = await db.query(
            `UPDATE ${table_3} SET ? WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`,[update]
          );
          return rows;
    },
    deleteAirportById: async(id)=>{
        const [rows] = await db.query(
            `DELETE FROM ${table_1} WHERE id = ?`,
            [id]
          );
          return rows;
    },
    deleteAirportByCondition: async (cond)=>{
        const [rows] = await db.query(
            `DELETE FROM ${table_1} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },
    deleteAttachmentsByCondition: async (cond)=>{
        const [rows] = await db.query(
            `DELETE FROM ${table_2} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },
    deleteWatchHrsByCondition: async (cond)=>{
        const [rows] = await db.query(
            `DELETE FROM ${table_3} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    }
};

module.exports = airport;