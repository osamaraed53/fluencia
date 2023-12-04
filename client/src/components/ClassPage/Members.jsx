import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Search from "./Search";
import { useDispatch } from "react-redux";
import {deleteCourseForUser} from '../../ReduxSlice/courseUserSlice'
import PrivateRoute from '../../PrivateRoute'
const Members = ({ title ,type_of_members ,data = [] ,flag, setFlag}) => {
  PrivateRoute()
  const [isOpenSearch, setOpenSearch] = React.useState(false);
  const dispatch = useDispatch()
  const handeToRemoveStudentOrAdminToClass = (member)=>{
    if(type_of_members == "student"){
      dispatch(deleteCourseForUser(member.course_user_id))
      setFlag(!flag)
    }
  }



  return (
    <div className="mt-6">
      <div className="max-w-2xl mx-auto px-4">
        <div className="items-start justify-between sm:flex">
          <div>
            <h4 className="text-gray-800 text-xl font-semibold">{title}</h4>
            <p className="mt-2 text-gray-600 text-base sm:text-sm">{title}</p>
          </div>
          <button
            href="javascript:void(0)"
            className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-fluencia-yellow-first hover:bg-fluencia-yellow-second active:bg-fluencia-yellow-second rounded-lg sm:mt-0"
            onClick={()=>{setOpenSearch(true)}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
            Add
          </button>
        </div>
        <ul className="mt-12 divide-y">
          {data.map((member, id) => (
            <li key={id} className="py-5 flex items-start justify-between">
              <div className="flex gap-3">
                <img
                  src={member.img}
                  className="flex-none w-12 h-12 rounded-full"
                />
                <div>
                  <span className="block text-sm text-gray-700 font-semibold">
                    {member.name}
                  </span>
                  <span className="block text-sm text-gray-600">
                    {member.email}
                  </span>
                </div>
              </div>
              <button
              onClick={()=>{handeToRemoveStudentOrAdminToClass(member)}}
                href="javascript:void(0)"
                className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      {isOpenSearch && createPortal(
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-80 bg-gray-900 z-50 ">
          {<Search setOpenSearch={setOpenSearch}  type_of_members={type_of_members}  flag={flag} setFlag={setFlag}   />}
        </div>,
        document.body
      )}
    </div>
  );
};

export default Members;
