// Import necessary modules
const db = require("../../services/db_service");
const table = "fdtl_masters_city";
const table2 = "fdtl_masters_zone_list";

// Define the model for delay explanation operations
const city = {
    createCity: async (cityData) => {
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`, cityData);
        return rows;
    },

    getAllZones: async ()=>{
        const [rows, fields] = await db.query(`SELECT * FROM ${table2};`);
        return rows;
    },

    getAllCities: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table};`);
        return rows;
    },

    getCityById: async () =>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table} WHERE id = ?`,
            [id]
          );
          return rows;
    },

    getAllCitiesWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT ct.id, ct.city_id, ct.city_name, ct.zone_id, zo.zone, zo.gmt, ct.country_id, co.country_name FROM ${table} AS ct
        INNER JOIN ${table2} AS zo ON ct.zone_id = zo.id
        INNER JOIN fdtl_masters_country AS co ON ct.country_id = co.country_id;`);
        return rows;
    },

    getCityByCityIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT ct.id, ct.city_id, ct.city_name, ct.zone_id, zo.zone, zo.gmt, ct.country_id, co.country_name FROM ${table} AS ct
        INNER JOIN ${table2} AS zo ON ct.zone_id = zo.id
        INNER JOIN fdtl_masters_country AS co ON ct.country_id = co.country_id WHERE ct.city_id = ?`, [id]);
        return rows;
    },

    updateCityById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [
            update,
            id,
          ]);
          return rows;
    },

    updateCityByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },

    deleteCityById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
    },

    deleteCityByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
};

// Export the model
module.exports = city;
