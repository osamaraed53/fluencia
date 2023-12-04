
import { useSelector } from "react-redux";
import {  useNavigate,Navigate } from "react-router-dom";

// to set pages as private and get type Of User 
const PrivateRoute = (type = "none") => {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const authForAdmin = useSelector(
    (state) => state.authForAdmin.isAuthenticated
  );
  const navigate = useNavigate();


  
  if(!auth && type=="student"){
    navigate("/");
    return "none"
  }else if(!authForAdmin && type=="admin"){
    navigate("/");
    return "none"
  }
  if (!auth && !authForAdmin && type != "type") {
    console.log("Before redirect");
    navigate("/");
    console.log("After redirect");
    return "none"
    
  }
  // console.log("After redirect");

  // To know the type Of User If I dont Know 
  if (auth) {
    return "student";
  }return "admin"
};

export default PrivateRoute;



// import React from "react";
// import { Route, Navigate } from "react-router-dom";

// const PrivateRoute = ({ element, path }) => {
//   let auth = true; // Replace this with your actual authentication check

// //   console.log(...rest);
//   return (
//     <Route
//     path={path}
//       element={auth ? element : <Navigate to="/login" replace />}
//     />
//   );
// };

// export default PrivateRoute;