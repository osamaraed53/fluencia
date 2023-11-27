import { useState,useContext } from "react";
import SideBarContext from "../context/SideBarContext"; 
import logo from '../assets/fluencia.png'

// I am set initial for Menues value to avoid re render from error and i am set munue work like this to make sidebar reusable
const SideBar = ({children ,Menus =[]}) => {
  const { isSidebarOpen, setSidebarOpen } = useContext(SideBarContext);



  return (
    <div className="flex">
      <div
        className={` ${
          isSidebarOpen ? "md:w-72 md:block w-3/4" : "md:w-20 w-0 p-0 "
        } bg-fluencia-dark-purple h-[66rem] md:p-5  pt-8 relative duration-300`}
      >
      <div id="blockOfMenus" className="sticky top-2">
        <img
          src={`${require("../assets/control.png")}`}
          className={`absolute cursor-pointer -right-9 top-10 w-7 border-dark-purple
           border-2 rounded-full  ${!isSidebarOpen && "rotate-180 md:block hidden"}`}
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        />

        <div className="flex gap-x-4 items-center  h-10 w-12">
          <img
            src={logo}
            className={`cursor-pointer duration-500 ${
              isSidebarOpen && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !isSidebarOpen && "scale-0"
            }`}
          >
            Fluencia
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-xl p-2 cursor-pointer hover:bg-fluencia-purple text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} 
                
              } ${!isSidebarOpen && "md:inline-block hidden"} `}
            >
              <img src={require(`../assets/${Menu.src}.png`)} />
              <span className={`${!isSidebarOpen && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
        </div>
      </div>
      <div className="h-[66rem] flex-1">

      {children}

      </div>
    </div>
  );
};
export default SideBar;