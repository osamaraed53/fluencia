import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import headers from "../../axiosInstance";

const TaskDetails = () => {
  const { users_task_id } = useParams();
  const [taskDetails, setTaskDetails] = useState(null);

  // console.log(taskDetails);

  const fetchTaskDetailsForUser = async (users_task_id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/getTaskDetailss/${users_task_id}`,
        { headers }
      );
      setTaskDetails(response.data.taskDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const submit_Task = async (e) => {
    // Implement a file input in your form to let the user choose a new image
    const fileInput = e.target.files[0];
    // If a new image is selected, send it to action
    if (fileInput) {
      const formData = new FormData();
      formData.append("image", fileInput);

      try {
        const response = await axios.put(
          `http://localhost:3000/submitTask/${users_task_id}`,
          formData,
          { headers }
        );
        toast.success(" Update successful! !", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (error) {
        console.log(error);
        toast.error("Invalid. Please try again.", {
          position: "bottom-right",
          autoClose: 2000, // Close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      console.log("No new image selected.");
    }
  };

  useEffect(() => {
    fetchTaskDetailsForUser(users_task_id);
  }, []);
  const today = new Date();
  console.log(taskDetails);

  const end_date = new Date(taskDetails?.end_date);
  const submit_date = new Date(taskDetails?.submit_date);
  console.log(taskDetails?.show);

  return (
    <div className="text-Base-color px-10">
      <div className="flex flex-col justify-center items-center gap-5 my-10">
        {/* searching */}
        <div className="flex flex-wrap justify-center items-center gap-5 w-full">
          {/* pick rooms and # of guests */}
        </div>
        {/* rooms list */}
        <div className="flex flex-col lg:flex-row w-full">
          {/* summary */}
          <div
            className={`bg-white border relative border-third-color  shadow-lg shadow-fluencia-purple/50 rounded-xl
              "lg:w-1/4"
             h-fit lg:mx-5 my-6 text-start pb-10`}
          >
            <div className="flex flex-row justify-center gap-2">
              <span
                className={`flex items-center gap-2 ${
                  today > end_date ? "text-red-700" : "text-green-700"
                }`}
              >
                End: {taskDetails?.end_date.split("T")[0]}
              </span>
            </div>
            <h1 className="text-3xl text-center">
              <span className="text-fluencia-purple tracking-wide">
                fluencia
              </span>
              <span className="text-fluencia-light-purple">Plans</span>
            </h1>
            <hr />
            <div></div>
            <span className="text-fourth-color w-full px-5 py-2 bg-white text-start flex items-center gap-2 border-y-2 ">
              <input
                type="file"
                id="profileImageInput"
                accept="image/*"
                onChange={(e) => submit_Task(e)}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
              add screen shoot
            </span>
            <div className="flex flex-col flex-wrap mt-2 justify-center gap-2">
            <button
              className={`flex justify-center p-4 font-bold w-full text-sm text-fluencia-dark-purple rounded-xl  hover:bg-violet-100 `}
            >
              {taskDetails?.answer_url && (
                <a target="_blank" href={`${taskDetails?.answer_url}`}>
                  {" "}
                  Review answer{" "}
                </a>
              )}
            </button>

            {taskDetails?.show !=null && (
              <label
                className={`flex justify-center text-white self-center ${
                  taskDetails.show === "true" ? "bg-green-600" : "bg-red-600"
                } p-2 font-bold w-8/12 text-sm  rounded-xl mt-5 `}
              >
                {taskDetails?.show === "true" ? "Accept" : "Reject"}
              </label>
              
            )}
            </div>
          </div>

          {/* end summary */}

          {/* list */}
          <div className="text-Base-color text-start flex flex-col w-full">
            {/* ooo */}
            <div className="">
              <div className="mb-12 shadow-lg shadow-fluencia-purple/50 rounded-xl">
                <div className="flex flex-col  px-6 py-10  lg:px-16 pr-3 dark:bg-gray-800">
                  <div className="flex justify-center ">
                    <h2 className="text-start text-2xl font-bold ">
                      {taskDetails != null && taskDetails.task_name}
                    </h2>
                    <div></div>
                  </div>
                  {taskDetails != null && (
                    <div
                      className=" break-words text-center"
                      dangerouslySetInnerHTML={{
                        __html: taskDetails.task_description,
                      }}
                    />
                  )}
                </div>
                <div className="text-sm text-white flex justify-between gap-6"></div>
              </div>
            </div>
            {/* oooo */}
          </div>
        </div>
      </div>
      <ToastContainer />

      {/* <div id="booking"></div> */}
      {/* {isBooking && <BookingModal onClose={closeBookingModal}></BookingModal>} */}
    </div>
  );
};

export default TaskDetails;
