const db = require("../../services/db_service");
const table = "fdtl_masters_hotel";


const hotel = {
    createHotel: async (hotelData) => {
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`, hotelData);
        return rows;
    },
    getAllHotels: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table};`);
        return rows;
    },
    getHotelById: async (id) => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
        return rows;
    },
    getHotelByCondition: async(cond)=>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table} WHERE ${Object.keys(cond)
              .map((item) => `${item}= '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },
    getAllHotelsWithCity: async()=>{
        const [rows, fields] = await db.query(`SELECT ho.id, ho.hotel_id, ho.hotel_name, ho.address, ho.phone_no, ho.email, ct.city_id, ct.city_name, ct.zone_id, ct.country_id FROM ${table} AS ho
        INNER JOIN fdtl_masters_city AS ct ON ho.city_id = ct.city_id;`);
        return rows;
    },
    getHotelByHotelIdWithCity: async(id)=>{
        const [rows, fields] = await db.query(`SELECT ho.id, ho.hotel_id, ho.hotel_name, ho.address, ho.phone_no, ho.email, ct.city_id, ct.city_name, ct.zone_id, ct.country_id FROM ${table} AS ho
        INNER JOIN fdtl_masters_city AS ct ON ho.city_id = ct.city_id WHERE ho.hotel_id = ?`,[id]);
        return rows;
    },
    updateHotelById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [
            update,
            id,
          ]);
          return rows;
    },
    updateHotelByCondition: async(cond, update) =>{
        const [rows] = await db.query(
            `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`,
            [update]
          );
          return rows;
    },
    deleteHotelById: async (id) => {
        const sql = `DELETE FROM ${table} WHERE id = ?;`;
        const [result] = await db.query(sql, [id]);
        return result.affectedRows;
    },
    deleteHotelByCondition: async (cond)=>{
        const [rows] = await db.query(
            `DELETE FROM ${table} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    }
};


module.exports = hotel;
