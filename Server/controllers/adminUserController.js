const db = require("../models/db");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminUserModel = require("../models/adminUserModel");

const multer = require("multer");
const { admin } = require("../firebase");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image");

const subadminCreate = async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;

  try {
    // Check if email is already taken
    const existingUser = await adminUserModel.findByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
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
        )
        .required(),
    });
    const validate = schema.validate({
      first_name,
      last_name,
      email,
      password,
    });
    if (validate.error) {
      res.status(405).json({ error: validate.error.details });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await adminUserModel.createSubadmin(
        first_name,
        last_name,
        email,
        hashedPassword,
        role
      );
      res.status(201).json({
        message: "Subadmin registered successfully",
        SubAdmin: newUser,
      });
    }
  } catch (error) {
    console.error("Error registering Subadmin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//_________________________________________________________________________

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //  const hashedPassword = await bcrypt.hash(password, 10);

    const user = await adminUserModel.checkEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }
    const storedHashedPassword = user.password;
    const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
    if (!passwordMatch) {
      res.status(400).json({ message: "Email or password is invalid" });
      return;
    }
    console.log(user.admin_id);
    // Include user information in the token payload
    const payload = {
      user_id: user.admin_id,
      email: user.email,
      role: user.role,
    };

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });
    res.cookie("accessToken", token, { httpOnly: true });

    res.status(200).json({
      message: "Admin signed in successfully",
      token: token,
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        picture: user.picture,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
    console.log(token);
    console.log(`Admin_id : ${user.admin_id}`);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
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

    res
      .status(200)
      .json({ message: "User restored successfully", user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to restore user" });
  }
};

//_____________________________________________________________________________

async function GetUsers(req, res) {
  // const { email, password } = req.body;

  try {
    const checkQuery =
      "SELECT user_id,first_name,last_name,email,is_pay,phone FROM users WHERE deleted=false";
    const Result = await db.query(checkQuery);

    //  console.log(Result.rows)
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
    const queryText =
      "SELECT first_name, last_name, email FROM users WHERE user_id = $1 AND deleted = false";
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

async function GetDeletedUsers(req, res) {
  try {
    const checkQuery =
      "SELECT user_id,first_name,last_name,email,is_pay FROM users WHERE deleted=true";
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
    const usid = req.user.user_id;
    const user_id = req.params.user_id;
    const course_id = req.params.course_id;
    const { notes } = req.body;

    const result = await adminUserModel.addCoursetoUser(
      user_id,
      course_id,
      usid,
      notes
    );

    if (result.error) {
      res.status(400).json(result);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(
      "An error occurred while adding the course for the user",
      error
    );
    res.status(500).json({
      error: "An error occurred while adding the course for the user",
    });
  }
}

//__________________________________________________________________________

async function updateCoursetoUser(req, res) {
  try {
    const course_user_id = req.params.course_user_id;
    const { notes } = req.body;

    const result = await adminUserModel.updateCoursetoUser(
      course_user_id,
      notes
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("An error occurred while updating", error);
    res.status(500).json({ error: "An error occurred while updating" });
  }
}

//__________________________________________________________________________

async function deleteCourseForUser(req, res) {
  try {
    const course_user_id = req.params.course_user_id;

    const result = await adminUserModel.deleteCourseForUser(course_user_id);

    res.status(200).json(result);
  } catch (error) {
    console.error("An error occurred while deleting", error);
    res.status(500).json({ error: "An error occurred while deleting" });
  }
}

//__________________________________________________________________________

async function restoreCourseForUser(req, res) {
  try {
    const course_user_id = req.params.course_user_id;

    const result = await adminUserModel.restoreCourseForUser(course_user_id);

    res.status(200).json(result);
  } catch (error) {
    console.error("An error occurred while restoring", error);
    res.status(500).json({ error: "An error occurred while restoring" });
  }
}

//__________________________________________________________________________

async function getCoursesForUser(req, res) {
  try {
    const user_id = req.params.user_id;

    const userCourses = await adminUserModel.getCoursesForUser(user_id);

    res.status(200).json({ userCourses });
  } catch (error) {
    console.error("An error occurred while obtaining courses", error);
    res
      .status(500)
      .json({ error: "An error occurred while obtaining courses" });
  }
}

//_________________________________________________________________________________________

async function addTasktoUser(req, res) {
  try {
    const admin_id = req.user.user_id;
    const user_id = req.params.user_id;
    const course_id = req.params.course_id;
    const task_id = req.params.task_id;
    const { start_date, end_date, notes } = req.body;

    const result = await adminUserModel.addTasktoUser(
      user_id,
      task_id,
      start_date,
      end_date,
      admin_id,
      notes,
      course_id
    );

    res.status(200).json(result);
  } catch (error) {
    console.error(
      "An error occurred while adding the task for the user",
      error
    );
    res
      .status(500)
      .json({ error: "An error occurred while adding the task for the user" });
  }
}

//____________________________________________________________________________________________
async function updateTaskForUser(req, res) {
  try {
    const usersTaskId = req.params.users_task_id;
    const { start_date, end_date, notes } = req.body;

    const result = await adminUserModel.updateTaskForUser(
      usersTaskId,
      start_date,
      end_date,
      notes
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("An error occurred while updating", error);
    res.status(500).json({ error: "An error occurred while updating" });
  }
}

//________________________________________________________________________________________________

async function deleteTaskForUser(req, res) {
  try {
    const users_task_id = req.params.users_task_id;

    const result = await adminUserModel.deleteTaskForUser(users_task_id);

    res.status(200).json(result);
  } catch (error) {
    console.error("An error occurred while deleting", error);
    res.status(500).json({ error: "An error occurred while deleting" });
  }
}

//________________________________________________________________________________________________

async function restoreTaskForUser(req, res) {
  try {
    const users_task_id = req.params.users_task_id;

    const result = await adminUserModel.restoreTaskForUser(users_task_id);

    res.status(200).json(result);
  } catch (error) {
    console.error("An error occurred while restoring", error);
    res.status(500).json({ error: "An error occurred while restoring" });
  }
}

//________________________________________________________________________________________________

async function getTaskDetails(req, res) {
  try {
    // Check if the user is an admin
    // const isAdmin = req.user.role === 1 || req.user.role === 2;

    // // If not an admin, return an unauthorized error
    // if (!isAdmin) {
    //   return res.status(403).json({ error: "Unauthorized access" });
    // }

    const usersTaskId = req.params.users_task_id;

    const taskDetails = await adminUserModel.getTaskDetails(usersTaskId);

    res.status(200).json({ taskDetails });
  } catch (error) {
    console.error("An error occurred while retrieving details", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving details" });
  }
}

//______________________________________________________________________________________

const SearchUsers = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email) {
      const allUsers = await adminUserModel.getAllUsers(); 
      return res.status(200).json(allUsers.rows);
    }
    email = email.toLowerCase().trim();
    const searchResult = await adminUserModel.searchUsersByEmail(email);

    res.status(200).json(searchResult.rows);
  } catch (error) {
    console.error("An error occurred while searching for users:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for users" });
  }
};

//______________________________________________________________________________________

const SearchTeachers = async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) {
      const allTeachers = await adminUserModel.getAllTeachers();
      return res.status(200).json(allTeachers.rows);
    }
    email = email.toLowerCase().trim();

    const searchResult = await adminUserModel.searchTeacherByEmail(email);

    res.status(200).json(searchResult.rows);
  } catch (error) {
    console.error("An error occurred while searching for Teachers", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for Teachers" });
  }
};

//______________________________________________________________________________________

async function updatePicturee(req, res) {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }

      const usid = req.user.user_id;

      const imageBuffer =  req.file.buffer;

      const imageUrl = await uploadImageToFirebasee(imageBuffer);

      const picture = imageUrl;

      const result = await db.query(
        "UPDATE admin SET picture = $1 WHERE admin_id = $2 RETURNING admin_id, picture",
        [picture, usid]
      );
      // console.log("Admin ID:", usid);

      if (!result.rows[0]) {
        return res.status(404).json({
          success: false,
          error: "Admin not found or picture update failed",
        });
      }

      const updatedImg = result.rows[0].picture;

      res.status(200).json({
        success: true,
        message: "picture updated successfully",
        updatedImg,
      });
    });
  } catch (error) {
    console.error("An error occurred while updating the picture", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while updating the picture",
    });
  }
}

