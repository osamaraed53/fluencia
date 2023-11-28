import React, { useEffect, useLayoutEffect, useRef } from "react";
import ActiveCourses from "../ActiveCourses";
import HiddenCourse from "../HiddenCourse";


const MainPageOfAdmin = () => {

  return (


    <>
      <ActiveCourses/> 
      <HiddenCourse/>   
    </>
  );
};

export default MainPageOfAdmin;
