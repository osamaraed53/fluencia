const db = require("../models/db");
const CourseModel = require('../models/courseModel');

async function addCourse(req, res) {
  console.log(req.user.user_id);
  const { course_name, course_description, start_date ,price } = req.body;
  try {
    const {user_id} = req.user;
    const newCourseId = await CourseModel.addCourse( course_name, course_description, start_date, user_id ,price);

    res.status(201).json({ message: "Course added successfully", course_id: newCourseId });
  } catch (error) {
    console.error("Failed to add course in the controller: ", error);
    res.status(500).json({ error: "Failed to add course" });
  }
}

//________________________________________________________________________________________________________________


async function UpdateCourse(req, res) {
    const course_id = req.params.course_id;
    const { course_name, course_description, start_date } = req.body;
    const usid = req.user.user_id;

    try {
      await CourseModel.UpdateCourse(course_id, course_name, course_description, start_date,usid);
  
      res.status(200).json({ message: "Course updated successfully" });
    } catch (error) {
      console.error("Failed to update course in the controller: ", error);
      res.status(500).json({ error: "Failed to update course" });
    }
  }

//______________________________________________________________________________________________

  async function SoftdeleteCourse(req, res) {
    const course_id = req.params.course_id;
    const usid = req.user.user_id;
    console.log("okpkmldslkmcsdklmscdlkmsvdmlkscSkmcclx MKlmnk",course_id,usid)
    try {
      await CourseModel.SoftdeleteCourse(course_id,usid);
  
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Failed to soft delete course in the controller: ", error);
      res.status(500).json({ error: "Failed to soft delete course" });
    }
  }
//______________________________________________________________________________________________

async function RestoreCourse(req, res) {
  const course_id = req.params.course_id;

  try {
    await CourseModel.RestoreCourse(course_id);

    res.status(200).json({ message: "Course restored successfully" });
  } catch (error) {
    console.error("Failed to restore course in the controller: ", error);
    res.status(500).json({ error: "Failed to restore course" });
  }
}

//______________________________________________________________________________________________

async function GetCourses (req, res) {
  try {
    const courses = await CourseModel.GetCourses ();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Failed to get courses in the controller: ", error);
    res.status(500).json({ error: "Failed to get courses" });
  }
}
//______________________________________________________________________________________________


async function GetCourseById (req, res) {
  try {
    const id = req.params.id;
    const courses = await CourseModel.GetCourseById(id);
    res.status(200).json(courses);
  } catch (error) {
    console.error("Failed to get course in the controller: ", error);
    res.status(500).json({ error: "Failed to get course" });
  }
}
//______________________________________________________________________________________________
async function GetCoursedeleted(req, res) {
  try {
    const deletedCourses = await CourseModel.GetCoursedeleted();
    res.status(200).json(deletedCourses);
  } catch (error) {
    console.error("Failed to get deleted courses in the controller: ", error);
    res.status(500).json({ error: "Failed to get deleted courses" });
  }
}

//______________________________________________________________________________________________

async function GetCourseId(req,res){
  const {user_id} = req.user;
  try{
    const courseid = await CourseModel.GetCourseId(user_id)
    res.status(200).json(courseid);
  }catch(error){
    console.error("Failed to get course id in the controller: ", error);
    res.status(500).json({ error: "Failed to get courses id" });
}
}
  module.exports = {
    addCourse  ,
    UpdateCourse ,
    SoftdeleteCourse,
    RestoreCourse,
    GetCourses,
    GetCoursedeleted,
    GetCourseById,
    GetCourseId
  };