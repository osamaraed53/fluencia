// taskActions.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action to fetch all tasks
export const fetchTasks = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/GetTaskes");
    const tasks = response.data;
    dispatch(setTasks(tasks));
    dispatch(clearTaskError());
  } catch (error) {
    dispatch(setTaskError("Error fetching tasks. Please try again."));
  }
};

// Action to add a new task
export const addTask = (taskData) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3000/addTask", taskData);
    const newTask = response.data;
    dispatch(addNewTask(newTask));
    dispatch(clearTaskError());
  } catch (error) {
    dispatch(setTaskError("Error adding a new task. Please try again."));
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
    await axios.delete(`http://localhost:3000/SoftdeleteTask/${taskId}`);
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
    taskError: null,
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addNewTask: (state, action) => {
      state.tasks.push(action.payload);
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
