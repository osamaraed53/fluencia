import React, {useEffect, useState} from "react";
import ActiveCourses from "../mainPage/ActiveCourses";
import HiddenCourse from "../mainPage/HiddenCourse";
import { useDispatch,useSelector } from "react-redux";
import PrivateRoute from '../../PrivateRoute'
import { Navigate} from "react-router-dom";

const MainPageOfAdmin = () => {
  
    // to set page as private and get type Of User 
    let type =PrivateRoute()


    //methode to get data from store  
    const [flag , setFlag] = useState(false)
    const coursesforAdmin = useSelector((state) => state.course.courses);
    const courseesForStudent = useSelector((state) => state.courseUser.userCourses);
    const courses = (type== "student") ? courseesForStudent : coursesforAdmin ;
    // console.log(courses)
    const hiddenCourses =  useSelector((state) => state.course.hiddenCourses);
  return (
    <>
      {(type =="none") && <Navigate to="/" replace /> }
      <ActiveCourses flag={flag} setFlag={setFlag} courses={courses} /> 
      {(type == 'admin')  &&<HiddenCourse flag={flag} setFlag={setFlag} hiddenCourses={hiddenCourses}/>}   
    </>
  );
};

export default MainPageOfAdmin;
