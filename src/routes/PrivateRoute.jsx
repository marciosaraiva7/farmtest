/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
