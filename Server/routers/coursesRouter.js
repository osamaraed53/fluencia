const express = require("express");
const coursesController = require("../controllers/coursesController");
const router = express.Router();
//   const verify= require('../middlewares/verify')
  const authorize= require('../middlewares/authorization')

router.post("/addCourse",authorize.authorize,coursesController.addCourse);

router.put("/UpdateCourse/:course_id",authorize.authorize,coursesController.UpdateCourse);

router.put("/SoftdeleteCourse/:course_id",authorize.authorize,coursesController.SoftdeleteCourse);

router.put("/RestoreCourse/:course_id",authorize.authorize,coursesController.RestoreCourse);

router.get("/GetCourses",authorize.authorize,coursesController.GetCourses);

router.get("/GetCoursedeleted",authorize.authorize,coursesController.GetCoursedeleted);
router.get("/GetCourseById/:id",authorize.authorize,coursesController.GetCourseById);


module.exports = router;