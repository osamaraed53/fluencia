// userModel.js

const db = require("../models/db");

const findByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const createUser = async ( first_name,last_name,email,password ) => {
  const result = await db.query(
    'INSERT INTO users( first_name,last_name,email,password ) VALUES($1, $2, $3,$4) RETURNING *',
    [ first_name,last_name,email,password ]
  );
  return result.rows[0];
};

const checkEmail = async (email) => {
    
  const result = await db.query('SELECT * FROM users WHERE email = $1 ', [
    email,
  ]);
  return result.rows[0];
};
// const checkEmailandPassword = async (email, password) => {
//   const result = await db.query('SELECT * FROM users WHERE email = $1 AND password = $2 LIMIT 1', [email, password]);
//   return result.rows.length > 0 ? result.rows[0] : null;
// };


const updateUser = async ( first_name, last_name, email, password,user_id) => {
    const queryText =
      "UPDATE users SET first_name = $2, last_name = $3, email = $4, password = $5 WHERE user_id = $1";
    const values = [user_id, first_name, last_name, email, password];
    return db.query(queryText, values);
  };

module.exports = {
  findByEmail,
  createUser,
  checkEmail,
  updateUser
};