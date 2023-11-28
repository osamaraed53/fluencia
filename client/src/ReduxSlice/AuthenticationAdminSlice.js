import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
// import { useNavigate } from "react-router-dom";

//  authAction



// login
export const loginAdmin = (userData) => async (dispatch) => {
  try {
    // Assuming your login endpoint is at /login
    const response = await axios.post("http://localhost:3000/loginAdmin", userData);
    const user = response.data;
    // console.log("login axios in action", user)
    dispatch(setLogin(user));
    dispatch(clearError());
    Cookies.set("accessToken",user.token)
    setTimeout(() => {
      window.location.href = '/main';
    },  1000);
  } catch (error) {
    dispatch(setError("Invalid credentials. Please try again."));
  }
};

// sginUp
export const signUpAdmin = (userData) => async (dispatch) => {
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




// authSlice.
const authSlice = createSlice({
  name: "authForAdmin",
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    setSignUp: (state, action) => {},
    setLogin: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload; // Set isAuthenticated based on whether user is truthy
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logoutAdmin: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.clear()
      Cookies.remove("accessToken")
    },
  },
});

export const { setSignUp, setLogin, setError, clearError, logoutAdmin } =
  authSlice.actions;
export default authSlice.reducer;
