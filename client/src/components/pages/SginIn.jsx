import React from "react";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login,Googlelogin } from "../../ReduxSlice/AuthenticationSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
 

const Login = () => {
  const [userGoogle, setUserGoogle] = useState([]);
  const navigate = useNavigate();
  
  // console.log(userGoogle);
  const loginbygoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setUserGoogle(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });


  useEffect(()=>{
    window.scrollTo(0, 0);
    if (userGoogle.access_token) {
      dispatch(Googlelogin(userGoogle.access_token))
    }
  }, [userGoogle, navigate]);

  // state to save data from form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  // get data from Redux store
  const Autherror = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  // console.log("osama",auth)

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };


  return (
    <>
      <div className="min-w-screen min-h-screen bg-white flex items-center justify-center px-5 py-5">
        <div
          className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
          style={{ maxWidth: 1000 }}
          form
        >
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-fluencia-dark-purple py-10 px-10">

            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-start mb-10">
              <h4 className=" text-4xl font-semibold text-fluencia-dark-purple">
              {" "}
              <span className="text-fluencia-purple tracking-wide">
                Welcome
              </span>
              <span className="text-fluencia-light-purple">fluencia</span>
            </h4>
                {/* <p>Text Text Text Text</p> */}
              </div>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                        </div>
                        <input
                          type="email"
                          className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="example@mail.com"
                          name="email"
                          value={formData.email}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
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
                          className="w-full -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Password"
                          name="password"
                          value={formData.password}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />

                        
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col -mx-3">
                    <div className="w-full px-3 mb-5">
                      <button
                        type="submit"
                        className="block w-full max-w-xs mx-auto bg-fluencia-yellow-first hover:bg-fluencia-yellow-second focus:bg-fluencia-yellow-second text-white rounded-lg px-3 py-3 font-semibold"
                      >
                        Sign In
                      </button>
                    </div>
                    <div class="w-full px-3 mb-5">
                      <button
                      onClick={()=>{loginbygoogle()}}
                        type="button"
                        class="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300 max-w-xs mx-auto"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          class="w-4"
                          id="google"
                        >
                          <path
                            fill="#fbbb00"
                            d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
                          ></path>
                          <path
                            fill="#518ef8"
                            d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
                          ></path>
                          <path
                            fill="#28b446"
                            d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
                          ></path>
                          <path
                            fill="#f14336"
                            d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
                          ></path>
                        </svg>{" "}
                        Sign In with Google{" "}
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-4 text-sm text-gray-600 text-center">
                  <p>
                    I don't have an account?{" "}
                    <a href="#" class="text-black hover:underline">
                      Register here
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
      </div>
    </>
  );
};

export default Login;
