const db = require("../../services/db_service");
const table = "fdtl_masters_hotel";


const hotelModel = {
    getAllHotels: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table};`);
        return rows;
    },


    getHotelById: async (id) => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
        return rows;
    },


    createHotel: async (hotelData) => {
        const { name, address, city, phone_no, email, created_by, modified_by } = hotelData;


        const sql = `
        INSERT INTO ${table}
            (name, address, city, phone_no, email, created_by, modified_by)
        VALUES (?, ?, ?, ?, ?, ?, ?);
        `;


        const values = [name, address, city, phone_no, email, created_by, modified_by];


        const [result] = await db.query(sql, values);
        return result.insertId;
    },


    updateHotelById: async (id, hotelData) => {
        const { name, address, city, phone_no, email, modified_by } = hotelData;


        const sql = `
        UPDATE ${table}
        SET
            name = ?, address = ?, city = ?, phone_no = ?, email = ?, modified_by = ?
        WHERE id = ?;
        `;


        const values = [name, address, city, phone_no, email, modified_by, id];


        const [result] = await db.query(sql, values);
        return result.affectedRows;
    },


    deleteHotelById: async (id) => {
        const sql = `DELETE FROM ${table} WHERE id = ?;`;
        const [result] = await db.query(sql, [id]);
        return result.affectedRows;
    },
};


module.exports = hotelModel;
