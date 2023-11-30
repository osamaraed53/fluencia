import "./App.css";
import NavBar from "./components/NavBar";
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SideBarContext from "./context/SideBarContext";

// reusable components
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import NotFound from "./components/NotFound";
import Landing from "./components/pages/Landing";
import Tasks from "./components/Tasks";
import Filter from "./components/pages/Filter";

// pages
import Login from "./components/pages/SginIn";
import SignUp from "./components/pages/SignUp";
import HomeForUser from "./components/pages/Home";
import Class from "./components/Class";
import MainPageOfAdmin from './components/pages/MainPageOfAdmin'
import LoginForAdmin from './components/pages/SignInForAdmin'

// For test
import Test from "./components/Test";
import People from "./components/People";
import Contact from "./components/Contact";
import FAQs from "./components/FAQs";
import About from "./components/About";
import Subscription from './components/Subscription'

function App() {
  const [signIn, setSignin] = useState(false);

  // context for sidebar
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // just for test
  const [role, setRole] = useState(1);

  // Menus for sideBar
  const Menus_for_HomeForUser = [
    { title: "Inbox", src: "control" },
    { title: "Inbox", src: "control" },
  ];
  const Menus_for_HomeForAdmin = [
    { title: "daaaa", src: "control" },
    { title: "daaaa", src: "control" },
  ];



  return (
    <div className="App">
      <BrowserRouter>
        <SideBarContext.Provider value={{ isSidebarOpen, setSidebarOpen }}>
          <NavBar signIn={signIn} setSignin={setSignin} />
          <Routes>
            {/*  main routs */}
            <Route path="/" element={<Landing />} />
            <Route path="/Subscription" element={<Subscription/>} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/faqs" element={<FAQs/>} />
            <Route path="/adminSignIn" element={<LoginForAdmin/>} />
            {/* <Route path="/main/addNewCourse" element={<AddNewCourse/>} /> */}
             {/* end  main routs */}

            {/* main page for SupAdmin 'Home' Routs */}
            {role == 1 && (
             <>            
              <Route
                path={"/main"}
                element={
                  <SideBar Menus={Menus_for_HomeForAdmin}>
                    <MainPageOfAdmin/>
                  </SideBar>
                }
              />

              <Route
              path={"/main/home/:id"}
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
              <Route path="people" element={
                <People/>
            } />
              <Route index element={<Class />} />
            </Route>
              
            </>

            )}

            {/* end  main page for SupAdmin 'Home' Routs */}




            {/* main page for Users 'Home' Routs */}
            <Route
              path={"/home"}
              element={
                <SideBar Menus={Menus_for_HomeForUser}>
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
              <Route path="people" element={<People/>} />
              <Route index element={<Class />} />
            </Route>

            {/* End  main page for Users 'Home' Routs */}

            {/* for test  */}
            <Route path="/not" element={<Test/>} />
            {/* for test  */}
          </Routes>
          <Footer />
        </SideBarContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
