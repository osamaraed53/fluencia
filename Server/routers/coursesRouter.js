const express = require("express");
const coursesController = require("../controllers/coursesController");
const router = express.Router();
//   const verify= require('../middlewares/verify')
  const authorize= require('../middlewares/authorization')

router.post("/addCourse",authorize.authorize,coursesController.addCourse); //done 

router.put("/UpdateCourse/:course_id",authorize.authorize,coursesController.UpdateCourse); //done

router.put("/SoftdeleteCourse/:course_id",authorize.authorize,coursesController.SoftdeleteCourse); //done 

router.put("/RestoreCourse/:course_id",authorize.authorize,coursesController.RestoreCourse); //done 

router.get("/GetCourses",authorize.authorize,coursesController.GetCourses); //done 

router.get("/GetCoursedeleted",authorize.authorize,coursesController.GetCoursedeleted);


module.exports = router;