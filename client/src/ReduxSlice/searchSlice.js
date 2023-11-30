// searchActions.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("accessToken");
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};


// Action to search for teachers
export const searchTeachers = (input) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/SearchTeachers",
      {
        "email": input,
      },
      { headers }
    );
    const teachers = response.data;
    // console.log(teachers);
    dispatch(setTeachers(teachers));
    dispatch(clearSearchError());
  } catch (error) {
    dispatch(setSearchError("Error searching for teachers. Please try again."));
  }
};

// Action to search for users
export const searchUsers = (input) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/SearchUsers",
      { "email": input },
      { headers }
    );
    const users = response.data;
    // console.log(users);
    dispatch(setUsers(users));
    dispatch(clearSearchError());
  } catch (error) {
    dispatch(setSearchError("Error searching for users. Please try again."));
  }
};

// searchSlice.js
const searchSlice = createSlice({
  name: "search",
  initialState: {
    teachers: [],
    users: [],
    searchError: null,
  },
  reducers: {
    setTeachers: (state, action) => {
      state.teachers = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSearchError: (state, action) => {
      state.searchError = action.payload;
    },
    clearSearchError: (state) => {
      state.searchError = null;
    },
  },
});

export const { setTeachers, setUsers, setSearchError, clearSearchError } =
  searchSlice.actions;

export default searchSlice.reducer;
