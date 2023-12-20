// Import necessary modules
const db = require("../../services/db_service");
const table = "fdtl_masters_delay_explanation";

// Define the model for delay explanation operations
const delayExplanation = {
    createDelayExplanation: async (delayExplanationData) => {
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`, delayExplanationData);
        return rows;
    },

    getAllDelayExplanations: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table};`);
        return rows;
    },

    getDelayExplanationById: async () =>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table} WHERE id = ?`,
            [id]
          );
          return rows;
    },

    getAllDelayExplanationsWithCategory: async ()=>{
        const [rows, fields] = await db.query(`SELECT de.id AS de_id, de.explanation_id, de.explanation_name, dc.id AS dc_id, dc.category_id, dc.category_name, dc. delay_type  FROM ${table} AS de
        INNER JOIN gama_db.fdtl_masters_delay_category AS dc ON de.delay_category_id = dc.category_id`);
        return rows;
    },

    getDelayExplanationByExplanationIdWithCategory: async (id) => {
        const [rows, fields] = await db.query(`SELECT de.id AS de_id, de.explanation_id, de.explanation_name, dc.id AS dc_id, dc.category_id, dc.category_name, dc. delay_type  FROM ${table} AS de
        INNER JOIN gama_db.fdtl_masters_delay_category AS dc ON de.delay_category_id=dc.category_id WHERE de.explanation_id = ?`, [id]);
        return rows;
    },

    updateDelayExplanationById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [
            update,
            id,
          ]);
          return rows;
    },

    updateDelayExplanationByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },

    deleteDelayExplanationById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
    },

    deleteDelayExplanationByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
};

// Export the model
module.exports = delayExplanation;
