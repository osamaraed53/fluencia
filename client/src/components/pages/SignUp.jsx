import React, { useState,useEffect } from "react";
import { signUp } from "../../ReduxSlice/AuthenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SignUp = () => {

  const navigate = useNavigate();
  const [userGoogle, setUserGoogle] = useState([]);

  // console.log(userGoogle);
  const loginbygoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setUserGoogle(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });



  const dispatch = useDispatch();
  const Autherror = useSelector((state) => state.auth.error);
  

  useEffect(()=>{
    window.scrollTo(0, 0);
    if (userGoogle.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userGoogle.access_token}`
        )
        .then(async (res) => {
          // console.log("Google User Info:", res.data);
          console.log(res.data);

          try {
            const response = await axios.post(
              "http://localhost:3000/googleLogin",
              res.data
            );
            console.log("Server response:", response.data);

            // const token = response.data.token;


            // Make sure the token is not undefined or null before storing it
            // if (token) {
            //   // login(token);
            //   navigate("/");
            // }

            // Rest of your code...
          } catch (error) {
            console.log("Error:", error);
          }
        })
        .catch((err) => console.log("Google User Info Error:", err.message));
    }
  }, [userGoogle, navigate]);


  // State to store form data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({...prevData,[name]: value,}));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUp(formData));
  };

  return (
    <>
      <div className="min-w-screen min-h-screen bg-white flex items-center justify-center px-5 py-5">
        <div
          className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
          style={{ maxWidth: 1000 }}
        >
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-fluencia-dark-purple py-10 px-10">
              {/* side img */}
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-start mb-10">
                <h1 className="font-bold text-3xl text-fluencia-dark-purple">
                  Sign Up
                </h1>
                <p>Enter your information to register</p>
              </div>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 mb-5">
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="First Name"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 px-3 mb-5">
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="example@mail.com"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button
                      type="submit"
                      className="block w-full max-w-xs mx-auto bg-fluencia-yellow-first hover:bg-yellow-500 focus:bg-fluencia-yellow-second text-white rounded-lg px-3 py-3 font-semibold"
                    >
                      REGISTER NOW
                    </button>
                  </div>
                  <div className="w-full px-3 mb-5">
                    <button
                    onClick={()=>{loginbygoogle()}}
                      type="button"
                      className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300 max-w-xs mx-auto"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-4"
                        id="google"
                      >
                        {/* ... (Google SVG path) */}
                      </svg>{" "}
                      Sign Up with Google{" "}
                    </button>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600 text-center">
                  <p>
                    Already have an account?{" "}
                    <a href="#" className="text-black hover:underline">
                      Login here
                    </a>
                  </p>
                </div>
                <div className="mt-4 text-sm text-red-600 text-center">
                  <p>{Autherror}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default SignUp;
