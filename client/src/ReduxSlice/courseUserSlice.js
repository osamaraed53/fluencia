// courseUserActions.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import headers from '../axiosInstance'


// Action to add a course to a user
export const addCourseToUser = (courseId, userId) => async (dispatch) => {   // 
  try {
    const response = await axios.post(`http://localhost:3000/addCoursetoUser/${userId}/${courseId}`,{},{headers});
    dispatch(addCourseToUserSuccess({ userId, courseId }));
    Swal.fire({
      icon: "success",
      title: "ADD successful!",
      showConfirmButton: false,
      timer: 1000,
    });
  } catch (error) {
    dispatch(setCourseUserError("Error adding course to user. Please try again."));
  }
};

// Action to update a course for a user
// export const updateCourseForUser = (courseUserId, updatedData) => async (dispatch) => {
//   try {
//     await axios.put(`http://localhost:3000/updateCoursetoUser/${courseUserId}`, updatedData);
//     dispatch(updateCourseForUserSuccess({ courseUserId, updatedData }));
//     dispatch(clearCourseUserError());
//   } catch (error) {
//     dispatch(setCourseUserError("Error updating course for user. Please try again."));
//   }
// };

// Action to delete a course for a user
export const deleteCourseForUser = (course_user_id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/deleteCourseForUser/${course_user_id}`,{headers});
    dispatch(deleteCourseForUserSuccess(course_user_id));
    dispatch(clearCourseUserError());
    alert("done")
  } catch (error) {
    dispatch(setCourseUserError("Error deleting course for user. Please try again."));
  }
};
export const UpdateTeacher = (course_id,teacher_id) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:3000/UpdateTeacher/${course_id}`,{newTeacherId :teacher_id},{headers});
    // dispatch(deleteCourseForUserSuccess(course_id));
    dispatch(clearCourseUserError());
    alert("done")
  } catch (error) {
    dispatch(setCourseUserError("Error deleting course for user. Please try again."));
  }
};

// Action to restore a deleted course for a user
// export const restoreCourseForUser = (courseUserId) => async (dispatch) => {
//   try {
//     await axios.put(`http://localhost:3000/restoreCourseForUser/${courseUserId}`);
//     dispatch(restoreCourseForUserSuccess(courseUserId));
//     dispatch(clearCourseUserError());
//   } catch (error) {
//     dispatch(setCourseUserError("Error restoring course for user. Please try again."));
//   }
// };

// Action to fetch courses for a user
export const fetchCoursesForUser = () => async (dispatch) => { //
  try {
    const response = await axios.get(`http://localhost:3000/GetUserCourse`,{headers});
    const userCourses = response.data;
    dispatch(setCoursesForUser(userCourses));
    dispatch(clearCourseUserError());
  } catch (error) {
    dispatch(setCourseUserError("Error fetching courses for user. Please try again."));
  }
};

// Action to fetch course By Id 

export  const fetchCourseById = (course_id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3000/GetCourseById/${course_id}`,{ headers }); //
    const courses = response.data;
    dispatch(setSelectedCourse(courses));
    dispatch(clearCourseUserError());
  } catch (error) {
    dispatch(setCourseUserError("Error fetching courses. Please try again."));
  }
};
// action to get course_id user in it 
export  const GetCoursesIds = () => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3000/GetCourseId`,{ headers }); //
    const courses_ids = response.data;
    dispatch(setCoursesForUser(courses_ids));
    dispatch(clearCourseUserError());
  } catch (error) {
    dispatch(setCourseUserError("Error fetching courses. Please try again."));
  }
};

// action to get Teacher in specific course
export  const fetchTeacher = (course_id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3000/getCourseAdmin/${course_id}`,{ headers }); //
    const courses = response.data;
    dispatch(setTeachersForCourse(courses));

    dispatch(clearCourseUserError());
  } catch (error) {
    dispatch(setCourseUserError("Error fetching courses. Please try again."));
  }
};

// action to get Student ] in specific course
export  const fetchStudent = (course_id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3000/getStudentsInCourse/${course_id}`,{ headers }); //
    const courses = response.data;
    dispatch(setStudentsForCourse(courses));
    dispatch(clearCourseUserError());
  } catch (error) {
    dispatch(setCourseUserError("Error fetching courses. Please try again."));
  }
};

// courseUserSlice.js
const courseUserSlice = createSlice({
  name: "courseUser",
  initialState: {
    userCourses: [],
    selectedCourse : {},
    students : [],
    teachers : [],
    courseUserError: null,
  },
  reducers: {
    addCourseToUserSuccess: (state, action) => {
      const { userId, courseId } = action.payload;
      state.userCourses.push({ userId, courseId });
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;

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
    setStudentsForCourse: (state, action) => {
      state.students = action.payload;
    },
    setTeachersForCourse: (state, action) => {
      state.teachers = action.payload;
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
  setTeachersForCourse,
  setStudentsForCourse,
  setSelectedCourse
} = courseUserSlice.actions;

export default courseUserSlice.reducer;
