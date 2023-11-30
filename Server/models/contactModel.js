const db = require("../models/db");


const addContactUs = async (user_id, name, email, message) => {
    const queryText =
      "INSERT INTO contact_us (user_id, name, email, message) VALUES ($1, $2, $3, $4) RETURNING contact_id";
    const values = [user_id, name, email, message];
    return db.query(queryText, values);
  };



  const getContactUsData = async () => {
    const queryText = "SELECT name,email,message FROM contact_us";
    return db.query(queryText);
  };


  const deleteContactUs = async (contact_id) => {
    const queryText = "UPDATE contact_us SET deleted = true WHERE contact_id = $1 RETURNING contact_id";
    const values = [contact_id];
    return db.query(queryText, values);
  };

  module.exports = {
    addContactUs,
    getContactUsData,
    deleteContactUs
  };