const express = require("express");
const taskController = require("../controllers/taskController");
const router = express.Router();
const authorize= require('../middlewares/authorization')
const authUser =require('../middlewares/authUser')

router.post("/addTask/:course_id",authorize.authorize,taskController.addTask);//
router.put("/UpdateTask/:task_id",authorize.authorize,taskController.UpdateTask);
router.put("/SoftdeleteTask/:task_id",authorize.authorize,taskController.SoftdeleteTask);//
router.put("/RestoreTask/:task_id",authorize.authorize,taskController.RestoreTask);
router.get("/GetTaskes",taskController.GetTaskes);//





router.get("/GetTaskbyCourseID/:course_id",authorize.authorize,taskController.GetTaskbyCourseID); //



// i need this end point 
router.get("/GetTaskbyID/:task_id",authorize.authorize,taskController.GetTaskbyID);



router.get("/getTaskbyCoursIedandUserId/:course_id",authUser.authUser,taskController.getTaskbyCourseIdandUserId); //





//  router.post("/addTasktoUser/:admin_id/:user_id/:task_id ",taskController.addTasktoUser );

// router.put("/UpdateCourse/:course_id",coursesController.UpdateCourse);
// router.delete("/SoftdeleteCourse/:course_id",coursesController.SoftdeleteCourse);
// router.get("/GetCourses",coursesController.GetCourses);
// router.get("/GetCoursedeleted",coursesController.GetCoursedeleted);
// router.post("/login",coursesController.login );
// router.put("/updateUser/:id",coursesController.updateUser );
// router.delete("/SoftdeleteUser/:id",coursesController.SoftdeleteUser );
// router.put("/RestoreUser/:id",coursesController.RestoreUser );

// router.get("/GetUsers/",coursesController.GetUsers );


module.exports = router;