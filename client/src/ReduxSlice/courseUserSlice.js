// courseUserActions.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action to add a course to a user
export const addCourseToUser = (userId, courseId) => async (dispatch) => {
  try {
    await axios.post(`http://localhost:3000/addCoursetoUser/${userId}/${courseId}`);
    dispatch(addCourseToUserSuccess({ userId, courseId }));
    dispatch(clearCourseUserError());
  } catch (error) {
    dispatch(setCourseUserError("Error adding course to user. Please try again."));
  }
};

// Action to update a course for a user
export const updateCourseForUser = (courseUserId, updatedData) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:3000/updateCoursetoUser/${courseUserId}`, updatedData);
    dispatch(updateCourseForUserSuccess({ courseUserId, updatedData }));
    dispatch(clearCourseUserError());
  } catch (error) {
    dispatch(setCourseUserError("Error updating course for user. Please try again."));
  }
};

// Action to delete a course for a user
export const deleteCourseForUser = (courseUserId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/deleteCourseForUser/${courseUserId}`);
    dispatch(deleteCourseForUserSuccess(courseUserId));
    dispatch(clearCourseUserError());
  } catch (error) {
    dispatch(setCourseUserError("Error deleting course for user. Please try again."));
  }
};

// Action to restore a deleted course for a user
export const restoreCourseForUser = (courseUserId) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:3000/restoreCourseForUser/${courseUserId}`);
    dispatch(restoreCourseForUserSuccess(courseUserId));
    dispatch(clearCourseUserError());
  } catch (error) {
    dispatch(setCourseUserError("Error restoring course for user. Please try again."));
  }
};

// Action to fetch courses for a user
export const fetchCoursesForUser = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3000/getCoursesForUser/${userId}`);
    const userCourses = response.data;
    dispatch(setCoursesForUser(userCourses));
    dispatch(clearCourseUserError());
  } catch (error) {
    dispatch(setCourseUserError("Error fetching courses for user. Please try again."));
  }
};

// courseUserSlice.js
const courseUserSlice = createSlice({
  name: "courseUser",
  initialState: {
    userCourses: [],
    courseUserError: null,
  },
  reducers: {
    addCourseToUserSuccess: (state, action) => {
      const { userId, courseId } = action.payload;
      state.userCourses.push({ userId, courseId });
    },
    updateCourseForUserSuccess: (state, action) => {
      const { courseUserId, updatedData } = action.payload;
      const index = state.userCourses.findIndex((course) => course.id === courseUserId);
      if (index !== -1) {
        state.userCourses[index] = { ...state.userCourses[index], ...updatedData };
      }
    },
    deleteCourseForUserSuccess: (state, action) => {
      const courseUserId = action.payload;
      state.userCourses = state.userCourses.filter((course) => course.id !== courseUserId);
    },
    restoreCourseForUserSuccess: (state, action) => {
      const courseUserId = action.payload;
      const deletedCourse = state.userCourses.find((course) => course.id === courseUserId);
      if (deletedCourse) {
        deletedCourse.isDeleted = false;
      }
    },
    setCoursesForUser: (state, action) => {
      state.userCourses = action.payload;
    },
    setCourseUserError: (state, action) => {
      state.courseUserError = action.payload;
    },
    clearCourseUserError: (state) => {
      state.courseUserError = null;
    },
  },
});

export const {
  addCourseToUserSuccess,
  updateCourseForUserSuccess,
  deleteCourseForUserSuccess,
  restoreCourseForUserSuccess,
  setCoursesForUser,
  setCourseUserError,
  clearCourseUserError,
} = courseUserSlice.actions;

export default courseUserSlice.reducer;
