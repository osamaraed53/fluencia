const db = require("../models/db");


const findByEmail = async (email) => {
  const result = await db.query('SELECT * FROM admin WHERE email = $1', [email]);
  return result.rows[0];
};
//_____________________________________________________________________________________

const createSubadmin = async ( first_name,last_name,email,password ,role) => {
  const result = await db.query(
    'INSERT INTO admin( first_name,last_name,email,password,role ) VALUES($1, $2, $3,$4,$5) RETURNING *',
    [ first_name,last_name,email,password ,role]
  );
  return result.rows[0];
};
//_____________________________________________________________________________________

const checkEmail = async (email) => {
    
    const result = await db.query('SELECT * FROM admin WHERE email = $1 ', [
      email,
    ]);
    return result.rows[0];
  };

//_____________________________________________________________________________________

  async function getAllUsers() {
    try {
      return await db.query('SELECT * FROM users');
    } catch (error) {
      console.error('An error occurred while getting all users', error);
      throw error;
    }
  }

//_____________________________________________________________________________________

  async function searchUsersByEmail(email) {
    try {
      return await db.query('SELECT * FROM users WHERE LOWER(email) LIKE $1', [`${email}%`]);
    } catch (error) {
      console.error('An error occurred while searching for users:', error);
      throw error;
    }
  }
//_____________________________________________________________________________________

async function getAllTeachers() {
  try {
    return await db.query('SELECT * FROM admin');
  } catch (error) {
    console.error('An error occurred while getting all Teachers', error);
    throw error;
  }
}
//_____________________________________________________________________________________

async function searchTeacherByEmail(email) {
  try {
    return await db.query('SELECT * FROM admin WHERE LOWER(email) LIKE $1', [`${email}%`]);
  } catch (error) {
    console.error('An error occurred while searching for Teacher:', error);
    throw error;
  }
}

//_____________________________________________________________________________________



async function getTaskDetails(usersTaskId) {
  try {
    const result = await db.query(`
      SELECT users.first_name, 
             users.last_name, 
             task.task_name,
             task.task_description, 
             task.task_url, 
             users_task.start_date, 
             users_task.end_date,
             users_task.submit_date,
             users_task.answer_url,users_task.show
      FROM users_task 
      JOIN users ON users_task.user_id = users.user_id
      JOIN task ON users_task.task_id = task.task_id
      WHERE users_task.users_task_id = $1
    `, [usersTaskId]);

    return result.rows[0];
  } catch (error) {
    console.error('An error occurred while retrieving details', error);
    throw error;
  }
}





async function updateTaskForUser(usersTaskId, startDate, endDate, notes) {
  try {
    await db.query('UPDATE users_task SET start_date = $1, end_date = $2, notes = $3 WHERE users_task_id = $4',
      [startDate, endDate, notes, usersTaskId]);

    return { message: 'updated successfully' };
  } catch (error) {
    console.error('An error occurred while updating', error);
    throw error;
  }
}

async function addTasktoUser(user_id, task_id, start_date, end_date, admin_id, notes,course_id) {
  try {
    const result = await db.query('INSERT INTO users_task(user_id, task_id, start_date, end_date, admin_id, notes,course_id,submit_date, answer_url) VALUES($1, $2, $3, $4, $5, $6,$7,null, null) RETURNING users_task_id',
     [user_id, task_id, start_date, end_date, admin_id, notes,course_id]);

    return { message: 'The task has been added to the user successfully', addedTaskId: result.rows[0].users_task_id };
  } catch (error) {
    console.error('An error occurred while adding the task for the user', error);
    throw error;
  }
}


async function deleteTaskForUser(users_task_id) {
  try {
    await db.query('UPDATE users_task SET deleted = TRUE WHERE users_task_id = $1', [users_task_id]);
    return { message: 'Deleted successfully' };
  } catch (error) {
    console.error('An error occurred while deleting', error);
    throw error;
  }
}


async function restoreTaskForUser(users_task_id) {
  try {
    await db.query('UPDATE users_task SET deleted = FALSE WHERE users_task_id = $1', [users_task_id]);
    return { message: 'Restored successfully' };
  } catch (error) {
    console.error('An error occurred while restoring', error);
    throw error;
  }
}




async function getCoursesForUser(user_id) {
  try {
    const result = await db.query(`
      SELECT courses.course_id, courses.course_name,courses_user.notes
      FROM courses_user 
      JOIN courses ON courses_user.course_id = courses.course_id
      WHERE courses_user.user_id = $1
    `, [user_id]);

    return result.rows;
  } catch (error) {
    console.error('An error occurred while obtaining courses', error);
    throw error;
  }
}



async function deleteCourseForUser(course_user_id) {
  try {
    await db.query('UPDATE courses_user SET deleted = TRUE WHERE course_user_id = $1', [course_user_id]);
    return { message: 'Deleted successfully' };
  } catch (error) {
    console.error('An error occurred while deleting', error);
    throw error;
  }
}

async function restoreCourseForUser(course_user_id) {
  try {
    await db.query('UPDATE courses_user SET deleted = FALSE WHERE course_user_id = $1', [course_user_id]);
    return { message: 'Restored successfully' };
  } catch (error) {
    console.error('An error occurred while restoring', error);
    throw error;
  }
}

async function updateCoursetoUser(course_user_id, notes) {
  try {
    await db.query('UPDATE courses_user SET notes = $1 WHERE course_user_id = $2', [notes, course_user_id]);
    return { message: 'Updated successfully' };
  } catch (error) {
    console.error('An error occurred while updating', error);
    throw error;
  }
}

async function addCoursetoUser(user_id, course_id, admin_id, notes) {
  try {
    const checkUserCourse = await db.query('SELECT * FROM courses_user WHERE user_id = $1 AND course_id = $2 AND admin_id=$3', [user_id, course_id, admin_id]);

    if (checkUserCourse.rows.length > 0) {
      return { error: 'The user is already in this course' };
    } else {
      const result = await db.query('INSERT INTO courses_user(course_id, user_id, admin_id, notes) VALUES($1, $2, $3, $4) RETURNING course_user_id', [course_id, user_id, admin_id, notes]);
      const addedCourseId = result.rows[0].course_user_id;
      return { message: 'The course has been added to the user successfully', addedCourseId };
    }
  } catch (error) {
    console.error('An error occurred while adding the course for the user', error);
    throw error;
  }
}


const updateAdminData = async ( first_name, last_name,email,phone ,admin_id) => {
  const queryText =
 ` UPDATE admin SET first_name = $2, last_name = $3,email=$4, phone=$5 WHERE admin_id = $1
    RETURNING admin_id, first_name, last_name,email ,phone,picture;`
  const values = [admin_id, first_name, last_name,email,phone];
  const result=  await db.query(queryText, values);
  return result.rows[0];
};


const GetUserInformation = async (admin_id) => {
    
  const result = await db.query('SELECT * FROM admin WHERE admin_id = $1 ', [
    admin_id,
  ]);
  return result.rows[0];
};


module.exports = {
    findByEmail,
    createSubadmin,
    checkEmail,
    searchUsersByEmail,
    getAllUsers,
    getAllTeachers,
    searchTeacherByEmail,
    getTaskDetails,
    updateTaskForUser,
    addTasktoUser,
    deleteTaskForUser,
    restoreTaskForUser,
    getCoursesForUser,
    deleteCourseForUser,
    restoreCourseForUser,
    updateCoursetoUser,
    addCoursetoUser,
    updateAdminData,
    GetUserInformation
    };