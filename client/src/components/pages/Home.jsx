import React, { useState } from "react";
import SideBar from "../SideBar";
import Landing from "./Landing";
import Tabs from "../Tabs";
import Class from "../Class";
import Members from "../Members";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Routes,
  useParams,
  useMatch,
} from "react-router-dom";
import Login from "./SginIn";
import SignUp from "./SignUp";
import Tasks from "../Tasks";
import Filter from "./Filter";

const HomeForUser = () => {
  // to make Taps component have reusable
  const tabs = [
    { id: "1", title: "Class", path: "class" },
    { id: "2", title: "Tasks", path: "tasks" },
    { id: "3", title: "People", path: "people" },
  ];
  const [activeTabe, setActiveTabe] = useState("1");

  return (
    <>
      {/*  to make Taps component have reusable  */}
      <Tabs tabs={tabs} active={activeTabe} setActive={setActiveTabe} />
      {/* routes for Tabs*/}
      <Routes>
        <Route path="class" element={<Class />} />
        <Route
          path="tasks"
          element={
            <div className="flex flex-col justify-center mt-4">
              <Filter/>
              <Tasks />{" "}
              </div>
          }
        />
        <Route path="people" element={<Members />} />
        <Route index element={<Class />} />
      </Routes>
    </>
  );
};
export default HomeForUser;
