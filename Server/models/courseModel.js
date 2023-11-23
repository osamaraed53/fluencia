const db = require("../models/db");


const addCourse = async (course_name, course_description, start_date, admin_id) => {
  console.log( admin_id , 111111111111111111111111111111);
    const queryText = `
      INSERT INTO courses (admin_id, course_name, course_description, start_date)
      VALUES ($1, $2, $3, $4)
      RETURNING course_id;
    `;
  
    const values = [admin_id, course_name, course_description, start_date];
  
    try {
      const result = await db.query(queryText, values);
      return result.rows[0].course_id;
    } catch (error) {
      console.error("Failed to add course in the model: ", error);
      throw new Error("Failed to add course in the model");
    }
  };
  
//___________________________________________________________________________________________


  const UpdateCourse = async (course_id, course_name, course_description, start_date,admin_id) => {
    const queryText = `
      UPDATE courses
      SET course_name = $1, course_description = $2, start_date = $3
      WHERE course_id = $4 AND admin_id=$5;
    `;
  
    const values = [course_name, course_description, start_date, course_id,admin_id];
  
    try {
      await db.query(queryText, values);
    } catch (error) {
      console.error("Failed to update course in the model: ", error);
      throw new Error("Failed to update course in the model");
    }
  };

//______________________________________________________________________________________________

  const SoftdeleteCourse = async (course_id,admin_id) => {
    const queryText = `
      UPDATE courses
      SET hidden = TRUE
      WHERE course_id = $1 AND admin_id=$2;
    `;
  
    const values = [course_id,admin_id];
  
    try {
      await db.query(queryText, values);
    } catch (error) {
      console.error("Failed to soft delete course in the model: ", error);
      throw new Error("Failed to soft delete course in the model");
    }
  };

//______________________________________________________________________________________________

  const RestoreCourse = async (course_id) => {
    const queryText = `
      UPDATE courses
      SET hidden = FALSE
      WHERE course_id = $1;
    `;
  
    const values = [course_id];
  
    try {
      await db.query(queryText, values);
    } catch (error) {
      console.error("Failed to restore course in the model: ", error);
      throw new Error("Failed to restore course in the model");
    }
  };
//______________________________________________________________________________________________

const GetCourses = async () => {
    const queryText = `
      SELECT course_name, course_description, start_date
      FROM courses
      WHERE hidden = FALSE;
    `;
// const queryText = "SELECT course_name, course_description, TO_CHAR(start_date, 'YYYY-MM-DD') AS formatted_start_date FROM courses WHERE hidden=false";
    
try {
      const result = await db.query(queryText);
      return result.rows;
    } catch (error) {
      console.error("Failed to get courses in the model: ", error);
      throw new Error("Failed to get courses in the model");
    }
  };

//______________________________________________________________________________________________

const GetCoursedeleted = async () => {
  const queryText = `
    SELECT course_name, course_description, start_date
    FROM courses
    WHERE hidden = TRUE;
  `;

  try {
    const result = await db.query(queryText);
    return result.rows;
  } catch (error) {
    console.error("Failed to get deleted courses in the model: ", error);
    throw new Error("Failed to get deleted courses in the model");
  }
};



//___________________________________

  module.exports = {
    addCourse,
    UpdateCourse,
    SoftdeleteCourse,
    RestoreCourse,
    GetCourses,
    GetCoursedeleted
  };