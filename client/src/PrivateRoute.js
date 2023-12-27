
import { useSelector } from "react-redux";
// import {  useNavigate,Navigate } from "react-router-dom";


// to set pages as private and get type Of User 
const CheckTypeOfUser = (type = "none") => {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const authForAdmin = useSelector(
    (state) => state.authForAdmin.role
  );


    // if(auth){
    //   return "student";
    // }else if(authForAdmin){
    //   if(type == "type"){
    //     return "both"
    //   }
    //   if(authForAdmin ==  1){
    //     return "teacher"
    //   }else{
    //     return "admin"
    //   }


    }else{
      return "none"
    }
  


  // if(!auth && type=="student"){
  //   return "none"
  // }else if(!authForAdmin && type=="admin"){
  //   return "none"
  // }
  // if (!auth && !authForAdmin && type != "type") {
  //   return "none" 
  // }

  // To know the type Of User If I dont Know 
  if (auth) {
    return "student";
  }return "admin"
};

export default CheckTypeOfUser;



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