import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import DriverDashboard from './components/Dashboard/DriverDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                    <Route path="/driver-dashboard" element={<DriverDashboard />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
