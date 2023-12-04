import React, { useState } from "react";
import axios from "axios"; // Import Axios
import {addCourse} from '../../ReduxSlice/courseSlice'
import { useDispatch, useSelector } from "react-redux";

function AddNewCourse({ isOpenAddNewClass, setOpenAddNewClass,setFlag ,flag}) {
  
  const errors = useSelector((state)=>state.course.courseError)
  const data = useSelector((state)=>state.course.courses)
  const dispatch = useDispatch()
  // console.log(errors)
 
  
  // handle Data
  const [formData, setFormData] = useState({
    course_name: "",
    course_description: "",
    start_date: new Date(),
    price :"10.5"
  });

  const handleClose = () => {
    setOpenAddNewClass(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createClass = async (e) => {
    e.preventDefault();
    dispatch(addCourse(formData));
    setFlag(!flag)
    console.log(formData)
    handleClose()
    
  };

  return (
    <div>
      {isOpenAddNewClass && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center">
            <div className="md:w-1/3 bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={(e) => createClass(e)}>

              <h2 className="text-2xl font-semibold mb-4">Create class</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  name="course_name"
                  value={formData.course_name}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Description
                </label>
                <textarea
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  name="course_description"
                  value={formData.course_description}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  rows="4"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Select Date
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date.toISOString().split("T")[0]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      start_date: new Date(e.target.value),
                    })
                  }
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-4 text-sm text-red-600 text-center">
                  <p>{errors}</p>
                </div>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    handleClose();
                  }}
                  className="mr-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-fluencia-yellow-first text-white rounded-md hover:bg-fluencia-yellow-second"
                >
                  Create
                </button>
              </div>
              </form>

            </div>
        </div>
      )}
    </div>
  );
}

export default AddNewCourse;
