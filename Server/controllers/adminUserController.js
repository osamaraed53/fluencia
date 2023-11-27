const db = require("../models/db");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminUserModel = require('../models/adminUserModel');

const subadminCreate = async (req, res) => {
    const { first_name, last_name, email, password, role } = req.body;
  
    try {
      // Check if email is already taken
      const existingUser = await adminUserModel.findByEmail(email);
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      const schema = joi.object({
                first_name: joi.string().alphanum().min(3).max(20).required(),
                last_name: joi.string().alphanum().min(3).max(20).required(),
              email: joi
                .string()
                .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
                .required(),
              password: joi    
                .string()
                .pattern(
                  new RegExp(
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&^#]{6,30}$"
                  )
                ).required(),
                
            });
            const validate = schema.validate({                 
                first_name,
                last_name,
              email,
              password,
            });
            if (validate.error) {
              res.status(405).json({ error: validate.error.details });
            }
            else{
              const hashedPassword = await bcrypt.hash(password, 10);
              const newUser = await adminUserModel.createSubadmin( first_name,last_name,email,hashedPassword,role );
              res.status(201).json({ message: 'Subadmin registered successfully', SubAdmin: newUser });
            }
           }
           catch (error) {
              console.error('Error registering Subadmin:', error);
              res.status(500).json({ message: 'Internal server error' });
            }
          };

  //_________________________________________________________________________



  const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      
      //  const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await adminUserModel.checkEmail(email);
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email' });
      }
    //  const storedHashedPassword = hashedPassword;
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(400).json({ message: "Email or password is invalid" });
        return;
    }
    console.log(user.admin_id);
      // Include user information in the token payload
      const payload = {
         user_id: user.admin_id,
        email: user.email,
      };
  
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign(payload, secretKey, { expiresIn: '7d' });
      res.cookie("accessToken", token, { httpOnly: true });

      res.status(200).json({
        message: 'Admin signed in successfully',
        token: token,
        Admin_id: user.user_id,
      });
      console.log(token);
      console.log(`Admin_id : ${user.user_id}`);
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  //______________________________________________________________________

const SoftdeleteUser = async (req, res) => {
    const user_id = req.params.id;
    try {
      const queryText = "UPDATE users SET deleted = TRUE WHERE user_id = $1";
      const values = [user_id];
      const result = await db.query(queryText, values);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Soft delete failed" });
    }
  };


  //______________________________________________________________________


  const RestoreUser = async (req, res) => {
    const user_id = req.params.id;
  
    try {
      const queryText = "UPDATE users SET deleted = FALSE WHERE user_id = $1";
      const result = await db.query(queryText, [user_id]);
      
        res.status(200).json({ message: "User restored successfully", user: result.rows[0] });
    
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to restore user" });
    }
  };

//_____________________________________________________________________________


