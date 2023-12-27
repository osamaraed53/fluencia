import React, { useState,useEffect } from "react";
import Members from "./Members";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacher, fetchStudent } from "../../ReduxSlice/courseUserSlice";

const People = () => {


  const { course_id } = useParams();
  
  const [flag ,setFlag] = useState(true)
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchTeacher(course_id));
      dispatch(fetchStudent(course_id));

  }, [flag]);

  const teachers = useSelector((state) => state.courseUser.teachers);
  const students = useSelector((state) => state.courseUser.students);

  // console.log(teachers);
  // console.log(students);
  
  
  return (
    <div className="flex flex-col lg:flex-row justify-around gap-8 w-full p-8">
      <div className="w-full lg:w-1/4 border-third-color  shadow-lg shadow-fluencia-purple/20 rounded-md h-fit mt-12 lg:ml-12 ">
        <Members title="Teacher" type_of_members={"teacher"} data={teachers} flag={flag} setFlag={setFlag}/>
      </div>
      {/* <div className='bg-gray-400 border-black w-6/6 h-1 justify-self-center'>
                </div>  */}
      <div className="w-full  lg:w-3/4 border-third-color  shadow-lg shadow-fluencia-purple/20 rounded-md h-fit mt-12 lg:mr-12 ">
        <Members title="Student" type_of_members={"student"}  data ={students} flag={flag} setFlag={setFlag}/>
      </div>
    </div>
  );
};

export default People;
