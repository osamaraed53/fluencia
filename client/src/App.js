import "./App.css";
import NavBar from "./components/NavBar";
import { useState } from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import SideBarContext from "./context/SideBarContext";

// reusable components
import Footer from "./components/Footer";
import SideBar from "./components/mainPage/SideBar";
import NotFound from "./components/NotFound";
import Landing from "./components/pages/Landing";
import Tasks from "./components/Tasks";
import Filter from "./components/pages/Filter";

// pages
import Login from "./components/pages/SginIn";
import SignUp from "./components/pages/SignUp";
import HomeForUser from "./components/pages/Home";
import Class from "./components/ClassPage/Class";
import MainPageOfAdmin from "./components/pages/MainPageOfAdmin";
import LoginForAdmin from "./components/pages/SignInForAdmin";

// For test
import Test from "./components/Test";
import People from "./components/ClassPage/People";
import Contact from "./components/pages/Contact";
import FAQs from "./components/pages/FAQs";
import About from "./components/pages/About";
import Subscription from "./components/Payment/Subscription";
import ProfilePrivate from "./components/Profile";
import PrivateRoute from "./PrivateRoute";

import Dashboard from "./components/dashboard/Dashboard";
import TableForUsers from "./components/dashboard/TableForUsers";
// import PrivateRoute from "./PrivateRoute";

function App() {
  // context for sidebar
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Menus for sideBar
  const Menus_for_HomeForUser = [
    { title: "Home", src: "", path: "" },
    { title: "Inbox", src: "control", path: " " },
  ];
  const Menus_for_HomeForAdmin = [
    { title: "Home", src: "control", path: "" },
    { title: "Inbox", src: "control", path: " " },
  ];


  const MenusForDashboard = [
    { title: "Users", src: "control", path: "allUsers" },
    { title: "Inbox", src: "control", path: " " },
  ];


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
            <Route path="/contact" element={<Contact /> }/>

            <Route path="/about" element={(0 == 0) ? <About /> : <Navigate to='/' replace />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/adminSignIn" element={<LoginForAdmin />} />
            <Route path={"/profile"} element={ <SideBar Menus={Menus_for_HomeForAdmin}> <ProfilePrivate /></SideBar>}/>
            
            
            {/* <Route path="/main/addNewCourse" element={<AddNewCourse/>} /> */}


            {/* main page for SupAdmin 'Home' Routs */}
            <>
              <Route
                path={"/main"}
                element={
                  <SideBar Menus={Menus_for_HomeForAdmin}>
                    <MainPageOfAdmin />
                  </SideBar>
                }
              />

              <Route
                path={"/main/home/:course_id"}
                element={
                  <SideBar Menus={Menus_for_HomeForAdmin}>
                    <HomeForUser />
                  </SideBar>
                }
              >
                <Route path="class" element={<Class />} />
                <Route
                  path="tasks"
                  element={
                    <>
                      <Filter />
                      <Tasks />{" "}
                    </>
                  }
                />
                <Route path="people" element={<People />} />
                <Route index element={<Class />} />
              </Route>
            </>

            {/* end  main page for SupAdmin 'Home' Routs */}

                  {/* start Dashboard  */}
                  <Route
                path={"/Dashboard"}
                element={
                  <SideBar Menus={MenusForDashboard}>
                    <Dashboard/>
                  </SideBar>
                }
              >
                <Route path="allUsers" element={<TableForUsers/>} />
                <Route index element={<TableForUsers/>} />
              </Route>

                  {/*end Dashboard */}

            {/* for test  */}
            <Route path="/not" element={<Test />} />
            {/* for test  */}
          </Routes>
          <Footer />
        </SideBarContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
