import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("adminAuth") === "true";

  if (!isAuth) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;