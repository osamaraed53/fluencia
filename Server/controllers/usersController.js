const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const UserModel = require('../models/userModel');
const { admin } = require('../firebase');


const multer = require('multer');

const path = require('path');
const { log } = require("console");
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage }).single('image');


const signup = async (req, res) => {
  const {  first_name,last_name,email,password } = req.body;

  try {
    const existingUser = await UserModel.findByEmail(email);

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
              )
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
    const newUser = await UserModel.createUser( first_name,last_name,email,hashedPassword );

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  }
 }
 catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
//____________________________________________________________________________________________________


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    

    const user = await UserModel.checkEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }
   const storedHashedPassword = user.password;
    const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
    if (!passwordMatch) {
      res.status(400).json({ message: "Email or password is invalid" });
      return;
  }

    // Include user information in the token payload
    const payload = {
       user_id: user.user_id,
      email: user.email,
    };

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: '7d' });
    res.cookie("accessToken", token, { httpOnly: true });

    res.status(200).json({
      message: 'User signed in successfully',
      token: token,
      data: {
        first_name : user.first_name,
        last_name :user.last_name,
        picture :user.picture,
        email : user.email,
        phone : user.phone,
        is_pay : user.is_pay
      },
    });
    // console.log(token);
    // console.log(user.user_id);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


//_______________________________________________________________________________________________ 

const updateUser = async (req, res) => {
  const usid = req.user.user_id;
  const userInformation = await UserModel.GetUserInformation(usid)

  const { first_name =userInformation.first_name, last_name=userInformation.last_name, email=userInformation.email , phone=userInformation.phone} = req.body;

  try {

    const schema = joi.object({
      first_name: joi.string().alphanum().min(3).max(20).required(),
      last_name: joi.string().alphanum().min(3).max(20).required(),
      email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
     
    });

    const { error } = schema.validate({
      first_name,
      last_name,
      email,
  
    });

    if (error) {
      return res.status(400).json({ error: error.details });
    }

    const result = await UserModel.updateUser( first_name, last_name, email,phone,usid);
    console.log(result)
    return res.status(200).json({ message: "User updated successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Update user failed" });
  }
};



//_______________________________________________________________________________________________



async function updatePicture(req, res) {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }

      const usid = req.user.user_id;
      const imageBuffer = req.file.buffer ;


      const imageUrl = await uploadImageToFirebase(imageBuffer);

      const picture = imageUrl;
      console.log(imageUrl)
      const result = await db.query('UPDATE users SET picture = $1 WHERE user_id = $2 RETURNING user_id',
      [picture, usid]);

      const updatedTaskId = result.rows[0].picture;
      res.status(200).json({ success: true, message: 'picture updated successfully', picture : picture  });
    });
  } catch (error) {
    console.error('An error occurred while update the picture', error);
    res.status(500).json({ success: false, error: 'An error occurred while update the picture' });
  }  
}


//_______________________________________________________________________________________________




async function submitTask(req, res) {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }

      const usid = req.user.user_id;
      const users_task_id = req.params.users_task_id;

      
      const imageBuffer = req.file.buffer ;

      const imageUrl = await uploadImageToFirebase(imageBuffer);
     
      const answer_url = imageUrl;
      const result = await db.query('UPDATE users_task SET submit_date = DEFAULT, answer_url = $1,show=false WHERE user_id = $2 AND users_task_id = $3 RETURNING users_task_id',
       [answer_url, usid, users_task_id]);

      const updatedTaskId = result.rows[0].users_task_id;
      res.status(200).json({ success: true, message: 'The task has been submitted successfully', updatedTaskId });
    });
  } catch (error) {
    console.error('An error occurred while submitting the task', error);
    res.status(500).json({ success: false, error: 'An error occurred while submitting the task' });
  }  
}




const uploadImageToFirebase = async (imageBuffer) => {
  try {
    const bucket = admin.storage().bucket();
    const folderPath = 'images/';
    const uniqueFilename = 'image-' + Date.now() + '.png';
    const filePath = folderPath + uniqueFilename;

    const file = bucket.file(filePath);
    await file.createWriteStream().end(imageBuffer);

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2500', 
    });

    return url;
  } catch (error) {
    console.error('Error uploading image to Firebase:', error);
    throw error;
  }
};

//_______________________________________________________________________________________________


async function getTaskDetails(req, res) {
  try {
 
    const usid = req.user.user_id;

    const usersTaskId = req.params.users_task_id;

    const taskDetails = await UserModel.getTaskDetails(usersTaskId,usid);
    if (!taskDetails) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    res.status(200).json({ taskDetails });
  } catch (error) {
    console.error('An error occurred while retrieving details', error);
    res.status(500).json({ error: 'An error occurred while retrieving details' });
  }
}


async function addPostOnCourse(req, res) {
  try {
    const usid = req.user.user_id;
    const course_id = req.params.course_id;
    const { description } = req.body;

    const result = await UserModel.postOnCourse(usid, course_id, description);

    const addedPostId = result.rows[0].post_course_id;
    res.status(200).json({ message: 'Post added successfully', addedPostId });
  } catch (error) {
    console.error('An error occurred while adding the post', error);
    res.status(500).json({ error: 'An error occurred while adding the post' });
  }
}

