// userActions.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("accessToken");
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};


// Action to fetch all users
export const fetchAllUsers = () => async (dispatch) => {
  try {

    const response = await axios.get("http://localhost:3000/GetUsers",{headers});
    const users = response.data;
    console.log(users)
    dispatch(setUsers(users));
    dispatch(clearUserError());
  } catch (error) {
    dispatch(setUserError("Error fetching users. Please try again."));
  }
};

// Action to fetch a user by ID
export const fetchUserById = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3000/getUserById/${userId}`);
    const user = response.data;
    dispatch(setUser(user));
    dispatch(clearUserError());
  } catch (error) {
    dispatch(setUserError("Error fetching user details. Please try again."));
  }
};

// Action to fetch deleted users
export const fetchDeletedUsers = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/GetDeletedUsers",{});
    const deletedUsers = response.data;
    dispatch(setDeletedUsers(deletedUsers));
    dispatch(clearUserError());
  } catch (error) {
    dispatch(setUserError("Error fetching deleted users. Please try again."));
  }
};

// Action to soft delete a user
export const softDeleteUser = (userId) => async (dispatch) => {
  console.log("user_id",userId)
  try {
    await axios.delete(`http://localhost:3000/SoftdeleteUser/${userId}`,{headers});
    dispatch(softDeleteExistingUser(userId));
    dispatch(clearUserError());
  } catch (error) {
    dispatch(setUserError("Error soft deleting user. Please try again."));
  }
};

// Action to restore a soft-deleted user
export const restoreUser = (userId) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:3000/RestoreUser/${userId}`,{},{});
    dispatch(restoreSoftDeletedUser(userId));
    dispatch(clearUserError());
  } catch (error) {
    dispatch(setUserError("Error restoring user. Please try again."));
  }
};

// userSlice.js
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: null,
    deletedUsers: [],
    userError: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setDeletedUsers: (state, action) => {
      state.deletedUsers = action.payload;
    },
    softDeleteExistingUser: (state, action) => {
      const deletedUserId = action.payload;
      state.users = state.users.filter(user => user.id !== deletedUserId);
    },
    restoreSoftDeletedUser: (state, action) => {
      const restoredUserId = action.payload;
      const deletedUser = state.deletedUsers.find(user => user.id === restoredUserId);
      if (deletedUser) {
        state.users.push(deletedUser);
        state.deletedUsers = state.deletedUsers.filter(user => user.id !== restoredUserId);
      }
    },
    setUserError: (state, action) => {
      state.userError = action.payload;
    },
    clearUserError: (state) => {
      state.userError = null;
    },
  },
});

export const {
  setUsers,
  setUser,
  setDeletedUsers,
  softDeleteExistingUser,
  restoreSoftDeletedUser,
  setUserError,
  clearUserError,
} = userSlice.actions;

export default userSlice.reducer;
