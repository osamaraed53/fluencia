import React, { useState } from "react";
import Tabs from "../Tabs";
import Class from "../Class";
import Members from "../Members";
import {
  Route,
  Routes,
} from "react-router-dom";
import Tasks from "../Tasks";
import Filter from "./Filter";
import People from "../People";

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
            <div className="flex flex-col justify-center mt-4 mb-44 ">
              <Filter/>
              <Tasks />{" "}
              </div>
          }
        />
        <Route path="people" element={<People/>} />
        <Route index element={<Class />} />
      </Routes>
    </>
  );
};
export default HomeForUser;
