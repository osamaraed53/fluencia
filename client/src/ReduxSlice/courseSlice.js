// courseActions.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action to fetch courses
export const fetchCourses = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/GetCourses");
    const courses = response.data;
    dispatch(setCourses(courses));
    dispatch(clearCourseError());
  } catch (error) {
    dispatch(setCourseError("Error fetching courses. Please try again."));
  }
};

// Action to add a new course
export const addCourse = (courseData) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3000/addCourse", courseData);
    const newCourse = response;
    console.log(newCourse)
    dispatch(addNewCourse(newCourse));
    dispatch(clearCourseError());
  } catch (error) {
    dispatch(setCourseError("Error adding a new course. Please try again."));
  }
};

// Action to update a course
export const updateCourse = (courseId, updatedData) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:3000/UpdateCourse/${courseId}`, updatedData);
    const updatedCourse = response.data;
    dispatch(updateExistingCourse(updatedCourse));
    dispatch(clearCourseError());
  } catch (error) {
    dispatch(setCourseError("Error updating the course. Please try again."));
  }
};

// Action to soft delete a course
export const softDeleteCourse = (courseId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/SoftdeleteCourse/${courseId}`);
    dispatch(softDeleteExistingCourse(courseId));
    dispatch(clearCourseError());
  } catch (error) {
    dispatch(setCourseError("Error deleting the course. Please try again."));
  }
};

// Action to restore a soft-deleted course
export const restoreCourse = (courseId) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:3000/RestoreCourse/${courseId}`);
    dispatch(restoreSoftDeletedCourse(courseId));
    dispatch(clearCourseError());
  } catch (error) {
    dispatch(setCourseError("Error restoring the course. Please try again."));
  }
};

// courseSlice.js
const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    courseError: null,
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    addNewCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    updateExistingCourse: (state, action) => {
      const updatedCourse = action.payload;
      const index = state.courses.findIndex(course => course.id === updatedCourse.id);
      if (index !== -1) {
        state.courses[index] = updatedCourse;
      }
    },
    softDeleteExistingCourse: (state, action) => {
      const deletedCourseId = action.payload;
      state.courses = state.courses.filter(course => course.id !== deletedCourseId);
    },
    restoreSoftDeletedCourse: (state, action) => {
      const restoredCourseId = action.payload;
      const deletedCourse = state.courses.find(course => course.id === restoredCourseId);
      if (deletedCourse) {
        deletedCourse.isDeleted = false;
      }
    },
    setCourseError: (state, action) => {
      state.courseError = action.payload;
    },
    clearCourseError: (state) => {
      state.courseError = null;
    },
  },
});

export const {
  setCourses,
  addNewCourse,
  updateExistingCourse,
  softDeleteExistingCourse,
  restoreSoftDeletedCourse,
  setCourseError,
  clearCourseError,
} = courseSlice.actions;

export default courseSlice.reducer;