//______________________________________________________________________________________

const uploadImageToFirebasee = async (imageBuffer) => {
  try {
    const bucket = admin.storage().bucket();
    const folderPath = "images/";
    const uniqueFilename = "image-" + Date.now() + ".png";
    const filePath = folderPath + uniqueFilename;

    const file = bucket.file(filePath);
    await file.createWriteStream().end(imageBuffer);

    // Get the signed URL for the uploaded file
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: "03-09-2500", // Set an appropriate expiration date
    });

    return url;
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    throw error;
  }
};

//______________________________________________________________________________________

async function setTaskAccept(req, res) {
  try {
    // const usid = req.user.user_id;
    const users_task_id = req.params.users_task_id;
    console.log(users_task_id);

    const result = await db.query(
      `
  UPDATE users_task
  SET show = true
  WHERE users_task_id = $1 
  RETURNING users_task_id`,
      [users_task_id]
    );

    if (result.rows.length > 0) {
      const updatedTaskId = result.rows[0].users_task_id;
      res.status(200).json({
        success: true,
        message: "Task checked successfully",
        updatedTaskId,
      });
    } else {
      res
        .status(400)
        .json({ success: false, error: "Task not found or already checked" });
    }
  } catch (error) {
    console.error("An error occurred while checking the task", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while checking the task",
    });
  }
}
//______________________________________________________________________________________

