import React, { useState } from "react";
import Tabs from "../ClassPage/Tabs";
import Class from "../ClassPage/Class";
import Members from "../ClassPage/Members";
import {
  Route,
  Routes,
} from "react-router-dom";
import Tasks from "../Tasks";
import Filter from "./Filter";
import People from "../ClassPage/People";
import PrivateRoute from '../../PrivateRoute'
import {  useNavigate ,Navigate} from "react-router-dom";

const HomeForUser = () => {
  // to make Taps component have reusable
 const type =  PrivateRoute()
  const tabs = [
    { id: "1", title: "Class", path: "class" },
    { id: "2", title: "Tasks", path: "tasks" },
    { id: "3", title: "People", path: "people" },
  ];
  const [activeTabe, setActiveTabe] = useState("1");

  return (
    <>

        <Tabs tabs={tabs} active={activeTabe} setActive={setActiveTabe} />

        {/* Routes for Tabs */}
        <Routes>
          <Route path="class" element={<Class />} />
          <Route
            path="tasks"
            element={
              <div className="flex flex-col justify-center mt-4 mb-44 ">
                <Filter />
                <Tasks />{" "}
              </div>
            }
          />
          <Route path="people" element={<People />} />
          <Route index element={<Class />} />
        </Routes>
      {/* </PrivateRoute> */}
      {(type =="none") &&<Navigate to="/" replace />}

    </>
  );
};
export default HomeForUser;
