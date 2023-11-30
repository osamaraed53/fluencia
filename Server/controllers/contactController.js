const db = require("../models/db");
const contactModel = require('../models/contactModel');




async function submitContactUs(req, res) {
    try {
      const user_id = req.user.user_id;
        //   const user_id = req.params.user_id;

      const { name, email, message } = req.body;
  
      const result = await contactModel.addContactUs(user_id, name, email, message);
  
      const addedContactId = result.rows[0].contact_id;
      res.status(200).json({ message: 'Message added successfully', addedContactId });
    } catch (error) {
      console.error('An error occurred while adding Message', error);
      res.status(500).json({ error: 'An error occurred while adding Message' });
    }
  }


  async function getContactUsData(req, res) {
    try {
      const result = await contactModel.getContactUsData();
  
      const contactData = result.rows;
      res.status(200).json({ contactData });
    } catch (error) {
      console.error('An error occurred while fetching contact data', error);
      res.status(500).json({ error: 'An error occurred while fetching contact data' });
    }
  }


  async function deleteContactUs(req, res) {
    try {
      const contact_id = req.params.contact_id;
      const result = await contactModel.deleteContactUs(contact_id);
  
      const deletedContactId = result.rows[0].contact_id;
      res.status(200).json({ message: 'Contact data deleted successfully', deletedContactId });
    } catch (error) {
      console.error('An error occurred while deleting contact data', error);
      res.status(500).json({ error: 'An error occurred while deleting contact data' });
    }
  }




  
  module.exports = {
    submitContactUs,
    getContactUsData,
    deleteContactUs
 
  };