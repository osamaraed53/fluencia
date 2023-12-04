import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/fluencia.png";
import SideBarContext from "../context/SideBarContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../ReduxSlice/AuthenticationSlice";
import {logoutAdmin} from '../ReduxSlice/AuthenticationAdminSlice';
import Cookies from "js-cookie";
const NavBar = () => {



  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isSidebarOpen, setSidebarOpen } = useContext(SideBarContext);
  // to change navbar and sign out
  const signInUser = useSelector((state) => state.auth.isAuthenticated);
  const signInAdmin = useSelector((state) => state.authForAdmin.isAuthenticated);



  // if have token before 
  const token = Cookies.get("accessToken")
  if(token){
    if(signInUser ===false && signInAdmin===false){
      Cookies.remove("accessToken")
    }
    
  }

  const dispatch = useDispatch();
  //  I am use Navigate To make the page reload
  const navigate = useNavigate();

  // for toggleDropdown for My Account
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // sign out function based on reduser
  const signOut = () => {
    if(signInUser == true){
    dispatch(logout());
    window.sessionStorage.clear();
    Cookies.remove("accessToken")
    }
    if(signInAdmin == true){
      dispatch(logoutAdmin());
      window.sessionStorage.clear();
    }
  };

  //  to chamge nav bar if login Or not
  const loginNav =
    (signInUser || signInAdmin )? (

      <div className="group relative cursor-pointer py-2">
        <div className="flex items-center justify-between space-x-2 bg-fluencia-dark-purple md:px-4">  
        <span  className=" menu-hover inline-flex lg:mx-1 items-center px-2 py-2 border border-transparent leading-6 font-medium text-white hover:text-white focus:outline-none transition duration-150 ease-in-out"  >
            My Acount
        </span>
      
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </div>
        <div className="invisible absolute z-50 flex text-center w-full flex-col bg-fluencia-purple rounded-xl py-1 px-4 text-white shadow-xl group-hover:visible">
          < Link to={'/login'} className=" my-2 block border-b border-gray-300 py-1 font-semibold text-white hover:text-gray-200 md:mx-2">
         
           <p>Shipper</p> 
          </Link>
          <button onClick={()=>signOut()} className="my-2 block border-b border-gray-300 py-1 font-semibold text-white hover:text-gray-200 md:mx-2">
           <p>LogOut</p> 
          </button>
          
      
        </div>
      </div>
    ) : (
      <div className="flex-1 flex justify-end items-center align-center md:pr-16">
        <Link to="/login">
          <button className="text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center whitespace-nowrap">
            <span>Sign in</span>
          </button>
        </Link>
        <Link to="/signUp">
          <button
            type="button"
            className="text-white bg-fluencia-yellow-first  hover:bg-fluencia-yellow-second focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center whitespace-nowrap"
          >
            Sign Up
          </button>
        </Link>
      </div>
    );

  const isHomePage =
    window.location.pathname === "/" || window.location.pathname === "/Contact";

  const sideBarButton = isHomePage ? null : (
    <button
      id="sideBarButtonInNavBar"
      data-collapse-toggle="navbar-user"
      type="button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white  rounded-3xl hover:bg-fluencia-purple focus:outline-none focus:ring-2 focus:ring-gray-20"
      aria-controls="navbar-user"
      aria-expanded="false"
      onClick={() => {
        setSidebarOpen(!isSidebarOpen);
      }}
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="w-5 h-5 "
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
  );

  return (
    <div className="antialiased ">
      <header className="lg:pl-5 pr-3 px-2 bg-fluencia-dark-purple flex flex-wrap items-center lg:py-0 py-2 ">
        <div className="flex-1 flex  items-center">
          {sideBarButton}

          <button
            onClick={() => {
              navigate("/");
            }}
            className="text-black text-2xl pl-11 py-0 font-bold"
          >
            <img
              className="lg:h-20 lg:w-24 h-18 w-20 p-0  md:h-20 md:w-24"
              src={logo}
              alt="logo"
            ></img>
          </button>
        </div>

        {loginNav}
      </header>
    </div>
  );
};

export default NavBar;
