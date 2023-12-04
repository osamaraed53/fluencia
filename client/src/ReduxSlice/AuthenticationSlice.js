import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import { useDispatch,useSelector } from "react-redux";
import {GetCoursesIds } from './courseUserSlice'
// import { useNavigate } from "react-router-dom";
// to access in store 

const token = Cookies.get("accessToken"); 
const headers = {
  'Authorization': `Bearer ${token}`,
  "Content-Type": "multipart/form-data" 
};


//  authAction

// login
export const login = (userData) => async (dispatch) => {
  try {
    // Assuming your login endpoint is at /login
    const response = await axios.post("http://localhost:3000/login", userData);
    const user = response.data;
    // console.log("login axios in action", user)
    dispatch(setLogin(user.data));
    dispatch(clearError());
    Cookies.set("accessToken", user.token);
    setTimeout(() => {
      window.location.href = "/main";
    }, 1000);
  } catch (error) {
    dispatch(setError("Invalid credentials. Please try again."));
    console.log(error)
  }
};

// sginUp
export const signUp = (userData) => async (dispatch) => {
  try {
    // Assuming your login endpoint is at /login
    const response = await axios.post("http://localhost:3000/signup", userData);
    const user = response.data;
    
    dispatch(setSignUp(user));
    dispatch(clearError());
    // when sign-up is successful open
    Swal.fire({
      icon: "success",
      title: "Sign-up successful!",
      showConfirmButton: false,
      timer: 1000,
    });
    // this generate error
    // const navigate = useNavigate();
    // navigate("/")
    setTimeout(() => {
      window.location.href = '/login';
    },  2000);

  } catch (error) {
    dispatch(setError("Invalid credentials. Please try again."));
  }
};

export const updatePicture = (formData) => async (dispatch) => {
  try {
    // Assuming your login endpoint is at /login
    const response = await axios.put("http://localhost:3000/updatePicture", formData, {headers}
    );
    const user = response.data;
    
    dispatch(setPicture(user.picture));
    dispatch(clearError());
    // when sign-up is successful open
    Swal.fire({
      icon: "success",
      title: "Update successful!",
      showConfirmButton: false,
      timer: 1000,
    });

  } catch (error) {
    dispatch(setError("Invalid credentials. Please try again."));
  }
};


// authSlice.
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    setSignUp: (state, action) => {},
    setLogin: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setPicture: (state, action) => {
      state.user.picture = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.clear()
    },
  },
});

export const { setSignUp, setLogin, setError, clearError, logout ,setPicture} =
  authSlice.actions;
export default authSlice.reducer;