async function GetUsers (req, res) {
    // const { email, password } = req.body;
  
    try {
      const checkQuery = "SELECT first_name,last_name,email FROM users WHERE deleted=false";
       const Result = await db.query(checkQuery);
  
       
        res.status(200).json(Result.rows);
      
    } catch (error) {
      console.error("Can't get of users: ", error);
      res.status(500).json({ error: "Failed to get users" });
    }
  }
  

  //__________________________________________________________________________

  async function getUserById(req, res) {
    const user_id = req.params.id;
  
    try {
      const queryText = "SELECT first_name, last_name, email FROM users WHERE user_id = $1 AND deleted = false";
      const result = await db.query(queryText, [user_id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get user" });
    }
  }

  //__________________________________________________________________________

  async function GetDeletedUsers (req, res) {
  
    try {
      const checkQuery = "SELECT first_name,last_name,email FROM users WHERE deleted=true";
       const Result = await db.query(checkQuery);
  
       
        res.status(200).json(Result.rows);
      
    } catch (error) {
      console.error("Can't get of users: ", error);
      res.status(500).json({ error: "Failed to get users" });
    }
  }

  //__________________________________________________________________________

  async function addCoursetoUser(req, res) {
    try {
      // const admin_id = req.params.admin_id;
      const usid = req.user.user_id;

      const user_id = req.params.user_id;
      const course_id = req.params.course_id;
      const { notes } = req.body;
  
      const checkUserCourse = await db.query('SELECT * FROM courses_user WHERE user_id = $1 AND course_id = $2 AND admin_id=$3', [user_id, course_id,usid]);
  
      if (checkUserCourse.rows.length > 0) {
        res.status(400).json({ message: 'The user is already in this course' });
      } else {
        const result = await db.query('INSERT INTO courses_user(course_id, user_id, admin_id, notes) VALUES($1, $2, $3, $4) RETURNING course_user_id', [course_id, user_id, usid, notes]);
        const addedCourseId = result.rows[0].course_user_id;
        res.status(200).json({ message: 'The course has been added to the user successfully', addedCourseId });
      }
    }catch (error) {
          console.error('An error occurred while adding the course for the user', error);
          res.status(500).json({ error: 'An error occurred while adding the course for the user'});
        }
  }
  
  //__________________________________________________________________________

  async function updateCoursetoUser(req, res) {
    try {
      const course_user_id = req.params.course_user_id; 
      const { notes } = req.body;
  
      await db.query('UPDATE courses_user SET notes = $1 WHERE course_user_id = $2', [notes, course_user_id]);
  
      res.status(200).json({ message: 'Updated successfully' });
    } catch (error) {
      console.error('An error occurred while updating', error);
      res.status(500).json({ error: 'An error occurred while updating' });
    }
  }

//__________________________________________________________________________

  async function deleteCourseForUser(req, res) {
    try {
      const course_user_id = req.params.course_user_id; // تفاعل مع معرّف السجل الذي تريد حذفه
  
      // حذف السجل من جدول courses_user باستخدام course_user_id
      await db.query('UPDATE courses_user SET deleted = TRUE WHERE course_user_id = $1', [course_user_id]);
  
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      console.error('An error occurred while deleting', error);
      res.status(500).json({ error: 'An error occurred while deleting' });
    }
  }

//__________________________________________________________________________

  async function restoreCourseForUser(req, res) {
    try {
      const course_user_id = req.params.course_user_id; 
  
      await db.query('UPDATE courses_user SET deleted = FALSE WHERE course_user_id = $1', [course_user_id]);
  
      res.status(200).json({ message: 'Restored successfully' });
    } catch (error) {
      console.error('An error occurred while restoring', error);
      res.status(500).json({ error: 'An error occurred while restoring' });
    }
  }

//__________________________________________________________________________


  async function getCoursesForUser(req, res) {
    try {
      const user_id = req.params.user_id;
  
      const result = await db.query(`
        SELECT courses.course_id, courses.course_name,courses_user.notes
        FROM courses_user 
        JOIN courses  ON courses_user.course_id = courses.course_id
        WHERE courses_user.user_id = $1
      `, [user_id]);
  
      const userCourses = result.rows;
      
      res.status(200).json({ userCourses });
    } catch (error) {
      console.error('An error occurred while obtaining courses', error);
      res.status(500).json({ error: 'An error occurred while obtaining courses' });
    }
  }

//_________________________________________________________________________________________


async function addTasktoUser(req, res) {
  try {
    console.log("sdfghjkl;'")
    const admin_id = req.params.admin_id;
    const user_id = req.params.user_id;
    const task_id = req.params.task_id;
    

    const {  start_date, end_date,notes } = req.body;

    const result = await db.query('INSERT INTO users_task(user_id, task_id, start_date, end_date, admin_id, notes) VALUES($1, $2, $3, $4, $5, $6) RETURNING users_task_id',
     [user_id, task_id, start_date, end_date, admin_id, notes]);

    const addedTaskId = result.rows[0].users_task_id;
    res.status(200).json({ message: 'The task has been added to the user successfully', addedTaskId });
  } catch (error) {
    console.error('An error occurred while adding the task for the user', error);
    res.status(500).json({ error: 'An error occurred while adding the task for the user' });
  }
}

//____________________________________________________________________________________________

async function updateTaskForUser(req, res) {
  try {
    const users_task_id = req.params.users_task_id;
    const { start_date, end_date, notes } = req.body;

    await db.query('UPDATE users_task SET start_date = $1, end_date = $2, notes = $3 WHERE users_task_id = $4',
      [start_date, end_date, notes, users_task_id]);
      res.status(200).json({ message: 'updated successfully' });
    } catch (error) {
      console.error('An error occurred while updating', error);
      res.status(500).json({ error: 'An error occurred while updating' });
    }
  }


  //________________________________________________________________________________________________

  async function deleteTaskForUser(req, res) {
    try {
      const users_task_id = req.params.users_task_id;
  
      await db.query('UPDATE users_task SET deleted =TRUE WHERE users_task_id = $1', [users_task_id]);
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      console.error('An error occurred while deleting', error);
      res.status(500).json({ error: 'An error occurred while deleting' });
    }
  } 

  //________________________________________________________________________________________________

  async function restoreTaskForUser(req, res) {
    try {
      const users_task_id = req.params.users_task_id;
  
      await db.query('UPDATE users_task SET deleted = FALSE WHERE users_task_id = $1', [users_task_id]);
  
      res.status(200).json({ message: 'Restored successfully' });
    } catch (error) {
      console.error('An error occurred while restoring', error);
      res.status(500).json({ error: 'An error occurred while restoring' });
    }
  }

  //________________________________________________________________________________________________


  async function getTaskDetails(req, res) {
    try {
      const users_task_id = req.params.users_task_id;
  
      // استرجاع السجل من جدول users_task مع بيانات من جدولي users و task
      const result = await db.query(`
        SELECT users.first_name, task.task_description, task.task_url, users_task.start_date, users_task.end_date
        FROM users_task 
        JOIN users  ON users_task.user_id = users.user_id
        JOIN task  ON users_task.task_id = task.task_id
        WHERE users_task.users_task_id = $1
      `, [users_task_id]);
  
      const taskDetails = result.rows[0];
  
      res.status(200).json({ taskDetails });
    } catch (error) {
      console.error('حدث خطأ أثناء استرجاع تفاصيل المهمة:', error);
      res.status(500).json({ error: 'حدث خطأ أثناء استرجاع تفاصيل المهمة' });
    }
  }
  

  module.exports = {
    subadminCreate,
    loginAdmin,

    SoftdeleteUser,
    RestoreUser,

    GetUsers,
    getUserById,
    GetDeletedUsers,

    getCoursesForUser,


    addCoursetoUser,
    updateCoursetoUser,
    deleteCourseForUser,
    restoreCourseForUser,



    addTasktoUser,
    updateTaskForUser,
    deleteTaskForUser,
    restoreTaskForUser,
    getTaskDetails
  };
  