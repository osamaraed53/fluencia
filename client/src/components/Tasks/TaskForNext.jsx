import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {fetchStudent} from '../../ReduxSlice/courseUserSlice'

function TaskForNext({ title = "osamaRaedAlnobani ",}) {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchStudent(14));
}, []);

  const data = useSelector((state) => state.courseUser.students);


  return (
    <div className="flex justify-center  ">
      <div className="p-4 w-full bg-gray-50 rounded-lg border shadow-md sm:p-8 m-96">
          <div className="max-w-2xl mx-auto px-4">
             <div className="items-start justify-between sm:flex ">
              <div>
                <h4 className="text-gray-800 text-xl font-semibold">{title}</h4>
                <p className="mt-2 text-gray-600 text-base sm:text-sm">
                  {title}
                </p>
              </div>
             

            </div>

            <ul className="mt-12 divide-y">
              {data.map((member, id) => (
                <li key={id} className="py-5 flex items-start justify-between">
                  <div className="flex gap-3">
                    <img
                      src={
                        member.picture !== null
                          ? member.picture
                          : "https://i.pinimg.com/564x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"
                      }
                      className="flex-none w-12 h-12 rounded-full"
                    />
                    <div>
                      <span className="block text-sm text-gray-700 font-semibold">
                        osamaRaedAlnobani 
                      </span>
                      <span className="block text-sm text-gray-600">
                        {member.email}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                    }}
                    href="javascript:void(0)"
                    className=" text-sm border border-blue-800 text-blue-800 rounded-lg px-3 py-2 duration-150 bg-white hover:bg-blue-800 hover:text-white"
                  >
                    message
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>
    </div>
  );
}

export default TaskForNext;