async function isUserRegisteredInCourse(user_id, course_id) {
  const result = await db.query('SELECT 1 FROM courses_user WHERE user_id = $1 AND course_id = $2', [user_id, course_id]);
  return result.rows.length > 0;
}

//_______________________________________________________________________________________________

async function updatePostOnCourse(req, res) {
  try {
    const usid = req.user.user_id;

    const post_course_id = req.params.post_course_id;
    const { description } = req.body;

    const result = await UserModel.updatePostOnCourse(usid, post_course_id, description);

    const updatedPostId = result.rows[0].post_course_id;
    res.status(200).json({ message: 'The post has been updated successfully', updatedPostId });
  } catch (error) {
    console.error('An error occurred while updating the post', error);
    res.status(500).json({ error: 'An error occurred while updating the post' });
  }
}

//_______________________________________________________________________________________________



async function GetUserCourse (req, res) {
  try {
    const usid = req.user.user_id;
    const course = await UserModel.GetUserCourse(usid);
    res.status(200).json(course);
  } catch (error) {
    console.error("Failed to get courses in the controller: ", error);
    res.status(500).json({ error: "Failed to get courses" });
  }
}


//_______________________________________________________________________________________________

async function deletePostOnCourse(req, res) {
  try {
    const usid = req.user.user_id;

    const post_course_id = req.params.post_course_id;

    const result = await UserModel.deletePostOnCourse(usid, post_course_id);

    const deletedPostId = result.rows[0].post_course_id;
    res.status(200).json({ message: 'The post has been successfully deleted', deletedPostId });
  } catch (error) {
    console.error('An error occurred while deleting the post', error);
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
}
//_______________________________________________________________________________________________

async function getPostsOnCourse(req, res) {
  try {
    const usid = req.user.user_id;

    const result = await UserModel.getPostsOnCourse(usid);

    const posts = result.rows;
    res.status(200).json({ posts });
  } catch (error) {
    console.error('An error occurred while fetching posts', error);
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
}
//_______________________________________________________________________________________________

async function getAllPostsOnCourse(req, res) {
  try {
    const course_id = req.params.course_id;

    const result = await UserModel.getAllPostsOnCourse(course_id);

    const posts = result.rows;
    res.status(200).json( posts );
  } catch (error) {
    console.error('An error occurred while fetching posts', error);
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
}

//_______________________________________________________________________________________________



async function googleLogin(req, res) {
  try {
    const first_name = req.body.given_name;
    const last_name = req.body.family_name;
    const { email, picture } = req.body;

    const existUser = await UserModel.findByEmail(email);

    if (existUser) {
      try {

        const payload = {
          email: existUser.email,
          user_id: existUser.user_id,
       };
   
       const secretKey = process.env.SECRET_KEY;
       const token = jwt.sign(payload, secretKey, { expiresIn: '7d' });


        return res.status(200).json({
          message: 'User signed in successfully',
          token: token,
          data: {
            first_name : existUser.first_name,
            last_name :existUser.last_name,
            picture :existUser.picture,
            email : existUser.email,
            phone : existUser.phone,
            is_pay : existUser.is_pay
          },
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {

      const user = await UserModel.createUsersGoogle(first_name,last_name , email, picture);
      console.log(user);
      const payload = {
        first_name: user.first_name,
        email: user.email,
        user_id: user.user_id,
      };
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign(payload, secretKey, { expiresIn: "6h" });

      return res.status(200).json({
        logmessage: "User added successfully",
        token: token,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


//_______________________________________________________________________________________________

const updatephone = async (req, res) => {
  const { phone } = req.body;

  try {
    const usid = req.user.user_id;

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: 'Invalid phone number format or length' });
    }

    const result = await UserModel.updatephone(phone, usid);

    return res.status(200).json({ message: "Phone updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Update Phone failed" });
  }
};

//_______________________________________________________________________________________________
async function getCourseAdmin(req, res) {
  try {
    const course_id = req.params.course_id;


    const adminInfo = await UserModel.getCourseAdmin(course_id);

    res.status(200).json( adminInfo );
  } catch (error) {
    console.error('An error occurred while retrieving course admin information', error);
    res.status(500).json({ error: 'An error occurred while retrieving course admin information' });
  }
}

async function getStudentsInCourse(req, res) {
  try {
    let course_id = req.params.course_id ; 
    const students = await UserModel.getStudentsInCourse(course_id);

    res.status(200).json( students );
  } catch (error) {
    console.error('An error occurred while retrieving students in the course', error);
    res.status(500).json({ error: 'An error occurred while retrieving students in the course' });
  }
}


const GetUserData = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await db.query('SELECT first_name, last_name, email, picture FROM users WHERE user_id = $1', [userId]);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('An error occurred while getting user data:', error);
    res.status(500).json({ error: 'An error occurred while getting user data' });
  }
};

module.exports = {
  signup,
  login,
  updateUser,
  submitTask,
  upload,
  uploadImageToFirebase,
  addPostOnCourse,
  updatePostOnCourse,
  deletePostOnCourse,
  getPostsOnCourse,
  getAllPostsOnCourse,
  getTaskDetails,
  updatePicture,
  GetUserCourse,
  getCourseAdmin,
  getStudentsInCourse,
  GetUserData,updatephone,googleLogin
  
};
