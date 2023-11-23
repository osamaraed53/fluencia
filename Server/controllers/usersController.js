const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const UserModel = require('../models/userModel');


const multer = require('multer');
// const upload = multer({ storage: storage });

const path = require('path');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'images'); // المجلد الذي ستحفظ فيه الصورة
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // إعطاء الصورة اسم فريد
//   },
// });
//____________________________________________________________________________
// Storage Image By Multer Start
let lastFileSequence = 0;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    lastFileSequence++;
    const newFileName = `${Date.now()}_${lastFileSequence}${path.extname(file.originalname)}`;
    cb(null, newFileName);
  }
});

const addImage = multer({ storage: storage });
const imageProduct = addImage.single("image");
// Storage Image By Multer End



//_____________________________________________________________________




// const cookies = require("js-cookie");
// const storage = multer.memoryStorage(); // سيتم تخزين الصورة في الذاكرة


const signup = async (req, res) => {
  const {  first_name,last_name,email,password } = req.body;

  try {
    // Check if email is already taken
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
    
     const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.checkEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }
   const storedHashedPassword = hashedPassword;
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
      user_id: user.user_id,
    });
    console.log(token);
    console.log(user.user_id);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



//_______________________________________________________________________________________________

const updateUser = async (req, res) => {
  // const user_id = req.params.id;
  const { first_name, last_name, email, password } = req.body;

  try {
    const usid = req.user.user_id;

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
        ),
    });

    const { error } = schema.validate({
      first_name,
      last_name,
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.details });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const result = await UserModel.updateUser( first_name, last_name, email, hashedPassword,usid);

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Update user failed" });
  }
};

//_______________________________________________________________________________________________




const upload = multer({ storage: storage });


async function submitTask(req, res) {
  try {
    // const user_id = req.params.user_id;
    const usid = req.user.user_id;

    const users_task_id = req.params.users_task_id;
    const { submit_date } = req.body;

    const image = req.file;

    if (!image || !image.filename) {
      return res.status(400).json({ error: 'The image must be uploaded' });
    }

    const answer_url = path.join('image', image.filename);

    const result = await db.query('UPDATE users_task SET submit_date = $1, answer_url = $2 WHERE user_id = $3 AND users_task_id = $4 RETURNING users_task_id',
     [submit_date, answer_url, usid, users_task_id]);

    const updatedTaskId = result.rows[0].users_task_id;
    res.status(200).json({ message: 'The task has been submited successfully', updatedTaskId });
  } catch (error) {
    console.error('An error occurred while submitting the task', error);
    res.status(500).json({ error: 'An error occurred while submitting the task' });
  }  
}











module.exports = {
  signup,
  login,
  updateUser,
  submitTask,
  upload,
  imageProduct
};
