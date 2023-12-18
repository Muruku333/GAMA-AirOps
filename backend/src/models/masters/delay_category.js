// Import necessary modules
const db = require("../../services/db_service");
const table = "fdtl_masters_delay_category";

// Define the model for delay category list operations
const delayCategory = {
    createDelayCategory: async (delayCategoryData) => {
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`, delayCategoryData);
        return rows;
    },

    getAllDelayCategories: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table};`);
        return rows;
    },

    getDelayCategoryById: async (id) => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
        return rows;
    },

    getDelayCategoryByCondition: async (cond) =>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table} WHERE ${Object.keys(cond)
              .map((item) => `${item}= '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },

    updateDelayCategoryById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [
            update,
            id,
          ]);
          return rows;
    },

    updateDelayCategoryByCondition: async (cond, update) =>{
        const [rows] = await db.query(
            `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`,
            [update]
          );
          return rows;
    },

    deleteDelayCategoryById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
    },

    deleteDelayCategoryByCondition: async(cond)=>{
        const [rows] = await db.query(
            `DELETE FROM ${table} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },
};

// Export the model
module.exports = delayCategory;
