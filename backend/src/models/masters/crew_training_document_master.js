const db = require("../../services/db_service");
const table = "fdtl_masters_crew_training_doc_master";

const CTDM ={
    createCTDM: async (ctdmData)=>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`, ctdmData);
        return rows;
    },
    getAllCTDM: async ()=>{
        const [rows, fields] = await db.query(`SELECT * FROM ${table};`);
        return rows;
    },
    getCTDMById: async()=>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table} WHERE id = ?`,
            [id]
          );
          return rows;
    },
    getCTDMByCondition: async(cond)=>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table} WHERE ${Object.keys(cond)
              .map((item) => `${item}= '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },
    updateCTDMById: async(id, update)=>{
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [
            update,
            id,
          ]);
          return rows;
    },
    updateCTDMByCondition: async(cond, update)=>{
        const [rows] = await db.query(
            `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`,
            [update]
          );
          return rows;
    },
    deleteCTDMById: async (id)=>{
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
    },
    deleteCTDMByCondition: async(cond)=>{
        const [rows] = await db.query(
            `DELETE FROM ${table} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },
};

module.exports = CTDM;