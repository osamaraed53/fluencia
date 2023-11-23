const db = require("../models/db");

const findByEmail = async (email) => {
  const result = await db.query('SELECT * FROM admin WHERE email = $1', [email]);
  return result.rows[0];
};

const createSubadmin = async ( first_name,last_name,email,password ,role) => {
  const result = await db.query(
    'INSERT INTO admin( first_name,last_name,email,password,role ) VALUES($1, $2, $3,$4,$5) RETURNING *',
    [ first_name,last_name,email,password ,role]
  );
  return result.rows[0];
};

const checkEmail = async (email) => {
    
    const result = await db.query('SELECT * FROM admin WHERE email = $1 ', [
      email,
    ]);
    return result.rows[0];
  };








module.exports = {
    findByEmail,
    createSubadmin,
    checkEmail,
    // updateUser
  };