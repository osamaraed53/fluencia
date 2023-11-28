import React, { useEffect, useRef } from "react";
import img from '../assets/fluencia.jpg'
import { Link} from "react-router-dom";
import { useState } from "react";
import { createPortal } from 'react-dom';
import AddNewCourse from './CreateClass'
import { useDispatch, useSelector } from "react-redux";
import {fetchHiddenCourses ,restoreCourse} from '../ReduxSlice/courseSlice'


const HiddenCourse = () => {

    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Adjust as needed
    
  
    //methode to get data from store  
    const [flag , setFlag] = useState(false)
    const dispatch = useDispatch()
    const courses = useSelector((state) => state.course.hiddenCourses);
    // const errorIn = useSelector((state) => state.course.courseError)
    console.log(courses)
      
    useEffect(() => {
      dispatch(fetchHiddenCourses()); 
    }, [dispatch,flag]);
  
  
  // for pagination 
  const canClickNext = useRef(3)
  
  // for pagination 
  
    const handlePrevClick = () => {
      canClickNext.current-=itemsPerPage;
      setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };
  // for pagination 
  
    const handleNextClick = () => {
      canClickNext.current+=itemsPerPage;
      setCurrentPage(prevPage => prevPage + 1);
    };
  
  
    const activateCourse = (course_id) =>{
      dispatch(restoreCourse(course_id))
      setFlag(!flag)
    }
    return (
    <>

<section className="py-2">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between sm:flex">
            <div>
                <h4 className="text-gray-800 text-xl font-semibold">Hidden Courses </h4>
                <p className="mt-2 text-gray-600 text-base sm:text-sm">Text text text text</p>
            </div>
            {/* <button onClick={()=>{setOpenAddNewClass(true)}} className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-fluencia-yellow-first hover:bg-fluencia-yellow-second active:bg-fluencia-yellow-second rounded-lg sm:mt-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
                Add Class
            </button> */}
        </div>
     
     

          <ul className="mt-16 grid  gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/*for pagination  */}
            {courses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(course => (
              <li className="border rounded-lg opacity-40">
                <div className="flex items-start justify-between p-4">
                  <div className="space-y-2">
                    <img src={img} className="h-10 w-10" alt="img "/>
                    <h4 className="text-gray-800 font-semibold">
                      {course.course_name}
                    </h4>
                    <p className="text-gray-600 text-sm">{course.course_description}</p>
                  </div>
                  <button
                  onClick={()=>{activateCourse(course.course_id)}}
                  href="javascript:void(0)"
                    className="text-black hover:text-red-600 text-sm font-medium"
                  >
                    restore
                  </button>
                </div>
                
                <div className="py-5 px-4 border-t text-right">
                <Link to={`home/${course.course_id}`}>
                <button className="text-white text-sm border rounded-lg px-3 py-2 duration-150 bg-fluencia-yellow-first hover:bg-fluencia-yellow-second">
                    view
                  </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between          ">
            <div className="inline-flex mt-2 xs:mt-0">
              <button  onClick={handlePrevClick}
            disabled={currentPage === 1}
            className={`text-sm text-white transition duration-150 ${
              currentPage === 1 ? 'bg-gray-300' : 'hover:bg-fluencia-yellow-second bg-fluencia-yellow-first'
            } font-semibold py-2 px-4 rounded-l`}>
                Prev
              </button>
              &nbsp; &nbsp;
              <button
            onClick={handleNextClick}
            disabled={courses.length -1 < canClickNext.current}
            className={`text-sm text-white transition duration-150 ${
              courses.length-1 < canClickNext.current ? 'bg-gray-300' : 'hover:bg-fluencia-yellow-second bg-fluencia-yellow-first'
            } font-semibold py-2 px-4 rounded-r`}
          >
                Next
              </button>
            </div>
          </div>
      </section>

    </>
  )
}

export default HiddenCourse