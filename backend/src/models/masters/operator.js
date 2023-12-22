const db = require("../../services/db_service");
const table = "fdtl_masters_operator";

const operator ={
    getAllOperators: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table};`);
        return rows;
      },
}

module.exports = operator;