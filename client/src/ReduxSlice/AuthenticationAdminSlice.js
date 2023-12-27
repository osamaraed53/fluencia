import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import headers from "../axiosInstance";

//  authAction

// login
export const loginAdmin = (userData) => async (dispatch) => {
  // const navigate = useNavigate();

  try {
    // Assuming your login endpoint is at /login
    const response = await axios.post(
      "http://localhost:3000/loginAdmin",
      userData
    );
    const user = response.data;
    console.log("login axios in action", user);
    dispatch(setLogin(user.data));
    console.log(user.data);
    dispatch(clearError());
    Cookies.set("accessToken", user.token);
    setTimeout(() => {
      window.location.href = "/main";
    }, 1000);
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
      window.location.href = "/login";
    }, 2000);
  } catch (error) {
    dispatch(setError("Invalid credentials. Please try again."));
  }
};

export const updatePictureforAdmin = (formData) => async (dispatch) => {
  try {
    // Assuming your login endpoint is at /login
    const response = await axios.put(
      "http://localhost:3000/updatePictureAdmin",
      formData,
      { headers }
    );
    const user = response.data;
    console.log(user);
    dispatch(setPicture(user.updatedImg));
    dispatch(clearError());
    // when sign-up is successful open

    toast.success(" Update successful! !", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } catch (error) {
    console.log(error);
    dispatch(setError("Invalid credentials. Please try again."));
    toast.error("Invalid. Please try again.", {
      position: "bottom-right",
      autoClose: 2000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};

export const updateAdminData = (userData) => async (dispatch) => {
  try {
    
    // Assuming your login endpoint is at /login
    const response = await axios.put(
      "http://localhost:3000/updateAdminData",
      userData,
      {
        headers,
      }
    );
    const user = response.data.result;
    console.log(user);
    dispatch(setUserData(user));
    dispatch(clearError());
    // when sign-up is successful open

    toast.success(" Update successful! !", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  } catch (error) {
    console.log(error);
    dispatch(setError("Invalid credentials. Please try again."));
    toast.error("Invalid. Please try again.", {
      position: "bottom-right",
      autoClose: 2000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  // try {
  //   axios.put("http://localhost:3000/updateUser", userData, {
  //     headers,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};

// authSlice.
const authSlice = createSlice({
  name: "authForAdmin",
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
    role: null,
  },
  reducers: {
    setSignUp: (state, action) => {},
    setLogin: (state, action) => {
      state.user = action.payload;
      state.role = action.payload.role;
      state.isAuthenticated = !!action.payload;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
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
      window.sessionStorage.clear();
      Cookies.remove("accessToken")
      window.location.href = "/";
    },
    setPicture: (state, action) => {
      state.user.picture = action.payload;
    },
  },
});

export const {
  setSignUp,
  setLogin,
  setError,
  clearError,
  logoutAdmin,
  setPicture,
  setUserData,
} = authSlice.actions;

export default authSlice.reducer;
