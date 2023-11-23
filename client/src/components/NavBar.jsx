import React, { useState, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import logo from "../assets/fluencia.png";
import SideBarContext from "../context/SideBarContext";

const NavBar = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isSidebarOpen, setSidebarOpen } = useContext(SideBarContext);
//  I am use Navigate To make the page reload 
  const navigate = useNavigate();

  

  // for toggleDropdown for My Account 
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  // sign out function the props come from state in App.js
  const signOut = () => {
    props.setSignin(false);
    window.sessionStorage.clear();
  };


  //  to chamge nav bar if login Or not
  const loginNav = props.signIn ? (
    <div className="flex justify-center items-center md:pr-16">
      <button
        onClick={toggleDropdown}
        className="text-white bg-fluencia-yellow-first hover:bg-fluencia-yellow-second  focus:outline-none font-medium rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center whitespace-nowrap"
        type="button"
      >
        My Account
      </button>
      {/* Dropdown menu */}
      <div
        className={`${
          isDropdownOpen ? "block" : "hidden"
        } z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute m-1`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Settings
            </a>
          </li>
          <li>
            <a
              onClick={signOut}
              className="block px-4 py-2 hover-bg-gray-100 dark:hover-bg-gray-600 dark:hover-text-white"
            >
              Sign out
            </a>
          </li>
        </ul>
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



  const isHomePage = window.location.pathname === "/";

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

          <button onClick={()=>{navigate("/")}} className="text-black text-2xl pl-11 py-0 font-bold">
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
