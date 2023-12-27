const db = require("../models/db");


const addQuestion = async (req, res) => {
    try {
const {question,answer} = req.body
  
      const result = await db.query(`INSERT INTO faq (question,answer) VALUES ($1, $2) RETURNING faq_id`,[question,answer])
  
      res.status(200).json({Message: result.rows[0] , Qustion:question, Answer:answer });
    } catch (error) {
      console.error('An error occurred while inserting data faq', error);
      res.status(500).json({ error: 'An error occurred while inserting data faq' });
    }
  };





  const getQuestion = async (req, res) => {
    try {
      const faq_id = req.params.faq_id;
  
      const result = await db.query(`SELECT question,answer FROM faq WHERE faq_id=$1`,[faq_id])
  
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('An error occurred while getting data faq', error);
      res.status(500).json({ error: 'An error occurred while getting data faq' });
    }
  };




  const deleteQuestion = async (req, res) => {
    try {
      const faq_id = req.params.faq_id;
  
      const result = await db.query(`UPDATE faq set deleted=true WHERE faq_id=$1`,[faq_id])
  
      res.status(200).json("The question deleted successfully");
    } catch (error) {
      console.error('An error occurred while delete question', error);
      res.status(500).json({ error: 'An error occurred while delete question' });
    }
  };

  const restoreQuestion = async (req, res) => {
    try {
      const faq_id = req.params.faq_id;
  
      const result = await db.query(`UPDATE faq set deleted=false WHERE faq_id=$1`,[faq_id])
  
      res.status(200).json("The question restored successfully");
    } catch (error) {
      console.error('An error occurred while restore question', error);
      res.status(500).json({ error: 'An error occurred while restore question' });
    }
  };

  const getAllQuestion = async (req, res) => {
    try {
    //   const faq_id = req.params.faq_id;
  
      const result = await db.query(`SELECT * FROM faq where deleted=false`,)
  
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('An error occurred while getting data faq', error);
      res.status(500).json({ error: 'An error occurred while getting data faq' });
    }
  };
  



  
  const UpdateQuestion = async (req, res) => {
    try {
      const faq_id = req.params.faq_id;
      const {question,answer}=req.body;
  
      const result = await db.query(`UPDATE faq set question=$1 ,answer=$2  WHERE faq_id=$3`,[question,answer,faq_id])
  
      res.status(200).json("The question updated successfully");
    } catch (error) {
      console.error('An error occurred while delete question', error);
      res.status(500).json({ error: 'An error occurred while delete question' });
    }
  };


module.exports={

    addQuestion,
    getQuestion,
    deleteQuestion,
    restoreQuestion,
    getAllQuestion,
    UpdateQuestion
}
