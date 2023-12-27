// courseActions.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

import headers from '../axiosInstance'
// Action to fetch courses

export const fetchActiveCourses = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/GetCourses", {
      headers,
    }); //
    const courses = response.data;
    dispatch(setCourses(courses));
    dispatch(clearCourseError());
  } catch (error) {
    dispatch(setCourseError("Error fetching courses. Please try again."));
  }
};


// Action to fetch HIDDEN courses
export const fetchHiddenCourses = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/GetCoursedeleted", {
      headers,
    }); //
    const courses = response.data;
    dispatch(setHiddinCourses(courses));
    // console.log(courses)
    dispatch(clearCourseError());
  } catch (error) {
    // I'm set data in  state but in s
    console.log(error);
  }
};
export const GetCoursesByTeacher = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/GetCoursesByTeacher", {
      headers,
    }); //
    const courses = response.data;
    dispatch(setCourses(courses));
    // console.log(courses)
    dispatch(clearCourseError());
  } catch (error) {
    // I'm set data in  state but in s
    console.log(error);
  }
};

// Action to add a new course
export const addCourse = (courseData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/addCourse",
      courseData,
      { headers }
    ); //
    const newCourse = response.data; // Assuming the response contains the new course data
    // console.log(newCourse);
    dispatch(addNewCourse(newCourse));
    dispatch(clearCourseError());
    
    Swal.fire({
      icon: "success",
      title: "Create class successful!",
      showConfirmButton: false,
      timer: 1000,
    });

  } catch (error) {
    dispatch(setCourseError("Error adding a new course. Please try again."));
  }
};

// Action to update a course
export const updateCourse = (courseId, updatedData) => async (dispatch) => {
  //not
  try {
    const response = await axios.put(
      `http://localhost:3000/UpdateCourse/${courseId}`,
      updatedData,
      { headers }
    );
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
    await axios.put(
      `http://localhost:3000/SoftdeleteCourse/${courseId}`,
      {},
      { headers }
    ); //
    dispatch(softDeleteExistingCourse(courseId));
    dispatch(clearCourseError());
  } catch (error) {
    dispatch(setCourseError("Error deleting the course. Please try again."));
  }
};

// Action to restore a soft-deleted course
export const restoreCourse = (courseId) => async (dispatch) => {
  try {
    await axios.put(
      `http://localhost:3000/RestoreCourse/${courseId}`,
      {},
      { headers }
    ); //
    dispatch(restoreSoftDeletedCourse(courseId));
    dispatch(clearCourseError());
  } catch (error) {
    dispatch(setCourseError("Error res toring the course. Please try again."));
  }
};



// courseSlice.js
const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    hiddenCourses: [],
    courseError: null,
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setHiddinCourses: (state, action) => {
      state.hiddenCourses = action.payload;
    },
    addNewCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    updateExistingCourse: (state, action) => {
      const updatedCourse = action.payload;
      const index = state.courses.findIndex(
        (course) => course.id === updatedCourse.id
      );
      if (index !== -1) {
        state.courses[index] = updatedCourse;
      }
    },
    softDeleteExistingCourse: (state, action) => {
      const deletedCourseId = action.payload;
      state.courses = state.courses.filter(
        (course) => course.id !== deletedCourseId
      );
    },
    restoreSoftDeletedCourse: (state, action) => {
      const restoredCourseId = action.payload;
      const deletedCourse = state.courses.find(
        (course) => course.id === restoredCourseId
      );
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
  setHiddinCourses,
} = courseSlice.actions;

export default courseSlice.reducer;
