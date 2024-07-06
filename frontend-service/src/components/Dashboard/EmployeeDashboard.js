import React from 'react';
import BookingForm from '../Bookings/BookingForm';
import BookingList from '../Bookings/BookingList';

const EmployeeDashboard = () => {
    return (
        <div>
            <h2>Employee Dashboard</h2>
            <BookingForm />
            <BookingList />
        </div>
    );
};

export default EmployeeDashboard;
