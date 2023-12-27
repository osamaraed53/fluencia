import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// to access in store 
import headers from '../axiosInstance'

//  authAction

// login

export const Googlelogin = (googleToken) => async (dispatch) => {
  axios
  .get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleToken}`
  )
  .then(async (res) => {
    // console.log("Google User Info:", res.data);
    console.log(res.data);

    try {
      const response = await axios.post(
        "http://localhost:3000/googleLogin",
        res.data
      );
      const user = response.data;
      dispatch(setLogin(user.data));
      dispatch(clearError());
      Cookies.set("accessToken", user.token);
      setTimeout(() => {
        window.location.href = "/main";
      }, 1000);

    } catch (error) {
      console.log("Error:", error);
    }
  })
  .catch((err) => console.log("Google User Info Error:", err.message));
}



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
    toast.success(' successful !', {
      position: 'bottom-right',
      autoClose: 2000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    // this generate error
    // const navigate = useNavigate();
    // navigate("/")
    setTimeout(() => {
      window.location.href = '/login';
    },  2000);

  } catch (error) {
    dispatch(setError("Invalid credentials. Please try again."));
    toast.error(' Invalid ! Please try again.', {
      position: 'bottom-right',
      autoClose: 2000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};


export const updateUserData = (userData) => async (dispatch) => {
  try {
    const response = await axios.put("http://localhost:3000/updateUser", userData ,{headers});
    const user = response.data.result;
    dispatch(setUserData(user));
    dispatch(clearError());
    // when sign-up is successful open
    toast.success(' successful !', {
      position: 'bottom-right',
      autoClose: 2000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  } catch (error) {
    dispatch(setError("Invalid credentials. Please try again."));
    toast.error(' Invalid ! Please try again.', {
      position: 'bottom-right',
      autoClose: 2000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
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

    toast.success(' Update successful! !', {
      position: 'bottom-right',
      autoClose: 2000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);


  } catch (error) {
    dispatch(setError("Invalid credentials. Please try again."));
    toast.error('Invalid. Please try again.', {
      position: 'bottom-right',
      autoClose: 2000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  }
};


// log Out action 



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
    setUserData: (state, action) => {
      state.user = action.payload;

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
      window.sessionStorage.clear();
      Cookies.remove("accessToken")
      window.location.href = "/";
    },
  },
});

export const { setSignUp, setLogin, setError, clearError, logout ,setPicture,setUserData} =
  authSlice.actions;
export default authSlice.reducer;
