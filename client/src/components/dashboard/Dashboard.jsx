import React, { useState } from "react";
import Class from "../ClassPage/Class";
import {
  Route,
  Routes,
} from "react-router-dom";
import PrivateRoute from '../../PrivateRoute'
import {  useNavigate ,Navigate} from "react-router-dom";
import TableForUsers from "./TableForUsers";

const Dashboard = () => {
  // to make Taps component have reusable
//  const type =  PrivateRoute()


  return (
    <>


        {/* Routes for Tabs */}
        <Routes>
          <Route path="allUsers" element={<TableForUsers/>} />

          {/* <Route path="allUsers" element={<TableForUsers/>} /> */}
          <Route index element={<TableForUsers/>} />
        </Routes>
      {/* </PrivateRoute> */}
      {/* {(type =="none") &&<Navigate to="/" replace />} */}

    </>
  );
};
export default Dashboard;
