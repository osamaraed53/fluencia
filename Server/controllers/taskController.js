const db = require("../models/db");

const TaskModel = require('../models/taskModel');


async function addTask(req, res) {
  const course_id = req.params.course_id;
  const { task_name, task_description, task_url  =" "} = req.body;

  try {
    const usid = req.user.user_id;

    const newTaskId = await TaskModel.addTask(task_name, task_description, task_url,usid,course_id);

    res.status(201).json({ message: "Task added successfully", task_id: newTaskId });
  } catch (error) {
    console.error("Failed to add Task in the controller: ", error);
    res.status(500).json({ error: "Failed to add Task" });
  }
}
//____________________________________________________________________________________________________

  async function UpdateTask(req, res) {
    const task_id = req.params.task_id;
    const {task_name, task_description, task_url } = req.body;
  
    try {
      const usid = req.user.user_id;
      

      await TaskModel.UpdateTask(task_id, task_name, task_description, task_url,usid);
  
      res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
      console.error("Failed to update Task in the controller: ", error);
      res.status(500).json({ error: "Failed to update Task" });
    }
  }

  //_________________________________________________________________________________________________

  async function SoftdeleteTask(req, res) {
    const task_id = req.params.task_id;
    const usid = req.user.user_id;

    try {
      await TaskModel.SoftdeleteTask(task_id,usid);
  
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Failed to soft delete Task in the controller: ", error);
      res.status(500).json({ error: "Failed to soft delete Task" });
    }
  }

  //_________________________________________________________________________________________________

  async function RestoreTask(req, res) {
    const task_id = req.params.task_id;
    const usid = req.user.user_id;

    try {
      await TaskModel.RestoreTask(task_id,usid);
  
      res.status(200).json({ message: "Task restored successfully" });
    } catch (error) {
      console.error("Failed to restore Task in the controller: ", error);
      res.status(500).json({ error: "Failed to restore Task" });
    }
  }

//____________________________________________________________________________________________________

async function GetTaskes (req, res) {
    try {
      const Taskes = await TaskModel.GetTaskes();
      res.status(200).json(Taskes);
    } catch (error) {
      console.error("Failed to get Taskes in the controller: ", error);
      res.status(500).json({ error: "Failed to get Taskes" });
    }
  }


  //___________________________________________________________________________________________________

  async function GetTaskbyCourseID(req, res) {
    try {
      const course_id = req.params.course_id;
      

      const result = await db.query(
        `SELECT task_id, task_name, task_description, task_url
        FROM task
        WHERE course_id = $1;`
      , [course_id]);

      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Failed to get tasks for this course', error);
      res.status(500).json({ error: 'Failed to get tasks for this course' });
    }
  }



 
async function getTaskbyCourseIdandUserId(req, res) {
  try {
    const user_id = req.user.user_id
    const { course_id} = req.params;
    const result = await db.query(
      `SELECT task.task_name, task.task_description, task.task_url, answer_url,
             TO_CHAR(users_task.start_date, 'YYYY-MM-DD') AS start_date,
             TO_CHAR(users_task.end_date, 'YYYY-MM-DD') AS end_date,users_task.users_task_id
      FROM task
      INNER JOIN users_task ON task.course_id = users_task.course_id AND task.task_id = users_task.task_id
      WHERE users_task.course_id = $1 AND users_task.user_id = $2;`
    , [course_id, user_id]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Failed to get tasks for this course and user', error);
    res.status(500).json({ error: 'Failed to get tasks for this course and user' });
  }
}
  //___________________________________________________________________________________________________
  async function GetTaskbyID (req, res) {
    try {
      const task_id=req.params.task_id
      const Taskes = await TaskModel.GetTaskbyID(task_id);
      res.status(200).json(Taskes);
    } catch (error) {
      console.error("Failed to get this Task ", error);
      res.status(500).json({ error: "Failed to get this Task" });
    }
  } 
  //_________________________________________________________________________________________________

  module.exports = {
    addTask,
    UpdateTask,
    SoftdeleteTask,
    RestoreTask,
    GetTaskes,
    GetTaskbyCourseID,
    getTaskbyCourseIdandUserId,
    GetTaskbyID
  };