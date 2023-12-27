import React, { useState } from "react";
import Tabs from "./Tabs";
import Class from "./Class";
import Members from "./Members";
import { Route, Routes } from "react-router-dom";
import Tasks from "./Tasks";
import Filter from "../pages/Filter";
import People from "./People";
import CheckTypeOfUser from "../../PrivateRoute";
import { useNavigate, Navigate } from "react-router-dom";
import Add from "../Tasks/Add";
import TaskDetails from "./TaskDetails";
import TaskDetailsForAdmin from "./TaskDetailsForAdmin";

const HomeForUser = () => {
  // to make Taps component have reusable

  const type = CheckTypeOfUser();
  const tabs = [
    { id: "1", title: "Class", path: "class" },
    { id: "2", title: "Tasks", path: "tasks" },
    { id: "3", title: "People", path: "people" },
    type != "student" && { id: "4", title: "Add Task", path: "add" },
  ];
  const [activeTabe, setActiveTabe] = useState("1");

  return (
    <>
    {/* <div className="w-full"> */}
      <Tabs tabs={tabs} active={activeTabe} setActive={setActiveTabe} />
      {/* </div> */}
      {/* Routes for Tabs */}
      <Routes>
        <Route path="class" element={<Class />} />
        <Route
          path="tasks"
          element={
            <div className="flex flex-col justify-center mt-4 mb-44 ">
              <Tasks />
            </div>
          }
        />
        <Route path="tasks/task/:users_task_id" element={type=="student" ? <TaskDetails /> : <TaskDetailsForAdmin/>} /> 
        <Route path="people" element={<People />} />
        <Route path="add" element={<Add />} />
        <Route index element={<Class />} />
      </Routes>
      {type == "none" && <Navigate to="/" replace />}
    </>
  );
};
export default HomeForUser;
