// const db = require("../models/db");

const TaskModel = require('../models/taskModel');


async function addTask(req, res) {
    // const admin_id = req.params.admin_id;
    const { task_name, task_description, task_url } = req.body;
  
    try {
      const usid = req.user.user_id;

      const newTaskId = await TaskModel.addTask(task_name, task_description, task_url,usid);
  
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

  

  module.exports = {
    addTask,
    UpdateTask,
    SoftdeleteTask,
    RestoreTask,
    GetTaskes,

  };