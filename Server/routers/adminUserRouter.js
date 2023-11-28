const express = require("express");
const adminController = require("../controllers/adminUserController");
const router = express.Router();
const authorize= require('../middlewares/authorization')

router.post("/subadminCreate",adminController.subadminCreate );//
router.post("/loginAdmin",adminController.loginAdmin );//


router.delete("/SoftdeleteUser/:id",adminController.SoftdeleteUser );//
router.put("/RestoreUser/:id",adminController.RestoreUser );//

router.get("/GetUsers/",adminController.GetUsers );//
router.get("/getUserById/:id",adminController.getUserById );//
router.get("/GetDeletedUsers",adminController.GetDeletedUsers );//


router.post("/addCoursetoUser/:user_id/:course_id",authorize.authorize,adminController.addCoursetoUser );//
router.put("/updateCoursetoUser/:course_user_id",adminController.updateCoursetoUser );//
router.delete("/deleteCourseForUser/:course_user_id",adminController.deleteCourseForUser );//
router.put("/restoreCourseForUser/:course_user_id",adminController.restoreCourseForUser );//
router.get("/getCoursesForUser/:user_id",adminController.getCoursesForUser );//

router.post("/addTasktoUser/:admin_id/:user_id/:task_id",adminController.addTasktoUser );//
router.put("/updateTaskForUser/:users_task_id",adminController.updateTaskForUser );//
router.delete("/deleteTaskForUser/:users_task_id",adminController.deleteTaskForUser );//
router.put("/restoreTaskForUser/:users_task_id",adminController.restoreTaskForUser );//
router.get("/getTaskDetails/:users_task_id",adminController.getTaskDetails );//


module.exports = router;