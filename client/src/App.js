import "./App.css";
import NavBar from "./components/components/NavBar";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SideBarContext from "./context/SideBarContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseUser,
  faEnvelope,
  faUserLock,
  faUser,
  faFolder,
  faListCheck,
  faClipboardQuestion,
} from "@fortawesome/free-solid-svg-icons";

// reusable components
import Footer from "./components/components/Footer";
import SideBar from "./components/mainPage/SideBar";
import NotFound from "./components/components/NotFound";
import Landing from "./components/landingPage/Landing";
import Tasks from "./components/ClassPage/Tasks";

// pages
import Login from "./components/pages/SginIn";
import SignUp from "./components/pages/SignUp";
import HomeForUser from "./components/ClassPage/Home";
import Class from "./components/ClassPage/Class";
import MainPageOfAdmin from "./components/mainPage/MainPageOfAdmin";
import LoginForAdmin from "./components/pages/SignInForAdmin";
import FAQs from "./components/pages/FAQs";
import About from "./components/pages/About";

// For test
import People from "./components/ClassPage/People";
import Contact from "./components/pages/Contact";
import Subscription from "./components/Payment/Subscription";
import ProfilePrivate from "./components/pages/Profile";
import CheckTypeOfUser from "./PrivateRoute";

import Dashboard from "./components/dashboard/Dashboard";
import TableForUsers from "./components/dashboard/TableForUsers";
import TableForBlockedUsers from "./components/dashboard/TableOfBlockedUser";
import TableForContactUs from "./components/dashboard/TableForContactUs";
import HomeOfEditor from "./components/dashboard/HomeOfEditor";
import Edit from "./components/Tasks/Edit";
import Add from "./components/Tasks/Add";

import AdminMenu from "./Menus/AdminMenu";
import DashbordMenu from "./Menus/DashbordMenu";
import StudentMenu from "./Menus/StudentMenu";
import TaskDetails from "./components/ClassPage/TaskDetails";

function App() {
  // context for sidebar
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const type = 'admin'
  console.log(type)

  // Menus for sideBar
  const Menu = type == "student" ? StudentMenu : AdminMenu;
  const MenusForDashboard = DashbordMenu;

  return (
    <div className="App">
      <BrowserRouter>
        <SideBarContext.Provider value={{ isSidebarOpen, setSidebarOpen }}>
          <NavBar />
          <Routes>
            {/*  main routs */}
            <Route path="/" element={<Landing />} />
            <Route path="/Subscription/:plan_id" element={<Subscription />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/editor" element={<Editor />} /> */}
            <Route path="/Add" element={<Add />} />
            <Route path="/edit/:postID" element={<Edit />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/adminSignIn" element={<LoginForAdmin />} />

            <Route
              path={"/profile"}
              element={
               (<SideBar Menus={Menu}>
                  
                  <ProfilePrivate />
                </SideBar>) }
              
            />

            {/* <Route path="/main/addNewCourse" element={<AddNewCourse/>} /> */}

            {/* main page for SupAdmin 'Home' Routs */}
            <>
              <Route
                path={"/main"}
                element={ 
                  (<SideBar Menus={Menu}>
                    <MainPageOfAdmin />
                  </SideBar>) 
                }
              />

              <Route
                path={"/main/home/:course_id"}
                element={ 
                  (<SideBar Menus={Menu}>
                    <HomeForUser />
                  </SideBar>) 
                }
              >
                <Route path="class" element={<Class />} />
                <Route
                  path="tasks"
                  element={
                    <>
                      <Tasks />
                    </>
                  }
                />
                <Route path="tasks/task/:users_task_id" />
                <Route path="add" />
                <Route path="people" />
                <Route index element={<Class />} />
              </Route>
            </>

            {/* end  main page for SupAdmin 'Home' Routs */}
            {/* start Dashboard  */}
            <Route
              path={"/Dashboard"}
              element={ 
                (<SideBar Menus={MenusForDashboard}>
                  <Dashboard />
                </SideBar>) 
              }
            >
              <Route path="HiddenClasses"  />
              <Route path="Classes" element={<HomeOfEditor />} />
              <Route path="allUsers" element={<TableForUsers />} />
              <Route path="blockedUsers" element={<TableForBlockedUsers />} />
              <Route path="contactUs" element={<TableForContactUs />} />
              <Route path="faq" />
              <Route path="pay" />
              <Route index element={<TableForUsers />} />
            </Route>

            {/*end Dashboard */}

            {/* for test  */}
            <Route path="/not" element={<TaskDetails />} />
            {/* for test  */}
          </Routes>
          <Footer />
        </SideBarContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
