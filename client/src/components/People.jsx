import React, { useState,useEffect } from "react";
import Members from "./Members";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchTeacher, fetchStudent } from "../ReduxSlice/courseUserSlice";
const People = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchTeacher(id));
      dispatch(fetchStudent(id));
    } else {
      dispatch(fetchTeacher(-1));
      dispatch(fetchStudent(-1));
    }
  }, [dispatch]);

  const teachers = useSelector((state) => state.courseUser.teachers);
  const students = useSelector((state) => state.courseUser.students);
  console.log(teachers);
  console.log(students);
  return (
    <div className="flex flex-col flex-wrap justify-center gap-10 divide-y divide-neutral-200 max-w-2xl mx-auto px-4 ">
      <div>
        <Members title="Teacher" type={"teacher"} data={teachers}/>
      </div>
      {/* <div className='bg-gray-400 border-black w-6/6 h-1 justify-self-center'>
                </div>  */}
      <div>
        <Members title="Student" type={"student"}  data ={students}/>
      </div>
    </div>
  );
};

export default People;
