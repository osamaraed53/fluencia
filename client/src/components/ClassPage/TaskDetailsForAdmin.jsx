import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import headers from "../../axiosInstance";

const TaskDetailsForAdmin = () => {
  const { users_task_id } = useParams();
  const [taskDetails, setTaskDetails] = useState(null);
  const [data, setData] = useState([]);

  const fetchTaskDetailsForAdmin = async (users_task_id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/GetTaskbyID/${users_task_id}`,
        { headers }
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTaskDetailsForAdmin(users_task_id);
  }, []);

  console.log(data);
  const today = new Date();
  const end_date = new Date(taskDetails?.end_date);
  const submit_date = new Date(taskDetails?.submit_date);

  const setAccept = async (users_task_id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/checkTaskesAccept/${users_task_id}`,
        {},
        { headers }
      );
      console.log(response);
      toast.success(" successful !", {
        position: "bottom-right",
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setReject = async (users_task_id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/checkTaskesReject/${users_task_id}`,
        {},
        { headers }
      );
      console.log(response);
      toast.success(" successful !", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-Base-color px-10">
      <div className="flex flex-col justify-center items-center gap-5 my-10">
        {/* searching */}
        <div className="flex flex-wrap justify-center items-center gap-5 w-full">
          {/* pick rooms and # of guests */}
        </div>
        {/* rooms list */}
        <div className="flex flex-col lg:flex-row w-full ">
          {/* summary */}
          <div
            className={`bg-white border sticky top-4 border-third-color  shadow-lg  shadow-fluencia-purple/50 rounded-xl
                "lg:w-1/4"
               h-fit lg:mx-5 my-6 text-start pb-10`}
          >
            <div className="flex flex-row justify-center gap-2 ">
              <span
                className={`flex items-center gap-2 ${
                  today > end_date ? "text-red-700" : "text-green-700"
                }`}
              >
                {/* End: {taskDetails?.end_date.split("T")[0]} */}
              </span>
            </div>
            <h1 className="text-3xl text-center px-10 py-5">
              <span className="text-fluencia-purple tracking-wide">
                fluencia
              </span>
              <span className="text-fluencia-light-purple">Plans</span>
            </h1>
            <hr />
            <div></div>
            <span className="text-center  text-fourth-color w-full px-5 py-2 bg-white text-fluencia-dark-purple flex justify-center items-center gap-2 border-y-2 ">
              {taskDetails
                ? `Task For : ${taskDetails.first_name}  ${taskDetails?.last_name}`
                : "Select user"}
            </span>
            {taskDetails?.answer_url && (
              <button
                className={`flex justify-center p-4 font-bold w-full text-sm text-fluencia-dark-purple rounded-xl  hover:bg-violet-100 `}
              >
                (
                <a target="_blank" href={`${taskDetails?.answer_url}`}>
                  {" "}
                  Review answer{" "}
                </a>
                )
              </button>
            )}
            {taskDetails != null && (
              <div className="flex flex-row flex-wrap mt-2 justify-center gap-2">
                <button
                  className={`flex justify-center w-4/12 p-2  font-bold  text-white text-sm bg-green-600 rounded-xl  hover:bg-green-500 `}
                  onClick={() => {
                    setAccept(taskDetails.users_task_id);
                  }}
                >
                  Accept
                </button>
                <button
                  className={`flex justify-center  font-bold w-4/12 p-2 text-sm text-white bg-red-600 rounded-xl  hover:bg-red-500 `}
                  onClick={() => {
                    setReject(taskDetails.users_task_id);
                  }}
                >
                  Reject
                </button>
              </div>
            )}
          </div>

          {/* end summary */}

          {/* list */}

          <div className="text-Base-color text-start flex flex-col w-full">
            {/* ooo */}
            <div className="mt-6">
              <div className=" px-4">
                <div className="items-start justify-between sm:flex">
                  <div>
                    <h4 className=" text-4xl font-semibold text-fluencia-dark-purple">
                      {" "}
                      <span className="text-fluencia-purple tracking-wide">
                        Task Name : 
                      </span>
                      <span className="text-fluencia-light-purple">
                        {data[0]?.task_name}
                      </span>
                    </h4>
                    {/* <p className="mt-2 text-gray-600 text-base sm:text-sm">
                      have this task
                    </p> */}
                  </div>
                  {/* <button
                    href="javascript:void(0)"
                    className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-fluencia-yellow-first hover:bg-fluencia-yellow-second active:bg-fluencia-yellow-second rounded-lg sm:mt-0"
                    // onClick={() => {
                    //   setOpenSearch(true);
                    // }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m6-6H6"
                      />
                    </svg>
                    Add
                  </button> */}
                </div>
                <ul className="mt-12 divide-y ">
                  {data.map((member, id) => (
                    <li
                      key={id}
                      className="py-5 flex items-start justify-between"
                    >
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
                            {member.name}
                          </span>
                          <span className="block text-sm text-gray-600">
                            {member.email}
                          </span>
                        </div>
                      </div>
                      {/* <button
                          onClick={() => {
                            setTaskDetails(member);
                          }}
                          href="javascript:void(0)"
                          className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-red-600"
                        >
                          show Details
                        </button> */}
                      <button
                        class="bg-fluencia-purple  text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg hover:bg-fluencia-dark-purple outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          setTaskDetails(member);
                        }}
                      >
                        show Details
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* oooo */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TaskDetailsForAdmin;
