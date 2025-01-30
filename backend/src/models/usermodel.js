// const db = require("../util/helper");

// // User Model
// const UserModel = {
//     findById: async (id) => {
//         const sql = "SELECT * FROM users WHERE id = :id";
//         const [data] = await db.query(sql, { id });
//         return data.length ? data[0] : null;
//     },

//     findByUsername: async (username) => {
//         const sql = "SELECT * FROM users WHERE username = :username";
//         const [data] = await db.query(sql, { username });
//         return data.length ? data[0] : null;
//     },

//     createUser: async ({ role_id, name, username, password, create_by }) => {
//         const sql = `INSERT INTO users (role_id, name, username, password, create_by)
//                 VALUES (:role_id, :name, :username, :password, :create_by)`;
//         const [result] = await db.query(sql, { role_id, name, username, password, create_by });
//         return result.insertId;
//     },
// };

// module.exports = UserModel;
