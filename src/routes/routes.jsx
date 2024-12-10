/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Annotation from "../pages/annotation";
import ForgotPassword from "../pages/forgotPassword";
import { useAuth } from "../context/auth";
import PrivateRoute from "../routes/PrivateRoute";
import Layout from "../components/layout";

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return !isLoggedIn ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <App />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/Annotation"
          element={
            <PrivateRoute>
              <Annotation />
            </PrivateRoute>
          }
        />
        <Route
          path="/ForgotPassword"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
