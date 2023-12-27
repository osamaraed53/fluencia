const express = require("express");
const userController = require("../controllers/usersController");
const router = express.Router();
const multer = require('multer');
const upload = multer();
//  const verify= require('../middlewares/verify')
const authorize= require('../middlewares/authorization')
const authUser= require('../middlewares/authUser')

router.post("/signup",userController.signup);//
router.post("/login",userController.login );//
router.put("/updateUser",authUser.authUser,userController.updateUser ); //
router.put("/updatePicture",authUser.authUser,userController.updatePicture ); // 
router.get("/GetUserData",authUser.authUser,userController.GetUserData );// I am use nested of this login 

router.put("/submitTask/:users_task_id",authUser.authUser,userController.submitTask );//

router.get("/getTaskDetails/:users_task_id",authUser.authUser,userController.getTaskDetails );//



router.post("/addPostOnCourse/:course_id/",authorize.authorize ,userController.addPostOnCourse);//
router.put("/updatePostOnCourse/:post_course_id", authUser.authUser,userController.updatePostOnCourse);
router.delete("/deletePostOnCourse/:post_course_id",authUser.authUser ,userController.deletePostOnCourse);//
router.get("/getPostsOnCourse",authUser.authUser, userController.getPostsOnCourse); //
router.get('/getAllPostsOnCourse/:course_id', authUser.authUser,userController.getAllPostsOnCourse);//

router.get("/GetUserCourse",authUser.authUser,userController.GetUserCourse)//
router.get('/getCourseAdmin/:course_id', authUser.authUser, userController.getCourseAdmin);//
router.get('/getStudentsInCourse/:course_id', authUser.authUser, userController.getStudentsInCourse);//

router.post("/googleLogin", userController.googleLogin);//



module.exports = router; 