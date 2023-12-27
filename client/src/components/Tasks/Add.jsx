import React, { useEffect, useState } from "react";
import { addTask } from "../../ReduxSlice/taskSlice .js";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar.jsx";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import TableOfUserInCourse from "./TableOfUserInCourse.jsx";
import { addTaskToUser } from "../../ReduxSlice/userTaskSlice.js";
import { useParams } from "react-router-dom";

function Add() {
  // get course Id by params to send with add task
  const { course_id } = useParams();
  const newTaskId = useSelector((state) => state.task.new_task_id);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    start_date: new Date(),
    end_date: new Date(),
  });
  let [selectStudent, setSelectStudent] = useState({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const onChangeValue = (e) => {
    setTitle(e.target.value);
  };
  const ondescription = (value) => {
    setDescription(value);
  };

  const isError = useSelector((state) => state.task.taskError);

  const addDetails = (event) => {
    event.preventDefault();
    // console.log("selectStudent",selectStudent)
    // console.log("selectStudent",selectStudent.length)
    if (Object.keys(selectStudent).length > 2) {
      dispatch(
        addTask(
          {
            task_name: title,
            task_description: description,
          },
          course_id
        )
      );
    } else {
      toast.error("You Don't add any Student !", {
        position: "top-center",
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    if (newTaskId) {
      setTimeout(() => {
        if (isError == null) {
          setTitle("");
          setDescription("");
        }
        for (const key in selectStudent) {
          if (selectStudent[key] == true) {
            dispatch(
              addTaskToUser(
                key,
                newTaskId,
                formData.start_date,
                formData.end_date,
                course_id
              )
            );
          }
        }
      }, 4000);
    }
  }, [newTaskId]);

  return (
    <>
      <div className="flex flex-col justify-center max-w-screen-xl  md:px-12 px-4 pb-10 lg:pl-18 ">
        <h3 className="myaccount-content ml-2 mt-16 mb-12 text-start text-[2rem] py-2 px-4 bg-transparent text-fluencia-dark-purple font-semibold ">
        <h4 className=" text-5xl font-semibold text-fluencia-dark-purple">
              {" "}
              <span className="text-fluencia-purple tracking-wide">
                fluencia
              </span>
              <span className="text-fluencia-light-purple">Task</span>
            </h4>
        </h3>

        <form onSubmit={addDetails} className=" px-4 max-w-screen-xl ">
          <div className=" px-4 max-w-screen-xl ">
            <div className=" col-md-12">
              {/* <label className="font-weight-bold">
                {" "}
                Title <span className="required"> * </span>{" "}
              </label> */}
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => {
                  onChangeValue(e);
                }}
                className="form-input w-full border-solid border-1 rounded py-2 px-4 mb-4 shadow-sm shadow-fluencia-light-purple"
                placeholder="Title"
                required
              />
            </div>
            <div className="clearfix"></div>
            {/* <label className="font-weight-bold">
                {" "}
                Description{" "}
                <span className="required  border-fluencia-dark-purple">

                </span>{" "}
              </label> */}
            <EditorToolbar toolbarId={"t1"} />
            <ReactQuill
              theme="snow"
              value={description}
              onChange={(e) => {
                ondescription(e);
              }}
              placeholder={"Write something awesome..."}
              modules={modules("t1")}
              formats={formats}
            />
            {isError !== null && <div className="errors"> {isError} </div>}
          </div>
          <ToastContainer />
        </form>

        <div className="flex flex-row gap-2 justify-center mt-4">
          <div className="mb-4 w-5/12">
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
          <div className="mb-4 w-5/12">
            <label className="block text-sm font-medium text-gray-600">
              End Date
            </label>
            <input
              type="date"
              name="end"
              value={formData.end_date.toISOString().split("T")[0]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  end_date: new Date(e.target.value),
                })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="w-12/12" />
        <TableOfUserInCourse
          setSelectStudent={setSelectStudent}
          selectStudent={selectStudent}
        />
        <div className="self-end  mr-8  w-32 py-2 px-4 bg-transparent text-fluencia-purple font-semibold border border-fluencia-purple rounded hover:bg-fluencia-purple hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
          <button
            onClick={(event) => {
              addDetails(event);
            }}
            className=""
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
export default Add;
