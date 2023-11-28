const express = require("express");
const taskController = require("../controllers/taskController");
const router = express.Router();
const authorize= require('../middlewares/authorization')

router.post("/addTask",authorize.authorize,taskController.addTask);//
router.put("/UpdateTask/:task_id",authorize.authorize,taskController.UpdateTask);//
router.delete("/SoftdeleteTask/:task_id",authorize.authorize,taskController.SoftdeleteTask);//
router.put("/RestoreTask/:task_id",authorize.authorize,taskController.RestoreTask);//
router.get("/GetTaskes",taskController.GetTaskes);//


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