async function setTaskReject(req, res) {
  try {
    // const usid = req.user.user_id;
    const users_task_id = req.params.users_task_id;
    console.log(users_task_id);

    const result = await db.query(
      `
  UPDATE users_task
  SET show = false
  WHERE users_task_id = $1 
  RETURNING users_task_id`,
      [users_task_id]
    );

    if (result.rows.length > 0) {
      const updatedTaskId = result.rows[0].users_task_id;
      res.status(200).json({
        success: true,
        message: "Task checked successfully",
        updatedTaskId,
      });
    } else {
      res
        .status(400)
        .json({ success: false, error: "Task not found or already checked" });
    }
  } catch (error) {
    console.error("An error occurred while checking the task", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while checking the task",
    });
  }
}

//______________________________________________________________________________________

const updateAdminData = async (req , res) => {
  const usid = req.user.user_id;
  const userInformation = await adminUserModel.GetUserInformation(usid);

  const {
    first_name = userInformation.first_name,
    last_name = userInformation.last_name,
    email = userInformation.email,
    phone = userInformation.phone,
  } = req.body;

  try {
    const result = await adminUserModel.updateAdminData(
      first_name,
      last_name,
      email,
      phone,
      usid
    );
    return res
      .status(200)
      .json({ message: "Admin updated successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Admin user failed" });
  }
};
//______________________________________________________________________________________
async function getUserDoesntHaveCourse(req, res) {
  try {
    const result = await db.query(
     ` SELECT *
      FROM users
      WHERE is_pay = true AND user_id NOT IN (
        SELECT user_id
        FROM courses_user
      );`
  
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('An error occurred while processing the request:', error);
    res.status(500).json({ error: 'Failed to process the request' });
  }
}
//______________________________________________________________________________________

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
  getTaskDetails,
  SearchUsers,
  SearchTeachers,
  updatePicturee,
  uploadImageToFirebasee,
  setTaskAccept,
  updateAdminData,
  setTaskReject,
getUserDoesntHaveCourse
  
};
