import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {

  // If user is authenticated access private routes else navigate to login
  return localStorage.getItem("isAuthenticated") ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;