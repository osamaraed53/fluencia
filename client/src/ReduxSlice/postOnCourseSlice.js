// postOnCourseActions.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("accessToken"); 
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json', 
};


// Action to add a post on a course
export const addPostOnCourse = (courseId,user_id, postData) => async (dispatch) => {
  try {
    await axios.post(`http://localhost:3000/addPostOnCourse/${courseId}/${user_id}`, postData);
    dispatch(addPostOnCourseSuccess({ courseId, postData }));
    dispatch(clearPostOnCourseError());
  } catch (error) {
    dispatch(setPostOnCourseError("Error adding post on course. Please try again."));
  }
};

// Action to update a post on a course
export const updatePostOnCourse = (postCourseId, updatedData) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:3000/updatePostOnCourse/${postCourseId}`, updatedData);
    dispatch(updatePostOnCourseSuccess({ postCourseId, updatedData }));
    dispatch(clearPostOnCourseError());
  } catch (error) {
    dispatch(setPostOnCourseError("Error updating post on course. Please try again."));
  }
};

// Action to delete a post on a course
export const deletePostOnCourse = (postCourseId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/deletePostOnCourse/${postCourseId}`);
    dispatch(deletePostOnCourseSuccess(postCourseId));
    dispatch(clearPostOnCourseError());
  } catch (error) {
    dispatch(setPostOnCourseError("Error deleting post on course. Please try again."));
  }
};

// Action to fetch posts on a course
export const getPostsOnCourse = () => async (dispatch) => { 
  try {
    const response = await axios.get("http://localhost:3000/getPostsOnCourse");
    const posts = response.data;
    dispatch(setPostsOnCourse(posts));
    dispatch(clearPostOnCourseError());
  } catch (error) {
    dispatch(setPostOnCourseError("Error fetching posts on course. Please try again."));
  }
};

// Action to fetch all posts on a specific course
export const getAllPostsOnCourse = (courseId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3000/getAllPostsOnCourse/${courseId}`,{},{headers});
    const posts = response.data;
    console.log(response.data)
    dispatch(setAllPostsOnCourse(posts));
    dispatch(clearPostOnCourseError());
  } catch (error) {
    dispatch(setPostOnCourseError("Error fetching all posts on course. Please try again."));
  }
};

// postOnCourseSlice.js
const postOnCourseSlice = createSlice({
  name: "postOnCourse",
  initialState: {
    postsOnCourse: [],
    allPostsOnCourse: [],
    postOnCourseError: null,
  },
  reducers: {
    addPostOnCourseSuccess: (state, action) => {
      const { courseId, postData } = action.payload;
      state.postsOnCourse.push({ courseId, ...postData });
    },
    updatePostOnCourseSuccess: (state, action) => {
      const { postCourseId, updatedData } = action.payload;
      const index = state.postsOnCourse.findIndex((post) => post.id === postCourseId);
      if (index !== -1) {
        state.postsOnCourse[index] = { ...state.postsOnCourse[index], ...updatedData };
      }
    },
    deletePostOnCourseSuccess: (state, action) => {
      const postCourseId = action.payload;
      state.postsOnCourse = state.postsOnCourse.filter((post) => post.id !== postCourseId);
    },
    setPostsOnCourse: (state, action) => {
      state.postsOnCourse = action.payload;
    },
    setAllPostsOnCourse: (state, action) => {
      state.allPostsOnCourse = action.payload;
    },
    setPostOnCourseError: (state, action) => {
      state.postOnCourseError = action.payload;
    },
    clearPostOnCourseError: (state) => {
      state.postOnCourseError = null;
    },
  },
});

export const {
  addPostOnCourseSuccess,
  updatePostOnCourseSuccess,
  deletePostOnCourseSuccess,
  setPostsOnCourse,
  setAllPostsOnCourse,
  setPostOnCourseError,
  clearPostOnCourseError,
} = postOnCourseSlice.actions;

export default postOnCourseSlice.reducer;
