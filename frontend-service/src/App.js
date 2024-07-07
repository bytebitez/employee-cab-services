import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import DriverDashboard from "./components/Dashboard/DriverDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthProvider } from "./contexts/AuthContext";
import { AlertProvider } from "./contexts/AlertContext";
import ForgotPassword from "./components/Auth/ForgotPassword";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = !!localStorage.getItem("role");
  const isEmployee = !!localStorage.getItem("role");

  return (
    <AlertProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                isAuthenticated ? (
                  isAdmin ? (
                    <Navigate to="/admin-dashboard" />
                  ) : isEmployee ? (
                    <Navigate to="/employee-dashboard" />
                  ) : (
                    <Navigate to="/driver-dashboard" />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            ></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/driver-dashboard" element={<DriverDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </AuthProvider>
    </AlertProvider>
  );
};

export default App;
