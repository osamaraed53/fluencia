// taskActions.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import headers from '../axiosInstance'
import {toast} from 'react-toastify'

// Action to fetch all tasks
export const fetchTasks = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/GetTaskes",{headers});
    const tasks = response.data;
    dispatch(setTasks(tasks));
    dispatch(clearTaskError());
  } catch (error) {
    dispatch(setTaskError("Error fetching tasks. Please try again."));
  }
};


// Action to fetch all tasks for admin
export const fetchTasksforAdmin= (course_id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3000/GetTaskbyCourseID/${course_id}`,{headers});
    const tasks = response.data;
    dispatch(setTasks(tasks));
    dispatch(clearTaskError());
  } catch (error) {
    dispatch(setTaskError("Error fetching tasks. Please try again."));
  }
};
// Action to fetch all tasks for admin
export const fetchTasksforUser= (course_id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3000/getTaskbyCoursIedandUserId/${course_id}`,{headers});
    const tasks = response.data;
    dispatch(setTasks(tasks));
    dispatch(clearTaskError());
  } catch (error) {
    dispatch(setTaskError("Error fetching tasks. Please try again."));
  }
};


// Action to add a new task
export const addTask = (taskData ,course_id) => async (dispatch) => {
  try {
    const response = await axios.post(`http://localhost:3000/addTask/${course_id}`, taskData,{headers});
    const newTask = response.data.task_id;
    
    dispatch(addNewTask(newTask));
    dispatch(clearTaskError());

    toast.success(' Update successful! !', {
      position: 'bottom-right',
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });


  } catch (error) {
    dispatch(setTaskError("Error adding a new task. Please try again."));
    toast.error(' Error adding a new task !', {
      position: 'top-center',
      autoClose: 3000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    
    });
  }
};

// Action to update a task
export const updateTask = (taskId, updatedData) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:3000/UpdateTask/${taskId}`, updatedData);
    const updatedTask = response.data;
    dispatch(updateExistingTask(updatedTask));
    dispatch(clearTaskError());
  } catch (error) {
    dispatch(setTaskError("Error updating the task. Please try again."));
  }
};

// Action to soft delete a task
export const softDeleteTask = (taskId) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:3000/SoftdeleteTask/${taskId}`,{},{headers});
    dispatch(softDeleteExistingTask(taskId));
    dispatch(clearTaskError());
  } catch (error) {
    dispatch(setTaskError("Error soft deleting the task. Please try again."));
  }
};

// Action to restore a soft-deleted task
export const restoreTask = (taskId) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:3000/RestoreTask/${taskId}`);
    dispatch(restoreSoftDeletedTask(taskId));
    dispatch(clearTaskError());
  } catch (error) {
    dispatch(setTaskError("Error restoring the task. Please try again."));
  }
};

// taskSlice.js
const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    new_task_id :null, 
    taskError: null,
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addNewTask: (state, action) => {
      state.tasks.push(action.payload);
      state.new_task_id = action.payload;
    },
    updateExistingTask: (state, action) => {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    softDeleteExistingTask: (state, action) => {
      const deletedTaskId = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== deletedTaskId);
    },
    restoreSoftDeletedTask: (state, action) => {
      const restoredTaskId = action.payload;
      const deletedTask = state.tasks.find(task => task.id === restoredTaskId);
      if (deletedTask) {
        deletedTask.isDeleted = false;
      }
    },
    setTaskError: (state, action) => {
      state.taskError = action.payload;
    },
    clearTaskError: (state) => {
      state.taskError = null;
    },
  },
});

export const {
  setTasks,
  addNewTask,
  updateExistingTask,
  softDeleteExistingTask,
  restoreSoftDeletedTask,
  setTaskError,
  clearTaskError,
} = taskSlice.actions;

export default taskSlice.reducer;
