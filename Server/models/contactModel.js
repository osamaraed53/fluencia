const db = require("../models/db");

const addContactUs = async (name, email, message ,user_id) => {
  const queryText =
    "INSERT INTO contact_us ( name, email, message , user_id) VALUES ($1, $2, $3,$4)";
  const values = [name, email, message,user_id];
  return db.query(queryText, values);
};

const getContactUsData = async () => {
  const queryText = "SELECT * FROM contact_us WHERE deleted = false";
  return db.query(queryText);
};

const deleteContactUs = async (contact_id) => {
  const queryText =
    "UPDATE contact_us SET deleted = true WHERE contact_id = $1 RETURNING contact_id";
  const values = [contact_id];
  return db.query(queryText, values);
};

module.exports = {
  addContactUs,
  getContactUsData,
  deleteContactUs,
};
