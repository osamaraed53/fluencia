const express = require("express");
const coursesController = require("../controllers/coursesController");
const router = express.Router();
//   const verify= require('../middlewares/verify')
  const authorize= require('../middlewares/authorization')

router.post("/addCourse",authorize.authorize,coursesController.addCourse);

router.put("/UpdateCourse/:course_id",authorize.authorize,coursesController.UpdateCourse);

router.delete("/SoftdeleteCourse/:course_id",authorize.authorize,coursesController.SoftdeleteCourse);

router.put("/RestoreCourse/:course_id",coursesController.RestoreCourse);

router.get("/GetCourses",coursesController.GetCourses);

router.get("/GetCoursedeleted",coursesController.GetCoursedeleted);


module.exports = router;