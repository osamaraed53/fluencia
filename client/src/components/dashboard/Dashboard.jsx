import React, { useState } from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import CheckTypeOfUser from '../../PrivateRoute'
import { Navigate} from "react-router-dom";
import TableForUsers from "./TableForUsers";
import TableForBlockedUsers from './TableOfBlockedUser'
import { Table } from "@material-ui/core";
import TableForContactUs from "./TableForContactUs";
import HomeOfEditor from "./HomeOfEditor";
import { FAQsTable } from "./FAQsTable";
import PayUser from "./PayUser";
import { ActiveCourse } from "./ActiveCourse";
import { HiddenClasses } from "./HiddenClass";
const Dashboard = () => {
  // to make Taps component have reusable
 const type =  CheckTypeOfUser()


  return (
    <>


        {/* Routes for Tabs */}
        <Routes>
          <Route path="allUsers" element={<TableForUsers/>} />
          <Route path="HiddenClasses" element={<HiddenClasses/>} />
          <Route path="Classes" element={<ActiveCourse/>} />
          <Route path="blockedUsers" element={<TableForBlockedUsers/>} />
          <Route path="contactUs" element={<TableForContactUs/>} />
          <Route path="faq" element={<FAQsTable/>} />
          <Route path="pay" element={<PayUser/>} />
          <Route path="table" element={<Table/>} />
          <Route index element={<TableForUsers/>} />
        </Routes>
      {/* </PrivateRoute> */}
      {(type !="admin") &&<Navigate to="/" replace />}

    </>
  );
};
export default Dashboard;
