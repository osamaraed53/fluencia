import { useState, useContext, useEffect } from "react";
import SideBarContext from "../../context/SideBarContext";
import logo from "../../assets/fluencia.png";
import PrivateRoute from "../../PrivateRoute";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// I am set initial for Menues value to avoid re render from error and i am set munue work like this to make sidebar reusable
const SideBar = ({ children, Menus = [] }) => {
  const token = Cookies.get("accessToken");
  // const headers = {
  //   Authorization: `Bearer ${token}`,
  //   "Content-Type": "application/json",
  // };
  const { isSidebarOpen, setSidebarOpen } = useContext(SideBarContext);
  const userData = useSelector((state)=>state.auth.user)

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/GetUserData`, {
  //         headers,
  //       });
  //       console.log(response.data);
  //       setData(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getData();
  // }, [token]);


  return (
    <div className="flex flex-row ">
      <div
        className={` ${
          isSidebarOpen ? "md:w-72 md:block w-3/4" : "md:w-20 w-0 p-0 "
        } bg-fluencia-dark-purple h-[100rem] md:p-5  pt-8 relative duration-300 `}
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
          <Link to="/profile">
            <div className="flex gap-x-4 items-center  h-10 w-12 ">
              <img
                src={
                  userData !== null
                    ? userData.picture
                    : "https://i.pinimg.com/564x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"
               }
                className={`cursor-pointer duration-500 rounded-full ${
                  isSidebarOpen && "rotate-[360deg]"
                }`}
              />

              <h1
                className={`text-white origin-left font-medium text-xl duration-200 ${
                  !isSidebarOpen && "scale-0"
                }`}
              >
                {userData !== null ? userData.first_name : ''}
              </h1>
            </div>
          </Link>

          <ul className="pt-6">
            {Menus.map((Menu, index) => (
             <Link to={Menu.path} key={index}>
             <li
                
                className={`flex  rounded-xl p-2 cursor-pointer hover:bg-fluencia-purple text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} 
                
              } ${!isSidebarOpen && "md:inline-block hidden"} `}
              >
                <img src={require(`../../assets/${Menu.src}.png`)} />
                <span
                  className={`${
                    !isSidebarOpen && "hidden"
                  } origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div className="h-[66rem] flex-1">{children}</div>
    </div>
  );
};
export default SideBar;
