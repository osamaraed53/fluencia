import React, { useState,useEffect } from "react";
import Members from "./Members";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchTeacher, fetchStudent } from "../../ReduxSlice/courseUserSlice";
import PrivateRoute from '../../PrivateRoute'

const People = () => {

  PrivateRoute()

  const { course_id } = useParams();
  
  const [flag ,setFlag] = useState(true)
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchTeacher(course_id));
      dispatch(fetchStudent(course_id));

  }, [flag]);

  const teachers = useSelector((state) => state.courseUser.teachers);
  const students = useSelector((state) => state.courseUser.students);
  console.log(teachers);
  console.log(students);
  
  
  return (
    <div className="flex flex-col flex-wrap justify-center gap-10 divide-y divide-neutral-200 max-w-2xl mx-auto px-4 ">
      <div>
        <Members title="Teacher" type_of_members={"teacher"} data={teachers} flag={flag} setFlag={setFlag}/>
      </div>
      {/* <div className='bg-gray-400 border-black w-6/6 h-1 justify-self-center'>
                </div>  */}
      <div>
        <Members title="Student" type_of_members={"student"}  data ={students} flag={flag} setFlag={setFlag}/>
      </div>
    </div>
  );
};

export default People;
