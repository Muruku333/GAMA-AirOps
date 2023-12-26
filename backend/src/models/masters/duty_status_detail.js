const db = require("../../services/db_service");
const table = "fdtl_masters_duty_status_details";

const dutyStatusDetail ={
    createDutyStatusDetail: async (dutyStatusData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`, [dutyStatusData]);
        return rows;
    },

    getAllDutyStatusDetails: async () =>{
        const [rows, fields] = await db.query(`SELECT * FROM ${table};`);
        return rows;
    },

    getDutyStatusDetailById: async (id) =>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table} WHERE id = ?`,
            [id]
          );
          return rows;
    },

    getDutyStatusDetailByCondition: async (cond) =>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },

    updateDutyStatusDetailById: async (id, update) =>{
        const [rows] = await db.query(
            `UPDATE ${table} SET ? WHERE id = ?`,[update,id]
          );
          return rows;
    },

    updateDutyStatusDetailByCondition: async (cond,update)=>{
        const [rows] = await db.query(
            `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`,[update]
          );
          return rows;
    },

    deleteDutyStatusDetailById: async (id)=>{
        const [rows] = await db.query(
            `DELETE FROM ${table} WHERE id = ?`,
            [id]
          );
          return rows;
    },

    deleteDutyStatusDetailByCondition: async (cond)=>{
        const [rows] = await db.query(
            `DELETE FROM ${table} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    }
};

module.exports = dutyStatusDetail;