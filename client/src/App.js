import "./App.css";
import NavBar from "./components/NavBar";
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useMatch,
} from "react-router-dom";
import SideBarContext from "./context/SideBarContext";

// reusable components
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import NotFound from "./components/NotFound";
import Landing from "./components/pages/Landing";

// pages
import Login from "./components/pages/SginIn";
import SignUp from "./components/pages/SignUp";
import HomeForUser from "./components/pages/Home";
import Class from "./components/Class";

// For test 
import CreateClass from "./components/CreateClass";
import Test from "./components/Test";
import Members from "./components/Members";
import Tasks from "./components/Tasks";
import Filter from "./components/pages/Filter";

function App() {
  const [signIn, setSignin] = useState(false);
 
  // context for sidebar
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // just for test 
  const [role , setRole] = useState(0);

  // Menus for sideBar
  const Menus_for_HomeForUser = [
    { title: "Inbox", src: "control" },
    { title: "Inbox", src: "control" },
  ];
  const Menus_for_HomeForAdmin = [
    { title: "daaaa", src: "control" },
    { title: "daaaa", src: "control" },
  ];

 const Menus_for_Sidebar = (role == 1 ) ? (Menus_for_HomeForAdmin ) : (Menus_for_HomeForUser)
 
  return (
    <div className="App">
      <BrowserRouter>
        <SideBarContext.Provider value={{ isSidebarOpen, setSidebarOpen }}>
          <NavBar signIn={signIn} setSignin={setSignin} />
          <Routes>
            {/*  main routs */}
            <Route path="/" element={<Landing />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            {/* end  main routs */}
            

            {/* main page for Users 'Home' Routs */}
            <Route
              path={role==1 ? ('/home/:id') : ('/home')} 
              element={
                <SideBar Menus={Menus_for_Sidebar}>
                  <HomeForUser />
                </SideBar>
              }
            >
              <Route path="class" element={<Class/>} />
              <Route
          path="tasks"
          element={
            <>
              <Filter/>
              <Tasks />{" "}
              </>
          }
        />
              <Route path="people" element={<Members/>} />
              <Route index element={`${(role==1) ? <Class/> : <Class/>  }`} />
            </Route>

         {/* End  main page for Users 'Home' Routs */}
             
              {/* for test  */}
              <Route path="/not" element={<Tasks/>} />
              {/* for test  */}
          </Routes>
          <Footer />
        </SideBarContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
