const db = require("../../services/db_service");
const table_1 = "fdtl_masters_groups";
const table_2 = "fdtl_masters_group_members";

const group = {
    createGroup: async (groupData)=>{
        const [rows] = await db.query(`INSERT INTO ${table_1} SET ?`, groupData);
        return rows;
    },
    createGroupMembers: async (membersData)=>{
        const [rows] = await db.query(`INSERT INTO ${table_2} (group_id, crew_id, on_duty_as) VALUES ?`, [membersData]);
        return rows;
    },
    getAllGroups: async ()=>{
        const [rows, fields] = await db.query(`SELECT * FROM ${table_1};`);
        return rows;
    },
    getGroupById: async (id)=>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table_1} WHERE id = ?`,
            [id]
          );
          return rows;
    },
    getGroupByCondition: async (cond)=>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table_1} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },
    getGroupMembersByCondition: async (cond)=>{
        const [rows, fields] = await db.query(
            `SELECT * FROM ${table_2} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },
    updateGroupById: async(id, update)=>{
        const [rows] = await db.query(
            `UPDATE ${table_1} SET ? WHERE id = ?`,[update,id]
          );
          return rows;
    },
    updateGroupByCondition: async(cond, update)=>{
        const [rows] = await db.query(
            `UPDATE ${table_1} SET ? WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`,[update]
          );
          return rows;
    },
    updateGroupMembersByCondition: async (cond, update)=>{
        const [rows] = await db.query(
            `UPDATE ${table_2} SET ? WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`,[update]
          );
          return rows;
    },
    deleteGroupById: async (id)=>{
        const [rows] = await db.query(
            `DELETE FROM ${table_1} WHERE id = ?`,
            [id]
          );
          return rows;
    },
    deleteGroupByCondition: async (cond)=>{
        const [rows] = await db.query(
            `DELETE FROM ${table_1} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    },
    deleteGroupMembersByCondition: async (cond)=>{
        const [rows] = await db.query(
            `DELETE FROM ${table_2} WHERE ${Object.keys(cond)
              .map((item) => `${item} = '${cond[item]}'`)
              .join(" AND ")}`
          );
          return rows;
    }
};

module.exports = group;