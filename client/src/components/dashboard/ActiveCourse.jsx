import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchActiveCourses,
  softDeleteCourse,
} from "../../ReduxSlice/courseSlice";
import { createPortal } from "react-dom";


import AddNewCourse from "../mainPage/CreateClass";

export const ActiveCourse = () => {

  const dispatch = useDispatch();
  const [isOpenAddNewClass, setOpenAddNewClass] = useState(false);

  const [openAddAdminPopup, setOpenAddAdminPopup] = useState(false);
//   const [formData, setFormData] = useState({
//     question: '',
//     answer: '',
//   });
const [flag , setFlag] = useState(false)

  useEffect(() => {
    dispatch(fetchActiveCourses());
    window.scrollTo(0, 0);
  }, [flag]);

  const coursesforAdmin = useSelector((state) => state.course.courses);


  const hiddenCourse = (course_id) => {
    dispatch(softDeleteCourse(course_id));
    setFlag(!flag);
  };

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed
  // for pagination
  const canClickNext = useRef(5);
  // for pagination
  const handlePrevClick = () => {
    canClickNext.current -= itemsPerPage;
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  // for pagination
  const handleNextClick = () => {
    canClickNext.current += itemsPerPage;
    setCurrentPage((prevPage) => prevPage + 1);
  };


  return (
    <div>
      <div className=" sm:-px-8 sm:px-8 py-4 overflow-x-auto mt-5 px-10">
        <div className="font-bold text-xl md:mb-10">
          <h1 className="text-5xl">
            <span className="text-fluencia-purple tracking-wide">fluencia</span>
            <span className="text-fluencia-light-purple">Classes</span>
          </h1>
        </div>

        <button onClick={()=>{setOpenAddNewClass(true)}} class="py-2 px-4 mb-3 bg-transparent text-fluencia-purple font-semibold border border-fluencia-purple rounded hover:bg-fluencia-purple hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
          Create Class
        </button>

        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-fluencia-dark-purple text-left text-xs font-semibold text-white uppercase tracking-wider">
                Class Name

                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-fluencia-dark-purple text-left text-xs font-semibold text-white uppercase tracking-wider">
                
                Class description

                </th>

                <th className="px-5 py-3 border-b-2 border-gray-200 bg-fluencia-dark-purple text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {coursesforAdmin
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map(
                  (coursesData ,idx ) =>
                    
                      <tr key={idx}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <Link
                              // to={`/OrderDetails/${userData.user_username}`}
                            >
                              <div className="ml-3">
                                <p className="text-gray-900 text-start   whitespace-wrap ">
                                {coursesData.course_name}
                                </p>
                              </div>
                            </Link>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 text-start whitespace-wrap">
                            {" "}
                            {coursesData.course_description}
                          </p>
                        </td>


                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex space-x-2">
                            {/* <button
                              onClick={() =>
                                handleEditAdminClick(coursesData)
                              }
                            >
                              <svg
                                class="text-teal-600 w-5 h-5 "
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                {" "}
                                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                                <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
                                <line x1="16" y1="5" x2="19" y2="8" />
                              </svg>
                            </button> */}

                            <button
                              onClick={() => hiddenCourse(coursesData?.course_id)}
                            >
                              <svg
                                class="text-orange-600 w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>


                          </div>
                        </td>
                      </tr>
                    
                )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between          ">
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              onClick={handlePrevClick}
              disabled={currentPage === 1}
              className={`text-sm text-white transition duration-150 ${
                currentPage === 1
                  ? "bg-gray-300"
                  : "hover:bg-fluencia-yellow-first bg-fluencia-yellow-second"
              } font-semibold py-2 px-4 rounded-l`}
            >
              Prev
            </button>
            &nbsp; &nbsp;
            <button
              onClick={handleNextClick}
              disabled={coursesforAdmin.length - 1 < canClickNext.current}
              className={`text-sm text-white transition duration-150 ${
                coursesforAdmin.length - 1 < canClickNext.current
                  ? "bg-gray-300"
                  : "hover:bg-fluencia-yellow-first bg-fluencia-yellow-second"
              } font-semibold py-2 px-4 rounded-r`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {isOpenAddNewClass &&
        createPortal(
          <AddNewCourse
            isOpenAddNewClass={isOpenAddNewClass}
            setOpenAddNewClass={setOpenAddNewClass}
            setFlag={setFlag}
            flag={flag}
          />,
          document.body
        )}
    </div>
  );
};
