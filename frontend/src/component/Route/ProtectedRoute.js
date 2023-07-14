import React from "react";
import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";

const ProtectedRoute = ({children,isAdmin}) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  if (isAuthenticated === false) {
    console.log("In protectedroute login")
    return <Navigate to="/login" />;
  }
  if (isAdmin === true && user.role !== "admin") {
    console.log("In protectedroute login")
    return <Navigate to="/login" />;
  }
 return children;
};

export default ProtectedRoute;
