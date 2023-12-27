import { useState, useContext, useEffect } from "react";
import SideBarContext from "../../context/SideBarContext";
import logo from "../../assets/fluencia.png";
import CheckTypeOfUser from "../../PrivateRoute";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseUser,
  faEnvelope,
  faUserLock,
  faUser,
  faRightFromBracket,
  faClipboardQuestion,
  faCircleQuestion,
  faMoneyBill,
  faBook,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../ReduxSlice/AuthenticationSlice";
import { logoutAdmin } from "../../ReduxSlice/AuthenticationAdminSlice";

// I am set initial for Menues value to avoid re render from error and i am set munue work like this to make sidebar reusable
const SideBar = ({ children, Menus = [] }) => {
  const dispatch = useDispatch();
  const navagite = useNavigate();
  const { isSidebarOpen, setSidebarOpen } = useContext(SideBarContext);
  const type = CheckTypeOfUser();

  // to get data of user from admin or any user 
  const userDataForUser = useSelector((state) => state.auth.user);
  const userDataForAdmin = useSelector((state) => state.authForAdmin.user);
  const userData = (type == 'student') ? userDataForUser : userDataForAdmin


  const signOut = () => {
    const logOut = type == "student" ? logout :logoutAdmin ;
    if(type == 'student'){
      dispatch(logout());
    }else if (type == 'admin'){
      dispatch(logout());
    }

    dispatch(logOut());
    window.sessionStorage.clear();
    Cookies.remove("accessToken");
    navagite("/");
  };

  return (
    <div className="flex flex-row ">
      <div
        className={` ${
          isSidebarOpen ? "md:w-72 md:block md:z-[60]" : "md:w-20 w-0 p-0 "
        } bg-fluencia-dark-purple md:p-5  pt-8 relative duration-300 `}
      >
        <div id="blockOfMenus" className="sticky top-4">
          <img
            src={`${require("../../assets/control.png")}`}
            className={`absolute cursor-pointer -right-9 top-10 w-7 z-50 border-dark-purple
           border-2 rounded-full  ${
             !isSidebarOpen && "rotate-180 md:block hidden"
           }`}
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          />

          <ul className="pt-6">
            <li className="">
              <Link to="/profile">
                <li
                  className={`flex  rounded-xl  cursor-pointer  text-white text-4xl items-center gap-x-4 
              } ${!isSidebarOpen && "md:inline-block none"} `}
                >
                  <img
                    src={
                    (  userData !== null  && userData.picture !== null)
                        ? userData.picture
                        : "https://i.pinimg.com/564x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"
                    }
                    className={`cursor-pointer duration-500 rounded-full h-12 w-12 ${
                      isSidebarOpen ? "rotate-[360deg]" : ""
                    }`}
                  />
                  <h1
                    className={`text-white origin-left font-medium text-2xl duration-200 ${
                      !isSidebarOpen && "scale-0"
                    }`}
                  >
                    {userData !== null ? userData.first_name : ""}
                  </h1>
                </li>
              </Link>
            </li>

            {Menus.map((Menu, index) => (
              <Link to={Menu.path} className={`${type !='admin' ? Menu.property : ''}`} key={index}>
                <li
                  className={`flex ${type !='admin' ? Menu.property : ''}  rounded-xl p-2 cursor-pointer  border-b-2 border-fluencia-light-purple  hover:bg-fluencia-light-purple text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-2" : "mt-2"} 
                
              } ${!isSidebarOpen && "md:inline-block hidden"}   `}
                >
                  {Menu.src }
                  <span
                    className={`${
                      !isSidebarOpen && "hidden"
                    } origin-left duration-200 text-lg text-white  `}
                  >
                    {Menu.title}
                  </span>
                </li>
              </Link>
            ))}

            <li
              className={`flex  rounded-xl p-2 cursor-pointer hover:bg-fluencia-purple text-gray-300 text-sm items-center gap-x-4 
              ${false ? "mt-9" : "mt-2"} 
                
              } ${!isSidebarOpen && "md:inline-block hidden"} `}
            >
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="h-8 w-8 text-white"
                onClick={() => {
                  signOut();
                }}
              />
              <button
                className={`${
                  !isSidebarOpen && "hidden"
                } origin-left duration-200 text-lg text-white`}
                onClick={() => {
                  signOut();
                }}
              >
                log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className=" flex-1 h-auto">{children}</div>
    </div>
  );
};
export default SideBar;
