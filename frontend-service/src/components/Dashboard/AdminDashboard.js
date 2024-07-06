import React from 'react';
import UserList from '../Users/UserList';
import DriverList from '../Drivers/DriverList';
import RouteList from '../Routes/RouteList';

const AdminDashboard = () => {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <UserList />
            <DriverList />
            <RouteList />
        </div>
    );
};

export default AdminDashboard;
