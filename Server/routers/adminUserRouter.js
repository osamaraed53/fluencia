const express = require("express");
const adminController = require("../controllers/adminUserController");
const router = express.Router();
const authorize= require('../middlewares/authorization')

router.post("/subadminCreate",adminController.subadminCreate );
router.post("/loginAdmin",adminController.loginAdmin );


router.delete("/SoftdeleteUser/:id",authorize.authorize,adminController.SoftdeleteUser );
router.put("/RestoreUser/:id",authorize.authorize,adminController.RestoreUser );

router.get("/GetUsers",authorize.authorize,adminController.GetUsers );
router.get("/getUserById/:id",authorize.authorize,adminController.getUserById );
router.get("/GetDeletedUsers",authorize.authorize,adminController.GetDeletedUsers );


router.post("/addCoursetoUser/:user_id/:course_id",authorize.authorize,adminController.addCoursetoUser );
router.put("/updateCoursetoUser/:course_user_id",authorize.authorize,adminController.updateCoursetoUser );
router.delete("/deleteCourseForUser/:course_user_id",authorize.authorize,adminController.deleteCourseForUser );
router.put("/restoreCourseForUser/:course_user_id",authorize.authorize,adminController.restoreCourseForUser );
router.get("/getCoursesForUser/:user_id",authorize.authorize,adminController.getCoursesForUser );

router.post("/addTasktoUser/:user_id/:task_id",authorize.authorize,adminController.addTasktoUser );
router.put("/updateTaskForUser/:users_task_id",authorize.authorize,adminController.updateTaskForUser );
router.delete("/deleteTaskForUser/:users_task_id",authorize.authorize,adminController.deleteTaskForUser );
router.put("/restoreTaskForUser/:users_task_id",authorize.authorize,adminController.restoreTaskForUser );

router.get("/getTaskDetailss/:users_task_id",authorize.authorize,adminController.getTaskDetails );
router.post("/SearchUsers",authorize.authorize,adminController.SearchUsers );
router.post("/SearchTeachers",authorize.authorize,adminController.SearchTeachers );




module.exports = router;