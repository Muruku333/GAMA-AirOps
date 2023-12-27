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
    getAllAirportsWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT ap.id, ap.airport_id, ap.airport_name, ap.iata_code, ap.iaco_code, ap.latitude, ap.longitude, ap.remark, ap.critical_airport, ap.alertable_airport, ap.created_by, ap.modified_by, ap.created_at, ap.modified_at, ct.id AS ct_id, ct.city_id, ct.city_name, ct.zone_id, cu.id AS cu_id, cu.country_id, cu.country_name FROM ${table_1} AS ap
        INNER JOIN fdtl_masters_city AS ct ON ap.city_id=ct.city_id
        INNER JOIN fdtl_masters_country AS cu ON ct.country_id = cu.country_id;`);
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