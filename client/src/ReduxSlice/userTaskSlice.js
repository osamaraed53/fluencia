// userTaskActions.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action to add a task to a user
export const addTaskToUser = (adminId, userId, taskId) => async (dispatch) => {
  try {
    await axios.post(`http://localhost:3000/addTasktoUser/${adminId}/${userId}/${taskId}`);
    dispatch(addTaskToUserSuccess({ adminId, userId, taskId }));
    dispatch(clearUserTaskError());
  } catch (error) {
    dispatch(setUserTaskError("Error adding task to user. Please try again."));
  }
};

// Action to update a task for a user
export const updateTaskForUser = (usersTaskId, updatedData) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:3000/updateTaskForUser/${usersTaskId}`, updatedData);
    dispatch(updateTaskForUserSuccess({ usersTaskId, updatedData }));
    dispatch(clearUserTaskError());
  } catch (error) {
    dispatch(setUserTaskError("Error updating task for user. Please try again."));
  }
};

// Action to delete a task for a user
export const deleteTaskForUser = (usersTaskId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/deleteTaskForUser/${usersTaskId}`);
    dispatch(deleteTaskForUserSuccess(usersTaskId));
    dispatch(clearUserTaskError());
  } catch (error) {
    dispatch(setUserTaskError("Error deleting task for user. Please try again."));
  }
};

// Action to restore a deleted task for a user
export const restoreTaskForUser = (usersTaskId) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:3000/restoreTaskForUser/${usersTaskId}`);
    dispatch(restoreTaskForUserSuccess(usersTaskId));
    dispatch(clearUserTaskError());
  } catch (error) {
    dispatch(setUserTaskError("Error restoring task for user. Please try again."));
  }
};

// Action to fetch details of a task for a user
export const fetchTaskDetails = (usersTaskId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3000/getTaskDetails/${usersTaskId}`);
    const taskDetails = response.data;
    dispatch(setTaskDetails(taskDetails));
    dispatch(clearUserTaskError());
  } catch (error) {
    dispatch(setUserTaskError("Error fetching task details. Please try again."));
  }
};

// userTaskSlice.js
const userTaskSlice = createSlice({
  name: "userTask",
  initialState: {
    userTasks: [],
    taskDetails: null,
    userTaskError: null,
  },
  reducers: {
    addTaskToUserSuccess: (state, action) => {
      const { adminId, userId, taskId } = action.payload;
      state.userTasks.push({ adminId, userId, taskId });
    },
    updateTaskForUserSuccess: (state, action) => {
      const { usersTaskId, updatedData } = action.payload;
      const index = state.userTasks.findIndex((userTask) => userTask.id === usersTaskId);
      if (index !== -1) {
        state.userTasks[index] = { ...state.userTasks[index], ...updatedData };
      }
    },
    deleteTaskForUserSuccess: (state, action) => {
      const usersTaskId = action.payload;
      state.userTasks = state.userTasks.filter((userTask) => userTask.id !== usersTaskId);
    },
    restoreTaskForUserSuccess: (state, action) => {
      const usersTaskId = action.payload;
      const deletedUserTask = state.userTasks.find((userTask) => userTask.id === usersTaskId);
      if (deletedUserTask) {
        deletedUserTask.isDeleted = false;
      }
    },
    setTaskDetails: (state, action) => {
      state.taskDetails = action.payload;
    },
    setUserTaskError: (state, action) => {
      state.userTaskError = action.payload;
    },
    clearUserTaskError: (state) => {
      state.userTaskError = null;
    },
  },
});

export const {
  addTaskToUserSuccess,
  updateTaskForUserSuccess,
  deleteTaskForUserSuccess,
  restoreTaskForUserSuccess,
  setTaskDetails,
  setUserTaskError,
  clearUserTaskError,
} = userTaskSlice.actions;

export default userTaskSlice.reducer;
